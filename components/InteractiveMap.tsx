'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mapRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }, mapRef)

    return () => ctx.revert()
  }, [])

  const countries = [
    { name: 'United States', clients: 45, revenue: '$2.5M', color: '#007FFF' },
    { name: 'United Kingdom', clients: 32, revenue: '$1.8M', color: '#daa627' },
    { name: 'Canada', clients: 28, revenue: '$1.2M', color: '#10B981' },
    { name: 'Germany', clients: 25, revenue: '$1.1M', color: '#F59E0B' },
    { name: 'Australia', clients: 22, revenue: '$980K', color: '#EF4444' },
    { name: 'France', clients: 18, revenue: '$750K', color: '#8B5CF6' },
    { name: 'Japan', clients: 15, revenue: '$650K', color: '#06B6D4' },
    { name: 'Brazil', clients: 12, revenue: '$420K', color: '#84CC16' }
  ]

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country)
  }

  return (
    <div ref={mapRef} className="glass-card p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-6">Global Presence</h3>
          <div className="relative bg-gradient-to-br from-primary-bg/50 to-accent-blue/10 rounded-lg p-8 h-96 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-4 w-full max-w-md">
              {countries.map((country, index) => (
                <button
                  key={country.name}
                  onClick={() => handleCountryClick(country.name)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    selectedCountry === country.name
                      ? 'border-highlight-gold bg-highlight-gold/10'
                      : 'border-accent-blue/20 hover:border-accent-blue/50'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: country.color }}
                  />
                  <p className="text-xs text-white font-medium text-center">
                    {country.name.split(' ')[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Country Details */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Country Statistics</h3>
          {selectedCountry ? (
            <div className="space-y-4">
              {countries
                .filter(country => country.name === selectedCountry)
                .map(country => (
                  <div key={country.name} className="glass-card p-6">
                    <h4 className="text-xl font-bold text-highlight-gold mb-4">
                      {country.name}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Active Clients:</span>
                        <span className="text-white font-semibold">{country.clients}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Revenue:</span>
                        <span className="text-white font-semibold">{country.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Market Share:</span>
                        <span className="text-white font-semibold">
                          {((country.clients / 197) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="glass-card p-6 text-center">
              <p className="text-gray-400">Click on a country to view details</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="glass-card p-6 mt-6">
            <h4 className="text-lg font-bold text-white mb-4">Global Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Clients:</span>
                <span className="text-white font-semibold">197</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Revenue:</span>
                <span className="text-white font-semibold">$9.3M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Countries:</span>
                <span className="text-white font-semibold">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
