# Root Components

Global layout components that wrap every page.

## Files

- `nav.tsx` - Navigation bar (desktop dropdown + mobile sheet)
- `footer.tsx` - Page footer with links
- `theme-provider.tsx` - Dark/light mode context
- `toast.tsx` - Toast notification hook
- `toaster.tsx` - Toast container component
- `scroll-to-top.tsx` - Floating scroll-to-top button
- `transition-playground.tsx` - Dev tool for testing animations (bottom-right
  corner)

## Layout Structure

RootPage (`src/RootPage.tsx`) wraps all pages:

```
ThemeProvider
  MotionProvider
    Nav
    <main>{children}</main>
    Footer
    Toaster
    ScrollToTop
    TransitionPlayground (desktop only)
```

## Nav Customization

### Add Nav Links

In `nav.tsx`, add to the desktop nav section:

```tsx
<Link to='/your-route' className={cn(...)}>
  Your Page
</Link>
```

And mirror in mobile Sheet.

### Change Logo

Replace `MountainsIcon` with your icon or image:

```tsx
<YourLogoIcon size={24} />
```

### App Name

Set via environment variable:

```env
REACT_APP_NAME=Your App
```

Falls back to "Roke" if not set.

## Theme

Uses next-themes under the hood. Default is dark mode.

Toggle component: `mode-toggle.tsx`

Access theme in components:

```tsx
import { useTheme } from '../root-components/theme-provider'
const { theme, setTheme } = useTheme()
```

## Toasts

Show notifications:

```tsx
import { toast } from '../root-components/toast'

toast({ title: 'Success!', description: 'It worked.' })
toast({ title: 'Error', variant: 'destructive' })
```

## Footer Customization

Update links and social icons in `footer.tsx`. Currently points to:

- GitHub (wardbox/roke)
- Twitter (@ward_box)

Replace with your own links.
