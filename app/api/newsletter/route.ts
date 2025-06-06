import { NextResponse } from "next/server"
import { resendApi } from "@/lib/resend"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Send welcome newsletter email
    await resendApi.sendEmail({
      to: email,
      from: "MovieFlix Newsletter <newsletter@movieflix.com>",
      subject: "🎬 Welcome to MovieFlix Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626; text-align: center;">Welcome to MovieFlix Newsletter! 🎬</h1>
          <p>Thank you for subscribing to our newsletter!</p>
          <p>You'll now receive:</p>
          <ul>
            <li>🎥 New movie releases and recommendations</li>
            <li>🔥 Trending content updates</li>
            <li>✨ Platform feature announcements</li>
            <li>🎁 Exclusive content and early access</li>
          </ul>
          <p style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Start Watching Now
            </a>
          </p>
          <p>Happy watching!</p>
          <p>The MovieFlix Team</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            You can unsubscribe at any time by replying to this email.
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to subscribe to newsletter",
      },
      { status: 500 },
    )
  }
}
