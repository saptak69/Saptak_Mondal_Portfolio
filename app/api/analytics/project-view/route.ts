import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Project } from "@/lib/models"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { projectId } = await request.json()
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 })
    }
    
    await Project.findByIdAndUpdate(projectId, { $inc: { views: 1 } })
    
    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error("Project click track error:", e)
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
