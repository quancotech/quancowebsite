<template>
  <div 
    class="interactive-card"
    :class="[
      cardClass,
      { 'hover-enabled': hover, 'glow-enabled': glow }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div v-if="image" class="card-image">
      <img :src="image" :alt="title" />
    </div>
    
    <div class="card-content">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="description" class="card-description">{{ description }}</p>
      <slot></slot>
    </div>
    
    <div v-if="showOverlay" class="card-overlay">
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CardProps } from '../../types';

interface Props extends CardProps {
  hover?: boolean;
  glow?: boolean;
  showOverlay?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  glow: false,
  showOverlay: false,
  clickable: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  mouseEnter: [event: MouseEvent];
  mouseLeave: [event: MouseEvent];
}>();

const isHovered = ref(false);

const cardClass = computed(() => {
  return [
    'group bg-gradient-to-br from-primary-bg/60 to-accent-blue/5 backdrop-blur-sm border border-accent-blue/20 rounded-2xl p-8 transition-all duration-700 transform',
    {
      'hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-highlight-gold/10': props.hover,
      'hover:border-highlight-gold/50': props.hover,
      'cursor-pointer': props.clickable,
      'animate-glow': props.glow && isHovered.value
    }
  ];
});

const handleMouseEnter = (event: MouseEvent) => {
  isHovered.value = true;
  emit('mouseEnter', event);
};

const handleMouseLeave = (event: MouseEvent) => {
  isHovered.value = false;
  emit('mouseLeave', event);
};

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event);
  }
};
</script>

<style scoped>
.interactive-card {
  position: relative;
  overflow: hidden;
}

.interactive-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(218, 166, 39, 0.1), transparent);
  transition: left 0.5s;
}

.interactive-card.hover-enabled:hover::before {
  left: 100%;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.interactive-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.interactive-card:hover .card-title {
  color: #daa627;
}

.card-description {
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.interactive-card:hover .card-description {
  color: #e5e7eb;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}

.interactive-card:hover .card-overlay {
  opacity: 1;
}

.glow-enabled.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px #daa627;
  }
  50% {
    box-shadow: 0 0 20px #daa627, 0 0 30px #daa627;
  }
}
</style>
