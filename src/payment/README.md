# BIGTIME NOTE: Major inspiration and even just some straight copypasta comes from Wasp's OpenSaaS template. CHECK IT OUT https://opensaas.sh

## Stripe Payment Integration

This directory contains the Stripe integration for handling user subscriptions.

### Overview

The integration allows users to subscribe to a plan via Stripe Checkout. It also
provides a way for users to manage their existing subscriptions through the
Stripe Customer Portal. Webhooks are used to keep the application's user
subscription status in sync with Stripe.

### Key Components

1.  **Stripe Client (`stripe/client.ts`)**

    - Initializes the Stripe SDK with the secret key.
    - API version is pinned for consistency.

2.  **Service Logic (`stripe/service.ts`)**

    - `_findOrCreateStripeCustomer`: Retrieves an existing Stripe customer or
      creates a new one. It checks by `stripeCustomerId` on the `User` entity
      first, then by email, before creating a new customer in Stripe. Updates
      the `User` entity with the Stripe customer ID.
    - `_createStripeCheckoutSession`: Creates a Stripe Checkout session for a
      user to start a new subscription.
    - `_createStripeCustomerPortalSession`: Creates a Stripe Customer Portal
      session for an existing subscriber to manage their subscription.

3.  **Wasp Operations (`stripe/operations.ts`)**

    - `createCheckoutSession`: A Wasp action that users call from the frontend
      to initiate a subscription. It calls `_createStripeCheckoutSession`.
    - `createCustomerPortalSession`: A Wasp action for users to manage their
      subscription. It calls `_createStripeCustomerPortalSession`.

4.  **Webhook Handler (`stripe/webhooks.ts`)**

    - `handleStripeWebhook`: An Express route handler exposed as a Wasp API
      (`/stripe-webhooks`). It listens for events from Stripe.
    - **Webhook Signature Verification**: Crucially, this handler verifies the
      `stripe-signature` header to ensure events are genuinely from Stripe,
      using the `STRIPE_WEBHOOK_SECRET`.
    - `stripeWebhookMiddlewareConfigFn`: Configures Wasp's Express middleware to
      parse the request body as `raw` JSON. This is **required** for Stripe's
      signature verification to work correctly.
    - **Event Handling**: Processes events like `checkout.session.completed`,
      `customer.subscription.updated`, and `customer.subscription.deleted` to
      update the `subscriptionStatus` field on the `User` entity in the local
      database.
    - `mapStripeStatusToUserStatus`: A helper function to translate Stripe's
      detailed subscription statuses into a simpler set of statuses used by the
      application (e.g., 'active', 'canceled', 'past_due').

5.  **Frontend Components**
    - `SubscriptionPage.tsx`: UI for users to subscribe or manage their
      subscription.
    - `CheckoutResultPage.tsx`: Displays success or cancellation messages after
      a Stripe Checkout session.

### Environment Variables

The following environment variables must be set for the Stripe integration to
function correctly:

- `STRIPE_SECRET_KEY`: Your Stripe API secret key (e.g., `sk_test_...` or
  `sk_live_...`).
- `STRIPE_WEBHOOK_SECRET`: The signing secret for your Stripe webhook endpoint
  (e.g., `whsec_...`). This is used to verify that webhook events are actually
  from Stripe.
- `STRIPE_PRICE_ID`: The ID of the Stripe Price object for the default
  subscription plan (e.g., `price_...`).
- `CLIENT_URL`: The base URL of your client application (e.g.,
  `http://localhost:3000` for development, or your production frontend URL).
  Used for constructing success/cancel URLs for Stripe Checkout and return URLs
  for the Customer Portal.

### Setup

1.  **Stripe Account**: You need a Stripe account.
2.  **Product and Price**: In your Stripe Dashboard, create a Product and at
    least one recurring Price for that product. Note the Price ID (`price_...`).
3.  **Webhook Endpoint**:
    - In your Stripe Dashboard, go to Developers > Webhooks.
    - Click "Add endpoint".
    - Set the "Endpoint URL" to `YOUR_APP_URL/stripe-webhooks` (e.g.,
      `http://localhost:3001/stripe-webhooks` if your Wasp server runs on 3001
      locally, or your production API URL).
    - Select the following events to listen for (or select all events if
      unsure):
      - `checkout.session.completed`
      - `customer.subscription.updated`
      - `customer.subscription.deleted`
    - Add the endpoint. Stripe will reveal a "Signing secret" (e.g.,
      `whsec_...`). This is your `STRIPE_WEBHOOK_SECRET`.
4.  **Environment Variables**: Configure the environment variables listed above
    in your Wasp project (e.g., in a `.env.server` file for local development).

### User Schema

The `User` entity in `main.wasp` (or your Prisma schema if defined separately)
should have the following fields to support the Stripe integration:

```prisma
model User {
  // ... other fields
  stripeCustomerId    String?   @unique // Stores the Stripe Customer ID
  subscriptionStatus  String?            // e.g., 'active', 'canceled', 'past_due', 'incomplete'
}
```

### Flow

1.  A user clicks "Subscribe" on `SubscriptionPage.tsx`.
2.  `createCheckoutSession` action is called.
3.  `_findOrCreateStripeCustomer` ensures a Stripe customer exists for the user.
4.  `_createStripeCheckoutSession` creates a session and redirects the user to
    Stripe Checkout.
5.  User completes payment on Stripe.
6.  Stripe sends a `checkout.session.completed` webhook event to
    `/stripe-webhooks`.
7.  `handleStripeWebhook` verifies the signature, processes the event, and
    updates the user's `subscriptionStatus` in the database.
8.  For ongoing subscription management (e.g., renewals, cancellations made in
    Stripe), Stripe sends `customer.subscription.updated` or
    `customer.subscription.deleted` events, which are processed similarly.
9.  Users can click "Manage Subscription" which calls
    `createCustomerPortalSession` and redirects them to the Stripe Customer
    Portal.

### Security Considerations

- **Secret Keys**: `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are
  sensitive. Store them securely as environment variables and never commit them
  to your repository.
- **Webhook Verification**: Always verify webhook signatures. This integration
  does so using `stripe.webhooks.constructEvent`.
- **HTTPS**: Ensure your webhook endpoint is served over HTTPS in production.
- **Idempotency**: While not explicitly handled in this version of the code for
  event processing, Stripe retries webhooks. Design your event handlers to be
  idempotent (i.e., processing the same event multiple times has the same effect
  as processing it once) if necessary, though the current `prisma.user.update`
  operations are generally safe.
