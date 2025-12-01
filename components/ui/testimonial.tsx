'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// --- Helper Components & Data ---

// All text data and images are the updated versions.
const teamMembers = [
  {
    quote:
      "As a Co-Founder, I'm passionate about building innovative solutions that transform businesses. Our vision is to make cutting-edge technology accessible to companies of all sizes, driving digital transformation and success.",
    name: "Mohammed Abdul Junaid",
    designation: "Co Founder",
    src: "/team/member1.png",
  },
  {
    quote:
      "As an AI Engineer, I specialize in developing intelligent systems that solve complex problems. I'm dedicated to pushing the boundaries of artificial intelligence and machine learning to create impactful solutions for our clients.",
    name: "Mohammed Abdul Imtiyaz",
    designation: "AI Engineer",
    src: "/team/member2.png",
  },
  {
    quote:
      "As an AI Data Scientist, I transform raw data into actionable insights using advanced analytics and machine learning. My focus is on building data-driven solutions that help businesses make informed decisions and achieve their goals.",
    name: "Syed Rahman Hussain",
    designation: "AI Data Scientist",
    src: "/team/member3.png",
  },
];

type TeamMember = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// --- Main Animated Team Component ---
// This is the core component that handles the animation and logic.
const AnimatedTeam = ({
  teamMembers,
  autoplay = true,
}: {
  teamMembers: TeamMember[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % teamMembers.length);
  }, [teamMembers.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 font-sans antialiased md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20 lg:gap-x-32">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
            <AnimatePresence>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.src}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index) ? teamMembers.length : teamMembers.length - Math.abs(index - active),
                    rotate: isActive(index) ? '0deg' : randomRotate(),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  <img
                    src={member.src}
                    alt={member.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-contain shadow-2xl border-2 border-accent-blue/20 bg-primary-bg/50"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/500x500/1e293b/daa627?text=${member.name.charAt(0)}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Controls Section */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {teamMembers[active].name}
                </h3>
                <p className="text-lg text-highlight-gold mb-8">
                  {teamMembers[active].designation}
                </p>
                <motion.p className="text-xl text-gray-300 leading-relaxed">
                  "{teamMembers[active].quote}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous team member"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-accent-blue/30 transition-all hover:bg-accent-blue/20 hover:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-primary-bg"
            >
              <ArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next team member"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-accent-blue/30 transition-all hover:bg-accent-blue/20 hover:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-primary-bg"
            >
              <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export function OurTeam() {
  return (
    <section id="team" className="section-reveal py-20 relative" style={{ scrollMarginTop: '80px' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-element">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Our</span>
            <span className="text-highlight-gold"> Team</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-accent-blue to-highlight-gold mx-auto mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Meet the talented individuals who make our success possible
          </p>
        </div>
        <AnimatedTeam teamMembers={teamMembers} />
      </div>
    </section>
  );
}

