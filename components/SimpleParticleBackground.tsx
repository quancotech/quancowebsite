'use client'

export default function SimpleParticleBackground() {
  return (
    <div 
      id="particles-container" 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {/* Simple static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-bg via-primary-bg to-accent-blue/10" />
    </div>
  )
}
