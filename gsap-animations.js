// GSAP Animations and Parallax Effects for Quanco Technologies

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize GSAP animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGSAPAnimations();
    initParallaxEffects();
    initScrollAnimations();
    initParticleSystem();
});

// Main GSAP animations
function initGSAPAnimations() {
    // Hero section animations
    const tl = gsap.timeline();
    
    // Animate hero text with stagger effect
    tl.from('.animated-text-1', {
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.animated-text-2', {
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.animated-text-3', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.animated-buttons', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scale: 0.9,
        ease: 'back.out(1.7)'
    }, '-=0.4');

    // Service cards animation
    gsap.from('.service-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.service-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Portfolio cards animation
    gsap.from('.portfolio-item', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.portfolio-item',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        }
    });

    // Team cards animation
    gsap.from('.text-center.group', {
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.text-center.group',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // FAQ cards animation
    gsap.from('.space-y-6 > div', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.space-y-6',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    // Hero section parallax
    gsap.to('#particles-container', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Background elements parallax
    gsap.utils.toArray('.parallax-bg').forEach(element => {
        gsap.to(element, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Text parallax effects
    gsap.utils.toArray('.parallax-text').forEach(element => {
        gsap.to(element, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Card parallax effects
    gsap.utils.toArray('.service-card, .portfolio-item').forEach((card, index) => {
        gsap.to(card, {
            y: -20 * (index % 2 === 0 ? 1 : -1),
            rotation: 2 * (index % 2 === 0 ? 1 : -1),
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Section headers animation
    gsap.utils.toArray('h2, h3').forEach(heading => {
        gsap.from(heading, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // CTA buttons animation
    gsap.utils.toArray('.cta-button').forEach(button => {
        gsap.from(button, {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: button,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const endValue = parseInt(stat.textContent);
        gsap.from(stat, {
            duration: 2,
            innerHTML: 0,
            snap: { innerHTML: 1 },
            ease: 'power2.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Enhanced particle system with GSAP
function initParticleSystem() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Create floating particles with GSAP
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${['#007FFF', '#daa627', '#ffffff'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);

        // Animate particles with GSAP
        gsap.to(particle, {
            y: -window.innerHeight - 100,
            x: Math.random() * 200 - 100,
            rotation: 360,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 5
        });
    }
}

// Hover animations for cards
function initCardHoverEffects() {
    gsap.utils.toArray('.service-card, .portfolio-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                y: -10,
                rotationY: 5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                y: 0,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
}

// Smooth scroll to sections
function initSmoothScroll() {
    gsap.utils.toArray('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    const tl = gsap.timeline();
    
    tl.to('.loading-spinner', {
        duration: 1,
        rotation: 360,
        ease: 'power2.inOut',
        repeat: -1
    })
    .to('.loading', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out',
        delay: 2
    }, '-=0.5')
    .set('.loading', { display: 'none' });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    initCardHoverEffects();
    initSmoothScroll();
    initLoadingAnimation();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
