'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Clock, Twitter, Linkedin, Github } from 'lucide-react'

declare global {
  interface Window {
    flatpickr: any
    gsap: any
    ScrollTrigger: any
  }
}

export default function ContactPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Flatpickr
      if (window.flatpickr) {
        window.flatpickr('#meeting-date', {
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
          minDate: 'today',
          theme: 'dark'
        })
      }

      // GSAP animations
      if (window.gsap) {
        const { gsap, ScrollTrigger } = window
        gsap.registerPlugin(ScrollTrigger)

        gsap.from('.contact-form', {
          duration: 1,
          x: -100,
          opacity: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })

        gsap.from('.contact-info', {
          duration: 1,
          x: 100,
          opacity: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-primary-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Contact</span>
            <span className="text-highlight-gold"> Us</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-highlight-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business? Let's discuss your next project
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-8">
                  <span className="text-white">Get In</span>
                  <span className="text-highlight-gold"> Touch</span>
                </h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      required
                    >
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
                    <label htmlFor="meeting-date" className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Meeting Date & Time
                    </label>
                    <input
                      type="text"
                      id="meeting-date"
                      name="meeting-date"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300"
                      placeholder="Select date and time"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project requirements..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-highlight-gold to-yellow-400 text-primary-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-highlight-gold/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-highlight-gold">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-gray-300">hello@quantotech.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Phone</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Office</h4>
                      <p className="text-gray-300">123 Tech Street<br />Innovation City, TC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Business Hours</h4>
                      <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-highlight-gold">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center hover:bg-accent-blue/30 transition-colors duration-300">
                    <Twitter className="w-6 h-6 text-accent-blue" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center hover:bg-accent-blue/30 transition-colors duration-300">
                    <Linkedin className="w-6 h-6 text-accent-blue" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center hover:bg-accent-blue/30 transition-colors duration-300">
                    <Github className="w-6 h-6 text-accent-blue" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
