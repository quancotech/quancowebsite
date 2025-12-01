"use client";

import { useEffect } from "react";
import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/Button";
import { Plus, ArrowRight, Sparkles } from "lucide-react";

export function AnimatedHero() {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Small delay to ensure canvas is rendered
      const timer = setTimeout(() => {
        renderCanvas();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      let elementPosition;
      if (sectionId === 'services') {
        // Center the services section in the viewport to show all services in one frame
        const viewportHeight = window.innerHeight;
        const elementHeight = element.offsetHeight;
        
        // Calculate position to center the section vertically in the viewport
        elementPosition = element.offsetTop - (viewportHeight - elementHeight) / 2;
      } else {
        elementPosition = element.offsetTop - 80;
      }
      
      if (window.gsap && window.gsap.to && window.gsap.plugins?.ScrollToPlugin) {
        // Use GSAP smooth scroll if available
        window.gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: elementPosition },
          ease: 'power3.inOut'
        });
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Canvas Animation - Behind text */}
      <canvas
        className="bg-primary-bg pointer-events-none absolute inset-0 mx-auto z-0"
        id="canvas"
      ></canvas>
      
      {/* Text Content - On top of animation */}
      <div className="animation-delay-8 animate-fadeIn mt-4 flex flex-col items-center justify-center px-4 text-center md:mt-4 relative z-10">
        <div className="z-10 mb-6 mt-2 sm:justify-center md:mb-4 md:mt-4">
          <div className="relative flex items-center whitespace-nowrap rounded-full border border-accent-blue/30 bg-primary-bg/80 backdrop-blur-sm px-3 py-1 text-xs leading-6 text-gray-300">
            <Sparkles className="h-5 p-1 text-highlight-gold" /> 
            Introducing Quanco Tech.
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-highlight-gold ml-1 flex items-center font-semibold text-accent-blue transition-colors"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </button>
          </div>
        </div>

        <div className="mb-10 mt-4 md:mt-6 relative z-10">
          <div className="px-2">
            <div className="border-accent-blue/20 relative mx-auto h-full max-w-7xl border border-highlight-gold/10 p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
              <h1 className="flex select-none flex-col px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight text-white md:flex-col md:text-8xl lg:flex-col lg:text-8xl relative z-10">
                <Plus
                  strokeWidth={4}
                  className="text-accent-blue absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-highlight-gold absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-highlight-gold absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-accent-blue absolute -bottom-5 -right-5 h-10 w-10"
                />
                Innovative Tech Solutions
              </h1>
              <div className="flex items-center justify-center gap-1 mt-4 relative z-10">
                <span className="text-green-500 text-base">•</span>
                <p className="text-base text-green-500 font-normal">Available Now</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 relative z-10 mt-8">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Start Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

