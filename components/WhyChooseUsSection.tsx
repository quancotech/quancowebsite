'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  number: string
  label: string
  description: string
  color: 'gold' | 'blue'
}

const stats: Stat[] = [
  {
    number: '5+',
    label: 'Years Experience',
    description: 'Proven track record in delivering complex technology solutions',
    color: 'gold'
  },
  {
    number: '100+',
    label: 'Projects Delivered',
    description: 'Successfully completed projects across various industries',
    color: 'blue'
  },
  {
    number: '24/7',
    label: 'Support',
    description: 'Round-the-clock technical support and maintenance',
    color: 'gold'
  },
  {
    number: '99%',
    label: 'Client Satisfaction',
    description: 'Consistently high client satisfaction and retention rates',
    color: 'blue'
  }
]

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.from(statsRef.current, {
        duration: 1,
        y: 80,
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

      // Counter animation for numbers
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const numberElement = stat.querySelector('.stat-number')
          if (numberElement) {
            const endValue = parseInt(stats[index].number.replace('+', '').replace('%', ''))
            gsap.from(numberElement, {
              duration: 2,
              innerHTML: 0,
              snap: { innerHTML: 1 },
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-accent-blue/5 to-primary-bg">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Why Choose</span>
            <span className="text-highlight-gold"> Quanco Technologies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine technical expertise with business acumen to deliver exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                if (el) statsRef.current[index] = el
              }}
              className="text-center group"
            >
              <div className={`${
                stat.color === 'gold' 
                  ? 'bg-highlight-gold/10 group-hover:bg-highlight-gold/20' 
                  : 'bg-accent-blue/10 group-hover:bg-accent-blue/20'
              } rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-colors duration-300`}>
                <span className={`text-3xl font-bold ${
                  stat.color === 'gold' ? 'text-highlight-gold' : 'text-accent-blue'
                } stat-number`}>
                  {stat.number}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{stat.label}</h3>
              <p className="text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
