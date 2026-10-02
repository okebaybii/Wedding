import React from 'react'
import { LuxuryWeddingInvitationCard } from '../ui/LuxuryWeddingInvitationCard.tsx'
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
      id="invitation"
      aria-label="Thiệp Mời Cưới và Lịch Hôn Lễ"
      className="py-14 sm:py-24 px-4 bg-paper relative overflow-hidden"
    >
      {/* Background radial gold aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-burgundy/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* THIỆP MỜI CƯỚI HOÀNG GIA PHÁP (Tích Hợp Đầy Đủ Lịch Tháng 11/2026, Đếm Ngược & Chỉ Đường) */}
        <ScrollReveal direction="up" delay={50}>
          <LuxuryWeddingInvitationCard couple={couple} />
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SaveTheDateSection
