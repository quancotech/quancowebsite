import { debounce, throttle, scrollToElement, scrollToTop, isInViewport, createIntersectionObserver } from './utils';
import type { Testimonial, SwiperConfig, FlatpickrConfig, ApexChartConfig, VectorMapConfig } from '../types';

// Main application class
class QuancoTechApp {
  private mobileMenuBtn: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private currentTestimonial: number = 0;
  private testimonials: Testimonial[] = [];
  private intersectionObserver: IntersectionObserver | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupScrollAnimations();
    this.setupParticleSystem();
    this.setupTestimonialCarousel();
    this.setupSmoothScrolling();
    this.setupLoadingScreen();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupScrollToTop();
    this.setupFormHandling();
    this.setupLazyLoading();
    this.setupFocusManagement();
  }

  private setupEventListeners(): void {
    // Mobile menu toggle
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileMenu = document.getElementById('mobile-menu');

    if (this.mobileMenuBtn && this.mobileMenu) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu when clicking on links
    const mobileLinks = this.mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

    // Window resize handler
    window.addEventListener('resize', throttle(() => this.handleResize(), 250));

    // Scroll handler
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 16));
  }

  private initializeComponents(): void {
    // Initialize testimonials data
    this.testimonials = [
      {
        id: '1',
        quote: "Quanco Tech transformed our data infrastructure completely. Their AI/ML solutions increased our operational efficiency by 40%. The team's expertise and dedication are unmatched.",
        author: "John Smith",
        position: "CEO",
        company: "TechCorp Solutions",
        initials: "JS",
        rating: 5
      },
      {
        id: '2',
        quote: "The full-stack application they developed for us exceeded all expectations. Clean code, excellent performance, and outstanding support throughout the project.",
        author: "Sarah Johnson",
        position: "CTO",
        company: "InnovateLabs",
        initials: "SJ",
        rating: 5
      },
      {
        id: '3',
        quote: "Their data analytics solutions gave us insights we never had before. Our decision-making process is now data-driven and much more effective.",
        author: "Michael Chen",
        position: "VP Analytics",
        company: "DataFlow Inc",
        initials: "MC",
        rating: 5
      }
    ];
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.intersectionObserver = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.service-card, .stagger-item, .text-reveal');
    elementsToAnimate.forEach(el => {
      this.intersectionObserver?.observe(el);
    });

    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }

  private setupParticleSystem(): void {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const createParticle = (): void => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position and size
      particle.style.left = Math.random() * 100 + '%';
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    };

    // Create particles periodically
    setInterval(createParticle, 300);
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 100);
    }
  }

  private setupTestimonialCarousel(): void {
    const testimonialContainer = document.querySelector('.testimonial-slide');
    
    if (testimonialContainer) {
      const updateTestimonial = (): void => {
        const testimonial = this.testimonials[this.currentTestimonial];
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
                <p class="text-accent-blue">${testimonial.position}, ${testimonial.company}</p>
              </div>
            </div>
          </div>
        `;
      };

      // Auto-rotate testimonials
      setInterval(() => {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
        updateTestimonial();
      }, 5000);

      // Initialize with first testimonial
      updateTestimonial();
    }
  }

  private setupSmoothScrolling(): void {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId) {
          scrollToElement(targetId, 80);
        }
      });
    });
  }

  private setupLoadingScreen(): void {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
      <div class="loading-spinner"></div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen when page is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }

  private setupParallaxEffects(): void {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleParallax = throttle(() => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, 16);

    window.addEventListener('scroll', handleParallax);
  }

  private setupHoverEffects(): void {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        (this as HTMLElement).style.transform = 'translateY(-10px) scale(1.02)';
        (this as HTMLElement).style.boxShadow = '0 20px 40px rgba(218, 166, 39, 0.2)';
      });
      
      card.addEventListener('mouseleave', function() {
        (this as HTMLElement).style.transform = 'translateY(0) scale(1)';
        (this as HTMLElement).style.boxShadow = 'none';
      });
    });

    // Add hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        (this as HTMLElement).style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      button.addEventListener('mouseleave', function() {
        (this as HTMLElement).style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  private setupScrollToTop(): void {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-highlight-gold text-primary-bg w-12 h-12 rounded-full font-bold text-xl hover:bg-highlight-gold/90 transition-all duration-300 transform hover:scale-110 z-50';
    scrollToTopBtn.style.display = 'none';
    
    scrollToTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    const handleScroll = throttle(() => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }

  private setupFormHandling(): void {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form as HTMLFormElement);
      });
    });
  }

  private setupLazyLoading(): void {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  private setupFocusManagement(): void {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements));
        const firstFocusable = focusable[0] as HTMLElement;
        const lastFocusable = focusable[focusable.length - 1] as HTMLElement;
        
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

  private toggleMobileMenu(): void {
    if (this.mobileMenu) {
      this.mobileMenu.classList.toggle('hidden');
      this.mobileMenu.classList.toggle('show');
    }
  }

  private closeMobileMenu(): void {
    if (this.mobileMenu) {
      this.mobileMenu.classList.add('hidden');
      this.mobileMenu.classList.remove('show');
    }
  }

  private handleKeyboardNavigation(e: KeyboardEvent): void {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
      this.closeMobileMenu();
    }
  }

  private handleResize(): void {
    // Handle responsive adjustments
    const deviceType = window.innerWidth < 768 ? 'mobile' : 
                      window.innerWidth < 1024 ? 'tablet' : 'desktop';
    
    document.body.setAttribute('data-device', deviceType);
  }

  private handleScroll(): void {
    // Handle scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  private handleFormSubmit(form: HTMLFormElement): void {
    // Basic form validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      const inputElement = input as HTMLInputElement;
      if (!inputElement.value.trim()) {
        isValid = false;
        inputElement.style.borderColor = '#ff6b6b';
      } else {
        inputElement.style.borderColor = '#007FFF';
      }
    });
    
    if (isValid) {
      this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
      form.reset();
    } else {
      this.showNotification('Please fill in all required fields.', 'error');
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
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

  // Public methods for external use
  public destroy(): void {
    // Cleanup event listeners and observers
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuancoTechApp();
});

// Export for potential external use
export default QuancoTechApp;
