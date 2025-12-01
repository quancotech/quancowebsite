# Quanco Technologies - Modern Tech Stack Website

A comprehensive technology showcase website built with cutting-edge web technologies, featuring React, Vue.js, Next.js, TypeScript, and a complete modern development stack.

## 🚀 Tech Stack

### Frontend Frameworks
- **React** (18.2.0) - Component-based UI library
- **Next.js** (14.0.0) - React framework with SSR/SSG
- **Vue.js** (3.3.0) - Progressive JavaScript framework
- **TypeScript** (5.2.0) - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** (3.3.0) - Utility-first CSS framework
- **Custom CSS** - Enhanced animations and effects
- **GSAP** (3.12.0) - Professional-grade animations

### Data Visualization
- **Apex Charts** (3.44.0) - Interactive charts and graphs
- **Jsvectormap** (1.5.3) - Interactive vector maps

### Form & Input Components
- **Flatpickr** (4.6.13) - Date/time picker
- **Swiper** (11.0.0) - Touch slider/carousel

### Development Tools
- **ESLint** (8.0.0) - Code linting and quality
- **Prettier** (3.0.0) - Code formatting
- **Alpine.js** (3.13.0) - Lightweight JavaScript framework

## 📁 Project Structure

```
quanco-tech-website/
├── components/           # Reusable components
│   ├── react/           # React components
│   ├── vue/             # Vue.js components
│   ├── charts/          # Chart components
│   └── ui/              # UI components
├── lib/                 # Utility libraries
│   ├── main.ts          # Main TypeScript application
│   ├── utils.ts         # Utility functions
│   └── alpine.ts        # Alpine.js integration
├── types/               # TypeScript type definitions
├── pages/               # Next.js pages
├── styles/              # CSS and styling files
├── *.html               # HTML pages
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── next.config.js       # Next.js configuration
├── .eslintrc.json       # ESLint configuration
└── .prettierrc          # Prettier configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (>= 18.0.0)
- npm (>= 8.0.0)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quanco-tech-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## 📜 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run serve` - Serve static files

## 🎨 Features

### Interactive Components
- **Data Visualization Dashboard** - Apex Charts integration
- **Interactive Maps** - Jsvectormap with custom styling
- **Date/Time Pickers** - Flatpickr with dark theme
- **Touch Carousels** - Swiper.js with responsive design
- **Form Validation** - TypeScript-powered form handling

### Modern UI/UX
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Custom dark theme with accent colors
- **Smooth Animations** - GSAP-powered animations
- **Interactive Elements** - Hover effects and transitions
- **Accessibility** - WCAG compliant components

### Development Experience
- **Type Safety** - Full TypeScript integration
- **Code Quality** - ESLint and Prettier configuration
- **Hot Reload** - Fast development with Next.js
- **Component Library** - Reusable React and Vue components

## 🔧 Configuration

### TypeScript
The project uses TypeScript with strict type checking. Configuration is in `tsconfig.json`.

### Tailwind CSS
Custom theme configuration in `tailwind.config.js` with:
- Custom color palette
- Extended animations
- Responsive breakpoints

### ESLint & Prettier
Code quality and formatting tools configured for:
- TypeScript support
- React best practices
- Consistent code style

## 📊 Component Examples

### React Chart Component
```tsx
import Chart from '../components/react/Chart';

<Chart
  config={{
    chart: { type: 'line' },
    series: [{ data: [1, 2, 3, 4, 5] }],
    xaxis: { categories: ['A', 'B', 'C', 'D', 'E'] }
  }}
  height={400}
/>
```

### Vue Map Component
```vue
<template>
  <VectorMap
    :data="mapData"
    :config="mapConfig"
    @region-click="handleRegionClick"
  />
</template>
```

### Alpine.js Integration
```html
<div x-data="counter()">
  <button @click="increment()">Count: <span x-text="count"></span></button>
</div>
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Performance

- **Lazy Loading** - Images and components loaded on demand
- **Code Splitting** - Dynamic imports for optimal bundle size
- **Optimized Assets** - Compressed images and minified code
- **Caching** - Browser caching for static assets

## 🔒 Security

- **Type Safety** - TypeScript prevents runtime errors
- **Input Validation** - Form validation and sanitization
- **XSS Protection** - Safe HTML rendering
- **CSRF Protection** - Secure form submissions

## 📈 Analytics

The website includes analytics integration for:
- User behavior tracking
- Performance monitoring
- Error reporting
- Conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@quanco.tech
- Website: https://quanco.tech
- Documentation: https://docs.quanco.tech

## 🎯 Roadmap

- [ ] PWA support
- [ ] Internationalization (i18n)
- [ ] Advanced animations
- [ ] More chart types
- [ ] Real-time data updates
- [ ] Mobile app integration

---

**Built with ❤️ by Quanco Technologies**