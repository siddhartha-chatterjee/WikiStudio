"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PageTransition from "./page-transition"
import Link from "next/link"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleStartWriting = () => {
    setIsTransitioning(true)
  }

  const handleNavigate = () => {
    router.push("/writings")
  }

  const handleTransitionComplete = () => {
    setIsTransitioning(false)
  }

  return (
    <>
      <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
        {/* Starry Space Background */}
        <div className="absolute inset-0">
          {/* Base space gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-purple-950" />

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
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-9xl mx-auto">
          {/* Main Title with 3D effect */}
          <div className="mb-6 sm:mb-8">
            <h1
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 leading-none tracking-tighter"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)",
                transform: "perspective(1000px) rotateX(5deg) sm:rotateX(10deg)",
                filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.5))",
              }}
            >
              WIKISTUDIO
            </h1>
          </div>

          {/* Description */}
          <div className="mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto">
            <p
              className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed px-2 sm:px-0"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                transform: "perspective(600px) rotateX(1deg) sm:rotateX(2deg)",
              }}
            >
              The ultimate AI-powered platform for creating high-quality Wikipedia articles. Streamline your content
              creation process with advanced writing assistance, plagiarism detection, and grammar optimization.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-0">
            <button
              onClick={handleStartWriting}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3), 0 0 30px rgba(147, 51, 234, 0.2)",
                transform: "perspective(400px) rotateX(-1deg) sm:rotateX(-2deg)",
              }}
            >
              Start Writing Now
            </button>

            <button
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-semibold border-2 border-gray-400 text-gray-300 hover:bg-gray-800 hover:border-gray-300 bg-transparent backdrop-blur-sm shadow-xl transform transition-all duration-300 hover:scale-105 rounded-lg cursor-pointer"
              style={{
                boxShadow: "0 5px 20px rgba(255, 255, 255, 0.1)",
                transform: "perspective(400px) rotateX(-1deg) sm:rotateX(-2deg)",
              }}
            >
                <Link href={"#features"}>Learn More</Link>
              
            </button>
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
        `}</style>
      </div>

      <PageTransition isActive={isTransitioning} onNavigate={handleNavigate} onComplete={handleTransitionComplete} />
    </>
  )
}
