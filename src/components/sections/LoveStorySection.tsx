import React from 'react'
import { Sparkles, Calendar, MapPin, Heart, Coffee, Star, Gem, Crown } from 'lucide-react'
import { Milestone } from '../../types/wedding.ts'
import { loveMilestones } from '../../data/weddingData.ts'

interface LoveStorySectionProps {
  milestones?: Milestone[]
}

const milestoneIcons: Record<string, React.ReactNode> = {
  '1': <Coffee className="w-5 h-5 text-gold-dark" aria-hidden="true" />,
  '2': <Star className="w-5 h-5 text-burgundy" aria-hidden="true" />,
  '3': <Gem className="w-5 h-5 text-emerald" aria-hidden="true" />,
  '4': <Crown className="w-5 h-5 text-gold" aria-hidden="true" />,
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({
  milestones = loveMilestones,
}) => {
  return (
    <section
      id="story"
      aria-label="Câu chuyện tình yêu"
      className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-paper via-paper-light to-paper overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" aria-hidden="true" />
            <span>Hành Trình Yêu Thương</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
            Chuyện Tình Yêu
          </h2>
          <p className="mt-3 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-light">
            Bốn cột mốc đáng nhớ nhất trên chặng đường từ lúc chạm mắt cho tới ngày chung bước vào lễ đường
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical central spine line (desktop center, mobile left-8) */}
          <div
            className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gold/20 via-gold to-gold/20"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={item.id}
                  className={`relative flex items-center flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Icon (centered on spine) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-paper-light border-2 border-gold flex items-center justify-center shadow-md z-10">
                    <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center">
                      {milestoneIcons[item.id] || (
                        <Sparkles className="w-4 h-4 text-gold-dark" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  {/* Content Card (Desktop: half width, Mobile: full width offset by spine) */}
                  <div
                    className={`w-full pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right'
                    }`}
                  >
                    <div className="bg-paper-light/95 p-6 sm:p-7 rounded-2xl border border-gold/30 shadow-sm hover:shadow-md hover:border-gold/60 transition-all duration-300 relative group">
                      {/* Accent top gradient stripe */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark/40 via-gold to-gold-dark/40 rounded-t-2xl opacity-70" />

                      {/* Date & Location Pill */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${
                          isEven ? 'justify-start' : 'justify-start md:justify-end'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper text-burgundy text-xs font-semibold border border-gold/30">
                          <Calendar className="w-3 h-3 text-gold-dark" aria-hidden="true" />
                          {item.date}
                        </span>

                        {item.location && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-champagne/30 text-charcoal text-xs border border-champagne-dark/20">
                            <MapPin className="w-3 h-3 text-gold-dark" aria-hidden="true" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-bold tracking-tight mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty space for opposite side on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
