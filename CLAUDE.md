# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

Roke is a Wasp starter template with shadcn/ui components, Motion animations,
and TypeScript support. It uses Wasp ^0.19.x as the full-stack framework.

## Development Commands

```bash
# Start database (required first)
wasp db start

# Run migrations
wasp db migrate-dev

# Start development server
wasp start

# Format code
npm run format
```

## Architecture

### Wasp Configuration

- `main.wasp` - Central configuration for routes, pages, actions, queries, and
  APIs
- `schema.prisma` - Database entities (Prisma models)
- Always define operations in `main.wasp` first, then implement in feature's
  `operations.ts`

### Feature-Based Structure

```
src/
├── auth/              # Authentication pages and logic
├── landing/           # Landing page
├── payment/           # Stripe integration
│   └── stripe/        # Stripe operations, webhooks, service
├── root-components/   # Global components (nav, footer, theme)
├── client/components/ui/  # shadcn/ui components
├── motion/            # Motion animation config and components
├── hooks/             # Custom React hooks
└── lib/               # Utilities and setup
```

Each feature folder typically contains:

- `FeaturePage.tsx` - Page components
- `operations.ts` - Actions and queries
- `components/` - Feature-specific components

### Creating New Operations

When adding new queries/actions:

1. Define in `main.wasp` first:

```wasp
query getSomething {
  fn: import { getSomething } from "@src/feature/operations",
  entities: [Entity1, Entity2]
}
```

2. Implement in `feature/operations.ts`:

```typescript
import { HttpError } from 'wasp/server'
import type { GetSomething } from 'wasp/server/operations'

export const getSomething = (async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized')
  }

  return context.entities.Something.findMany()
}) satisfies GetSomething

// Export response type for components
export type GetSomethingResponse = Awaited<ReturnType<typeof getSomething>>
```

**Critical points:**

- Use `satisfies GetSomething` pattern (not `GetSomething = async`)
- Export response type with `Awaited<ReturnType<...>>` for component props
- Include authorization checks when needed

### Wasp Conventions

- Add new entities to `schema.prisma`, not `main.wasp`
- Store operations in `feature/operations.ts` files
- Use Wasp's `Link` component for internal navigation
- Organize by features, not technical layers

## Key Conventions

### Imports

- Wasp: `import { Entity } from 'wasp/entities'`,
  `import { type Op } from 'wasp/server/operations'`
- Motion: `import { motion } from 'motion/react'` (not framer-motion)
- React hooks directly: `import { useState } from 'react'` (no React default
  import)
- Use relative imports in src (no @ alias)

### Styling

- Tailwind CSS with semantic color naming (e.g., `text-destructive` not
  `text-red-500`)
- Icons: `@phosphor-icons/react`
- Mobile-first approach

### Forms

- React Hook Form with Zod validation
- shadcn/ui Form components

### Code Style

- No semicolons, single quotes, JSX single quotes
- No comments unless describing complex logic
- Dependencies via `npm install` (not in main.wasp)

### Database Changes

- Forward-only migrations (never rename fields directly)
- Run `wasp db migrate-dev` after schema.prisma changes
