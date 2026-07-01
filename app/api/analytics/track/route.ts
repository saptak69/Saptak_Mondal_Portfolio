import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { VisitorLog, Stats } from "@/lib/models"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json().catch(() => ({}))
    
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
               request.headers.get("x-real-ip") ||
               "127.0.0.1";
               
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex")
    
    let country = request.headers.get("x-vercel-ip-country") || 
                  request.headers.get("cf-ipcountry") || 
                  "Unknown";
                  
    if (country === "Unknown" && (ip === "127.0.0.1" || ip === "::1")) {
      country = "India (Local)"
    }
    
    const userAgent = request.headers.get("user-agent") || ""
    
    // Log this visit
    const log = new VisitorLog({ ipHash, country, userAgent })
    await log.save()
    
    // Check if this IP hashed visitor has visited in the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentVisitsCount = await VisitorLog.countDocuments({
      ipHash,
      createdAt: { $gte: twentyFourHoursAgo }
    })
    
    const isUnique = recentVisitsCount <= 1 // First time in 24 hours (we just saved this one)
    
    // Update Stats
    let stats = await Stats.findOne({ key: "analytics" })
    if (!stats) {
      stats = new Stats({ key: "analytics", totalViews: 0, uniqueViews: 0, countries: {}, projectClicks: {} })
    }
    
    stats.totalViews = (stats.totalViews || 0) + 1
    if (isUnique) {
      stats.uniqueViews = (stats.uniqueViews || 0) + 1
      
      // Update countries Map
      const currentCountryCount = stats.countries.get(country) || 0
      stats.countries.set(country, currentCountryCount + 1)
    }
    
    await stats.save()
    
    return NextResponse.json({ success: true, isUnique })
  } catch (e: any) {
    console.error("Tracking Error:", e)
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
