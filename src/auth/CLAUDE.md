# Auth Module

Email-based authentication with verification and password reset flows.

## Files

- `auth.tsx` - Page components (Login, Signup, EmailVerification, PasswordReset)
- `auth.css` - Custom styles for auth forms
- `email.ts` - Email templates for verification and password reset
- `user-signup-fields.ts` - Custom signup field configuration

## How It Works

Wasp handles auth logic automatically. This module provides:

1. UI components wrapping Wasp's built-in forms
2. Custom email templates with branded HTML
3. Shared layout and styling

## Customization

### Branding

- Update email templates in `email.ts` (search for "Roke" to replace)
- Modify colors via `authAppearance` in `auth.tsx`
- Change the logo icon (currently MountainsIcon from Phosphor)

### Auth Methods

To add OAuth (Google, GitHub, etc.), update `main.wasp`:

```wasp
auth: {
  methods: {
    google: {},  // Add OAuth providers here
    email: { ... }
  }
}
```

### Email Provider

Currently uses `Dummy` provider (logs to console). For production, update
`main.wasp`:

```wasp
emailSender: {
  provider: SendGrid,  // or Mailgun, SMTP
}
```

## Routes

| Route                     | Page                     | Auth Required |
| ------------------------- | ------------------------ | ------------- |
| `/login`                  | LoginPage                | No            |
| `/signup`                 | SignupPage               | No            |
| `/email-verification`     | EmailVerificationPage    | No            |
| `/request-password-reset` | RequestPasswordResetPage | No            |
| `/password-reset`         | PasswordResetPage        | No            |
