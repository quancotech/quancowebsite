'use client'

import Link from 'next/link'

export default function SimpleCTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-accent-blue/10 to-highlight-gold/10">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Ready to Transform</span>
          <span className="text-highlight-gold block">Your Business?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's discuss how our innovative technology solutions can drive your business forward
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
