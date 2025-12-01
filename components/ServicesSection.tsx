'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, Code2, TrendingUp, Brain, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

const services: Service[] = [
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Transform raw data into actionable insights with advanced analytics, machine learning models, and predictive algorithms.',
    icon: <BarChart3 className="w-12 h-12" strokeWidth={1.5} />,
    href: '/services#data-science'
  },
  {
    id: 'full-stack',
    title: 'Full Stack',
    description: 'End-to-end web and mobile applications with modern frameworks, scalable architecture, and seamless user experiences.',
    icon: <Code2 className="w-12 h-12" strokeWidth={1.5} />,
    href: '/services#full-stack'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Comprehensive data analysis, visualization, and reporting solutions to help you make informed business decisions.',
    icon: <TrendingUp className="w-12 h-12" strokeWidth={1.5} />,
    href: '/services#data-analytics'
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Engineering',
    description: 'Custom AI and machine learning solutions designed to automate processes and enhance business intelligence.',
    icon: <Brain className="w-12 h-12" strokeWidth={1.5} />,
    href: '/services#ai-ml'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Intelligent autonomous agents that can perform complex tasks, make decisions, and interact with users naturally.',
    icon: <Sparkles className="w-12 h-12" strokeWidth={1.5} />,
    href: '/services#ai-agents'
  }
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service cards animation
      gsap.from(cardsRef.current, {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      // Hover animations for cards
      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              duration: 0.3,
              scale: 1.05,
              y: -10,
              rotationY: 5,
              ease: 'power2.out'
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              duration: 0.3,
              scale: 1,
              y: 0,
              rotationY: 0,
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
            <span className="text-white">Our</span>
            <span className="text-highlight-gold"> Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to drive your business forward
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="service-card group glass-card p-8 hover:border-highlight-gold/50 transition-all duration-700 card-hover shadow-xl hover:shadow-2xl hover:shadow-highlight-gold/10"
            >
              <div className="text-accent-blue mb-6 group-hover:text-highlight-gold transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-highlight-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>
              <Link 
                href={service.href} 
                className="inline-flex items-center text-highlight-gold font-semibold hover:text-white transition-all duration-300 group-hover:translate-x-2"
              >
                Learn More 
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
