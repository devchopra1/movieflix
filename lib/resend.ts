import { env } from "@/app/env"

const RESEND_API_KEY = env.RESEND_API_KEY
const RESEND_BASE_URL = "https://api.resend.com"

export interface EmailData {
  to: string | string[]
  from: string
  subject: string
  html?: string
  text?: string
}

export const resendApi = {
  sendEmail: async (emailData: EmailData) => {
    try {
      const response = await fetch(`${RESEND_BASE_URL}/emails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...emailData,
          from: emailData.from || "MovieFlix <noreply@movieflix.com>",
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Resend API error: ${error.message}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending email:", error)
      throw error
    }
  },

  sendWelcomeEmail: async (userEmail: string, userName: string) => {
    return resendApi.sendEmail({
      to: userEmail,
      from: "MovieFlix <welcome@movieflix.com>",
      subject: "Welcome to MovieFlix! 🎬",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626; text-align: center;">Welcome to MovieFlix!</h1>
          <p>Hi ${userName},</p>
          <p>Thank you for joining MovieFlix! We're excited to have you as part of our community.</p>
          <p>You now have access to:</p>
          <ul>
            <li>🎬 Thousands of movies and TV shows</li>
            <li>📱 Streaming on any device</li>
            <li>💾 Personal watchlist and viewing history</li>
            <li>🔍 Advanced search and discovery</li>
          </ul>
          <p style="text-align: center;">
            <a href="${env.NEXTAUTH_URL}/dashboard" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Start Watching Now
            </a>
          </p>
          <p>Happy watching!</p>
          <p>The MovieFlix Team</p>
        </div>
      `,
    })
  },

  sendPasswordResetEmail: async (userEmail: string, resetLink: string) => {
    return resendApi.sendEmail({
      to: userEmail,
      from: "MovieFlix <security@movieflix.com>",
      subject: "Reset Your MovieFlix Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626; text-align: center;">Password Reset Request</h1>
          <p>You requested to reset your MovieFlix password.</p>
          <p>Click the button below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
          <p>The MovieFlix Team</p>
        </div>
      `,
    })
  },
}
