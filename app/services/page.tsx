'use client'

import { useEffect } from 'react'
import { BarChart3, Brain, Code2, Database, Bot } from 'lucide-react'

const services = [
  {
    id: 'data-science',
    title: 'Data Science',
    icon: <Database className="w-16 h-16" style={{ color: '#daa627' }} strokeWidth={1.5} />,
    description: 'Transform your raw data into actionable insights with our advanced data science solutions. We leverage cutting-edge machine learning algorithms, statistical analysis, and predictive modeling to help you make data-driven decisions.',
    features: [
      'Machine Learning Model Development',
      'Predictive Analytics & Forecasting',
      'Statistical Analysis & Modeling',
      'Data Visualization & Reporting'
    ]
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    icon: <Code2 className="w-16 h-16" style={{ color: '#daa627' }} strokeWidth={1.5} />,
    description: 'End-to-end web and mobile application development using cutting-edge technologies. From concept to deployment, we create scalable, secure, and high-performance solutions.',
    features: [
      'React, Vue.js, Angular Frontend Development',
      'Node.js, Python, Java Backend Services',
      'Database Design & Optimization',
      'Cloud Deployment & DevOps'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    icon: <BarChart3 className="w-16 h-16" style={{ color: '#daa627' }} strokeWidth={1.5} />,
    description: 'Unlock the power of your data with comprehensive analytics solutions. We help you understand trends, identify opportunities, and make informed business decisions through advanced data analysis.',
    features: [
      'Business Intelligence Dashboards',
      'Real-time Data Processing',
      'Custom Reporting Solutions',
      'Data Integration & ETL'
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Engineering',
    icon: <Brain className="w-16 h-16" style={{ color: '#daa627' }} strokeWidth={1.5} />,
    description: 'Build intelligent systems that learn, adapt, and improve over time. Our AI/ML engineering services help you harness the power of artificial intelligence to solve complex business challenges.',
    features: [
      'Custom AI Model Development',
      'Machine Learning Pipeline Setup',
      'Model Training & Optimization',
      'AI System Integration'
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    icon: <Bot className="w-16 h-16" style={{ color: '#daa627' }} strokeWidth={1.5} />,
    description: 'Deploy intelligent autonomous agents that can perform complex tasks, make decisions, and interact with users naturally. Our AI agents are designed to enhance productivity and automate workflows.',
    features: [
      'Conversational AI Chatbots',
      'Task Automation Agents',
      'Intelligent Process Automation',
      'Multi-Agent Systems'
    ]
  }
]

const processSteps = [
  {
    number: '1',
    title: 'Discovery',
    description: 'We analyze your requirements and understand your business goals'
  },
  {
    number: '2',
    title: 'Planning',
    description: 'We create a detailed project plan with timelines and milestones'
  },
  {
    number: '3',
    title: 'Development',
    description: 'We build your solution using cutting-edge technologies'
  },
  {
    number: '4',
    title: 'Deployment',
    description: 'We deploy and maintain your solution with ongoing support'
  }
]

export default function ServicesPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-black via-black to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Our</span>
              <span className="text-yellow-500"> Services</span>
          </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to transform your business and drive innovation
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {services.map((service, index) => (
            <div key={service.id} className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? 'order-2 lg:order-1' : ''}>
                  <div className="text-blue-400 text-6xl mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-white">
                    <span className="text-yellow-500">{service.title}</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500/90 transition-all duration-300 transform hover:scale-105">
                    Get Started
                  </button>
                </div>
                <div className={index % 2 === 0 ? 'order-1 lg:order-2' : ''}>
                  <div className="bg-gradient-to-br from-black/60 to-blue-900/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 group">
                    <div className="text-center">
                      <div className="text-6xl text-yellow-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {index === 0 && '📊'}
                        {index === 1 && '💻'}
                        {index === 2 && '📈'}
                        {index === 3 && '🤖'}
                        {index === 4 && '🎯'}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-500 transition-colors duration-300">
                        {service.title} Solutions
                      </h3>
                      <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                        {service.description}
                      </p>
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="bg-blue-500/10 rounded-lg p-3 group-hover:bg-blue-500/20 transition-all duration-300 transform group-hover:translate-x-2" style={{ transitionDelay: `${featureIndex * 0.1}s` }}>
                            <span className="text-sm text-blue-400 font-semibold group-hover:text-white transition-colors duration-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900/5 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our</span>
              <span className="text-yellow-500"> Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and client satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500/20 transition-colors duration-300 ${
                  index % 2 === 0 ? 'bg-yellow-500/10' : 'bg-blue-500/10'
                }`}>
                  <span className={`text-3xl font-bold ${
                    index % 2 === 0 ? 'text-yellow-500' : 'text-blue-400'
                  }`}>{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Ready to Get</span>
            <span className="text-yellow-500 block">Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution that drives your business forward
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500/90 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
            <button className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105">
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}