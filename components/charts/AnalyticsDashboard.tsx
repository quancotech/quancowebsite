'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function AnalyticsDashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(dashboardRef.current?.children || [], {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dashboardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }, dashboardRef)

    return () => ctx.revert()
  }, [])

  const lineChartOptions = {
    chart: {
      type: 'line' as const,
      height: 350,
      background: 'transparent',
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
    theme: {
      mode: 'dark' as const
    },
    colors: ['#007FFF', '#daa627', '#ffffff'],
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    title: {
      text: 'Monthly Performance Metrics',
      align: 'left' as const,
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    }
  }

  const lineChartSeries = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 160, 180]
    },
    {
      name: 'Users',
      data: [23, 12, 54, 61, 32, 56, 81, 19, 45, 67, 89, 95]
    },
    {
      name: 'Projects',
      data: [10, 15, 12, 18, 20, 25, 30, 35, 40, 45, 50, 55]
    }
  ]

  const donutChartOptions = {
    chart: {
      type: 'donut' as const,
      height: 350,
      background: 'transparent'
    },
    theme: {
      mode: 'dark' as const
    },
    colors: ['#007FFF', '#daa627', '#ffffff', '#10B981', '#F59E0B'],
    labels: ['Data Science', 'Full Stack', 'AI/ML', 'Analytics', 'Consulting'],
    legend: {
      position: 'bottom' as const,
      labels: {
        colors: '#ffffff'
      }
    },
    title: {
      text: 'Service Distribution',
      align: 'center' as const,
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Projects',
              color: '#ffffff',
              formatter: () => '100'
            }
          }
        }
      }
    }
  }

  const donutChartSeries = [35, 25, 20, 15, 5]

  const barChartOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
      background: 'transparent'
    },
    theme: {
      mode: 'dark' as const
    },
    colors: ['#007FFF', '#daa627'],
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
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
    title: {
      text: 'Quarterly Growth',
      align: 'left' as const,
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    }
  }

  const barChartSeries = [
    {
      name: '2023',
      data: [44, 55, 57, 56]
    },
    {
      name: '2024',
      data: [76, 85, 101, 98]
    }
  ]

  return (
    <div ref={dashboardRef} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="glass-card p-6">
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={350}
          />
        </div>

        {/* Donut Chart */}
        <div className="glass-card p-6">
          <Chart
            options={donutChartOptions}
            series={donutChartSeries}
            type="donut"
            height={350}
          />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass-card p-6">
        <Chart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  )
}