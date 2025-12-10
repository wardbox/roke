# UI Components

shadcn/ui components with Tailwind CSS styling.

## Files

- `ui/button.tsx` - Button with variants (default, destructive, outline, ghost,
  link)
- `ui/card.tsx` - Card container (Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter)
- `ui/dropdown-menu.tsx` - Dropdown menus (used in nav)
- `ui/sheet.tsx` - Slide-out panel (mobile menu)
- `ui/label.tsx` - Form labels
- `ui/skeleton.tsx` - Loading placeholder
- `ui/slider.tsx` - Range slider
- `mode-toggle.tsx` - Dark/light theme switcher

## Usage

```tsx
import { Button } from '../client/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../client/components/ui/card'

<Button variant="outline">Click me</Button>

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Adding New Components

Use the shadcn CLI:

```bash
npx shadcn@latest add [component-name]
```

Popular components to add:

- `form` + `input` - Form handling with react-hook-form
- `dialog` - Modal dialogs
- `toast` - Toast notifications (already have toaster in root-components)
- `tabs` - Tabbed interfaces
- `table` - Data tables

## Customization

### Colors

Edit `src/index.css` CSS variables:

```css
:root {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

### Component Variants

Modify individual component files. Each uses `class-variance-authority` for
variants:

```tsx
const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: '...',
      destructive: '...',
    },
  },
})
```

## Icons

Using @phosphor-icons/react. Import and use:

```tsx
import { HouseIcon, UserIcon } from '@phosphor-icons/react'
;<HouseIcon size={24} weight='fill' />
```

Browse icons: https://phosphoricons.com
