'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingSpinner() {
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!spinnerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.to(spinnerRef.current, {
        duration: 1,
        rotation: 360,
        ease: 'power2.inOut',
        repeat: -1
      })
    }, spinnerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 bg-primary-bg flex items-center justify-center z-50">
      <div className="text-center">
        <div 
          ref={spinnerRef}
          className="w-16 h-16 border-4 border-accent-blue/20 border-t-accent-blue rounded-full mx-auto mb-4"
        />
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  )
}
