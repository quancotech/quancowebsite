'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, ShoppingCart, Bot, TrendingUp, Smartphone, Cloud } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface CarouselItem {
  id: number
  title: string
  description: string
  image: React.ReactNode
  category: string
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Data Science Platform',
    description: 'Advanced analytics platform with machine learning capabilities and real-time insights.',
    image: <BarChart3 className="w-12 h-12" strokeWidth={1.5} />,
    category: 'Data Science'
  },
  {
    id: 2,
    title: 'E-commerce Solution',
    description: 'Full-stack e-commerce platform with modern UI/UX and scalable architecture.',
    image: <ShoppingCart className="w-12 h-12" strokeWidth={1.5} />,
    category: 'Full Stack'
  },
  {
    id: 3,
    title: 'AI Chatbot System',
    description: 'Intelligent conversational AI agent for customer support and engagement.',
    image: <Bot className="w-12 h-12" strokeWidth={1.5} />,
    category: 'AI/ML'
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Comprehensive business intelligence dashboard with interactive visualizations.',
    image: <TrendingUp className="w-12 h-12" strokeWidth={1.5} />,
    category: 'Analytics'
  },
  {
    id: 5,
    title: 'Mobile App',
    description: 'Cross-platform mobile application with native performance and modern design.',
    image: <Smartphone className="w-12 h-12" strokeWidth={1.5} />,
    category: 'Mobile'
  },
  {
    id: 6,
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud infrastructure with automated deployment and monitoring.',
    image: <Cloud className="w-12 h-12" strokeWidth={1.5} />,
    category: 'DevOps'
  }
]

export default function SwiperCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(carouselRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }, carouselRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div ref={carouselRef} className="glass-card p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-white">Project Showcase</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              isAutoPlaying
                ? 'bg-highlight-gold text-primary-bg'
                : 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30'
            }`}
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8">
                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-highlight-gold/20 text-highlight-gold rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                    <h4 className="text-3xl font-bold text-white">{item.title}</h4>
                    <p className="text-xl text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="btn-primary">
                      View Project
                    </button>
                    <button className="btn-secondary">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-accent-blue/20 to-highlight-gold/20 rounded-2xl flex items-center justify-center text-8xl">
                    {item.image}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary-bg/80 hover:bg-primary-bg border border-accent-blue/20 hover:border-highlight-gold rounded-full flex items-center justify-center transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary-bg/80 hover:bg-primary-bg border border-accent-blue/20 hover:border-highlight-gold rounded-full flex items-center justify-center transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-highlight-gold scale-125'
                : 'bg-accent-blue/30 hover:bg-accent-blue/50'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4">
        <span className="text-gray-400 text-sm">
          {currentIndex + 1} of {carouselItems.length}
        </span>
      </div>
    </div>
  )
}
