import { NextResponse } from "next/server"
import { resendApi } from "@/lib/resend"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Send test email
    const result = await resendApi.sendEmail({
      to: email,
      from: "MovieFlix <test@movieflix.com>",
      subject: "🎬 MovieFlix Email Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc2626; text-align: center;">📧 Email Test Successful!</h1>
          <p>Congratulations! Your MovieFlix email integration is working perfectly.</p>
          <p>This test email confirms that:</p>
          <ul>
            <li>✅ Resend API is properly configured</li>
            <li>✅ Email templates are rendering correctly</li>
            <li>✅ Your API key is valid</li>
          </ul>
          <p style="text-align: center; margin-top: 30px;">
            <strong>🎉 You're all set to send emails!</strong>
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      emailId: result.id,
    })
  } catch (error) {
    console.error("Email test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send test email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
