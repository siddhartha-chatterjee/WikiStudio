"use client"
import { useState, useEffect } from "react"

export default function Features() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Writing",
      description:
        "Advanced AI algorithms help you create comprehensive, well-structured Wikipedia articles with proper citations and references.",
      highlights: ["Smart content generation", "Automatic fact-checking", "Citation suggestions"],
    },
    {
      icon: "🔍",
      title: "Plagiarism Detection",
      description:
        "Built-in plagiarism checker ensures your content is original and meets Wikipedia's strict standards for authenticity.",
      highlights: ["Real-time scanning", "Source verification", "Originality reports"],
    },
    {
      icon: "✍️",
      title: "Grammar Optimization",
      description:
        "Intelligent grammar and style checker helps maintain Wikipedia's professional writing standards and tone.",
      highlights: ["Style consistency", "Tone analysis", "Writing suggestions"],
    }
    
  ]

  const stats = [
    { number: "10K+", label: "Articles Created" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "50+", label: "Languages Supported" },
    { number: "0%", label: "Plagiarism Rate" },
  ]

  return (
    <div id="features" className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects - Same as Hero */}
      <div className="absolute inset-0">
        {/* Base space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-purple-950" />

        {/* White Grid Background with Warp Effect */}
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{
              transform: `perspective(1000px) rotateX(60deg) rotateY(0deg)`,
              transformOrigin: "center center",
            }}
          >
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              </pattern>
              <filter id="warp">
                <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" className="warp-displacement" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
              filter="url(#warp)"
              className="grid-warp"
              style={{
                transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
              }}
            />
          </svg>
        </div>

        {/* Additional Grid Layers for Depth */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={`grid-line-h-${i}`}
              className="absolute w-full h-px bg-white"
              style={{
                top: `${i * 5}%`,
                transform: `perspective(800px) rotateX(45deg) translateZ(${i * 10}px)`,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`grid-line-v-${i}`}
              className="absolute h-full w-px bg-white"
              style={{
                left: `${i * 5}%`,
                transform: `perspective(800px) rotateX(45deg) translateZ(${i * 10}px)`,
              }}
            />
          ))}
        </div>

        {/* Nebula clouds */}
        <div className="absolute inset-0">
          <div
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-purple-600/10 via-blue-600/5 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-16 sm:bottom-32 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-l from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse"
            style={{ animationDuration: "12s", animationDelay: "4s" }}
          />
        </div>

        {/* Moving blue sprint lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`sprint-line-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80"
              style={{
                top: `${Math.random() * 100}%`,
                width: "200px",
                animation: `sprintLine 2s ease-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Central radial gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 sm:mb-24">
            <h1
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 leading-none tracking-tighter mb-6"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)",
                transform: "perspective(1000px) rotateX(5deg) sm:rotateX(10deg)",
                filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.5))",
              }}
            >
              Powerful Features
            </h1>
            <p
              className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                transform: "perspective(600px) rotateX(1deg) sm:rotateX(2deg)",
              }}
            >
              Everything you need to create professional, high-quality Wikipedia articles with AI-powered assistance
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group"
                style={{
                  transform: "perspective(400px) rotateX(-2deg)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-purple-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative"
                style={{
                  transform: "perspective(400px) rotateX(-2deg)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="h-full p-6 sm:p-8 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:scale-105">
                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>

      <style jsx>{`
        @keyframes sprintLine {
          0% {
            transform: translateX(-250px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 250px));
            opacity: 0;
          }
        }

        .grid-warp:hover {
          filter: url(#warp);
        }

        .grid-warp:hover .warp-displacement {
          scale: 20;
          transition: scale 0.3s ease-out;
        }

        @media (hover: hover) {
          .grid-warp {
            transition: transform 0.1s ease-out;
          }
          
          .grid-warp:hover {
            transform: scale(1.02) perspective(1200px) rotateX(65deg);
          }
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
