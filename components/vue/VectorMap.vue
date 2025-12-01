<template>
  <div ref="mapContainer" class="vector-map-container" :class="containerClass">
    <div v-if="loading" class="map-loading">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { VectorMapConfig, MapData } from '../../types';

interface Props {
  data: MapData[];
  config?: Partial<VectorMapConfig>;
  containerClass?: string;
  height?: number;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: '',
  height: 400,
  width: '100%'
});

const emit = defineEmits<{
  regionClick: [code: string, data: MapData];
  regionHover: [code: string, data: MapData];
}>();

const mapContainer = ref<HTMLElement>();
const loading = ref(true);
let mapInstance: any = null;

const defaultConfig: VectorMapConfig = {
  map: 'world_mill',
  backgroundColor: '#000000',
  regionStyle: {
    initial: {
      fill: '#007FFF',
      'fill-opacity': 0.8,
      stroke: '#daa627',
      'stroke-width': 1,
      'stroke-opacity': 1
    },
    hover: {
      'fill-opacity': 1,
      cursor: 'pointer'
    },
    selected: {
      fill: '#daa627'
    },
    selectedHover: {
      fill: '#daa627'
    }
  },
  series: {
    regions: [{
      values: {},
      scale: ['#007FFF', '#daa627'],
      normalizeFunction: 'polynomial'
    }]
  }
};

const initializeMap = async () => {
  if (!mapContainer.value) return;

  try {
    // Dynamically import jsvectormap
    const { VectorMap } = await import('jsvectormap');
    
    // Prepare data
    const values: Record<string, number> = {};
    props.data.forEach(item => {
      values[item.name] = item.value;
    });

    const config = {
      ...defaultConfig,
      ...props.config,
      container: mapContainer.value,
      series: {
        regions: [{
          values,
          scale: ['#007FFF', '#daa627'],
          normalizeFunction: 'polynomial'
        }]
      },
      onRegionClick: (event: Event, code: string) => {
        const regionData = props.data.find(item => item.name === code);
        if (regionData) {
          emit('regionClick', code, regionData);
        }
      },
      onRegionTipShow: (event: Event, tip: HTMLElement, code: string) => {
        const regionData = props.data.find(item => item.name === code);
        if (regionData) {
          tip.innerHTML = `
            <div class="p-2">
              <div class="font-semibold text-white">${regionData.name}</div>
              <div class="text-accent-blue">Value: ${regionData.value}</div>
            </div>
          `;
          emit('regionHover', code, regionData);
        }
      }
    };

    mapInstance = new VectorMap(config);
    loading.value = false;
  } catch (error) {
    console.error('Error initializing vector map:', error);
    loading.value = false;
  }
};

const destroyMap = () => {
  if (mapInstance) {
    mapInstance.destroy();
    mapInstance = null;
  }
};

onMounted(() => {
  initializeMap();
});

onUnmounted(() => {
  destroyMap();
});

watch(() => props.data, () => {
  if (mapInstance) {
    destroyMap();
    initializeMap();
  }
}, { deep: true });

watch(() => props.config, () => {
  if (mapInstance) {
    destroyMap();
    initializeMap();
  }
}, { deep: true });
</script>

<style scoped>
.vector-map-container {
  position: relative;
  width: v-bind(width);
  height: v-bind(height + 'px');
  background: #000000;
  border-radius: 0.5rem;
  overflow: hidden;
}

.map-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

:deep(.jvectormap-container) {
  width: 100% !important;
  height: 100% !important;
}

:deep(.jvectormap-tip) {
  background: rgba(0, 0, 0, 0.9) !important;
  border: 1px solid #007FFF !important;
  border-radius: 0.5rem !important;
  color: white !important;
  font-size: 14px !important;
  padding: 8px !important;
}
</style>
