'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ApexChartsComponent from '@/components/ApexChartsComponent'
import JsVectorMapComponent from '@/components/JsVectorMapComponent'
import { User, UserCheck, Target, Rocket, Heart } from 'lucide-react'

declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}

const teamMembers = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: <User className="w-16 h-16" strokeWidth={1.5} />,
    bio: 'Visionary leader with 10+ years in tech innovation and business strategy.',
    expertise: ['Strategic Planning', 'Business Development', 'Team Leadership']
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    image: <UserCheck className="w-16 h-16" strokeWidth={1.5} />,
    bio: 'Technical expert specializing in AI/ML and scalable system architecture.',
    expertise: ['AI/ML', 'System Architecture', 'Cloud Computing']
  },
  {
    name: 'Michael Chen',
    role: 'Lead Data Scientist',
    image: '👨‍🔬',
    bio: 'Data science expert with expertise in machine learning and predictive analytics.',
    expertise: ['Machine Learning', 'Data Analysis', 'Statistical Modeling']
  },
  {
    name: 'Emily Davis',
    role: 'Full Stack Developer',
    image: '👩‍💼',
    bio: 'Full-stack developer passionate about creating seamless user experiences.',
    expertise: ['React/Next.js', 'Node.js', 'Database Design']
  }
]

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const { gsap, ScrollTrigger } = window
      gsap.registerPlugin(ScrollTrigger)

      // Team members animation
      gsap.from('.team-member', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Values cards animation
      gsap.from('.value-card', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-primary-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">About</span>
            <span className="text-highlight-gold"> Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate technologists dedicated to transforming businesses through innovative solutions
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Our</span>
                <span className="text-highlight-gold"> Story</span>
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2019, Quanco Technologies emerged from a vision to bridge the gap between 
                  cutting-edge technology and practical business solutions. Our journey began when our 
                  founders recognized the immense potential of data science and AI to transform industries.
                </p>
                <p>
                  Over the years, we have evolved into a comprehensive technology partner, offering 
                  services ranging from data science and full-stack development to advanced AI/ML 
                  engineering and intelligent agent development.
                </p>
                <p>
                  Today, we proudly serve clients across various industries, helping them harness the 
                  power of technology to drive growth, efficiency, and innovation.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <ApexChartsComponent />
              <JsVectorMapComponent />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-accent-blue/5 to-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-highlight-gold mb-6">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, 
                efficiency, and competitive advantage. We strive to make advanced technologies 
                accessible and practical for organizations of all sizes, helping them navigate 
                the digital transformation journey with confidence.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-accent-blue mb-6">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the leading technology partner that transforms industries through 
                intelligent automation, data-driven insights, and cutting-edge AI solutions. 
                We envision a future where every business can harness the full potential of 
                technology to create meaningful impact and sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Meet Our</span>
              <span className="text-highlight-gold"> Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience and passion for innovation
            </p>
          </div>
          
          <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-member glass-card p-6 text-center hover:border-highlight-gold/50 transition-all duration-300 hover-lift">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-highlight-gold font-semibold mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="space-y-2">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-xs mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-primary-bg to-accent-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our</span>
              <span className="text-highlight-gold"> Values</span>
            </h2>
          </div>
          
          <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-card glass-card p-8 text-center hover-lift">
              <div className="text-highlight-gold mb-4 animate-pulse-glow">
                <Target className="w-12 h-12 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                We strive for excellence in everything we do, from code quality to client service, 
                ensuring the highest standards in all our deliverables.
              </p>
            </div>
            <div className="value-card glass-card p-8 text-center hover-lift">
              <div className="text-highlight-gold mb-4 animate-scale-pulse">
                <Rocket className="w-12 h-12 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                We embrace new technologies and methodologies, constantly pushing boundaries 
                to deliver cutting-edge solutions that drive business success.
              </p>
            </div>
            <div className="value-card glass-card p-8 text-center hover-lift">
              <div className="text-highlight-gold mb-4 animate-float-up-down">
                <Heart className="w-12 h-12 mx-auto" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Partnership</h3>
              <p className="text-gray-300 leading-relaxed">
                We build long-term relationships with our clients, working as trusted partners 
                to understand their needs and deliver solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-blue/10 to-highlight-gold/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Ready to Work</span>
            <span className="text-highlight-gold block">With Us?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our team can help bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="/contact" className="btn-secondary">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
