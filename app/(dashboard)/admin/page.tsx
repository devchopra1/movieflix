"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Mail, Video, BarChart3 } from "lucide-react"

export default function AdminPage() {
  const { toast } = useToast()
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const [testEmail, setTestEmail] = useState("")

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setIsLoading((prev) => ({ ...prev, [testName]: true }))
    try {
      const result = await testFunction()
      setTestResults((prev) => ({ ...prev, [testName]: { success: true, data: result } }))
      toast({
        title: `${testName} test passed!`,
        description: "Integration is working correctly.",
      })
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [testName]: { success: false, error } }))
      toast({
        variant: "destructive",
        title: `${testName} test failed`,
        description: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [testName]: false }))
    }
  }

  const testVimeoAPI = async () => {
    const response = await fetch("/api/test/vimeo")
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || "Vimeo API test failed")
    }
    return await response.json()
  }

  const testEmailAPI = async () => {
    if (!testEmail) {
      throw new Error("Please enter an email address")
    }
    const response = await fetch("/api/test/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || "Email API test failed")
    }
    return await response.json()
  }

  const testAnalytics = async () => {
    // Test if Google Analytics is loaded
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "admin_test", {
        event_category: "admin",
        event_label: "integration_test",
      })
      return { success: true, message: "Analytics event sent successfully" }
    } else {
      throw new Error("Google Analytics not loaded")
    }
  }

  const TestCard = ({
    title,
    description,
    icon: Icon,
    testName,
    testFunction,
    children,
  }: {
    title: string
    description: string
    icon: any
    testName: string
    testFunction: () => Promise<any>
    children?: React.ReactNode
  }) => {
    const result = testResults[testName]
    const loading = isLoading[testName]

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <CardTitle>{title}</CardTitle>
            {result && (
              <Badge variant={result.success ? "default" : "destructive"}>
                {result.success ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                {result.success ? "Working" : "Failed"}
              </Badge>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          <Button onClick={() => runTest(testName, testFunction)} disabled={loading} className="w-full">
            {loading ? "Testing..." : `Test ${title}`}
          </Button>
          {result && (
            <div className="mt-4 p-3 rounded-lg bg-gray-900">
              <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Test and monitor your MovieFlix integrations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TestCard
          title="Vimeo API"
          description="Test video hosting and streaming capabilities"
          icon={Video}
          testName="vimeo"
          testFunction={testVimeoAPI}
        />

        <TestCard
          title="Email Service"
          description="Test email sending with Resend API"
          icon={Mail}
          testName="email"
          testFunction={testEmailAPI}
        >
          <Input
            placeholder="Enter test email address"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            type="email"
          />
        </TestCard>

        <TestCard
          title="Google Analytics"
          description="Test analytics tracking and events"
          icon={BarChart3}
          testName="analytics"
          testFunction={testAnalytics}
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Overview of all integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {Object.values(testResults).filter((r) => r.success).length}
                </div>
                <div className="text-sm text-gray-400">Passing Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {Object.values(testResults).filter((r) => !r.success).length}
                </div>
                <div className="text-sm text-gray-400">Failed Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{Object.keys(testResults).length}</div>
                <div className="text-sm text-gray-400">Total Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
