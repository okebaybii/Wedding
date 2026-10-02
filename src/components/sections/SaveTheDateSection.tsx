import React from 'react'
import { VisualWeddingCalendar } from '../ui/VisualWeddingCalendar.tsx'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'

interface SaveTheDateSectionProps {
  couple?: CoupleInfo
}

export const SaveTheDateSection: React.FC<SaveTheDateSectionProps> = ({
  couple = weddingCouple,
}) => {
  return (
    <section
      id="calendar"
      aria-label="Save The Date và Lịch Cưới"
      className="py-12 sm:py-20 px-4 bg-paper relative overflow-hidden"
    >
      {/* Background radial gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal direction="up" delay={50}>
          <VisualWeddingCalendar
            weddingDateStr={couple.weddingDate}
            groomShortName={couple.groom.shortName}
            brideShortName={couple.bride.shortName}
            groomFullName={couple.groom.fullName}
            brideFullName={couple.bride.fullName}
          />
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SaveTheDateSection
