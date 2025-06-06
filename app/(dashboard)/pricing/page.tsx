"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { subscriptionPlans, loadRazorpayScript, createRazorpayOrder, verifyPayment } from "@/lib/razorpay"

export default function PricingPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (plan: any) => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    try {
      setLoadingPlan(plan.id)

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway")
      }

      // Create order
      const orderData = await createRazorpayOrder(plan.price)

      // Configure Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MovieFlix",
        description: `${plan.name} Plan Subscription`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            await verifyPayment({
              ...response,
              planId: plan.id,
            })

            toast({
              title: "Payment Successful!",
              description: `Welcome to MovieFlix ${plan.name} plan!`,
            })

            router.push("/dashboard")
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Payment Verification Failed",
              description: "Please contact support if amount was deducted.",
            })
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: () => {
            setLoadingPlan(null)
          },
        },
      }

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="container px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
          <p className="mb-8 text-xl text-gray-400">Unlock unlimited access to thousands of movies and TV shows</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? "border-red-500 shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-400">/{plan.duration}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan)}
                  disabled={loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? "Processing..." : `Subscribe to ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="mb-6 text-2xl font-bold">Why Choose MovieFlix?</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl">🎬</div>
              <h3 className="font-semibold">Huge Library</h3>
              <p className="text-sm text-gray-400">Thousands of movies and shows</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl">📱</div>
              <h3 className="font-semibold">Multi-Device</h3>
              <p className="text-sm text-gray-400">Watch on any device</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl">⚡</div>
              <h3 className="font-semibold">Fast Streaming</h3>
              <p className="text-sm text-gray-400">HD & 4K quality</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl">🚫</div>
              <h3 className="font-semibold">No Ads</h3>
              <p className="text-sm text-gray-400">Uninterrupted experience</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Secure payments powered by Razorpay • Cancel anytime • No hidden fees</p>
        </div>
      </div>
    </div>
  )
}
