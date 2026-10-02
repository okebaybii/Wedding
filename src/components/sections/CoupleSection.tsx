import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'
import {
  FrenchCornerFlourish,
  FrenchCrestPediment,
  FrenchFlourishDivider,
} from '../ui/FrenchOrnaments.tsx'

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
      {/* Decorative French Chateau Aura */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-champagne/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-burgundy/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with French Pediment */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            <FrenchCrestPediment className="mb-2" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/20 via-paper-light to-gold/20 border border-gold/50 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold mb-3 shadow-xs font-display">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Les Mariés • Cặp Đôi Hạnh Phúc</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-bold tracking-tight">
              Chú Rể & Cô Dâu
            </h2>
            <p className="mt-2 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-serif italic">
              Hai tâm hồn đồng điệu, một câu chuyện tình yêu vẹn tròn
            </p>
            <FrenchFlourishDivider className="max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        {/* 3-Column French Gilded Gallery Grid: Chú Rể (Trái, Thấp & Thu Nhỏ) | Ảnh Chung Đôi (Giữa, Cao Vượt Trội) | Cô Dâu (Phải, Thấp & Thu Nhỏ) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-end">
          {/* 1. CHÚ RỂ (GROOM) - THẤP XUỐNG & THU NHỎ LẠI THEO YÊU CẦU */}
          <ScrollReveal direction="right" delay={100} className="w-full">
            <article className="max-w-[320px] mx-auto flex flex-col items-center text-center french-card-bg french-triple-frame p-5 sm:p-6 rounded-[28px] border-2 border-gold/60 shadow-lg relative group hover:border-gold transition-all duration-500 overflow-hidden lg:translate-y-8">
              {/* French Damask Pattern Watermark */}
              <div className="absolute inset-0 french-damask-pattern opacity-25 pointer-events-none" />

              {/* French Corner Flourishes */}
              <FrenchCornerFlourish position="top-left" size={40} />
              <FrenchCornerFlourish position="top-right" size={40} />
              <FrenchCornerFlourish position="bottom-left" size={40} />
              <FrenchCornerFlourish position="bottom-right" size={40} />

              {/* Top French Royal Slate Blue Ribbon Badge */}
              <div className="relative z-10 mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#1E3A56] via-[#2A4D70] to-[#1E3A56] text-sky-100 border border-sky-300/40 shadow-md">
                <span className="text-[10px] font-display uppercase tracking-[0.25em] font-bold">
                  Chú Rể • Le Marié
                </span>
              </div>

              {/* Groom Image Frame: Thu nhỏ lại làm nền cho ảnh chung */}
              <div className="relative mb-5 z-10">
                <div className="french-picture-frame w-40 h-[216px] sm:w-[184px] sm:h-[248px] rounded-t-full rounded-b-2xl p-2">
                  <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-paper relative border border-gold/60">
                    <img
                      src={couple.groom.image}
                      alt={`Chú rể ${couple.groom.fullName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Monogram Seal on Image Corner (Thu nhỏ tỉ lệ) */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3A56] to-[#0F2236] text-white flex items-center justify-center border-2 border-gold-light shadow-lg">
                  <span className="font-display text-sm font-extrabold text-gold-light">Q</span>
                </div>
              </div>

              {/* Groom Info (Gọn gàng, tinh tế) */}
              <div className="relative z-10 w-full mt-1">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-burgundy mb-0.5 block font-display">
                  {couple.groom.title}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-bold tracking-tight mb-2">
                  {couple.groom.fullName}
                </h3>

                {/* Parents Info in French Cartouche */}
                <div className="text-[11px] text-charcoal-muted mb-3 p-2 rounded-lg bg-paper-light/90 border border-gold/30 shadow-xs max-w-[260px] mx-auto">
                  <span className="font-serif font-bold text-charcoal block">Thân phụ & Mẫu thân:</span>
                  <p className="mt-0.5 font-serif italic text-charcoal-muted">{couple.groom.parents}</p>
                </div>

                {/* Bio / Love Note */}
                <p className="font-serif italic text-xs text-charcoal/85 leading-relaxed px-1 max-w-[260px] mx-auto line-clamp-3">
                  “{couple.groom.bio}”
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 2. ẢNH CƯỚI CHỤP CHUNG GIỮA 2 NGƯỜI (CAO VƯỢT TRỘI, TÂM ĐIỂM HOÀNG GIA) */}
          <ScrollReveal direction="up" delay={200} className="w-full">
            <article className="max-w-[380px] sm:max-w-[420px] mx-auto min-h-[660px] sm:min-h-[730px] flex flex-col items-center justify-between text-center french-card-bg french-triple-frame p-6 sm:p-8 rounded-[40px] border-2 border-gold shadow-2xl relative group hover:border-gold transition-all duration-500 overflow-hidden lg:-translate-y-8 z-20">
              {/* French Damask Pattern Watermark */}
              <div className="absolute inset-0 french-damask-pattern opacity-35 pointer-events-none" />

              {/* French Corner Flourishes */}
              <FrenchCornerFlourish position="top-left" size={56} />
              <FrenchCornerFlourish position="top-right" size={56} />
              <FrenchCornerFlourish position="bottom-left" size={56} />
              <FrenchCornerFlourish position="bottom-right" size={56} />

              {/* Top Banner Ribbon */}
              <div className="relative z-10 mb-2 inline-flex items-center gap-2 px-6 py-2 rounded-full french-velvet-ribbon text-white border border-gold/70 shadow-xl">
                <Heart className="w-3.5 h-3.5 text-gold-light fill-gold-light" />
                <span className="text-xs font-display uppercase tracking-[0.25em] font-extrabold text-gold-light">
                  Trọn Đời Bên Nhau • Ensemble Pour Toujours
                </span>
                <Heart className="w-3.5 h-3.5 text-gold-light fill-gold-light" />
              </div>

              {/* Master Joint Portrait Image: CAO VƯỢT TRỘI TRUNG TÂM */}
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] my-3 z-10">
                <div className="french-picture-frame h-[380px] sm:h-[450px] rounded-t-full rounded-b-3xl p-3 shadow-2xl">
                  <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden bg-paper relative border border-gold/70">
                    <img
                      src={couple.jointImage}
                      alt={`Ảnh cưới chụp chung ${couple.groom.shortName} & ${couple.bride.shortName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Inner gold vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent pointer-events-none" />

                    {/* Overlay text at bottom of joint image */}
                    <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                      <span className="font-display font-extrabold text-xs uppercase tracking-[0.3em] text-white drop-shadow-md">
                        Together Forever
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Joint Monogram & Romantic Tagline */}
              <div className="relative z-10 mt-2 flex flex-col items-center w-full">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark p-0.5 shadow-xl mb-2">
                  <div className="w-full h-full rounded-full bg-paper flex items-center justify-center border border-gold/50">
                    <span className="font-display font-extrabold text-lg text-burgundy gold-foil-text">
                      {couple.monogram}
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight">
                  {couple.groom.shortName} <span className="text-gold font-script text-3xl">&</span> {couple.bride.shortName}
                </h4>
                <div className="inline-flex items-center gap-2 mt-1 px-4 py-0.5 rounded-full bg-gold/15 border border-gold/40 text-xs uppercase tracking-widest text-gold-dark font-bold font-display">
                  <span>20 . 11 . 2026</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal-muted mt-3 max-w-xs leading-relaxed">
                  "Từ ngày gặp gỡ đến ngày chung đôi, mỗi khoảnh khắc bên nhau đều là một phép màu diệu kỳ."
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 3. CÔ DÂU (BRIDE) - THẤP XUỐNG & THU NHỎ LẠI THEO YÊU CẦU */}
          <ScrollReveal direction="left" delay={300} className="w-full">
            <article className="max-w-[320px] mx-auto flex flex-col items-center text-center french-card-bg french-triple-frame p-5 sm:p-6 rounded-[28px] border-2 border-gold/60 shadow-lg relative group hover:border-gold transition-all duration-500 overflow-hidden lg:translate-y-8">
              {/* French Damask Pattern Watermark */}
              <div className="absolute inset-0 french-damask-pattern opacity-25 pointer-events-none" />

              {/* French Corner Flourishes */}
              <FrenchCornerFlourish position="top-left" size={40} />
              <FrenchCornerFlourish position="top-right" size={40} />
              <FrenchCornerFlourish position="bottom-left" size={40} />
              <FrenchCornerFlourish position="bottom-right" size={40} />

              {/* Top French Royal Slate Blue Ribbon Badge */}
              <div className="relative z-10 mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#203D5B] via-[#2F547A] to-[#203D5B] text-sky-100 border border-sky-300/40 shadow-md">
                <span className="text-[10px] font-display uppercase tracking-[0.25em] font-bold">
                  Cô Dâu • La Mariée
                </span>
              </div>

              {/* Bride Image Frame: Thu nhỏ lại làm nền cho ảnh chung */}
              <div className="relative mb-5 z-10">
                <div className="french-picture-frame w-40 h-[216px] sm:w-[184px] sm:h-[248px] rounded-t-full rounded-b-2xl p-2">
                  <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-paper relative border border-gold/60">
                    <img
                      src={couple.bride.image}
                      alt={`Cô dâu ${couple.bride.fullName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Monogram Seal on Image Corner (Thu nhỏ tỉ lệ) */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-br from-[#203D5B] to-[#122437] text-white flex items-center justify-center border-2 border-gold-light shadow-lg">
                  <span className="font-display text-sm font-extrabold text-gold-light">M</span>
                </div>
              </div>

              {/* Bride Info (Gọn gàng, tinh tế) */}
              <div className="relative z-10 w-full mt-1">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-burgundy mb-0.5 block font-display">
                  {couple.bride.title}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-bold tracking-tight mb-2">
                  {couple.bride.fullName}
                </h3>

                {/* Parents Info in French Cartouche */}
                <div className="text-[11px] text-charcoal-muted mb-3 p-2 rounded-lg bg-paper-light/90 border border-gold/30 shadow-xs max-w-[260px] mx-auto">
                  <span className="font-serif font-bold text-charcoal block">Thân phụ & Mẫu thân:</span>
                  <p className="mt-0.5 font-serif italic text-charcoal-muted">{couple.bride.parents}</p>
                </div>

                {/* Bio / Love Note */}
                <p className="font-serif italic text-xs text-charcoal/85 leading-relaxed px-1 max-w-[260px] mx-auto line-clamp-3">
                  “{couple.bride.bio}”
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default CoupleSection
