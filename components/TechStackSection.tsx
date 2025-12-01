'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Atom, 
  Triangle, 
  Heart, 
  Shield, 
  BarChart3, 
  Map, 
  Calendar, 
  Carousel, 
  Mountain, 
  Search, 
  Sparkles, 
  Palette 
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface TechItem {
  name: string
  version: string
  icon: React.ReactNode
  description: string
}

const techStack: TechItem[] = [
  { name: 'React', version: '18.2.0', icon: <Atom className="w-6 h-6" strokeWidth={1.5} />, description: 'UI Library' },
  { name: 'Next.js', version: '14.0.0', icon: <Triangle className="w-6 h-6" strokeWidth={1.5} />, description: 'React Framework' },
  { name: 'Vue.js', version: '3.3.0', icon: <Heart className="w-6 h-6" strokeWidth={1.5} />, description: 'Progressive Framework' },
  { name: 'TypeScript', version: '5.2.0', icon: <Shield className="w-6 h-6" strokeWidth={1.5} />, description: 'Type Safety' },
  { name: 'Apex Charts', version: '3.44.0', icon: <BarChart3 className="w-6 h-6" strokeWidth={1.5} />, description: 'Data Visualization' },
  { name: 'Jsvectormap', version: '1.5.3', icon: <Map className="w-6 h-6" strokeWidth={1.5} />, description: 'Interactive Maps' },
  { name: 'Flatpickr', version: '4.6.13', icon: <Calendar className="w-6 h-6" strokeWidth={1.5} />, description: 'Date Picker' },
  { name: 'Swiper', version: '11.0.0', icon: <Carousel className="w-6 h-6" strokeWidth={1.5} />, description: 'Touch Slider' },
  { name: 'Alpine.js', version: '3.13.0', icon: <Mountain className="w-6 h-6" strokeWidth={1.5} />, description: 'Lightweight JS' },
  { name: 'ESLint', version: '8.0.0', icon: <Search className="w-6 h-6" strokeWidth={1.5} />, description: 'Code Linting' },
  { name: 'Prettier', version: '3.0.0', icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />, description: 'Code Formatting' },
  { name: 'Tailwind CSS', version: '3.3.0', icon: <Palette className="w-6 h-6" strokeWidth={1.5} />, description: 'Utility CSS' }
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const techItemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tech items animation
      gsap.from(techItemsRef.current, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      // Hover animations for tech items
      techItemsRef.current.forEach((item) => {
        if (item) {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              duration: 0.3,
              scale: 1.05,
              y: -5,
              ease: 'power2.out'
            })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              duration: 0.3,
              scale: 1,
              y: 0,
              ease: 'power2.out'
            })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-primary-bg to-accent-blue/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Modern</span>
            <span className="text-highlight-gold"> Tech Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with cutting-edge technologies for optimal performance and user experience
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => {
                if (el) techItemsRef.current[index] = el
              }}
              className="tech-item group text-center"
            >
              <div className="glass-card p-6 hover:border-highlight-gold/50 transition-all duration-300 card-hover">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{tech.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{tech.version}</p>
                <p className="text-xs text-gray-500">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href="/demo" 
            className="btn-primary"
          >
            View Interactive Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
