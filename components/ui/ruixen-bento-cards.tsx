"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Brain, Rocket, Bot, BarChart3, Cloud, Sparkles } from 'lucide-react'

const cardContents = [
  {
    title: "Data Science",
    description: "Transform raw data into actionable insights with advanced analytics and machine learning algorithms.",
    icon: Brain,
  },
  {
    title: "Full Stack Development",
    description: "End-to-end web applications with modern frameworks and scalable cloud architecture.",
    icon: Rocket,
  },
  {
    title: "AI/ML Engineering",
    description: "Custom AI solutions designed to automate processes and enhance business intelligence.",
    icon: Bot,
  },
  {
    title: "Data Analytics",
    description: "Comprehensive analysis and visualization for data-driven business decisions.",
    icon: BarChart3,
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure with automated deployment and monitoring systems.",
    icon: Cloud,
  },
  {
    title: "AI Agents",
    description: "Intelligent agents that perform complex tasks and make autonomous decisions.",
    icon: Sparkles,
  },
]

const PlusCard: React.FC<{
  className?: string
  title: string
  description: string
  icon: React.ComponentType<any>
}> = ({
  className = "",
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div
      className={cn(
        "relative border border-accent-blue/20 rounded-lg p-6 bg-primary-bg/60 backdrop-blur-sm min-h-[200px]",
        "flex flex-col justify-between group hover:border-accent-blue/50 transition-all duration-300",
        "hover:shadow-lg hover:shadow-accent-blue/10",
        className
      )}
    >
      <CornerPlusIcons />
      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="text-accent-blue group-hover:text-highlight-gold transition-colors duration-300">
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-highlight-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`text-accent-blue size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

export default function RuixenBentoCards() {
  return (
    <section className="bg-transparent border-0">
      <div className="mx-auto container py-6 px-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-3">
          {/* Data Science Card with text above */}
          <div className="lg:col-span-3 lg:row-span-2 flex flex-col">
            <div className="mb-6">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span style={{ color: 'white' }}>Our</span>{' '}
                <span style={{ color: '#daa627' }}>Services</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Quanco Tech gives help you build beautiful, high-performing solutions with lightning speed. Each service is thoughtfully designed to be flexible, scalable, and accessible.
              </p>
            </div>
            <div className="mt-8">
              <PlusCard {...cardContents[0]} className="lg:row-span-2" />
            </div>
          </div>
          <PlusCard {...cardContents[1]} className="lg:col-span-3 lg:row-span-1" />
          <PlusCard {...cardContents[2]} className="lg:col-span-3 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[4]} className="lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[5]} className="lg:col-span-2 lg:row-span-1" />
        </div>
      </div>
    </section>
  )
}

