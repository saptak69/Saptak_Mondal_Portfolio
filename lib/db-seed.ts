 import dbConnect from "./db"
import { Project, Skill, Education } from "./models"

const defaultProjects = [
  {
    title: "Mangrove",
    description: "A premium fashion brand streetwear e-commerce platform featuring high-fidelity animations, catalog filtering, responsive design, and cart functionality.",
    technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Render"],
    liveUrl: "https://mangrove-9jdw.onrender.com/",
    repoUrl: "https://github.com/saptak69",
  },
  {
    title: "PlotHole",
    description: "A modern movie review and discovery platform integrating third-party movie database APIs, advanced search/filter, and a responsive glassmorphic UI.",
    technologies: ["React", "Tailwind CSS", "REST API", "Vercel"],
    liveUrl: "https://plot-hole.vercel.app/",
    repoUrl: "https://github.com/saptak69",
  },
  {
    title: "PennyWise",
    description: "A premium, brutalist-inspired expense tracker and budget management dashboard featuring detailed analytics, interactive charts, and secure multi-role access.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "JWT", "REST API", "Recharts"],
    liveUrl: "https://pennywise-m0y1zivhb-saptaks-projects.vercel.app/login",
    repoUrl: "https://github.com/saptak69",
  },
  {
    title: "Nexus",
    description: "A low-latency real-time chat application powered by WebSockets, featuring an interactive messaging interface, user presence, and robust authentication.",
    technologies: ["React", "Node.js", "Express.js", "WebSockets", "Supabase", "Vercel"],
    liveUrl: "https://nexus-chat-iota-dun.vercel.app/",
    repoUrl: "https://github.com/saptak69",
  },
  {
    title: "ML Disease Prediction",
    description: "Final year engineering major project executing predictive analytics for disease detection and automated medicine recommendations using Machine Learning models.",
    technologies: ["Python", "Machine Learning", "Java", "REST API", "Healthcare AI"],
    liveUrl: "#",
    repoUrl: "https://github.com/saptak69",
  },
  {
    title: "Automated Java Release Pipeline",
    description: "A fully automated build and release pipeline for Java applications implementing DevOps workflows, CI/CD concepts, Maven automation, and automated containerization.",
    technologies: ["Java", "Maven", "Git", "CI/CD", "Docker", "DevOps"],
    liveUrl: "#",
    repoUrl: "https://github.com/saptak69",
  }
]

const defaultSkills = [
  "Java", "JavaScript", "Python", "C", "SQL",
  "React", "HTML5", "CSS3", "Tailwind CSS", "Vite",
  "Spring Boot", "Node.js", "Express.js", "PostgreSQL", "MySQL", "Supabase",
  "Git", "GitHub", "Maven", "Docker", "Redis",
  "Spring Security", "Microservices", "System Design"
]

const defaultEducation = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Guru Nanak Institute of Technology",
    period: "2022 - 2026",
    details: "Graduated (Recently completed). Relevant Coursework: Data Structures, Algorithms, DBMS, OOPs, OS, Computer Networks, Software Engineering, Machine Learning.",
  },
  {
    degree: "Class 12 (Higher Secondary)",
    institution: "Hindu School",
    score: "75%",
  },
  {
    degree: "Class 10 (Secondary)",
    institution: "The Scottish Church Collegiate School",
    score: "88%",
  }
]

let isDatabaseSeeded = false

export async function seedDatabase() {
  if (isDatabaseSeeded) return
  await dbConnect()
  
  const firstDoc = await Project.findOne({})
  if (!firstDoc || firstDoc.title !== "Mangrove") {
    await Project.deleteMany({})
    await Project.insertMany(defaultProjects)
    const skillsToInsert = defaultSkills.map(name => ({ name, category: "General" }))
    await Skill.deleteMany({})
    await Skill.insertMany(skillsToInsert)
    console.log("Seeded skills successfully!")
  }
  
  const eduCount = await Education.countDocuments()
  const hasOldEdu = await Education.findOne({ details: "Currently in Final Year, 7th Semester." })
  
  if (eduCount === 0 || hasOldEdu) {
    await Education.deleteMany({})
    await Education.insertMany(defaultEducation)
    console.log("Seeded education successfully!")
  }
  
  isDatabaseSeeded = true
}
