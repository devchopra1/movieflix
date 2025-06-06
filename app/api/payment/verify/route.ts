import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import crypto from "crypto"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { env } from "@/app/env"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = await request.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", env.RAZORPAY_KEY_SECRET).update(body).digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Save subscription to database
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        planId,
        status: "active",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    })

    return NextResponse.json({
      success: true,
      subscription,
      message: "Payment verified and subscription activated",
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
