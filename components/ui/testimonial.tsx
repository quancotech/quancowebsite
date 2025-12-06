'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// --- Helper Components & Data ---

// All text data and images are the updated versions.
const teamMembers = [
  {
    quote:
      "As a Co-Founder & CTO, I'm passionate about building innovative solutions that transform businesses. Our vision is to make cutting-edge technology accessible to companies of all sizes, driving digital transformation and success.",
    name: "Mohammed Abdul Junaid",
    designation: "Co-Founder & CTO",
    src: "/team/member1.png",
    initials: null,
  },
  {
    quote:
      "As an AI Engineer, I specialize in developing intelligent systems that solve complex problems. I'm dedicated to pushing the boundaries of artificial intelligence and machine learning to create impactful solutions for our clients.",
    name: "Mohammed Abdul Imtiyaz",
    designation: "AI Engineer",
    src: "/team/member2.png",
    initials: null,
  },
  {
    quote:
      "As an AI Data Scientist, I transform raw data into actionable insights using advanced analytics and machine learning. My focus is on building data-driven solutions that help businesses make informed decisions and achieve their goals.",
    name: "Syed Rahman Hussain",
    designation: "AI Data Scientist",
    src: "/team/member3.png",
    initials: null,
  },
  {
    quote:
      "As an AI Engineer, I focus on developing cutting-edge artificial intelligence solutions that drive innovation and solve real-world challenges. I'm committed to creating intelligent systems that enhance business operations and deliver measurable results.",
    name: "Riza ur Rahman",
    designation: "AI Engineer",
    src: "/team/member4.JPG",
    initials: null,
  },
  {
    quote:
      "As a Marketing Officer, I drive brand awareness and growth through strategic marketing initiatives. I'm passionate about connecting our innovative technology solutions with the right audiences and building lasting relationships with our clients.",
    name: "Mohsin Khan",
    designation: "Marketing Officer",
    src: "/team/member5.jpg",
    initials: null,
  },
  {
    quote:
      "As an AI Engineer, I develop intelligent systems and machine learning models that solve complex business problems. I'm dedicated to leveraging the power of artificial intelligence to create innovative solutions that drive success for our clients.",
    name: "Syed Abdul Baseer",
    designation: "AI Engineer",
    src: null,
    initials: "AB",
  },
  {
    quote:
      "As CEO & Founder, I lead our mission to revolutionize businesses through innovative technology solutions. I'm committed to building a company that makes advanced AI and data science accessible, helping organizations achieve their digital transformation goals.",
    name: "Mohammed Basith Farooqui",
    designation: "CEO & Founder",
    src: null,
    initials: "MB",
  },
];

type TeamMember = {
  quote: string;
  name: string;
  designation: string;
  src: string | null;
  initials: string | null;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                  animate={{
                    opacity: isActive(index) ? 1 : (isMobile ? 0 : 0.5),
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index) ? teamMembers.length : teamMembers.length - Math.abs(index - active),
                    rotate: isActive(index) ? '0deg' : randomRotate(),
                    display: isActive(index) || !isMobile ? 'block' : 'none',
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  {member.src ? (
                    <img
                      src={member.src}
                      alt={member.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-contain shadow-2xl border-2 border-accent-blue/20 bg-primary-bg/50"
                      onError={(e) => {
                        const initials = member.initials || member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent && !parent.querySelector('.initials-placeholder')) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'initials-placeholder h-full w-full rounded-3xl shadow-2xl border-2 border-accent-blue/20 bg-primary-bg flex items-center justify-center';
                          placeholder.innerHTML = `<span class="text-6xl font-bold text-highlight-gold">${initials}</span>`;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  ) : (
                    <div className="h-full w-full rounded-3xl shadow-2xl border-2 border-accent-blue/20 bg-primary-bg flex items-center justify-center">
                      <span className="text-6xl font-bold text-highlight-gold">{member.initials || member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
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

