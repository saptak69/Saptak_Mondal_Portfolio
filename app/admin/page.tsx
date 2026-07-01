import { isAuth, getPortfolioData, getAnalyticsData } from "@/lib/actions"
import AdminDashboardClient from "./admin-client"
import AdminLoginClient from "./admin-login"

export const revalidate = 0

export default async function AdminPage() {
  const authenticated = await isAuth()
  
  if (!authenticated) {
    return <AdminLoginClient />
  }
  
  const portfolioData = await getPortfolioData()
  const analyticsData = await getAnalyticsData()
  
  return (
    <AdminDashboardClient 
      initialPortfolio={portfolioData}
      initialAnalytics={analyticsData}
    />
  )
}
