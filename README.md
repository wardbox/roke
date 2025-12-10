# Roke

A Wasp starter with sensible defaults.

## What's Included

- **Authentication** - Email/password with verification and password reset
- **Payments** - Stripe subscriptions with checkout and customer portal
- **UI Components** - shadcn/ui components (Button, Card, Dropdown, Sheet, etc.)
- **Animations** - Motion spring animations with presets (snappy, bouncy, heavy)
- **Dark Mode** - Theme toggle with system preference support
- **TypeScript** - Full type safety throughout

## Getting Started

1. Click "Use this template" button at the top of the repository
2. Clone your new repository
3. Install dependencies and start:

```bash
npm install
wasp db start
wasp db migrate-dev
wasp start
```

## Project Structure

```
src/
├── auth/           # Login, signup, password reset
├── payment/        # Stripe subscriptions
├── motion/         # Animation presets and provider
├── landing/        # Home page (customize this!)
├── client/components/  # shadcn/ui components
└── root-components/    # Nav, footer, theme
```

Each directory has a `CLAUDE.md` file explaining its purpose and how to
customize it.

## Customization Checklist

1. **Landing page** - Edit `src/landing/LandingPage.tsx`
2. **App name** - Set `REACT_APP_NAME` in `.env.client`
3. **Meta tags** - Update `head` section in `main.wasp`
4. **Auth emails** - Edit templates in `src/auth/email.ts`
5. **Stripe** - Add keys to `.env.server` (see `src/payment/CLAUDE.md`)
6. **Email provider** - Change from `Dummy` to SendGrid/Mailgun in `main.wasp`

## Key Files

| File                               | Purpose                                |
| ---------------------------------- | -------------------------------------- |
| `main.wasp`                        | Routes, pages, auth config, operations |
| `schema.prisma`                    | Database models                        |
| `src/landing/LandingPage.tsx`      | Home page content                      |
| `src/auth/email.ts`                | Email templates                        |
| `src/motion/transitionPresets.tsx` | Animation variants                     |

## Adding Features

### New Page

1. Add route and page in `main.wasp`
2. Create component in `src/`
3. Add to nav if needed in `src/root-components/nav.tsx`

### New Database Model

1. Add model to `schema.prisma`
2. Run `wasp db migrate-dev`
3. Create operations in `main.wasp` and implement in `src/`

### New UI Component

```bash
npx shadcn@latest add [component-name]
```

## Environment Variables

### Client (`.env.client`)

```
REACT_APP_NAME=Your App Name
```

### Server (`.env.server`)

```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Learn More

- [Wasp Documentation](https://wasp-lang.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Motion](https://motion.dev)
- [Phosphor Icons](https://phosphoricons.com)

## License

MIT License - use this in your own projects!
