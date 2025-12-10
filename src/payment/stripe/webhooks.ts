import { type MiddlewareConfigFn } from 'wasp/server'
import { type StripeWebhook } from 'wasp/server/api'
import express from 'express'
import stripe from './client.js'
import { type Stripe } from 'stripe'

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_WEBHOOK_SECRET) {
  console.warn(
    'STRIPE_WEBHOOK_SECRET environment variable is not set. Webhook verification will fail.',
  )
}

/**
 * Express middleware configuration function for the Stripe webhook handler.
 * It ensures that the request body is parsed as raw JSON, which is necessary
 * for Stripe webhook signature verification.
 *
 * @param middlewareConfig - The Wasp middleware configuration object.
 * @returns The modified middleware configuration object.
 */
export const stripeWebhookMiddlewareConfigFn: MiddlewareConfigFn =
  middlewareConfig => {
    middlewareConfig.delete('express.json')
    middlewareConfig.set(
      'express.raw',
      express.raw({ type: 'application/json' }),
    )
    return middlewareConfig
  }

/**
 * Maps Stripe subscription statuses to a simplified internal user status.
 *
 * @param stripeStatus - The status of the Stripe subscription.
 * @returns A string representing the mapped user status (e.g., 'active', 'canceled').
 */
function mapStripeStatusToUserStatus(
  stripeStatus: Stripe.Subscription.Status,
): string {
  switch (stripeStatus) {
    case 'active':
    case 'trialing':
      return 'active'
    case 'past_due':
    case 'unpaid':
      return 'past_due'
    case 'canceled':
    case 'incomplete_expired':
      return 'canceled'
    case 'incomplete':
      return 'incomplete'
    default:
      return 'unknown'
  }
}

export const handleStripeWebhook: StripeWebhook = async (req, res, context) => {
  const { entities } = context
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('Stripe webhook secret is not configured.')
    return res.status(500).send('Webhook secret not configured.')
  }

  const sig = req.headers['stripe-signature'] as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  console.log(`Received Stripe event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (
          session.mode === 'subscription' &&
          session.customer &&
          session.subscription
        ) {
          const customerId = session.customer as string
          const subscriptionId = session.subscription as string

          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId)
          const userStatus = mapStripeStatusToUserStatus(subscription.status)

          await entities.User.update({
            where: { stripeCustomerId: customerId },
            data: { subscriptionStatus: userStatus },
          })
          console.log(
            `Updated user status for customer ${customerId} to ${userStatus} after checkout.`,
          )
        } else if (session.mode === 'setup') {
          console.log(
            'Setup intent session completed, no subscription status change.',
          )
        } else {
          console.log(
            `Checkout session completed (mode: ${session.mode}), but not a subscription. No status update.`,
          )
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const userStatus = mapStripeStatusToUserStatus(subscription.status)

        await entities.User.update({
          where: { stripeCustomerId: customerId },
          data: { subscriptionStatus: userStatus },
        })
        console.log(
          `Updated user status for customer ${customerId} to ${userStatus} due to subscription update.`,
        )
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const userStatus = 'canceled'

        await entities.User.update({
          where: { stripeCustomerId: customerId },
          data: { subscriptionStatus: userStatus },
        })
        console.log(
          `Updated user status for customer ${customerId} to ${userStatus} due to subscription deletion.`,
        )
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.status(200).send()
  } catch (error: any) {
    console.error('Error processing webhook event:', error)
    if (error.code === 'P2025') {
      const customerIdGuess =
        (error.meta?.cause as string)?.split(' ')?.pop() || 'unknown'
      console.warn(
        `Webhook handler: User with Stripe Customer ID ${customerIdGuess} not found.`,
      )
      res.status(200).send('User not found, but acknowledging event.')
    } else {
      res.status(500).send('Internal Server Error processing webhook.')
    }
  }
}
