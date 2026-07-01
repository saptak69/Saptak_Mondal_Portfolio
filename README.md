# Saptak Mondal | Interactive Portfolio & Music Console

A premium, brutalist-inspired personal portfolio and progressive music player console built with **Next.js 14**, **React 18**, **Tailwind CSS**, and **MongoDB/Mongoose**. 

🔗 **New Repository**: [saptak69/Saptak_Mondal_Portfolio](https://github.com/saptak69/Saptak_Mondal_Portfolio)

---

## ⚡ Key Architectural Features

1. **🎭 Rotating Typography Hero**: Cycles dynamically through engineering and product focus tags: *Full Stack Developer, Software Engineer, Computer Science Engineer, UI/UX Enthusiast, and Product Builder*.
2. **📈 Monochromatic ASCII Layout Schematics**: Each project card features a custom, hover-activated visual mockup (storefront grids for *Mangrove*, bar charts for *PennyWise*, poster cards for *PlotHole*, WebSocket message logs for *Nexus*, Docker builds for *Automated Pipelines*, and diagnosis telemetry for *ML Prediction*).
3. **🎵 Progressive Rock Music Module**: Interactive audio player console featuring Dream Theater arrangements, simulated bouncing visualizer soundwaves, Youtube direct streaming, and Instagram covers telemetry.
4. **🎓 Timeline Academics & Credentials**: Vertical timeline displaying graduation status, coursework, and Coursera/NPTEL certificates in a custom-engineered, monochromatic card format.
5. **📊 Database Seeding & Fallback**: Embedded Mongoose loader that dynamically updates database fields on start, complete with robust local JSON fallback variables in case of database connection issues.
6. **🔒 Secure SysAdmin Console**: Private admin pathway supporting JWT cookies, credentials matching, and live database administration for projects, skills, education tracking, and contact message aggregation.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide-React Icons
* **Backend**: Next.js Server Actions, Next.js API Routes, JSON Web Tokens (JWT)
* **Database**: MongoDB Atlas, Mongoose ODM
* **Deployment**: Vercel (Frontend), Render (Live Projects)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/saptak69/Saptak_Mondal_Portfolio.git
cd Saptak_Mondal_Portfolio
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### 3. Install Dependencies
```bash
pnpm install
# or npm install
```

### 4. Run Development Server
```bash
pnpm dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📦 Deployment on Vercel

To deploy on Vercel, link your new GitHub repository, add the environment variables in the Vercel dashboard, and click **Deploy**. The project will build automatically using the default settings.
