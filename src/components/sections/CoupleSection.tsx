import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'

interface CoupleSectionProps {
  couple?: CoupleInfo
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ couple = weddingCouple }) => {
  return (
    <section
      id="couple"
      aria-label="Cô dâu và Chú rể"
      className="relative py-20 sm:py-28 px-4 bg-paper overflow-hidden"
    >
      {/* Decorative background embellishments */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-champagne/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-light border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Cặp Đôi Hạnh Phúc</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
              Chú Rể & Cô Dâu
            </h2>
            <p className="mt-2 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-light">
              Hai tâm hồn đồng điệu, một câu chuyện tình yêu vẹn tròn
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* 3-Column Triptych Grid: Chú Rể (Trái) | Ảnh Chung Đôi (Giữa) | Cô Dâu (Phải) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
          {/* 1. Chú Rể (Groom) */}
          <ScrollReveal direction="right" delay={100} className="h-full">
            <article className="h-full flex flex-col items-center text-center bg-paper-light/85 p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-md shadow-gold/5 relative group hover:border-gold/60 transition-all duration-300">
              {/* Corner Luxury Pin */}
              <div className="absolute top-4 right-4 text-xs font-display uppercase tracking-widest text-emerald font-semibold border-b border-gold/30 pb-0.5">
                Chú Rể
              </div>

              {/* Groom Image Frame (Arch Window / Luxury Border) */}
              <div className="relative mb-6">
                <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-xl shadow-charcoal/10">
                  <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-paper relative">
                    <img
                      src={couple.groom.image}
                      alt={`Chú rể ${couple.groom.fullName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Monogram Seal on Image Corner */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-emerald text-paper-light flex items-center justify-center border-2 border-gold-light shadow-md">
                  <span className="font-display text-sm font-bold">Q</span>
                </div>
              </div>

              {/* Groom Info */}
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald mb-1">
                {couple.groom.title}
              </span>
              <h3 className="font-serif text-2xl text-charcoal font-bold tracking-tight mb-2">
                {couple.groom.fullName}
              </h3>

              {/* Parents Info */}
              <div className="text-xs text-charcoal-muted mb-4 pb-4 border-b border-gold/20 w-full max-w-xs">
                <span className="font-medium text-charcoal">Thân phụ & Mẫu thân:</span>
                <p className="mt-0.5 italic">{couple.groom.parents}</p>
              </div>

              {/* Bio / Love Note */}
              <p className="font-sans text-xs sm:text-sm text-charcoal/90 leading-relaxed font-normal">
                {couple.groom.bio}
              </p>
            </article>
          </ScrollReveal>

          {/* 2. Ảnh Cưới Chụp Chung Giữa 2 Người (Joint Couple Master Portrait) */}
          <ScrollReveal direction="up" delay={200} className="h-full">
            <article className="h-full flex flex-col items-center justify-between text-center bg-gradient-to-b from-paper-light via-champagne/15 to-paper-light p-6 sm:p-8 rounded-3xl border-2 border-gold/50 shadow-xl shadow-gold/10 relative group hover:border-gold transition-all duration-300">
              {/* Top Banner Ribbon */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gold/20 border border-gold/50 text-burgundy text-[11px] uppercase tracking-widest font-serif font-bold mb-4">
                <Heart className="w-3 h-3 text-burgundy fill-burgundy" />
                <span>Trọn Đời Bên Nhau</span>
                <Heart className="w-3 h-3 text-burgundy fill-burgundy" />
              </div>

              {/* Master Joint Portrait Image */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden p-2 bg-gradient-to-tr from-gold-dark via-gold-light to-gold shadow-2xl my-2">
                <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden bg-paper relative">
                  <img
                    src={couple.jointImage}
                    alt={`Ảnh cưới chụp chung ${couple.groom.shortName} & ${couple.bride.shortName}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle inner gold vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />

                  {/* Overlay text at bottom of joint image */}
                  <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                    <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-paper-light drop-shadow-md">
                      Together Forever
                    </span>
                  </div>
                </div>
              </div>

              {/* Joint Monogram & Romantic Tagline */}
              <div className="mt-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-paper border-2 border-gold flex items-center justify-center shadow-md mb-2">
                  <span className="font-display font-bold text-base text-burgundy gold-foil-text">
                    {couple.monogram}
                  </span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-charcoal font-semibold">
                  {couple.groom.shortName} <span className="text-gold font-script text-2xl">&</span> {couple.bride.shortName}
                </h4>
                <p className="text-xs uppercase tracking-widest text-gold-dark font-medium mt-1">
                  20 . 11 . 2026
                </p>
                <p className="font-serif italic text-xs text-charcoal-muted mt-2 max-w-xs leading-relaxed">
                  "Từ ngày gặp gỡ đến ngày chung đôi, mỗi khoảnh khắc bên nhau đều là một phép màu diệu kỳ."
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 3. Cô Dâu (Bride) */}
          <ScrollReveal direction="left" delay={300} className="h-full">
            <article className="h-full flex flex-col items-center text-center bg-paper-light/85 p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-md shadow-gold/5 relative group hover:border-gold/60 transition-all duration-300">
              {/* Corner Luxury Pin */}
              <div className="absolute top-4 right-4 text-xs font-display uppercase tracking-widest text-burgundy font-semibold border-b border-gold/30 pb-0.5">
                Cô Dâu
              </div>

              {/* Bride Image Frame (Arch Window / Luxury Border) */}
              <div className="relative mb-6">
                <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-xl shadow-charcoal/10">
                  <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-paper relative">
                    <img
                      src={couple.bride.image}
                      alt={`Cô dâu ${couple.bride.fullName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Monogram Seal on Image Corner */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-burgundy text-paper-light flex items-center justify-center border-2 border-gold-light shadow-md">
                  <span className="font-display text-sm font-bold">M</span>
                </div>
              </div>

              {/* Bride Info */}
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-burgundy mb-1">
                {couple.bride.title}
              </span>
              <h3 className="font-serif text-2xl text-charcoal font-bold tracking-tight mb-2">
                {couple.bride.fullName}
              </h3>

              {/* Parents Info */}
              <div className="text-xs text-charcoal-muted mb-4 pb-4 border-b border-gold/20 w-full max-w-xs">
                <span className="font-medium text-charcoal">Thân phụ & Mẫu thân:</span>
                <p className="mt-0.5 italic">{couple.bride.parents}</p>
              </div>

              {/* Bio / Love Note */}
              <p className="font-sans text-xs sm:text-sm text-charcoal/90 leading-relaxed font-normal">
                {couple.bride.bio}
              </p>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default CoupleSection
