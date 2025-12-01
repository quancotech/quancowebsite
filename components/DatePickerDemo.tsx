'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DatePickerDemo() {
  const demoRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedRange, setSelectedRange] = useState<{start: string, end: string}>({start: '', end: ''})
  const [selectedTime, setSelectedTime] = useState<string>('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(demoRef.current?.children || [], {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: demoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }, demoRef)

    return () => ctx.revert()
  }, [])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const handleRangeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRange(prev => ({ ...prev, start: e.target.value }))
  }

  const handleRangeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRange(prev => ({ ...prev, end: e.target.value }))
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value)
  }

  return (
    <div ref={demoRef} className="glass-card p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Single Date Picker */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Single Date</h3>
          <div className="space-y-2">
            <label htmlFor="single-date" className="block text-sm font-medium text-gray-300">
              Select a date:
            </label>
            <input
              type="date"
              id="single-date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full px-4 py-3 bg-primary-bg/50 border border-accent-blue/20 rounded-lg text-white focus:border-highlight-gold focus:outline-none transition-colors duration-300"
            />
            {selectedDate && (
              <p className="text-sm text-highlight-gold">
                Selected: {new Date(selectedDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Date Range</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-300">
                Start Date:
              </label>
              <input
                type="date"
                id="start-date"
                value={selectedRange.start}
                onChange={handleRangeStartChange}
                className="w-full px-4 py-3 bg-primary-bg/50 border border-accent-blue/20 rounded-lg text-white focus:border-highlight-gold focus:outline-none transition-colors duration-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-300">
                End Date:
              </label>
              <input
                type="date"
                id="end-date"
                value={selectedRange.end}
                onChange={handleRangeEndChange}
                min={selectedRange.start}
                className="w-full px-4 py-3 bg-primary-bg/50 border border-accent-blue/20 rounded-lg text-white focus:border-highlight-gold focus:outline-none transition-colors duration-300"
              />
            </div>
            {selectedRange.start && selectedRange.end && (
              <div className="p-3 bg-highlight-gold/10 rounded-lg">
                <p className="text-sm text-highlight-gold">
                  Range: {new Date(selectedRange.start).toLocaleDateString()} - {new Date(selectedRange.end).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Duration: {Math.ceil((new Date(selectedRange.end).getTime() - new Date(selectedRange.start).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Date & Time Picker */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Date & Time</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="datetime-local" className="block text-sm font-medium text-gray-300">
                Select date and time:
              </label>
              <input
                type="datetime-local"
                id="datetime-local"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full px-4 py-3 bg-primary-bg/50 border border-accent-blue/20 rounded-lg text-white focus:border-highlight-gold focus:outline-none transition-colors duration-300"
              />
            </div>
            {selectedTime && (
              <div className="p-3 bg-accent-blue/10 rounded-lg">
                <p className="text-sm text-accent-blue">
                  Selected: {new Date(selectedTime).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Features Demo */}
      <div className="mt-12 pt-8 border-t border-accent-blue/20">
        <h3 className="text-2xl font-bold text-white mb-6">Advanced Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-highlight-gold">Quick Select Options</h4>
            <div className="flex flex-wrap gap-2">
              {['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month'].map((option) => (
                <button
                  key={option}
                  className="px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded-lg transition-colors duration-300 text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-highlight-gold">Calendar Features</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-highlight-gold rounded-full"></div>
                <span>Holiday highlighting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent-blue rounded-full"></div>
                <span>Weekend styling</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Available dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Disabled dates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
