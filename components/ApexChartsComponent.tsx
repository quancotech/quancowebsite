'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    ApexCharts: any
  }
}

export default function ApexChartsComponent() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ApexCharts && chartRef.current) {
      const options = {
        series: [{
          name: 'Projects Completed',
          data: [15, 25, 35, 45, 55, 65]
        }, {
          name: 'Client Satisfaction',
          data: [85, 88, 92, 95, 97, 99]
        }],
        chart: {
          height: 350,
          type: 'area',
          background: 'transparent',
          toolbar: {
            show: false
          }
        },
        theme: {
          mode: 'dark'
        },
        colors: ['#007FFF', '#daa627'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        xaxis: {
          type: 'datetime',
          categories: ["2019-01-01", "2020-01-01", "2021-01-01", "2022-01-01", "2023-01-01", "2024-01-01"],
          labels: {
            style: {
              colors: '#ffffff'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#ffffff'
            }
          }
        },
        grid: {
          borderColor: '#007FFF20'
        },
        legend: {
          labels: {
            colors: '#ffffff'
          }
        },
        tooltip: {
          x: {
            format: 'yyyy'
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        }
      }

      const chart = new window.ApexCharts(chartRef.current, options)
      chart.render()

      return () => {
        chart.destroy()
      }
    }
  }, [])

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-highlight-gold mb-4">Company Growth</h3>
      <div ref={chartRef} id="apex-chart"></div>
    </div>
  )
}
