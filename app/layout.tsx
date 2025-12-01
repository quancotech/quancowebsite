import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Quanco Technologies - Leading Tech Innovation',
  description: 'Leading provider of innovative tech services specializing in Data Science, Full Stack Development, Data Analytics, AI/ML Engineering, and AI Agents.',
  keywords: ['technology', 'data-science', 'full-stack', 'ai-ml', 'web-development', 'react', 'nextjs', 'vue', 'typescript'],
  authors: [{ name: 'Quanco Technologies' }],
  openGraph: {
    title: 'Quanco Technologies - Leading Tech Innovation',
    description: 'Leading provider of innovative tech services specializing in Data Science, Full Stack Development, Data Analytics, AI/ML Engineering, and AI Agents.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quanco Technologies - Leading Tech Innovation',
    description: 'Leading provider of innovative tech services specializing in Data Science, Full Stack Development, Data Analytics, AI/ML Engineering, and AI Agents.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <head>
        {/* GSAP CDN */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
        
        {/* Apex Charts */}
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        
        {/* Flatpickr */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"></link>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        
        {/* Swiper */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        
        {/* JsVectorMap */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/dist/css/jsvectormap.min.css"></link>
        <script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/dist/js/jsvectormap.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/dist/maps/world.js"></script>
        
        {/* Alpine.js */}
        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
      </head>
      <body className="bg-primary-bg text-white font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
