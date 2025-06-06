import { NextResponse } from "next/server"
import { resendApi } from "@/lib/resend"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Send email to support team
    await resendApi.sendEmail({
      to: "support@movieflix.com", // Replace with your actual support email
      from: "MovieFlix Contact <contact@movieflix.com>",
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This email was sent from the MovieFlix contact form.
          </p>
        </div>
      `,
    })

    // Send confirmation email to user
    await resendApi.sendEmail({
      to: email,
      from: "MovieFlix Support <support@movieflix.com>",
      subject: "We received your message!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626; text-align: center;">Thank you for contacting us!</h1>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          <p>In the meantime, feel free to explore our movie collection!</p>
          <p style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Browse Movies
            </a>
          </p>
          <p>Best regards,<br>The MovieFlix Team</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Error sending contact form:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message",
      },
      { status: 500 },
    )
  }
}
