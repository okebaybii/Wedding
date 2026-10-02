import React from 'react'
import { MapPin, ExternalLink, Heart, Sparkles } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'

interface LuxuryWeddingInvitationCardProps {
  couple?: CoupleInfo
}

export const LuxuryWeddingInvitationCard: React.FC<LuxuryWeddingInvitationCardProps> = ({
  couple = weddingCouple,
}) => {
  const mapUrl = 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+District+4+Ho+Chi+Minh'

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 relative">
      {/* Outer Glow Aura */}
      <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-champagne/30 to-gold/20 rounded-[34px] blur-xl opacity-70 pointer-events-none" />

      {/* Main Royal Invitation Card Container */}
      <div className="relative bg-gradient-to-b from-[#FCFBF7] via-[#FFFDF9] to-[#F9F6F0] rounded-3xl p-6 sm:p-12 md:p-14 border-2 border-gold/60 shadow-2xl overflow-hidden text-charcoal">
        {/* 4 Vintage Royal Corner Filigree Ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/70 pointer-events-none rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/70 pointer-events-none rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold/70 pointer-events-none rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/70 pointer-events-none rounded-br-xl" />

        {/* Inner Concentric Gold Hairline Frame */}
        <div className="absolute inset-3 sm:inset-4 border border-gold/30 rounded-2xl pointer-events-none" />

        {/* Top Royal Wax Seal / Monogram Crest */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-3 group">
            {/* Burgundy Wax Seal with Gold Edge */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-burgundy-light via-burgundy to-[#3D1013] border-2 border-gold p-1 shadow-xl shadow-burgundy/30 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-gold/50 flex flex-col items-center justify-center relative overflow-hidden">
                <span className="font-display font-bold text-xl sm:text-2xl text-gold-light gold-foil-text tracking-widest">
                  {couple.monogram}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gold-light/90 font-serif -mt-1">
                  Wedding
                </span>
              </div>
            </div>
            {/* Subtle glow spark */}
            <div className="absolute -top-1 -right-1 text-gold">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* Invitation Headline */}
          <span className="text-[11px] sm:text-xs font-display uppercase tracking-[0.35em] text-gold-dark font-semibold">
            Wedding Invitation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-burgundy font-bold tracking-tight mt-1 mb-2">
            THIỆP MỜI THÀNH HÔN
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-5" />

          {/* Formal Greeting Line */}
          <p className="font-serif italic text-charcoal/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Trân trọng kính mời Quý khách cùng gia đình tới tham dự buổi tiệc thân mật mừng Lễ Thành Hôn của chúng tôi
          </p>
        </div>

        {/* Family Information Grid: Nhà Trai (Trái) | Song Hỷ (Giữa) | Nhà Gái (Phải) */}
        <div className="relative z-10 my-8 py-6 border-y border-gold/25 grid grid-cols-1 md:grid-cols-7 gap-6 items-center text-center">
          {/* Nhà Trai */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end md:text-right">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold-dark mb-1">
              Nhà Trai
            </span>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              {couple.groom.parents}
            </p>
            <div className="mt-3">
              <span className="text-[11px] uppercase tracking-widest text-charcoal-muted block">
                Trưởng Nam
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy tracking-tight">
                {couple.groom.fullName}
              </h3>
            </div>
          </div>

          {/* Center Emblem: Double Happiness / Intertwined Rings */}
          <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/60 flex items-center justify-center shadow-xs">
              <span className="font-serif font-bold text-lg sm:text-xl text-burgundy select-none">
                囍
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-medium mt-1">
              Thành Hôn
            </span>
          </div>

          {/* Nhà Gái */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold-dark mb-1">
              Nhà Gái
            </span>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              {couple.bride.parents}
            </p>
            <div className="mt-3">
              <span className="text-[11px] uppercase tracking-widest text-charcoal-muted block">
                Ái Nữ
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy tracking-tight">
                {couple.bride.fullName}
              </h3>
            </div>
          </div>
        </div>

        {/* Ceremony Time & Venue Box (Rõ ràng 100%, không bị che khuất) */}
        <div className="relative z-10 bg-paper-light/95 border border-gold/40 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          {/* Ceremony Time */}
          <div className="mb-5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-1">
              Hôn lễ được cử hành vào lúc
            </span>
            <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              18:00 • Thứ Sáu
            </div>
            <div className="font-serif text-xl sm:text-2xl font-semibold text-burgundy mt-0.5">
              Ngày 20 Tháng 11 Năm 2026
            </div>
            <p className="text-xs text-charcoal-muted italic mt-1">
              (Nhằm ngày 12 tháng 10 năm Bính Ngọ)
            </p>
          </div>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4" />

          {/* Venue Location */}
          <div className="space-y-1.5 max-w-lg mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold block">
              Địa điểm đón tiếp tiệc cưới
            </span>
            <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-charcoal">
              Trung Tâm Tiệc Cưới Riverside Palace
            </h4>
            <p className="text-xs sm:text-sm text-charcoal/85 font-medium">
              Sảnh Grand Ballroom (Tầng 2)
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh
            </p>

            {/* Map Link Button */}
            <div className="pt-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper hover:bg-gold/15 text-charcoal hover:text-burgundy border border-gold/50 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                <span>Xem Bản Đồ Chỉ Đường (Google Maps)</span>
                <ExternalLink className="w-3 h-3 text-gold-dark opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Respectful Family Closing Statement */}
        <div className="relative z-10 mt-7 text-center space-y-2">
          <p className="font-serif italic text-xs sm:text-sm text-charcoal/90">
            “Sự hiện diện của Quý khách là niềm vinh hạnh to lớn và là lời chúc phúc quý báu nhất cho gia đình chúng tôi!”
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-gold/40" />
            <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" />
            <span className="h-[1px] w-8 bg-gold/40" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-dark">
            Rất Hân Hạnh Được Đón Tiếp!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LuxuryWeddingInvitationCard
