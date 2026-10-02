import React from 'react'
import { Heart, Quote, Sparkles } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'

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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-light border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Cặp Đôi Hạnh Phúc</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
            Chú Rể & Cô Dâu
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-stretch">
          {/* Chú Rể (Groom) */}
          <article className="flex flex-col items-center text-center bg-paper-light/80 p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-md shadow-gold/5 relative group hover:border-gold/60 transition-all duration-300">
            {/* Corner Luxury Pin */}
            <div className="absolute top-4 right-4 text-xs font-display uppercase tracking-widest text-gold-dark border-b border-gold/30 pb-0.5">
              Groom
            </div>

            {/* Groom Image Frame (Arch Window / Luxury Border) */}
            <div className="relative mb-6">
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-xl shadow-charcoal/10">
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
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-burgundy text-paper-light flex items-center justify-center border-2 border-gold-light shadow-md">
                <span className="font-display text-sm font-bold">Q</span>
              </div>
            </div>

            {/* Groom Info */}
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald mb-1">
              {couple.groom.title}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight mb-2">
              {couple.groom.fullName}
            </h3>

            {/* Parents Info */}
            <div className="text-xs text-charcoal-muted mb-4 pb-4 border-b border-gold/20 w-full max-w-xs">
              <span className="font-medium text-charcoal">Thân phụ & Mẫu thân:</span>
              <p className="mt-0.5 italic">{couple.groom.parents}</p>
            </div>

            {/* Bio / Love Note */}
            <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed font-normal">
              {couple.groom.bio}
            </p>
          </article>

          {/* Cô Dâu (Bride) */}
          <article className="flex flex-col items-center text-center bg-paper-light/80 p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-md shadow-gold/5 relative group hover:border-gold/60 transition-all duration-300">
            {/* Corner Luxury Pin */}
            <div className="absolute top-4 right-4 text-xs font-display uppercase tracking-widest text-gold-dark border-b border-gold/30 pb-0.5">
              Bride
            </div>

            {/* Bride Image Frame (Arch Window / Luxury Border) */}
            <div className="relative mb-6">
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-xl shadow-charcoal/10">
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
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-burgundy text-paper-light flex items-center justify-center border-2 border-gold-light shadow-md">
                <span className="font-display text-sm font-bold">M</span>
              </div>
            </div>

            {/* Bride Info */}
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-burgundy mb-1">
              {couple.bride.title}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight mb-2">
              {couple.bride.fullName}
            </h3>

            {/* Parents Info */}
            <div className="text-xs text-charcoal-muted mb-4 pb-4 border-b border-gold/20 w-full max-w-xs">
              <span className="font-medium text-charcoal">Thân phụ & Mẫu thân:</span>
              <p className="mt-0.5 italic">{couple.bride.parents}</p>
            </div>

            {/* Bio / Love Note */}
            <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed font-normal">
              {couple.bride.bio}
            </p>
          </article>
        </div>

        {/* Romantic Wedding Quote */}
        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-r from-paper-light via-champagne/20 to-paper-light p-8 sm:p-12 rounded-3xl border border-gold/30 text-center shadow-sm">
            <Quote className="w-8 h-8 text-gold-dark mx-auto mb-4 opacity-70" aria-hidden="true" />
            <blockquote className="font-serif italic text-base sm:text-lg md:text-xl text-charcoal leading-relaxed">
              {couple.quote}
            </blockquote>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-[1px] w-10 bg-gold/40" />
              <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" aria-hidden="true" />
              <span className="h-[1px] w-10 bg-gold/40" />
            </div>
            <p className="mt-2 font-display text-xs tracking-widest uppercase text-gold-dark font-medium">
              Minh Quân & Thảo My
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
