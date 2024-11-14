import {
  LoginForm,
  SignupForm,
  VerifyEmailForm,
  ForgotPasswordForm,
  ResetPasswordForm,
} from 'wasp/client/auth'
import { Link } from 'react-router-dom'
import './auth.css'
import rokeLogo from '../static/roke-logomark.svg'

import type { CustomizationOptions } from "wasp/client/auth";

export const authAppearance: CustomizationOptions["appearance"] = {
  colors: {
    brand: "hsl(var(--brand-primary))",
    brandAccent: "hsl(var(--brand-accent))",
    submitButtonText: "hsl(var(--brand-primary-foreground))",
  },
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl pt-12 py-24 2xl:py-48 flex flex-col px-12 sm:px-0 font-sans animate-in fade-in">
      {children}
    </div>
  )
}

export function Login() {
  return (
    <Layout>
      <div className="login">
        <LoginForm logo={rokeLogo} appearance={authAppearance} />
      </div>
      <br />
      <span className="text-sm font-medium login-text">
        Don't have an account yet? <Link to="/signup" className="underline">go to signup</Link>.
      </span>
      <br />
      <span className="text-sm font-medium login-text">
        Forgot your password? <Link to="/request-password-reset" className="underline">reset it</Link>.
      </span>
    </Layout>
  )
}

export function Signup() {
  return (
    <Layout>
      <div className="login">
        <SignupForm logo={rokeLogo} appearance={authAppearance} />
      </div>
      <br />
      <span className="text-sm font-medium login-text">
        I already have an account (<Link to="/login" className="underline">go to login</Link>).
      </span>
    </Layout>
  )
}

export function EmailVerification() {
  return (
    <Layout>
      <div className="login">
        <VerifyEmailForm logo={rokeLogo} appearance={authAppearance} />
      </div>
      <br />
      <span className="text-sm font-medium login-text">
        If everything is okay, <Link to="/login" className="underline">go to login</Link>
      </span>
    </Layout>
  )
}

export function RequestPasswordReset() {
  return (
    <Layout>
      <div className="login">
        <ForgotPasswordForm logo={rokeLogo} appearance={authAppearance} />
      </div>
    </Layout>
  )
}

export function PasswordReset() {
  return (
    <Layout>
      <ResetPasswordForm logo={rokeLogo} appearance={authAppearance} />
      <br />
      <span className="text-sm font-medium login-text">
        If everything is okay, <Link to="/login" className="underline">go to login</Link>
      </span>
    </Layout>
  )
}
