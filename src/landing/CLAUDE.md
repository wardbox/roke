# Landing Module

Your app's home page. This is a placeholder - replace with your own content.

## Files

- `LandingPage.tsx` - Main landing page component

## Structure

The current placeholder has:

- Hero section with app name
- Subscribe CTA button

## Customization

Replace the placeholder content with your own:

```tsx
export default function Landing() {
  return (
    <div className='flex flex-col gap-12'>
      {/* Hero - Your value proposition */}
      <section id='hero'>
        <h1>Your App Name</h1>
        <p>Your tagline here</p>
      </section>

      {/* Features - What you offer */}
      <section id='features'>{/* Add feature cards */}</section>

      {/* CTA - Drive signups */}
      <section id='cta'>
        <Button>
          <Link to='/signup'>Get Started</Link>
        </Button>
      </section>
    </div>
  )
}
```

## Tips

- Use Motion animations for polish (see `src/motion/CLAUDE.md`)
- Use shadcn/ui Card components for feature sections
- Keep mobile-first: test on small screens
- The nav and footer are handled by RootPage, focus on content
