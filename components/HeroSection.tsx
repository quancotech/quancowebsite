'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)
  const text3Ref = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate hero text with stagger effect
      tl.from(text1Ref.current, {
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
      })
      .from(text2Ref.current, {
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.8')
      .from(text3Ref.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.6')
      .from(buttonsRef.current, {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scale: 0.9,
        ease: 'back.out(1.7)'
      }, '-=0.4')

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-bg via-primary-bg to-accent-blue/10" />
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span ref={text1Ref} className="text-white">Innovative</span>
            <span ref={text2Ref} className="text-highlight-gold block">Tech Solutions</span>
          </h1>
          <p 
            ref={text3Ref}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Leading the future with cutting-edge Data Science, Full Stack Development, 
            Data Analytics, AI/ML Engineering, and AI Agents
          </p>
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Get a Quote
            </Link>
            <Link 
              href="/services" 
              className="btn-secondary"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-highlight-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
