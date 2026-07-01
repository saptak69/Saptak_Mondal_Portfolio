import mongoose, { Schema } from "mongoose"

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], default: [] },
  liveUrl: { type: String, default: "#" },
  repoUrl: { type: String, default: "#" },
  views: { type: Number, default: 0 }
}, { timestamps: true })

const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, default: "General" }
}, { timestamps: true })

const EducationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String },
  score: { type: String },
  details: { type: String }
}, { timestamps: true })

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: "" },
  message: { type: String, required: true },
}, { timestamps: true })

const VisitorLogSchema = new Schema({
  ipHash: { type: String, required: true },
  country: { type: String, default: "Unknown" },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true })

const StatsSchema = new Schema({
  key: { type: String, default: "analytics" },
  totalViews: { type: Number, default: 0 },
  uniqueViews: { type: Number, default: 0 },
  countries: { type: Map, of: Number, default: {} },
  projectClicks: { type: Map, of: Number, default: {} }
}, { timestamps: true })

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema)
export const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema)
export const Education = mongoose.models.Education || mongoose.model("Education", EducationSchema)
export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema)
export const VisitorLog = mongoose.models.VisitorLog || mongoose.model("VisitorLog", VisitorLogSchema)
export const Stats = mongoose.models.Stats || mongoose.model("Stats", StatsSchema)
