import React, { useMemo } from 'react'

interface WeddingFloralFlanksProps {
  className?: string
  sparkleCount?: number
}

export const WeddingFloralFlanks: React.FC<WeddingFloralFlanksProps> = ({
  className = '',
  sparkleCount = 16,
}) => {
  // Generate random ethereal crystal & fairy lights for flanks
  const leftSparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }).map((_, i) => ({
      id: `ls-${i}`,
      top: `${Math.random() * 88 + 6}%`,
      left: `${Math.random() * 80 + 8}%`,
      size: Math.random() * 8 + 4,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(Math.random() * 3 + 2.5).toFixed(2)}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }))
  }, [sparkleCount])

  const rightSparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }).map((_, i) => ({
      id: `rs-${i}`,
      top: `${Math.random() * 88 + 6}%`,
      right: `${Math.random() * 80 + 8}%`,
      size: Math.random() * 8 + 4,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(Math.random() * 3 + 2.5).toFixed(2)}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }))
  }, [sparkleCount])

  // Falling white & pale ice-blue rose petals
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: `petal-${i}`,
      isLeft: i % 2 === 0,
      left: i % 2 === 0 ? `${Math.random() * 45 + 2}%` : undefined,
      right: i % 2 !== 0 ? `${Math.random() * 45 + 2}%` : undefined,
      top: `${Math.random() * -20}%`,
      size: Math.random() * 12 + 10,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      duration: `${(Math.random() * 6 + 8).toFixed(2)}s`,
      rot: Math.random() * 360,
    }))
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-15 ${className}`}
    >
      {/* ========================================================
          TOP CEILING FLORAL GARLAND (VÒM HOA RỦ TỪ TRÊN XUỐNG)
          Như hình mẫu: Hoa trắng rủ buông lơi trên đỉnh rèm xanh
      ======================================================== */}
      <div className="absolute -top-6 inset-x-0 h-28 sm:h-36 overflow-hidden flex justify-between pointer-events-none opacity-90">
        {/* Top left floral wisteria cascade */}
        <div className="w-1/2 max-w-lg h-full">
          <img
            src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop"
            alt="Vòm hoa rủ trên"
            className="w-full h-full object-cover object-top opacity-75 filter brightness-110"
            style={{
              maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
            }}
          />
        </div>
        {/* Top right floral wisteria cascade */}
        <div className="w-1/2 max-w-lg h-full scale-x-[-1]">
          <img
            src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop"
            alt="Vòm hoa rủ trên"
            className="w-full h-full object-cover object-top opacity-75 filter brightness-110"
            style={{
              maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
            }}
          />
        </div>
      </div>

      {/* ========================================================
          LEFT FLANK: RÈM LỤA XANH DUSTY BLUE & LỌ HOA TRẮNG CAO
          Đúng chuẩn mẫu ảnh: Rèm xanh rủ thanh nhã, bình hoa trắng
          muốt cổ điển, thảm hoa baby trắng bồng bềnh dưới chân
      ======================================================== */}
      <div className="absolute top-0 bottom-0 left-0 w-44 sm:w-64 md:w-80 lg:w-96 xl:w-[420px] overflow-hidden">
        {/* Ethereal blue ambient aura behind drapes */}
        <div className="absolute top-1/3 -left-10 w-96 h-[500px] rounded-full bg-gradient-to-r from-[#3B5D7E]/50 via-[#5B82A6]/30 to-transparent blur-3xl" />
        <div className="absolute bottom-10 -left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-white/20 via-[#4F7396]/25 to-transparent blur-2xl" />

        {/* 1. French Dusty Blue Satin Curtain Drapery (Rèm lụa xanh rủ lượn) */}
        <div
          className="absolute inset-y-0 left-0 w-36 sm:w-48 md:w-60 lg:w-72 opacity-85 filter drop-shadow-[5px_0_20px_rgba(15,30,45,0.4)]"
          style={{
            background: 'linear-gradient(90deg, #1C334A 0%, #2A4866 25%, #3B5F84 50%, #4E7399 75%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 95% 100% at 0% 50%, black 75%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 95% 100% at 0% 50%, black 75%, transparent 100%)',
          }}
        >
          {/* Subtle silk fabric folds */}
          <div className="absolute inset-y-0 left-6 w-3 sm:w-4 bg-gradient-to-r from-black/20 via-transparent to-white/15 opacity-60" />
          <div className="absolute inset-y-0 left-16 w-4 sm:w-6 bg-gradient-to-r from-black/25 via-transparent to-white/20 opacity-50" />
          <div className="absolute inset-y-0 left-28 w-5 sm:w-8 bg-gradient-to-r from-black/20 via-transparent to-white/10 opacity-40" />
        </div>

        {/* 2. Top-left cascading white rose & eucalyptus arrangement */}
        <div className="absolute -top-4 -left-6 w-52 sm:w-68 md:w-84 h-64 sm:h-80 opacity-95 filter drop-shadow-[0_12px_24px_rgba(20,38,56,0.6)] transform -rotate-3">
          <img
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
            alt="Chùm hoa cưới trắng rủ góc trên trái"
            className="w-full h-full object-cover rounded-br-[100px] opacity-90 filter brightness-105"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 15% 15%, black 45%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 15% 15%, black 45%, transparent 95%)',
            }}
          />
        </div>

        {/* 3. TALL WHITE CERAMIC VASE WITH WHITE ROSES (Bình hoa trắng muốt thanh lịch như ảnh) */}
        <div className="absolute top-1/3 -left-2 sm:left-4 md:left-8 w-44 sm:w-56 md:w-64 h-72 sm:h-96 z-10 filter drop-shadow-[0_15px_30px_rgba(15,30,45,0.55)]">
          {/* Floral Bouquet (White & Cream English Roses + Baby's Breath) */}
          <div className="relative w-full h-44 sm:h-56 overflow-hidden rounded-full">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
              alt="Bình hoa hồng trắng và hoa bi"
              className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
              style={{
                maskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 98%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 98%)',
              }}
            />
          </div>
          {/* Elegant White Classical Pedestal Urn Silhouette */}
          <div className="mx-auto w-14 sm:w-20 h-28 sm:h-36 -mt-3 bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#CBD5E1] rounded-t-xl rounded-b-3xl border border-white/80 shadow-2xl flex flex-col items-center justify-between py-2">
            <div className="w-16 sm:w-22 h-2.5 bg-gradient-to-r from-[#CBD5E1] via-white to-[#CBD5E1] rounded-full shadow-inner" />
            <div className="w-8 sm:w-11 h-14 bg-gradient-to-r from-[#CBD5E1] via-white to-[#94A3B8] rounded-full opacity-60" />
            <div className="w-12 sm:w-16 h-4 bg-gradient-to-r from-[#94A3B8] via-white to-[#CBD5E1] rounded-b-xl shadow-md" />
          </div>
        </div>

        {/* 4. Floor White Flower Clouds (Thảm hoa tuyết trắng bồng bềnh chân rèm) */}
        <div className="absolute -bottom-6 -left-8 w-56 sm:w-72 md:w-96 h-56 sm:h-72 opacity-95 filter drop-shadow-[0_15px_30px_rgba(15,30,45,0.6)]">
          <img
            src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=800&auto=format&fit=crop"
            alt="Thảm hoa trắng chân rèm bên trái"
            className="w-full h-full object-cover object-bottom rounded-tr-[100px] filter brightness-110"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 20% 85%, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 20% 85%, black 50%, transparent 95%)',
            }}
          />
        </div>

        {/* Gilded & Silver vine filigree accent */}
        <svg
          viewBox="0 0 160 800"
          className="absolute inset-y-0 left-0 h-full w-full opacity-45 mix-blend-screen"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10 0 C 65 140, 95 300, 45 440 C 5 560, 90 700, 15 800"
            stroke="url(#blueSilverVineGradLeft)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {[80, 180, 280, 380, 480, 580, 680].map((y, idx) => (
            <g key={idx} transform={`translate(${Math.sin(idx) * 20 + 35}, ${y}) rotate(${idx * 40})`}>
              <ellipse cx="0" cy="0" rx="12" ry="5" fill="#E2E8F0" opacity="0.6" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
          ))}
          <defs>
            <linearGradient id="blueSilverVineGradLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ethereal crystal sparkles & glowing orbs */}
        {leftSparkles.map((sp) => (
          <div
            key={sp.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: sp.top,
              left: sp.left,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(186,230,253,0.8) 45%, rgba(56,189,248,0) 80%)',
              boxShadow: '0 0 10px 2px rgba(186,230,253,0.85)',
              animation: `pulse ${sp.duration} ease-in-out infinite`,
              animationDelay: sp.delay,
              opacity: sp.opacity,
            }}
          />
        ))}

        {/* Soft edge blend into center */}
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-[#0A1628]/60 pointer-events-none" />
      </div>

      {/* ========================================================
          RIGHT FLANK: RÈM LỤA XANH DUSTY BLUE & LỌ HOA TRẮNG CAO
          Đối xứng thanh nhã bên phải
      ======================================================== */}
      <div className="absolute top-0 bottom-0 right-0 w-44 sm:w-64 md:w-80 lg:w-96 xl:w-[420px] overflow-hidden">
        {/* Ethereal blue ambient aura behind drapes */}
        <div className="absolute top-1/3 -right-10 w-96 h-[500px] rounded-full bg-gradient-to-l from-[#3B5D7E]/50 via-[#5B82A6]/30 to-transparent blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-gradient-to-tl from-white/20 via-[#4F7396]/25 to-transparent blur-2xl" />

        {/* 1. French Dusty Blue Satin Curtain Drapery (Rèm lụa xanh rủ lượn bên phải) */}
        <div
          className="absolute inset-y-0 right-0 w-36 sm:w-48 md:w-60 lg:w-72 opacity-85 filter drop-shadow-[-5px_0_20px_rgba(15,30,45,0.4)]"
          style={{
            background: 'linear-gradient(270deg, #1C334A 0%, #2A4866 25%, #3B5F84 50%, #4E7399 75%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 95% 100% at 100% 50%, black 75%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 95% 100% at 100% 50%, black 75%, transparent 100%)',
          }}
        >
          {/* Subtle silk fabric folds */}
          <div className="absolute inset-y-0 right-6 w-3 sm:w-4 bg-gradient-to-r from-white/15 via-transparent to-black/20 opacity-60" />
          <div className="absolute inset-y-0 right-16 w-4 sm:w-6 bg-gradient-to-r from-white/20 via-transparent to-black/25 opacity-50" />
          <div className="absolute inset-y-0 right-28 w-5 sm:w-8 bg-gradient-to-r from-white/10 via-transparent to-black/20 opacity-40" />
        </div>

        {/* 2. Top-right cascading white rose arrangement */}
        <div className="absolute -top-4 -right-6 w-52 sm:w-68 md:w-84 h-64 sm:h-80 opacity-95 filter drop-shadow-[0_12px_24px_rgba(20,38,56,0.6)] transform rotate-3">
          <img
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
            alt="Chùm hoa cưới trắng rủ góc trên phải"
            className="w-full h-full object-cover rounded-bl-[100px] opacity-90 filter brightness-105 scale-x-[-1]"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 85% 15%, black 45%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 85% 15%, black 45%, transparent 95%)',
            }}
          />
        </div>

        {/* 3. TALL WHITE CERAMIC VASE WITH WHITE ROSES (Bình hoa trắng bên phải) */}
        <div className="absolute top-1/3 -right-2 sm:right-4 md:right-8 w-44 sm:w-56 md:w-64 h-72 sm:h-96 z-10 filter drop-shadow-[0_15px_30px_rgba(15,30,45,0.55)]">
          {/* Floral Bouquet (White & Cream English Roses + Baby's Breath) */}
          <div className="relative w-full h-44 sm:h-56 overflow-hidden rounded-full">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
              alt="Bình hoa hồng trắng và hoa bi bên phải"
              className="w-full h-full object-cover object-center filter brightness-110 contrast-105 scale-x-[-1]"
              style={{
                maskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 98%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 98%)',
              }}
            />
          </div>
          {/* Elegant White Classical Pedestal Urn Silhouette */}
          <div className="mx-auto w-14 sm:w-20 h-28 sm:h-36 -mt-3 bg-gradient-to-r from-[#CBD5E1] via-[#FFFFFF] to-[#E2E8F0] rounded-t-xl rounded-b-3xl border border-white/80 shadow-2xl flex flex-col items-center justify-between py-2">
            <div className="w-16 sm:w-22 h-2.5 bg-gradient-to-r from-[#CBD5E1] via-white to-[#CBD5E1] rounded-full shadow-inner" />
            <div className="w-8 sm:w-11 h-14 bg-gradient-to-r from-[#94A3B8] via-white to-[#CBD5E1] rounded-full opacity-60" />
            <div className="w-12 sm:w-16 h-4 bg-gradient-to-r from-[#CBD5E1] via-white to-[#94A3B8] rounded-b-xl shadow-md" />
          </div>
        </div>

        {/* 4. Floor White Flower Clouds (Thảm hoa tuyết trắng chân rèm bên phải) */}
        <div className="absolute -bottom-6 -right-8 w-56 sm:w-72 md:w-96 h-56 sm:h-72 opacity-95 filter drop-shadow-[0_15px_30px_rgba(15,30,45,0.6)]">
          <img
            src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=800&auto=format&fit=crop"
            alt="Thảm hoa trắng chân rèm bên phải"
            className="w-full h-full object-cover object-bottom rounded-tl-[100px] filter brightness-110 scale-x-[-1]"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 80% 85%, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 80% 85%, black 50%, transparent 95%)',
            }}
          />
        </div>

        {/* Gilded & Silver vine filigree accent */}
        <svg
          viewBox="0 0 160 800"
          className="absolute inset-y-0 right-0 h-full w-full opacity-45 mix-blend-screen scale-x-[-1]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10 0 C 65 140, 95 300, 45 440 C 5 560, 90 700, 15 800"
            stroke="url(#blueSilverVineGradRight)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {[80, 180, 280, 380, 480, 580, 680].map((y, idx) => (
            <g key={idx} transform={`translate(${Math.sin(idx) * 20 + 35}, ${y}) rotate(${idx * 40})`}>
              <ellipse cx="0" cy="0" rx="12" ry="5" fill="#E2E8F0" opacity="0.6" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
          ))}
          <defs>
            <linearGradient id="blueSilverVineGradRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ethereal crystal sparkles */}
        {rightSparkles.map((sp) => (
          <div
            key={sp.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: sp.top,
              right: sp.right,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(186,230,253,0.8) 45%, rgba(56,189,248,0) 80%)',
              boxShadow: '0 0 10px 2px rgba(186,230,253,0.85)',
              animation: `pulse ${sp.duration} ease-in-out infinite`,
              animationDelay: sp.delay,
              opacity: sp.opacity,
            }}
          />
        ))}

        {/* Soft edge blend into center */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-l from-transparent to-[#0A1628]/60 pointer-events-none" />
      </div>

      {/* ========================================================
          FALLING WHITE & ICE-BLUE ROSE PETALS
          Cánh hoa hồng trắng thanh khiết rơi lượn sóng
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
            background: 'radial-gradient(ellipse at 35% 35%, #FFFFFF 0%, #F0F7FD 50%, #C7DFFA 100%)',
            borderRadius: '50% 50% 50% 0',
            transform: `rotate(${pt.rot}deg)`,
            filter: 'drop-shadow(0 2px 5px rgba(20,40,65,0.25))',
            opacity: 0.85,
            animation: `floatPetal ${pt.duration} linear infinite`,
            animationDelay: pt.delay,
          }}
        />
      ))}
    </div>
  )
}

export default WeddingFloralFlanks
