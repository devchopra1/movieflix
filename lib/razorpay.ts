import { env } from "@/app/env"

declare global {
  interface Window {
    Razorpay: any
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: any) => void
  prefill: {
    name: string
    email: string
    contact?: string
  }
  theme: {
    color: string
  }
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 199,
    duration: "month",
    features: ["HD Streaming", "2 Devices", "Limited Downloads"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 499,
    duration: "month",
    features: ["4K Streaming", "4 Devices", "Unlimited Downloads", "Early Access"],
    popular: true,
  },
  {
    id: "family",
    name: "Family",
    price: 799,
    duration: "month",
    features: ["4K Streaming", "6 Devices", "Unlimited Downloads", "Family Profiles", "Parental Controls"],
  },
]

export const razorpayConfig = {
  keyId: env.RAZORPAY_KEY_ID,
  keySecret: env.RAZORPAY_KEY_SECRET,
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const createRazorpayOrder = async (amount: number, currency = "INR") => {
  try {
    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency }),
    })

    if (!response.ok) {
      throw new Error("Failed to create order")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw error
  }
}

export const verifyPayment = async (paymentData: any) => {
  try {
    const response = await fetch("/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error("Payment verification failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw error
  }
}
