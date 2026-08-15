import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saptak Mondal — Creative Technologist & Software Engineer',
  description: 'Portfolio of Saptak Mondal: B.Tech Computer Science graduate, software engineer, and musician building digital experiences where engineering meets curiosity.',
  keywords: [
    'Saptak Mondal',
    'Creative Technologist',
    'Software Engineer',
    'Full Stack Developer',
    'Java Spring Boot',
    'React Next.js',
    'Interactive Portfolio',
    'Kolkata'
  ],
  authors: [{ name: 'Saptak Mondal' }],
  creator: 'Saptak Mondal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saptakmondal.com',
    title: 'Saptak Mondal — Creative Technologist & Software Engineer',
    description: 'B.Tech Computer Science graduate, software engineer, and musician building digital experiences where engineering meets curiosity.',
    siteName: 'Saptak Mondal Archive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saptak Mondal — Creative Technologist & Software Engineer',
    description: 'B.Tech Computer Science graduate, software engineer, and musician building digital experiences where engineering meets curiosity.',
  },
}

export const viewport: Viewport = {
  themeColor: '#fbfaf7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className="bg-[#fbfaf7] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#ffffff]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
