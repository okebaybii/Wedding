import React, { useMemo } from 'react'
import { Sparkles } from 'lucide-react'

interface WeddingFloralFlanksProps {
  className?: string
  sparkleCount?: number
}

export const WeddingFloralFlanks: React.FC<WeddingFloralFlanksProps> = ({
  className = '',
  sparkleCount = 18,
}) => {
  // Generate random sparkles for left and right flanks
  const leftSparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }).map((_, i) => ({
      id: `ls-${i}`,
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 85 + 5}%`,
      size: Math.random() * 12 + 6,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(Math.random() * 3 + 2.5).toFixed(2)}s`,
      opacity: Math.random() * 0.6 + 0.4,
    }))
  }, [sparkleCount])

  const rightSparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }).map((_, i) => ({
      id: `rs-${i}`,
      top: `${Math.random() * 90 + 5}%`,
      right: `${Math.random() * 85 + 5}%`,
      size: Math.random() * 12 + 6,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(Math.random() * 3 + 2.5).toFixed(2)}s`,
      opacity: Math.random() * 0.6 + 0.4,
    }))
  }, [sparkleCount])

  // Falling petals data
  const petals = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `petal-${i}`,
      isLeft: i % 2 === 0,
      left: i % 2 === 0 ? `${Math.random() * 70 + 10}%` : undefined,
      right: i % 2 !== 0 ? `${Math.random() * 70 + 10}%` : undefined,
      top: `${Math.random() * -20}%`,
      size: Math.random() * 14 + 10,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      duration: `${(Math.random() * 6 + 7).toFixed(2)}s`,
      rot: Math.random() * 360,
    }))
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-15 ${className}`}
    >
      {/* ========================================================
          LEFT FLORAL FLANK (VÒM HOA CƯỚI HOÀNG GIA BÊN TRÁI)
      ======================================================== */}
      <div className="absolute top-0 bottom-0 left-0 w-36 sm:w-56 md:w-72 lg:w-84 xl:w-96 overflow-hidden">
        {/* Soft atmospheric golden mist glow behind flowers */}
        <div className="absolute top-1/4 -left-12 w-80 h-96 rounded-full bg-gradient-to-r from-gold/25 via-champagne/15 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -left-16 w-80 h-96 rounded-full bg-gradient-to-r from-rose-400/15 via-gold/10 to-transparent blur-3xl" />

        {/* Photorealistic High-Res Curated Wedding Floral Garlands */}
        {/* Top-left cascading floral bouquet */}
        <div className="absolute -top-6 -left-8 w-56 sm:w-72 md:w-96 h-72 sm:h-96 opacity-95 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)] transform -rotate-6 scale-105 transition-transform duration-1000 ease-out">
          <img
            src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop"
            alt="Hoa cưới bên trái"
            className="w-full h-full object-cover rounded-br-[120px] mask-radial-fade opacity-85 hover:opacity-100 transition-opacity"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 10% 10%, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 10% 10%, black 50%, transparent 95%)',
            }}
          />
        </div>

        {/* Mid-left lush white roses & greenery garland */}
        <div className="absolute top-1/3 -left-12 w-48 sm:w-64 md:w-80 h-80 sm:h-96 opacity-90 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transform rotate-3 scale-100">
          <img
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
            alt="Hoa hồng trắng bên trái"
            className="w-full h-full object-cover rounded-r-[100px]"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 15% 50%, black 45%, transparent 92%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 15% 50%, black 45%, transparent 92%)',
            }}
          />
        </div>

        {/* Bottom-left cascading bridal peonies bouquet */}
        <div className="absolute -bottom-8 -left-10 w-56 sm:w-72 md:w-96 h-72 sm:h-96 opacity-95 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)] transform rotate-6 scale-105">
          <img
            src="https://images.unsplash.com/photo-1519225424976-135832a82967?q=80&w=800&auto=format&fit=crop"
            alt="Cụm hoa cưới góc dưới trái"
            className="w-full h-full object-cover rounded-tr-[120px]"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 10% 90%, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 10% 90%, black 50%, transparent 95%)',
            }}
          />
        </div>

        {/* Artistic French Gilded Floral Vines & Acanthus Scrollwork Overlay */}
        <svg
          viewBox="0 0 200 800"
          className="absolute inset-y-0 left-0 h-full w-full opacity-60 mix-blend-screen"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main golden botanical vine curve */}
          <path
            d="M -10 0 C 80 120, 120 280, 50 420 C 0 540, 130 680, 20 800"
            stroke="url(#goldVineGradLeft)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <path
            d="M 10 30 C 95 160, 85 240, 30 350 C -10 460, 90 590, 5 750"
            stroke="url(#goldVineGradLeft)"
            strokeWidth="1.2"
          />
          {/* Delicate leaf buds */}
          {[60, 140, 220, 300, 380, 460, 540, 620, 700].map((y, idx) => (
            <g key={idx} transform={`translate(${Math.sin(idx) * 25 + 40}, ${y}) rotate(${idx * 35})`}>
              <ellipse cx="0" cy="0" rx="14" ry="6" fill="url(#goldLeafGradLeft)" opacity="0.75" />
              <circle cx="0" cy="0" r="3" fill="#FFF9D2" />
            </g>
          ))}
          <defs>
            <linearGradient id="goldVineGradLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#AA771C" />
              <stop offset="50%" stopColor="#FBF5B7" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="goldLeafGradLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sparkling golden lights & glowing orbs on left flank */}
        {leftSparkles.map((sp) => (
          <div
            key={sp.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: sp.top,
              left: sp.left,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              background: 'radial-gradient(circle, rgba(255,250,220,1) 0%, rgba(212,175,55,0.7) 45%, rgba(212,175,55,0) 80%)',
              boxShadow: '0 0 12px 2px rgba(255,223,128,0.7)',
              animation: `pulse ${sp.duration} ease-in-out infinite`,
              animationDelay: sp.delay,
              opacity: sp.opacity,
            }}
          />
        ))}

        {/* Vignette shadow blending left edge into center */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-black/70 pointer-events-none" />
      </div>

      {/* ========================================================
          RIGHT FLORAL FLANK (VÒM HOA CƯỚI HOÀNG GIA BÊN PHẢI)
      ======================================================== */}
      <div className="absolute top-0 bottom-0 right-0 w-36 sm:w-56 md:w-72 lg:w-84 xl:w-96 overflow-hidden">
        {/* Soft atmospheric golden mist glow behind flowers */}
        <div className="absolute top-1/4 -right-12 w-80 h-96 rounded-full bg-gradient-to-l from-gold/25 via-champagne/15 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 w-80 h-96 rounded-full bg-gradient-to-l from-rose-400/15 via-gold/10 to-transparent blur-3xl" />

        {/* Photorealistic High-Res Curated Wedding Floral Garlands */}
        {/* Top-right cascading floral bouquet */}
        <div className="absolute -top-6 -right-8 w-56 sm:w-72 md:w-96 h-72 sm:h-96 opacity-95 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)] transform rotate-6 scale-105 transition-transform duration-1000 ease-out">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
            alt="Hoa cưới góc trên phải"
            className="w-full h-full object-cover rounded-bl-[120px]"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 90% 10%, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 90% 10%, black 50%, transparent 95%)',
            }}
          />
        </div>

        {/* Mid-right lush blush peonies & ivory blossoms */}
        <div className="absolute top-1/3 -right-12 w-48 sm:w-64 md:w-80 h-80 sm:h-96 opacity-90 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transform -rotate-3 scale-100">
          <img
            src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=800&auto=format&fit=crop"
            alt="Hoa mẫu đơn bên phải"
            className="w-full h-full object-cover rounded-l-[100px]"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 85% 50%, black 45%, transparent 92%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 85% 50%, black 45%, transparent 92%)',
            }}
          />
        </div>

        {/* Bottom-right cascading bridal rose garland */}
        <div className="absolute -bottom-8 -right-10 w-56 sm:w-72 md:w-96 h-72 sm:h-96 opacity-95 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)] transform -rotate-6 scale-105">
          <img
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop"
            alt="Cụm hoa cưới góc dưới phải"
            className="w-full h-full object-cover rounded-tl-[120px]"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 90% 90%, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 90% 90%, black 50%, transparent 95%)',
            }}
          />
        </div>

        {/* Artistic French Gilded Floral Vines & Acanthus Scrollwork Overlay */}
        <svg
          viewBox="0 0 200 800"
          className="absolute inset-y-0 right-0 h-full w-full opacity-60 mix-blend-screen scale-x-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main golden botanical vine curve */}
          <path
            d="M -10 0 C 80 120, 120 280, 50 420 C 0 540, 130 680, 20 800"
            stroke="url(#goldVineGradRight)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <path
            d="M 10 30 C 95 160, 85 240, 30 350 C -10 460, 90 590, 5 750"
            stroke="url(#goldVineGradRight)"
            strokeWidth="1.2"
          />
          {/* Leaf buds */}
          {[60, 140, 220, 300, 380, 460, 540, 620, 700].map((y, idx) => (
            <g key={idx} transform={`translate(${Math.sin(idx) * 25 + 40}, ${y}) rotate(${idx * 35})`}>
              <ellipse cx="0" cy="0" rx="14" ry="6" fill="url(#goldLeafGradRight)" opacity="0.75" />
              <circle cx="0" cy="0" r="3" fill="#FFF9D2" />
            </g>
          ))}
          <defs>
            <linearGradient id="goldVineGradRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#AA771C" />
              <stop offset="50%" stopColor="#FBF5B7" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="goldLeafGradRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sparkling golden lights on right flank */}
        {rightSparkles.map((sp) => (
          <div
            key={sp.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: sp.top,
              right: sp.right,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              background: 'radial-gradient(circle, rgba(255,250,220,1) 0%, rgba(212,175,55,0.7) 45%, rgba(212,175,55,0) 80%)',
              boxShadow: '0 0 12px 2px rgba(255,223,128,0.7)',
              animation: `pulse ${sp.duration} ease-in-out infinite`,
              animationDelay: sp.delay,
              opacity: sp.opacity,
            }}
          />
        ))}

        {/* Vignette shadow blending right edge into center */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-l from-transparent to-black/70 pointer-events-none" />
      </div>

      {/* ========================================================
          GENTLE FLOATING ROSE PETALS (CÁNH HOA RƠI LÃNG MẠNG)
      ======================================================== */}
      {petals.map((pt) => (
        <div
          key={pt.id}
          className="absolute pointer-events-none"
          style={{
            top: pt.top,
            left: pt.left,
            right: pt.right,
            width: `${pt.size}px`,
            height: `${pt.size * 1.3}px`,
            background: 'radial-gradient(ellipse at 30% 30%, #FAD4D8 0%, #E89DA5 60%, #B84D58 100%)',
            borderRadius: '50% 50% 50% 0',
            transform: `rotate(${pt.rot}deg)`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            opacity: 0.75,
            animation: `floatPetal ${pt.duration} linear infinite`,
            animationDelay: pt.delay,
          }}
        />
      ))}
    </div>
  )
}
