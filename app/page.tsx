'use client'

import { useEffect, useRef, useState } from 'react'
import { Brain, Rocket, Bot, BarChart3, Cloud, Sparkles, Calendar, Code, FileText, User, Clock, Mail, Phone, MapPin } from 'lucide-react'
import { AnimatedHero } from '@/components/AnimatedHero'
import { ServicesLogoCarousel } from '@/components/ServicesLogoCarousel'
import RuixenBentoCards from '@/components/ui/ruixen-bento-cards'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'
import { OurTeam } from '@/components/ui/testimonial'

declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
    TextPlugin: any
    Swiper: any
    flatpickr: any
  }
}

const services = [
  { 
    title: 'Data Science', 
    icon: () => <Brain className="w-8 h-8" strokeWidth={1.5} />, 
    desc: 'Transform raw data into actionable insights with advanced analytics and machine learning algorithms.', 
    color: 'from-blue-500 to-purple-600' 
  },
  { 
    title: 'Full Stack Development', 
    icon: () => <Rocket className="w-8 h-8" strokeWidth={1.5} />, 
    desc: 'End-to-end web applications with modern frameworks and scalable cloud architecture.', 
    color: 'from-green-500 to-teal-600' 
  },
  { 
    title: 'AI/ML Engineering', 
    icon: () => <Bot className="w-8 h-8" strokeWidth={1.5} />, 
    desc: 'Custom AI solutions designed to automate processes and enhance business intelligence.', 
    color: 'from-purple-500 to-pink-600' 
  },
  { 
    title: 'Data Analytics', 
    icon: () => <BarChart3 className="w-8 h-8" strokeWidth={1.5} />, 
    desc: 'Comprehensive analysis and visualization for data-driven business decisions.', 
    color: 'from-orange-500 to-red-600' 
  },
  { 
    title: 'Cloud Solutions', 
    icon: () => <Cloud className="w-8 h-8" strokeWidth={1.5} />, 
    desc: 'Scalable cloud infrastructure with automated deployment and monitoring systems.', 
    color: 'from-cyan-500 to-blue-600' 
  },
  { 
    title: 'AI Agents', 
    icon: () => <Sparkles className="w-8 h-8" strokeWidth={1.5} />, 
    desc: 'Intelligent agents that perform complex tasks and make autonomous decisions.', 
    color: 'from-yellow-500 to-orange-600' 
  }
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 2000)

    if (typeof window !== 'undefined' && window.gsap) {
      const { gsap, ScrollTrigger, TextPlugin } = window
      gsap.registerPlugin(ScrollTrigger, TextPlugin)
      
      // Register ScrollToPlugin if available
      if (window.gsap.plugins && window.gsap.plugins.ScrollToPlugin) {
        gsap.registerPlugin(window.gsap.plugins.ScrollToPlugin)
      }

      // Custom cursor
      const cursor = cursorRef.current
      if (cursor) {
        document.addEventListener('mousemove', (e) => {
          gsap.to(cursor, {
            duration: 0.3,
            x: e.clientX - 10,
            y: e.clientY - 10,
            ease: 'power2.out'
          })
        })

        // Cursor interactions
        document.querySelectorAll('a, button, .interactive').forEach(el => {
          el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { duration: 0.3, scale: 2, opacity: 0.8 })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { duration: 0.3, scale: 1, opacity: 1 })
          })
        })
      }

      // Loading screen animation
      gsap.to('.loading-screen', {
        duration: 1,
        opacity: 0,
        delay: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          document.querySelector('.loading-screen')?.remove()
        }
      })

      // Hero animations
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 100 },
        { 
          duration: 1.5, 
          opacity: 1, 
          y: 0, 
          ease: 'power3.out',
          delay: 2
        }
      )

      gsap.to('.hero-subtitle', {
        duration: 3,
        text: "Leading the future with cutting-edge Data Science, Full Stack Development, Data Analytics, AI/ML Engineering, and AI Agents",
        ease: 'none',
        delay: 3.5
      })

      // Floating elements
      gsap.utils.toArray('.floating-element').forEach((element: any, index: number) => {
        gsap.to(element, {
          y: -20 + Math.sin(index) * 10,
          x: Math.cos(index) * 15,
          rotation: Math.sin(index) * 5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        })
      })

      // Parallax scrolling
      gsap.utils.toArray('.parallax-bg').forEach((bg: any) => {
        gsap.to(bg, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: bg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        })
      })

      // Section reveal animations
      gsap.utils.toArray('.section-reveal').forEach((section: any) => {
        const elements = section.querySelectorAll('.reveal-element')
        
        gsap.from(elements, {
          duration: 1,
          y: 100,
          opacity: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      // Interactive cards with 3D effect
      gsap.utils.toArray('.card-3d').forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(card, {
            duration: 0.3,
            rotateY: x / 10,
            rotateX: -y / 10,
            transformPerspective: 1000,
            ease: 'power2.out'
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            duration: 0.5,
            rotateY: 0,
            rotateX: 0,
            ease: 'power2.out'
          })
        })
      })

      // Scroll progress indicator
      gsap.to('.scroll-progress', {
        scaleX: 1,
        transformOrigin: 'left',
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      })

      // Navigation section tracking
      gsap.utils.toArray('section[id]').forEach((section: any) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(section.id),
          onEnterBack: () => setActiveSection(section.id)
        })
      })

      // Magnetic effect for buttons
      gsap.utils.toArray('.magnetic').forEach((button: any) => {
        button.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(button, {
            duration: 0.3,
            x: x * 0.3,
            y: y * 0.3,
            ease: 'power2.out'
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.3)'
          })
        })
      })

      // Smooth scroll for navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
          e.preventDefault()
          const href = this.getAttribute('href')
          if (href) {
            const target = document.querySelector(href)
            if (target) {
              gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
              })
            }
          }
        })
      })

      // Enhanced smooth scroll for buttons
      document.querySelectorAll('button[data-scroll]').forEach((button) => {
        button.addEventListener('click', function (this: HTMLButtonElement, e: Event) {
          e.preventDefault()
          const targetId = this.getAttribute('data-scroll')
          if (targetId) {
            scrollToSection(targetId)
          }
        })
      })

      // Add click handlers to service cards
      document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function (e) {
          // Only trigger if not clicking on a button inside the card
          if (!(e.target as HTMLElement).closest('button')) {
            scrollToSection('contact')
          }
        })
      })

      // Counter animation
      gsap.utils.toArray('.counter').forEach((counter: any) => {
        const endValue = parseInt(counter.textContent)
        gsap.from(counter, {
          duration: 2,
          innerHTML: 0,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }


    // Initialize Flatpickr for contact form
    if (typeof window !== 'undefined' && window.flatpickr) {
      window.flatpickr('#meeting-date', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        minDate: 'today',
        theme: 'dark'
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate the position with offset for fixed header
      let elementPosition
      if (sectionId === 'services' || sectionId === 'process' || sectionId === 'team' || sectionId === 'about') {
        // Center the services/process/team/about section in the viewport to show all content in one frame
        const viewportHeight = window.innerHeight
        const elementHeight = element.offsetHeight
        
        // Calculate position to center the section vertically in the viewport
        elementPosition = element.offsetTop - (viewportHeight - elementHeight) / 2
      } else if (sectionId === 'contact') {
        // Scroll contact section higher up in the viewport
        const viewportHeight = window.innerHeight
        const elementHeight = element.offsetHeight
        
        // Calculate position to show more of the section at the top
        elementPosition = element.offsetTop - (viewportHeight - elementHeight) / 2 - 150
      } else {
        elementPosition = element.offsetTop - 80
      }
      
      if (window.gsap && window.gsap.to && window.gsap.plugins?.ScrollToPlugin) {
        // Use GSAP smooth scroll if available
        window.gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: elementPosition },
          ease: 'power3.inOut'
        })
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
      
      // Update active section
      setActiveSection(sectionId)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-screen fixed inset-0 bg-primary-bg z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-accent-blue/30 rounded-full animate-spin border-t-accent-blue mb-8"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-highlight-gold/30 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Quanco Tech</h2>
          <p className="text-gray-400">Loading amazing experience...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-primary-bg overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 bg-highlight-gold rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ left: '-10px', top: '-10px' }}
      />

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-accent-blue/20 z-40">
        <div className="scroll-progress h-full bg-gradient-to-r from-accent-blue to-highlight-gold origin-left scale-x-0"></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-primary-bg/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-12 sm:h-16 w-auto" 
              />
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'process', label: 'Action' },
                { id: 'team', label: 'Team' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  data-scroll={item.id}
                  className={`interactive relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-highlight-gold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-highlight-gold"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                data-scroll="contact"
                className="hidden sm:block interactive magnetic bg-gradient-to-r from-highlight-gold to-yellow-400 text-primary-bg px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-highlight-gold transition-colors duration-300 p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-primary-bg/95 backdrop-blur-md border-t border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'process', label: 'Action' },
                  { id: 'team', label: 'Team' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-highlight-gold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    scrollToSection('contact')
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 mt-2 text-sm font-semibold text-highlight-gold hover:text-yellow-400 transition-colors duration-300"
                >
                  Get Started →
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-40" style={{ zIndex: 1 }}>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="floating-element absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-accent-blue/10 to-highlight-gold/10 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Hero Section with Animated Canvas */}
      <AnimatedHero />

      {/* Logo Carousel Section */}
      <section className="section-reveal py-20 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesLogoCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-reveal py-20 relative" style={{ scrollMarginTop: '80px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RuixenBentoCards />
        </div>
      </section>

      {/* Process Timeline Section */}
      <section id="process" className="section-reveal relative" style={{ scrollMarginTop: '80px' }}>
        <RadialOrbitalTimeline 
          timelineData={[
            {
              id: 1,
              title: "Planning",
              date: "Jan 2024",
              content: "Project planning and requirements gathering phase.",
              category: "Planning",
              icon: Calendar,
              relatedIds: [2],
              status: "completed" as const,
              energy: 100,
            },
            {
              id: 2,
              title: "Design",
              date: "Feb 2024",
              content: "UI/UX design and system architecture.",
              category: "Design",
              icon: FileText,
              relatedIds: [1, 3],
              status: "completed" as const,
              energy: 90,
            },
            {
              id: 3,
              title: "Development",
              date: "Mar 2024",
              content: "Core features implementation and testing.",
              category: "Development",
              icon: Code,
              relatedIds: [2, 4],
              status: "in-progress" as const,
              energy: 60,
            },
            {
              id: 4,
              title: "Testing",
              date: "Apr 2024",
              content: "User testing and bug fixes.",
              category: "Testing",
              icon: User,
              relatedIds: [3, 5],
              status: "pending" as const,
              energy: 30,
            },
            {
              id: 5,
              title: "Release",
              date: "May 2024",
              content: "Final deployment and release.",
              category: "Release",
              icon: Clock,
              relatedIds: [4],
              status: "pending" as const,
              energy: 10,
            },
          ]}
        />
      </section>

      {/* Our Team Section */}
      <OurTeam />

      {/* About Section with Stats */}
      <section id="about" className="section-reveal py-20 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-element">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                <span className="text-white">About</span>
                <span className="text-highlight-gold"> Quanco Tech</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-highlight-gold mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                We are a cutting-edge technology company specializing in transformative digital solutions. 
                Our team of expert engineers and data scientists work tirelessly to bring innovation to life.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-12 leading-relaxed">
                From startups to enterprise solutions, we've helped over 100+ companies achieve their digital transformation goals 
                through our comprehensive suite of services including AI/ML, full-stack development, and advanced data analytics.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: '5+', label: 'Years Experience', desc: 'Industry expertise' },
                  { number: '100+', label: 'Projects Delivered', desc: 'Successful completions' },
                  { number: '24/7', label: 'Support', desc: 'Always available' },
                  { number: '99%', label: 'Client Satisfaction', desc: 'Happy customers' }
                ].map((stat, index) => (
                  <div key={stat.label} className="reveal-element text-center group">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-blue/20 to-highlight-gold/20 rounded-full flex items-center justify-center border border-white/10 group-hover:border-highlight-gold/50 transition-all duration-500">
                        <span className="counter text-2xl font-bold text-highlight-gold">
                          {stat.number}
                        </span>
                      </div>
                      <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-accent-blue/10 to-highlight-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-highlight-gold transition-colors duration-300">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reveal-element">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-highlight-gold/20 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-highlight-gold">Our Mission</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    To revolutionize businesses through innovative technology solutions, making advanced AI and data science 
                    accessible to companies of all sizes.
                  </p>
                  <div className="space-y-4">
                    {[
                      'Innovation-driven development',
                      'Client-centric approach',
                      'Cutting-edge technology stack',
                      'Scalable and secure solutions'
                    ].map((point, index) => (
                      <div key={point} className="flex items-center">
                        <div className="w-2 h-2 bg-highlight-gold rounded-full mr-3 animate-pulse"></div>
                        <span className="text-gray-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="section-reveal py-20 relative" style={{ scrollMarginTop: '80px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-element">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Get In</span>
              <span className="text-highlight-gold"> Touch</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-highlight-gold mx-auto mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to transform your business? Let's discuss your next project
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal-element">
              <div className="card-3d interactive bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-8 text-highlight-gold">Send us a message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        className="interactive w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-300 hover:border-white/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        className="interactive w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-300 hover:border-white/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
                    <select className="interactive w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-300 hover:border-white/20">
                      <option value="">Select a service</option>
                      <option value="data-science">Data Science</option>
                      <option value="full-stack">Full Stack Development</option>
                      <option value="ai-ml">AI/ML Engineering</option>
                      <option value="data-analytics">Data Analytics</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="ai-agents">AI Agents</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Date</label>
                    <input
                      type="text"
                      id="meeting-date"
                      className="interactive w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-300 hover:border-white/20"
                      placeholder="Select date and time"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="interactive w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-300 hover:border-white/20 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="magnetic w-full bg-gradient-to-r from-highlight-gold to-yellow-400 text-primary-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl glow-pulse"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            
            <div className="reveal-element space-y-8">
              <div className="card-3d interactive bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-highlight-gold">Contact Information</h3>
                
                <div className="space-y-6">
                  {[
                    { icon: Mail, title: 'Email', info: 'contact@quancotechnologies.com' },
                    { icon: Phone, title: 'Phone', info: '+91 9440804200' },
                    { icon: MapPin, title: 'Office', info: 'Al-Kareem Colony, Minar Colony, MD Lines, Toli Chowki, Hyderabad, Telangana 500008.' },
                    { icon: Clock, title: 'Hours', info: 'Mon-Fri: 9AM-6PM\nSat-Sun: 10AM-4PM' }
                  ].map((contact, index) => {
                    const IconComponent = contact.icon
                    return (
                    <div key={contact.title} className="flex items-start group">
                      <div className="mr-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-gray-300 group-hover:text-highlight-gold transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 group-hover:text-highlight-gold transition-colors duration-300">
                          {contact.title}
                        </h4>
                        <p className="text-gray-300 whitespace-pre-line group-hover:text-gray-200 transition-colors duration-300">
                          {contact.info}
                        </p>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="card-3d interactive bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-highlight-gold">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="magnetic w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center hover:bg-accent-blue/30 transition-all duration-300 group"
                    >
                      <svg className="w-6 h-6 text-accent-blue group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-bg border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-12 w-auto" 
            />
          </div>
          <p className="text-gray-400 mb-8">
            Transforming businesses through innovative technology solutions
          </p>
          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-gray-500">
              © 2024 Quanco Tech. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
