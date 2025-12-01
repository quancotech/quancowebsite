// Global type definitions for Quanco Technologies

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  initials: string;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'data-science' | 'full-stack' | 'ai-ml' | 'analytics' | 'ai-agents';
  liveUrl?: string;
  githubUrl?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface MapData {
  name: string;
  value: number;
  coordinates: [number, number];
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface TechStackItem {
  name: string;
  version: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'deployment';
  icon?: string;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface SwiperConfig {
  slidesPerView: number;
  spaceBetween: number;
  loop: boolean;
  autoplay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
  pagination?: {
    clickable: boolean;
  };
  navigation?: boolean;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

export interface FlatpickrConfig {
  dateFormat: string;
  enableTime?: boolean;
  time_24hr?: boolean;
  minDate?: string;
  maxDate?: string;
  mode?: 'single' | 'multiple' | 'range';
  locale?: string;
}

export interface ApexChartConfig {
  chart: {
    type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'boxPlot' | 'candlestick' | 'radar' | 'polarArea';
    height?: number;
    width?: number;
    animations?: {
      enabled: boolean;
      easing: string;
      speed: number;
    };
  };
  series: any[];
  xaxis?: {
    categories?: string[];
    type?: 'category' | 'datetime' | 'numeric';
  };
  yaxis?: {
    title?: {
      text: string;
    };
  };
  title?: {
    text: string;
    align?: 'left' | 'center' | 'right';
  };
  colors?: string[];
  legend?: {
    position?: 'top' | 'bottom' | 'left' | 'right';
    horizontalAlign?: 'left' | 'center' | 'right';
  };
}

export interface VectorMapConfig {
  map: string;
  backgroundColor: string;
  regionStyle: {
    initial: {
      fill: string;
      'fill-opacity': number;
      stroke: string;
      'stroke-width': number;
      'stroke-opacity': number;
    };
    hover: {
      'fill-opacity': number;
      cursor: string;
    };
    selected: {
      fill: string;
    };
    selectedHover: {
      fill: string;
    };
  };
  series: {
    regions: Array<{
      values: Record<string, number>;
      scale: [string, string];
      normalizeFunction: 'polynomial' | 'linear';
    }>;
  };
  onRegionClick?: (event: Event, code: string) => void;
  onRegionTipShow?: (event: Event, tip: HTMLElement, code: string) => void;
}

// Utility types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr' | 'de';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  hover?: boolean;
  glow?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
