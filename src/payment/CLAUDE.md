# Payment Module

Stripe subscription payments with checkout and customer portal.

## Files

- `SubscriptionPage.tsx` - Pricing card and subscribe button
- `CheckoutResultPage.tsx` - Success/canceled states after checkout
- `stripe/client.ts` - Stripe SDK client initialization
- `stripe/service.ts` - Internal Stripe API functions
- `stripe/operations.ts` - Wasp actions (createCheckoutSession,
  createCustomerPortalSession)
- `stripe/webhooks.ts` - Webhook handler for subscription events

## How It Works

1. User clicks "Subscribe" on SubscriptionPage
2. `createCheckoutSession` action creates Stripe Checkout session
3. User completes payment on Stripe's hosted page
4. Stripe sends webhook to `/stripe-webhooks`
5. Webhook handler updates user's `subscriptionStatus` in database

## Setup

### Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Stripe Dashboard

1. Create a Product with a recurring Price
2. Copy the Price ID to `STRIPE_PRICE_ID`
3. For production: Set up webhook endpoint
   `https://your-domain.com/stripe-webhooks`
4. Subscribe to events: `checkout.session.completed`,
   `customer.subscription.updated`, `customer.subscription.deleted`

### Local Development (Stripe CLI)

To test webhooks locally, use the Stripe CLI to forward events to your dev
server:

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3001/stripe-webhooks
```

The CLI will output a webhook signing secret (`whsec_...`). Add this to your
`.env.server` as `STRIPE_WEBHOOK_SECRET`.

Keep the CLI running in a separate terminal while developing.

## Subscription Statuses

The `subscriptionStatus` field on User maps from Stripe:

- `active` - Active subscription or trial
- `past_due` - Payment failed, grace period
- `canceled` - Subscription ended
- `incomplete` - Initial payment pending

## Customization

### Pricing

Update the pricing card in `SubscriptionPage.tsx` with your plans.

### Multiple Plans

Modify `createCheckoutSession` to accept a `priceId` argument instead of using
env var.

### Trial Period

Configure trial in Stripe Dashboard or pass
`subscription_data.trial_period_days` to checkout session.
