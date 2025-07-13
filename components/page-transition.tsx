"use client"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  isActive: boolean
  onNavigate: () => void
  onComplete: () => void
}

export default function PageTransition({ isActive, onNavigate, onComplete }: PageTransitionProps) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    if (isActive) {
      // Generate stars for tunnel effect
      const newStars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 5 + 2,
      }))
      setStars(newStars)

      // Navigate halfway through the transition
      const navigateTimer = setTimeout(() => {
        onNavigate()
      }, 750) // Navigate at 50% of transition

      // Complete transition after animation
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 1500)

      return () => {
        clearTimeout(navigateTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, onNavigate, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Tunnel Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-indigo-950/50 to-black">
        {/* Animated Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `starTunnel 1.5s ease-out forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}

        {/* Central Warp Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-transparent via-blue-400 to-transparent"
              style={{
                height: "100vh",
                transform: `rotate(${i * 45}deg)`,
                animation: `warpLine 1.5s ease-out forwards`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Center Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-4 h-4 bg-white rounded-full"
            style={{
              animation: `centerGlow 1.5s ease-out forwards`,
              boxShadow: "0 0 50px rgba(255,255,255,0.8), 0 0 100px rgba(59,130,246,0.6)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes starTunnel {
          0% {
            transform: scale(1) translateZ(0);
            opacity: 1;
          }
          100% {
            transform: scale(20) translateZ(1000px);
            opacity: 0;
          }
        }

        @keyframes warpLine {
          0% {
            opacity: 0;
            transform: rotate(var(--rotation)) scaleY(0);
          }
          50% {
            opacity: 1;
            transform: rotate(var(--rotation)) scaleY(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) scaleY(2);
          }
        }

        @keyframes centerGlow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(5);
            opacity: 0.8;
          }
          100% {
            transform: scale(50);
            opacity: 0;
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
