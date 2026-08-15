"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import dbConnect from "./db"
import { Project, Skill, Education, Contact, Stats } from "./models"
import { seedDatabase } from "./db-seed"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development"

export async function isAuth() {
  const token = cookies().get("admin-token")?.value
  if (!token) return false
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string }
    const expectedUsername = process.env.ADMIN_USERNAME || "admin"
    return decoded?.username === expectedUsername
  } catch (e) {
    return false
  }
}

export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get("username")?.toString()
  const password = formData.get("password")?.toString()
  
  const expectedUsername = process.env.ADMIN_USERNAME || "admin"
  const expectedPassword = process.env.ADMIN_PASSWORD || "Saptak@2026"
  
  if (username === expectedUsername && password === expectedPassword) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" })
    cookies().set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })
    return { success: true }
  }
  
  return { error: "Invalid username or password" }
}

export async function logoutAdmin() {
  cookies().delete("admin-token")
  return { success: true }
}

export async function getPortfolioData() {
  await dbConnect()
  await seedDatabase()
  
  const projects = await Project.find({}).sort({ createdAt: 1 })
  const skills = await Skill.find({}).sort({ name: 1 })
  const education = await Education.find({}).sort({ createdAt: 1 })
  
  return {
    projects: JSON.parse(JSON.stringify(projects)),
    skills: JSON.parse(JSON.stringify(skills.map((s: any) => s.name))),
    education: JSON.parse(JSON.stringify(education))
  }
}

export async function createContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  await dbConnect()
  const msg = new Contact(data)
  await msg.save()
  return { success: true }
}

export async function createProject(data: any) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  const newProj = new Project(data)
  await newProj.save()
  return { success: true, project: JSON.parse(JSON.stringify(newProj)) }
}

export async function updateProject(id: string, data: any) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  const updatedProj = await Project.findByIdAndUpdate(id, data, { new: true })
  return { success: true, project: JSON.parse(JSON.stringify(updatedProj)) }
}

export async function deleteProject(id: string) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  await Project.findByIdAndDelete(id)
  return { success: true }
}

export async function addSkill(name: string) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  const newSkill = new Skill({ name })
  await newSkill.save()
  return { success: true }
}

export async function deleteSkillByName(name: string) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  await Skill.findOneAndDelete({ name })
  return { success: true }
}

export async function createEducation(data: any) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  const newEdu = new Education(data)
  await newEdu.save()
  return { success: true }
}

export async function updateEducation(id: string, data: any) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  await Education.findByIdAndUpdate(id, data)
  return { success: true }
}

export async function deleteEducation(id: string) {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  await Education.findByIdAndDelete(id)
  return { success: true }
}

export async function getAnalyticsData() {
  if (!(await isAuth())) throw new Error("Unauthorized")
  await dbConnect()
  
  let stats = await Stats.findOne({ key: "analytics" })
  if (!stats) {
    stats = new Stats({ key: "analytics", totalViews: 0, uniqueViews: 0, countries: {}, projectClicks: {} })
    await stats.save()
  }
  
  const messages = await Contact.find({}).sort({ createdAt: -1 })
  
  const countryData = []
  if (stats.countries) {
    for (const [country, count] of stats.countries.entries()) {
      countryData.push({ name: country, value: count })
    }
  }
  
  const dbProjects = await Project.find({}).sort({ views: -1 })
  const projectViews = dbProjects.map((p: any) => ({
    title: p.title,
    views: p.views || 0,
  }))
  
  return {
    totalViews: stats.totalViews || 0,
    uniqueViews: stats.uniqueViews || 0,
    countries: countryData,
    projectViews,
    messages: JSON.parse(JSON.stringify(messages)),
  }
}
