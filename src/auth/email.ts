import {
  GetPasswordResetEmailContentFn,
  GetVerificationEmailContentFn,
} from 'wasp/server/auth'

export const getVerificationEmailContent: GetVerificationEmailContentFn = ({
  verificationLink,
}) => ({
  subject: 'Welcome to Roke - Verify Your Email',
  text: `Welcome to Roke! Please verify your email by clicking this link: ${verificationLink}`,
  html: `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background-color: #1e1e1e; width: 100%;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1e1e1e" style="width: 100%; background-color: #1e1e1e;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%;">
                <tr>
                  <td style="padding-bottom: 40px;">
                    <h1 style="color: #faf6f1; font-family: Arial, sans-serif; font-size: 48px; margin: 0; font-weight: normal;">Roke</h1>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#2e2e2e" style="padding: 24px; border-radius: 2px;">
                    <p style="color: #faf6f1; font-family: Arial, sans-serif; font-size: 16px; margin: 0 0 24px 0; line-height: 1.5;">
                      Thanks for signing up! Please verify your email address to get started.
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td bgcolor="#7d9bc1" style="border-radius: 2px;">
                          <a href="${verificationLink}"
                             style="display: inline-block; padding: 12px 24px; color: #1e1e1e; font-family: Arial, sans-serif; font-size: 16px; text-decoration: none; font-weight: bold;">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #a3a3a3; font-family: Arial, sans-serif; font-size: 14px; margin: 24px 0 0 0; line-height: 1.5;">
                      If you didn't create an account with Roke, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <p style="color: #a3a3a3; font-family: Arial, sans-serif; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} Roke. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
})

export const getPasswordResetEmailContent: GetPasswordResetEmailContentFn = ({
  passwordResetLink,
}) => ({
  subject: 'Reset Your Roke Password',
  text: `Reset your Roke password by clicking this link: ${passwordResetLink}`,
  html: `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background-color: #1e1e1e; width: 100%;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#1e1e1e" style="width: 100%; background-color: #1e1e1e;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%;">
                <tr>
                  <td style="padding-bottom: 40px;">
                    <h1 style="color: #faf6f1; font-family: Arial, sans-serif; font-size: 48px; margin: 0; font-weight: normal;">Roke</h1>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#2e2e2e" style="padding: 24px; border-radius: 2px;">
                    <p style="color: #faf6f1; font-family: Arial, sans-serif; font-size: 16px; margin: 0 0 24px 0; line-height: 1.5;">
                      We received a request to reset your Roke password. Click the button below to choose a new password.
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td bgcolor="#7d9bc1" style="border-radius: 2px;">
                          <a href="${passwordResetLink}"
                             style="display: inline-block; padding: 12px 24px; color: #1e1e1e; font-family: Arial, sans-serif; font-size: 16px; text-decoration: none; font-weight: bold;">
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #a3a3a3; font-family: Arial, sans-serif; font-size: 14px; margin: 24px 0 0 0; line-height: 1.5;">
                      If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <p style="color: #a3a3a3; font-family: Arial, sans-serif; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} Roke. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
})
