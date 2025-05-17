import { HttpError } from 'wasp/server'
import {
  type CreateCheckoutSession,
  type CreateCustomerPortalSession,
} from 'wasp/server/operations'
import {
  _createStripeCheckoutSession,
  _createStripeCustomerPortalSession,
} from './service'
import { type User } from 'wasp/entities'

/**
 * Wasp action to create a Stripe Checkout Session.
 * It authenticates the user, retrieves the Stripe Price ID from environment variables,
 * and then calls the internal `_createStripeCheckoutSession` service function.
 *
 * @param _args - Action arguments (not used in this action).
 * @param context - Wasp action context, containing the authenticated user and entity delegates.
 * @returns An object with `sessionUrl` (the URL for Stripe Checkout) and `sessionId`.
 * @throws {HttpError} If the user is not authenticated, Price ID is missing, or session creation fails.
 */
export const createCheckoutSession: CreateCheckoutSession = async (
  _args,
  context,
) => {
  if (!context.user) {
    throw new HttpError(401, 'User not authenticated')
  }

  const priceId = process.env.STRIPE_PRICE_ID
  if (!priceId) {
    console.error('STRIPE_PRICE_ID environment variable is not set.')
    throw new HttpError(
      500,
      'Server configuration error: Stripe Price ID missing.',
    )
  }

  try {
    const { url, sessionId } = await _createStripeCheckoutSession(
      context.user as User & {
        stripeCustomerId: string | null
        email: string | null
      },
      context.entities.User,
      priceId,
    )
    if (!url) {
      throw new HttpError(500, 'Checkout session URL is unexpectedly null.')
    }
    return { sessionUrl: url, sessionId }
  } catch (error: any) {
    console.error('Error in createCheckoutSession action:', error)
    if (error instanceof HttpError) {
      throw error
    } else {
      throw new HttpError(
        500,
        error.message ||
          'An unexpected error occurred creating checkout session.',
      )
    }
  }
}

/**
 * Wasp action to create a Stripe Customer Portal Session.
 * It authenticates the user and checks if they have a `stripeCustomerId`.
 * Then, it calls the internal `_createStripeCustomerPortalSession` service function.
 *
 * @param _args - Action arguments (not used in this action).
 * @param context - Wasp action context, containing the authenticated user.
 * @returns An object with `sessionUrl` (the URL for the Stripe Customer Portal).
 * @throws {HttpError} If the user is not authenticated, doesn't have a `stripeCustomerId`, or session creation fails.
 */
export const createCustomerPortalSession: CreateCustomerPortalSession = async (
  _args,
  context,
) => {
  if (!context.user) {
    throw new HttpError(401, 'User not authenticated.')
  }
  if (!context.user.stripeCustomerId) {
    throw new HttpError(403, 'User does not have a Stripe customer ID.')
  }

  try {
    const { url } = await _createStripeCustomerPortalSession(
      context.user.stripeCustomerId,
    )
    if (!url) {
      throw new HttpError(
        500,
        'Customer portal session URL is unexpectedly null.',
      )
    }
    return { sessionUrl: url }
  } catch (error: any) {
    console.error('Error in createCustomerPortalSession action:', error)
    if (error instanceof HttpError) {
      throw error
    } else {
      throw new HttpError(
        500,
        error.message ||
          'An unexpected error occurred creating portal session.',
      )
    }
  }
}
