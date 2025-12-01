import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import AnalyticsDashboard from '@/components/charts/AnalyticsDashboard'
import InteractiveMap from '@/components/InteractiveMap'
import DatePickerDemo from '@/components/DatePickerDemo'
import SwiperCarousel from '@/components/SwiperCarousel'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function DemoPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Interactive</span>
              <span className="text-highlight-gold"> Demo</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience our tech stack in action with live demonstrations
            </p>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-16">
              {/* Analytics Dashboard */}
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">
                  <span className="text-white">Apex Charts</span>
                  <span className="text-highlight-gold"> Analytics</span>
                </h2>
                <AnalyticsDashboard />
              </section>

              {/* Interactive Map */}
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">
                  <span className="text-white">Interactive</span>
                  <span className="text-highlight-gold"> Maps</span>
                </h2>
                <InteractiveMap />
              </section>

              {/* Date Picker */}
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">
                  <span className="text-white">Date Picker</span>
                  <span className="text-highlight-gold"> Component</span>
                </h2>
                <DatePickerDemo />
              </section>

              {/* Swiper Carousel */}
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">
                  <span className="text-white">Swiper</span>
                  <span className="text-highlight-gold"> Carousel</span>
                </h2>
                <SwiperCarousel />
              </section>
            </div>
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}
