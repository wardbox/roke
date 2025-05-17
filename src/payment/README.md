# BIGTIME NOTE: Major inspiration and even just some straight copypasta comes from Wasp's OpenSaaS template. CHECK IT OUT https://opensaas.sh

## Stripe Payment Integration

Handles user subscriptions using Stripe.

### Overview

Users subscribe via Stripe Checkout and manage subscriptions via the Stripe
Customer Portal. Webhooks sync subscription statuses with the app.

### Key Components

- **`stripe/client.ts`**: Initializes Stripe SDK (secret key, API version).
- **`stripe/service.ts`**: Core logic:
  - `_findOrCreateStripeCustomer`: Gets/creates Stripe customer, updates local
    User.
  - `_createStripeCheckoutSession`: Creates Stripe Checkout session for new
    subscriptions.
  - `_createStripeCustomerPortalSession`: Creates Stripe Customer Portal session
    for management.
- **`stripe/operations.ts`**: Wasp actions (callable from frontend):
  - `createCheckoutSession`: Initiates subscription.
  - `createCustomerPortalSession`: Opens customer portal.
- **`stripe/webhooks.ts`**: Handles incoming Stripe events (`/stripe-webhooks`
  API route).
  - **Signature Verification**: Secures webhook endpoint using
    `STRIPE_WEBHOOK_SECRET`.
  - **Middleware (`stripeWebhookMiddlewareConfigFn`)**: Ensures raw request body
    for verification.
  - **Event Processing**: Updates `User.subscriptionStatus` based on events like
    `checkout.session.completed`, `customer.subscription.updated`,
    `customer.subscription.deleted`.
  - `mapStripeStatusToUserStatus`: Translates Stripe statuses to app-specific
    statuses.
- **Frontend (`SubscriptionPage.tsx`, `CheckoutResultPage.tsx`)**: UI for
  subscription and results.

### Environment Variables (Required)

- `STRIPE_SECRET_KEY`: Your Stripe API secret key.
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret.
- `STRIPE_PRICE_ID`: Default subscription plan's Stripe Price ID.
- `CLIENT_URL`: Your app's base URL (e.g., `http://localhost:3000`).

### Setup Steps

1.  **Stripe Account**: Required.
2.  **Stripe Product & Price**: Create a product and a recurring price in Stripe
    Dashboard. Note the Price ID.
3.  **Stripe Webhook Endpoint**:
    - **Production/Staging**:
      1.  In Stripe Dashboard (Developers > Webhooks), click "Add endpoint".
      2.  URL: `YOUR_PRODUCTION_APP_URL/stripe-webhooks`.
      3.  Events: `checkout.session.completed`, `customer.subscription.updated`,
          `customer.subscription.deleted` (or all).
      4.  Get the **Signing secret** (`whsec_...`) for `STRIPE_WEBHOOK_SECRET`
          env var.
    - **Local Development (using Stripe CLI)**:
      1.  Install & login: `stripe login`
      2.  Forward events:
          `stripe listen --forward-to localhost:3001/stripe-webhooks`
      3.  The CLI provides a temporary `whsec_...` for your local
          `STRIPE_WEBHOOK_SECRET`.
4.  **Configure Env Vars**: Set the above variables (e.g., in `.env.server`
    locally; in hosting provider for prod/staging).

### User Schema (Prisma)

Ensure `User` model has:

```prisma
model User {
  // ... other fields
  stripeCustomerId    String?   @unique // Stripe Customer ID
  subscriptionStatus  String?            // e.g., 'active', 'canceled'
}
```

### Subscription Flow

1.  User clicks "Subscribe".
2.  `createCheckoutSession` action called → Stripe customer ensured/created →
    user redirected to Stripe Checkout.
3.  User pays on Stripe.
4.  Stripe sends `checkout.session.completed` webhook.
5.  Webhook handler updates `User.subscriptionStatus`.
6.  Ongoing changes (renewals, cancellations) trigger other webhooks
    (`customer.subscription.updated/deleted`) updating status.
7.  "Manage Subscription" button calls `createCustomerPortalSession` → redirects
    to Stripe Portal.

### Security

- **Secrets**: Store `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` as secure
  environment variables. Do not commit.
- **Webhook Verification**: Essential. Done via
  `stripe.webhooks.constructEvent`.
- **HTTPS**: Use for webhook endpoint in production.
- **Idempotency**: Stripe webhooks can retry. Current updates are generally
  safe, but consider for complex handlers.
