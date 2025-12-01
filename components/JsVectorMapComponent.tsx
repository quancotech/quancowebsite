'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    jsVectorMap: any
  }
}

export default function JsVectorMapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.jsVectorMap && mapRef.current) {
      const map = new window.jsVectorMap({
        selector: mapRef.current,
        map: 'world',
        backgroundColor: 'transparent',
        zoomButtons: false,
        zoomOnScroll: false,
        regionStyle: {
          initial: {
            fill: '#007FFF20',
            stroke: '#007FFF',
            strokeWidth: 1,
          },
          hover: {
            fill: '#daa627',
            cursor: 'pointer'
          }
        },
        markers: [
          {
            name: 'USA',
            coords: [40.7128, -74.0060],
            style: {
              fill: '#daa627'
            }
          },
          {
            name: 'UK',
            coords: [51.5074, -0.1278],
            style: {
              fill: '#daa627'
            }
          },
          {
            name: 'Germany',
            coords: [52.5200, 13.4050],
            style: {
              fill: '#daa627'
            }
          },
          {
            name: 'Australia',
            coords: [-33.8688, 151.2093],
            style: {
              fill: '#daa627'
            }
          }
        ],
        markerStyle: {
          initial: {
            fill: '#daa627',
            stroke: '#ffffff',
            strokeWidth: 2,
            r: 8
          },
          hover: {
            fill: '#007FFF',
            r: 12
          }
        },
        onMarkerTooltipShow: function(event: any, tooltip: any, index: any) {
          const clients = [45, 32, 25, 22]
          const revenues = ['$2.5M', '$1.8M', '$1.1M', '$980K']
          tooltip.text(
            `<div style="color: white; padding: 8px;">
              <strong>${tooltip.text()}</strong><br>
              Clients: ${clients[index]}<br>
              Revenue: ${revenues[index]}
            </div>`,
            true
          )
        }
      })

      return () => {
        if (map) {
          map.destroy()
        }
      }
    }
  }, [])

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-highlight-gold mb-4">Global Presence</h3>
      <div ref={mapRef} className="h-64 w-full"></div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-blue">4</div>
          <div className="text-gray-300">Countries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-highlight-gold">124</div>
          <div className="text-gray-300">Global Clients</div>
        </div>
      </div>
    </div>
  )
}
