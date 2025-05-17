import { type User } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import stripe from './client'
import { type PrismaClient } from '@prisma/client'
import { type Stripe } from 'stripe'

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

/**
 * Retrieves and validates an existing Stripe customer by their ID.
 * If the customer is found and not deleted, returns the customer object.
 * If the customer is deleted, updates the local user record to remove the Stripe customer ID.
 *
 * @param stripeCustomerId - The Stripe customer ID.
 * @param userId - The ID of the user in your system.
 * @param prismaUserDelegate - Prisma delegate for user operations.
 * @returns The Stripe customer object if valid, otherwise null.
 */
async function _retrieveAndValidateStripeCustomer(
  stripeCustomerId: string,
  userId: User['id'],
  prismaUserDelegate: PrismaClient['user'],
): Promise<Stripe.Customer | null> {
  try {
    const customer = await stripe.customers.retrieve(stripeCustomerId)
    if (!customer.deleted) {
      return customer as Stripe.Customer
    }
    // Customer was deleted in Stripe, so clear it from our DB
    await prismaUserDelegate.update({
      where: { id: userId },
      data: { stripeCustomerId: null },
    })
    console.warn(
      `Stripe customer ${stripeCustomerId} was deleted. Removed from user ${userId}.`,
    )
    return null
  } catch (error) {
    console.warn(
      `Failed to retrieve Stripe customer ${stripeCustomerId}, possibly invalid. Error: ${error}`,
    )
    // Mark as null in DB if retrieve failed (e.g. ID no longer exists)
    await prismaUserDelegate.update({
      where: { id: userId },
      data: { stripeCustomerId: null },
    })
    return null
  }
}

/**
 * Finds an existing Stripe customer by email.
 * If found, updates the local user record with the Stripe customer ID.
 *
 * @param email - The user's email address.
 * @param userId - The ID of the user in your system.
 * @param prismaUserDelegate - Prisma delegate for user operations.
 * @returns The Stripe customer ID if found, otherwise null.
 */
async function _findStripeCustomerByEmail(
  email: string,
  userId: User['id'],
  prismaUserDelegate: PrismaClient['user'],
): Promise<string | null> {
  const customers = await stripe.customers.list({ email, limit: 1 })
  if (customers.data.length > 0) {
    const stripeCustomerId = customers.data[0].id
    await prismaUserDelegate.update({
      where: { id: userId },
      data: { stripeCustomerId },
    })
    console.log(
      `Found existing Stripe customer ${stripeCustomerId} for user ${userId} by email.`,
    )
    return stripeCustomerId
  }
  return null
}

/**
 * Creates a new Stripe customer.
 * Updates the local user record with the new Stripe customer ID.
 *
 * @param user - The user object (must have an id, email is optional).
 * @param prismaUserDelegate - Prisma delegate for user operations.
 * @returns The ID of the newly created Stripe customer.
 */
async function _createNewStripeCustomer(
  user: Pick<User, 'id' | 'email'>,
  prismaUserDelegate: PrismaClient['user'],
): Promise<string> {
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    metadata: {
      userId: user.id,
    },
  })

  await prismaUserDelegate.update({
    where: { id: user.id },
    data: { stripeCustomerId: customer.id },
  })
  console.log(`Created new Stripe customer ${customer.id} for user ${user.id}.`)
  return customer.id
}

/**
 * Finds an existing Stripe customer or creates a new one for the given user.
 * It first checks if the user already has a `stripeCustomerId`.
 * If so, it tries to retrieve and validate that customer from Stripe.
 * If not, or if the existing ID is invalid/deleted, it searches for a customer by email.
 * If no customer is found by email, it creates a new Stripe customer.
 * The user's `stripeCustomerId` field in the database is updated accordingly.
 *
 * @param user - The user object from your database. Must include `id`, `stripeCustomerId`, and `email`.
 * @param prismaUserDelegate - Prisma delegate for user entity.
 * @returns The Stripe Customer ID.
 */
async function _findOrCreateStripeCustomer(
  user: User,
  prismaUserDelegate: PrismaClient['user'],
): Promise<string> {
  if (user.stripeCustomerId) {
    const existingCustomer = await _retrieveAndValidateStripeCustomer(
      user.stripeCustomerId,
      user.id,
      prismaUserDelegate,
    )
    if (existingCustomer) {
      return existingCustomer.id
    }
    // If customer was deleted or invalid, stripeCustomerId is now null on user object,
    // so we proceed to find by email or create.
  }

  if (user.email) {
    const customerIdByEmail = await _findStripeCustomerByEmail(
      user.email,
      user.id,
      prismaUserDelegate,
    )
    if (customerIdByEmail) {
      return customerIdByEmail
    }
  }

  return _createNewStripeCustomer(user, prismaUserDelegate)
}

/**
 * Creates a Stripe Checkout Session for a given user and price ID.
 * This session allows the user to complete a payment for a subscription.
 * It finds or creates a Stripe customer for the user first.
 *
 * @param user - The user for whom to create the checkout session.
 * @param prismaUserDelegate - Prisma delegate for user operations.
 * @param priceId - The ID of the Stripe Price object for the subscription.
 * @returns An object containing the `sessionId` and `url` of the checkout session.
 * @throws {HttpError} If the session URL is missing or if any other error occurs.
 */
export async function _createStripeCheckoutSession(
  user: User,
  prismaUserDelegate: PrismaClient['user'],
  priceId: string,
): Promise<{ sessionId: string; url: string | null }> {
  const stripeCustomerId = await _findOrCreateStripeCustomer(
    user,
    prismaUserDelegate,
  )

  const successUrl = `${CLIENT_URL}/checkout?success=true&sessionId={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${CLIENT_URL}/checkout?canceled=true`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: stripeCustomerId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      automatic_tax: { enabled: true },
      customer_update: { address: 'auto' },
      allow_promotion_codes: true,
    })

    if (!session.url) {
      throw new HttpError(500, 'Stripe checkout session URL is missing')
    }

    return { sessionId: session.id, url: session.url }
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error)
    throw new HttpError(
      500,
      `Failed to create Stripe checkout session: ${error.message}`,
    )
  }
}

/**
 * Creates a Stripe Customer Portal Session for a given Stripe customer ID.
 * This session allows the user to manage their subscription and billing details.
 *
 * @param stripeCustomerId - The Stripe customer ID.
 * @returns An object containing the `url` of the customer portal session.
 * @throws {HttpError} If any error occurs during session creation.
 */
export async function _createStripeCustomerPortalSession(
  stripeCustomerId: string,
): Promise<{ url: string | null }> {
  const returnUrl = `${CLIENT_URL}/`

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    })
    return { url: portalSession.url }
  } catch (error: any) {
    console.error('Error creating Stripe customer portal session:', error)
    throw new HttpError(
      500,
      `Failed to create Stripe customer portal session: ${error.message}`,
    )
  }
}
