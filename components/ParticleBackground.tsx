'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    // Create floating particles with GSAP
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${['#007FFF', '#daa627', '#ffffff'][Math.floor(Math.random() * 3)]};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 1;
      `
      container.appendChild(particle)
      particles.push(particle)

      // Animate particles with GSAP
      gsap.to(particle, {
        y: -window.innerHeight - 100,
        x: Math.random() * 200 - 100,
        rotation: 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 5
      })
    }

    // Parallax effect for the container
    gsap.to(container, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      id="particles-container" 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
