import fs from "fs"
import path from "path"

export function ensureMediaAssets() {
  if (typeof window !== "undefined") return

  try {
    const publicDir = path.join(process.cwd(), "public")
    const heroDir = path.join(publicDir, "media/hero")

    if (!fs.existsSync(heroDir)) {
      fs.mkdirSync(heroDir, { recursive: true })
    }

    // Ensure placeholder-user.jpg (Saptak's photo) is synced as the hero portrait
    const userPhoto = path.join(publicDir, "placeholder-user.jpg")
    const heroDstJpg = path.join(heroDir, "saptak-portrait.jpg")
    const heroDstWebp = path.join(heroDir, "saptak-portrait.webp")

    if (fs.existsSync(userPhoto)) {
      fs.copyFileSync(userPhoto, heroDstJpg)
      fs.copyFileSync(userPhoto, heroDstWebp)
    }

    // Sync user uploaded photo for About Me section
    const userUploadedPhoto = "C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\d4e70c6d-d0f8-4d38-91f3-4f1861eaf1fe\\.user_uploaded\\media_1786789244484.jpg"
    const aboutMediaDir = path.join(publicDir, "media", "about")
    if (!fs.existsSync(aboutMediaDir)) {
      fs.mkdirSync(aboutMediaDir, { recursive: true })
    }
    const aboutDstJpg = path.join(aboutMediaDir, "saptak-about.jpg")
    if (fs.existsSync(userUploadedPhoto)) {
      fs.copyFileSync(userUploadedPhoto, aboutDstJpg)
    }

    // Sync user uploaded album art for Music Section
    const musicMediaDir = path.join(publicDir, "media", "music")
    if (!fs.existsSync(musicMediaDir)) {
      fs.mkdirSync(musicMediaDir, { recursive: true })
    }
    const pullMeUnderSrc = "C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\d4e70c6d-d0f8-4d38-91f3-4f1861eaf1fe\\.user_uploaded\\media_1786789861025.png"
    const metropolisSrc = "C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\d4e70c6d-d0f8-4d38-91f3-4f1861eaf1fe\\.user_uploaded\\media_1786789883177.png"
    const hailToTheKingSrc = "C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\d4e70c6d-d0f8-4d38-91f3-4f1861eaf1fe\\.user_uploaded\\media_1786789910360.png"

    if (fs.existsSync(pullMeUnderSrc)) fs.copyFileSync(pullMeUnderSrc, path.join(musicMediaDir, "pull-me-under.png"))
    if (fs.existsSync(metropolisSrc)) fs.copyFileSync(metropolisSrc, path.join(musicMediaDir, "metropolis.png"))
    if (fs.existsSync(hailToTheKingSrc)) fs.copyFileSync(hailToTheKingSrc, path.join(musicMediaDir, "hail-to-the-king.png"))

    // Ensure favicon.ico exists in public
    const faviconPath = path.join(publicDir, "favicon.ico")
    if (!fs.existsSync(faviconPath)) {
      const minimalIcoHeader = Buffer.from([
        0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x20, 0x00,
        0x68, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00, 0x28, 0x00, 0x00, 0x00, 0x01, 0x00,
        0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x11, 0x11, 0x11, 0xff, 0x00, 0x00, 0x00, 0x00
      ])
      fs.writeFileSync(faviconPath, minimalIcoHeader)
    }

    // Delete unnecessary root images except placeholder-user.jpg and favicon.ico
    const filesInPublic = fs.readdirSync(publicDir)
    filesInPublic.forEach((file) => {
      if (
        file !== "placeholder-user.jpg" &&
        file !== "favicon.ico" &&
        file !== "media" &&
        !file.startsWith(".") &&
        fs.statSync(path.join(publicDir, file)).isFile()
      ) {
        try {
          fs.unlinkSync(path.join(publicDir, file))
        } catch (e) {}
      }
    })

    // Sync captured project screenshots from brain artifact directory into public/media/projects
    const brainDir = "C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\d4e70c6d-d0f8-4d38-91f3-4f1861eaf1fe"
    const projectsMediaDir = path.join(publicDir, "media", "projects")

    if (fs.existsSync(brainDir)) {
      const brainFiles = fs.readdirSync(brainDir)
      
      const copyToProject = (filePattern: string, projectSlug: string, targetName: string) => {
        const matchingFile = brainFiles.find((f) => f.startsWith(filePattern) && f.endsWith(".png"))
        if (matchingFile) {
          const projectDir = path.join(projectsMediaDir, projectSlug)
          if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true })
          }
          const srcPath = path.join(brainDir, matchingFile)
          const dstWebp = path.join(projectDir, `${targetName}.webp`)
          const dstPng = path.join(projectDir, `${targetName}.png`)
          fs.copyFileSync(srcPath, dstWebp)
          fs.copyFileSync(srcPath, dstPng)
        }
      }

      // Sync Nexus (login page ONLY)
      copyToProject("nexus_login_page", "nexus", "hero")
      copyToProject("nexus_login_page", "nexus", "login")

      // Sync PlotHole
      copyToProject("plothole_home", "plothole", "hero")
      copyToProject("plothole_home", "plothole", "home")
      copyToProject("plothole_movie", "plothole", "movie")
      copyToProject("plothole_discussion", "plothole", "discussion")

      // Sync Pennywise
      copyToProject("pennywise_dashboard", "pennywise", "hero")
      copyToProject("pennywise_dashboard", "pennywise", "dashboard")
      copyToProject("pennywise_login", "pennywise", "login")

      // Sync Mangrove
      copyToProject("mangrove_hero", "mangrove", "hero")
      copyToProject("mangrove_catalog", "mangrove", "catalog")
      copyToProject("mangrove_feature", "mangrove", "feature")

      // Sync AI-generated visuals for non-deployed projects (MedFinder & Release Pipeline)
      const copyAiImage = (filePattern: string, projectSlug: string) => {
        const matchingFile = brainFiles.find((f) => f.startsWith(filePattern) && (f.endsWith(".jpg") || f.endsWith(".png")))
        if (matchingFile) {
          const projectDir = path.join(projectsMediaDir, projectSlug)
          if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true })
          }
          const srcPath = path.join(brainDir, matchingFile)
          fs.copyFileSync(srcPath, path.join(projectDir, "hero.webp"))
          fs.copyFileSync(srcPath, path.join(projectDir, "hero.png"))
          fs.copyFileSync(srcPath, path.join(projectDir, "hero.jpg"))
        }
      }

      copyAiImage("medfinder_hero", "medfinder")
      copyAiImage("release_pipeline_hero_ai", "release-pipeline")
    }

    // Unconditionally ensure medfinder and release-pipeline directories and hero images exist
    ;["medfinder", "release-pipeline"].forEach((slug) => {
      const dir = path.join(projectsMediaDir, slug)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      const targetWebp = path.join(dir, "hero.webp")
      const plotholeWebp = path.join(projectsMediaDir, "plothole", "hero.webp")
      const plotholePng = path.join(projectsMediaDir, "plothole", "hero.png")

      if (!fs.existsSync(targetWebp) && fs.existsSync(plotholeWebp)) {
        fs.copyFileSync(plotholeWebp, targetWebp)
        fs.copyFileSync(plotholePng, path.join(dir, "hero.png"))
      }
    })
  } catch (err) {
    console.error("ensureMediaAssets error:", err)
  }
}

// Immediately invoke on server load
ensureMediaAssets()


