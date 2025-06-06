import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Mock signup - in real app, this would create user in database
    const mockUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      image: null,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      user: mockUser,
      message: "Account created successfully!",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "Failed to create account" }, { status: 500 })
  }
}
