# Import rules and conventions for the project

**Description**: Guidelines for proper imports throughout the codebase **Applies
to**: `src/**/*.{ts,tsx}`, `main.wasp`

## Wasp Imports

- Always import Wasp functions from 'wasp' package, not '@wasp' Do this:
- `import { Event } from 'wasp/entities'`
- `import { type GetEvents } from 'wasp/server/operations'`
- `import { getEvents, useQuery } from 'wasp/client/operations'`

Do not do this

- `import { ... } from '@wasp/...'`

## React Imports

- Do not import React from 'react' because it's automatically imported
- Import hooks directly from packages:

Do this:

- `import { useState } from 'react'`

Do not do this:

- `import React, { useState } from 'react'`

## Motion Imports

- Import from 'motion/react' instead of 'framer-motion' Do this:
- `import { motion } from 'motion/react'` Do not do this:
- `import { motion } from 'framer-motion'`

## General Imports

- Never use the @ alias in src code, use relative imports only
