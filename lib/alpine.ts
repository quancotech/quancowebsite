import Alpine from 'alpinejs'

// Alpine.js directives and components
Alpine.data('mobileMenu', () => ({
  open: false,
  toggle() {
    this.open = !this.open
  },
  close() {
    this.open = false
  }
}))

Alpine.data('contactForm', () => ({
  formData: {
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  },
  isSubmitting: false,
  submitSuccess: false,
  
  async submitForm() {
    this.isSubmitting = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      this.submitSuccess = true
      this.formData = {
        name: '',
        email: '',
        company: '',
        message: '',
        service: ''
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      this.isSubmitting = false
    }
  }
}))

Alpine.data('testimonialCarousel', () => ({
  currentIndex: 0,
  testimonials: [
    {
      id: 1,
      quote: "Quanco Technologies transformed our data infrastructure completely. Their AI/ML solutions increased our operational efficiency by 40%.",
      author: "John Smith",
      position: "CEO",
      company: "TechCorp Solutions",
      avatar: "JS"
    },
    {
      id: 2,
      quote: "The full-stack development team delivered an exceptional web application that exceeded our expectations.",
      author: "Sarah Johnson",
      position: "CTO",
      company: "InnovateTech",
      avatar: "SJ"
    },
    {
      id: 3,
      quote: "Working with Quanco Technologies was a game-changer for our business. Their data analytics solutions provided insights we never knew existed.",
      author: "Michael Chen",
      position: "Data Director",
      company: "Analytics Pro",
      avatar: "MC"
    }
  ],
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length
  },
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length
  },
  
  goTo(index: number) {
    this.currentIndex = index
  }
}))

Alpine.data('themeToggle', () => ({
  darkMode: true,
  
  init() {
    // Check for saved theme preference or default to dark mode
    this.darkMode = localStorage.getItem('theme') !== 'light'
    this.applyTheme()
  },
  
  toggle() {
    this.darkMode = !this.darkMode
    this.applyTheme()
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light')
  },
  
  applyTheme() {
    if (this.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}))

// Start Alpine.js
Alpine.start()

export default Alpine