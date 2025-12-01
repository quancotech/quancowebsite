import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { ChartData, ApexChartConfig } from '../../types';

const Chart = dynamic(() => import('./Chart'), { ssr: false });

interface DataVisualizationProps {
  data: ChartData;
  title?: string;
  type?: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  height?: number;
  className?: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  data,
  title = 'Data Visualization',
  type = 'line',
  height = 350,
  className = ''
}) => {
  const [chartConfig, setChartConfig] = useState<ApexChartConfig | null>(null);

  useEffect(() => {
    const config: ApexChartConfig = {
      chart: {
        type: type as any,
        height: height,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        }
      },
      series: data.datasets.map(dataset => ({
        name: dataset.label,
        data: dataset.data
      })),
      xaxis: {
        categories: data.labels,
        type: 'category'
      },
      yaxis: {
        title: {
          text: 'Value'
        }
      },
      title: {
        text: title,
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: '#ffffff'
        }
      },
      colors: data.datasets.map((_, index) => {
        const colors = ['#007FFF', '#daa627', '#ff6b6b', '#4ecdc4', '#45b7d1'];
        return colors[index % colors.length];
      }),
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: '#ffffff'
        }
      },
      grid: {
        borderColor: '#374151',
        strokeDashArray: 4
      },
      theme: {
        mode: 'dark'
      }
    };

    setChartConfig(config);
  }, [data, title, type, height]);

  if (!chartConfig) {
    return (
      <div className={`flex items-center justify-center h-${height} bg-primary-bg/50 rounded-lg ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  return (
    <div className={`data-visualization ${className}`}>
      <Chart config={chartConfig} height={height} />
    </div>
  );
};

export default DataVisualization;
