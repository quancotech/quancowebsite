import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { ApexChartConfig } from '../../types';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartProps {
  config: ApexChartConfig;
  height?: number;
  width?: string | number;
  className?: string;
}

const ApexChart: React.FC<ChartProps> = ({ 
  config, 
  height = 350, 
  width = '100%', 
  className = '' 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add any chart-specific initialization here
    if (chartRef.current) {
      // Chart is ready
    }
  }, []);

  return (
    <div ref={chartRef} className={`chart-container ${className}`}>
      <Chart
        options={config}
        series={config.series}
        type={config.chart.type}
        height={height}
        width={width}
      />
    </div>
  );
};

export default ApexChart;
