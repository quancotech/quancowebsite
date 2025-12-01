// Quanco Technologies - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticleSystem();
    initMobileMenu();
    initScrollAnimations();
    initTestimonialCarousel();
    initSmoothScrolling();
    initLoadingScreen();
    initParallaxEffects();
    initHoverEffects();
});

// Particle System for Hero Section
function initParticleSystem() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and size
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 100);
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.service-card, .stagger-item, .text-reveal');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = [
        {
            quote: "Quanco Tech transformed our data infrastructure completely. Their AI/ML solutions increased our operational efficiency by 40%. The team's expertise and dedication are unmatched.",
            author: "John Smith",
            position: "CEO, TechCorp Solutions",
            initials: "JS"
        },
        {
            quote: "The full-stack application they developed for us exceeded all expectations. Clean code, excellent performance, and outstanding support throughout the project.",
            author: "Sarah Johnson",
            position: "CTO, InnovateLabs",
            initials: "SJ"
        },
        {
            quote: "Their data analytics solutions gave us insights we never had before. Our decision-making process is now data-driven and much more effective.",
            author: "Michael Chen",
            position: "VP Analytics, DataFlow Inc",
            initials: "MC"
        }
    ];

    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonial-slide');
    
    if (testimonialContainer) {
        function updateTestimonial() {
            const testimonial = testimonials[currentTestimonial];
            testimonialContainer.innerHTML = `
                <div class="bg-primary-bg/50 backdrop-blur-sm border border-accent-blue/20 rounded-xl p-8 max-w-4xl mx-auto text-center">
                    <div class="text-highlight-gold text-6xl mb-6">"</div>
                    <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                        "${testimonial.quote}"
                    </p>
                    <div class="flex items-center justify-center">
                        <div class="w-16 h-16 bg-highlight-gold rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary-bg font-bold text-xl">${testimonial.initials}</span>
                        </div>
                        <div class="text-left">
                            <h4 class="text-white font-semibold text-lg">${testimonial.author}</h4>
                            <p class="text-accent-blue">${testimonial.position}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);

        // Initialize with first testimonial
        updateTestimonial();
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading Screen
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(218, 166, 39, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-highlight-gold text-primary-bg w-12 h-12 rounded-full font-bold text-xl hover:bg-highlight-gold/90 transition-all duration-300 transform hover:scale-110 z-50';
    scrollToTopBtn.style.display = 'none';
    
    scrollToTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }, 100));
}

// Initialize scroll to top button
addScrollToTopButton();

// Form validation and submission
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '#007FFF';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white font-semibold z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize form handling when DOM is loaded
document.addEventListener('DOMContentLoaded', initFormHandling);

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    }
});

// Add focus management for accessibility
function initFocusManagement() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements));
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus management
initFocusManagement();
