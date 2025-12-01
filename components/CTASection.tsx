'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA buttons animation
      gsap.from(buttonsRef.current, {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-r from-accent-blue/10 to-highlight-gold/10">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Ready to Transform</span>
          <span className="text-highlight-gold block">Your Business?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's discuss how our innovative technology solutions can drive your business forward
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary">
            Start Your Project
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  )
}
