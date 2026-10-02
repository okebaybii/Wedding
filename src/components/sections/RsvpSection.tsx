import React, { useState } from 'react'
import { CheckCircle2, Heart, Sparkles, User, Phone, Users, Utensils, MessageSquare, AlertCircle } from 'lucide-react'
import { triggerWeddingConfetti } from '../../utils/confetti.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import {
  FrenchCornerFlourish,
  FrenchCrestPediment,
  FrenchFlourishDivider,
} from '../ui/FrenchOrnaments.tsx'

interface RsvpFormData {
  fullName: string
  phone: string
  side: 'groom' | 'bride' | 'mutual'
  attendance: 'yes' | 'no'
  guestCount: number
  dietaryNotes: string
}

const initialForm: RsvpFormData = {
  fullName: '',
  phone: '',
  side: 'mutual',
  attendance: 'yes',
  guestCount: 1,
  dietaryNotes: '',
}

export const RsvpSection: React.FC = () => {
  const { addRsvp } = useWeddingData()
  const [formData, setFormData] = useState<RsvpFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpFormData, string>>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RsvpFormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ tên quá ngắn'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9+() -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ (8 - 15 số)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Lưu vào Wedding Store / LocalStorage & gửi thông báo
    setTimeout(() => {
      addRsvp({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        side: formData.side,
        attendance: formData.attendance,
        guestCount: formData.guestCount,
        dietaryNotes: formData.dietaryNotes.trim() || undefined,
      })
      setIsSubmitting(false)
      setIsSubmitted(true)
      if (formData.attendance === 'yes') {
        triggerWeddingConfetti()
      }
    }, 500)
  }

  const handleReset = () => {
    setFormData(initialForm)
    setIsSubmitted(false)
    setErrors({})
  }

  return (
    <section
      id="rsvp"
      aria-label="Xác nhận tham dự"
      className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-paper via-paper-light to-paper overflow-hidden"
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header with French Pediment */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12 sm:mb-16">
            <FrenchCrestPediment className="mb-2" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/20 via-paper to-gold/20 border border-gold/50 text-gold-dark text-xs uppercase tracking-[0.25em] font-bold mb-3 shadow-xs font-display">
              <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" aria-hidden="true" />
              <span>Réponse S'il Vous Plaît • RSVP</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-bold tracking-tight">
              Xác Nhận Tham Dự
            </h2>
            <p className="mt-2 text-charcoal-muted text-sm sm:text-base max-w-md mx-auto font-serif italic">
              Để ban tổ chức chuẩn bị chu đáo nhất, xin quý khách vui lòng xác nhận trước ngày <strong>10/11/2026</strong>.
            </p>
            <FrenchFlourishDivider className="max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        {/* Content Box: French Gilded Salon Card */}
        <ScrollReveal direction="up" delay={150}>
          <div className="french-card-bg french-triple-frame rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 border-2 border-gold/60 shadow-2xl relative overflow-hidden">
            {/* French Damask Pattern Watermark */}
            <div className="absolute inset-0 french-damask-pattern opacity-25 pointer-events-none" />

            {/* French Corner Flourishes */}
            <FrenchCornerFlourish position="top-left" size={48} />
            <FrenchCornerFlourish position="top-right" size={48} />
            <FrenchCornerFlourish position="bottom-left" size={48} />
            <FrenchCornerFlourish position="bottom-right" size={48} />

            {/* Subtle gold ribbon top edge */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />

            {isSubmitted ? (
              /* Success Confirmation State */
              <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald/10 border-2 border-emerald text-emerald flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold mb-3">
                  {formData.attendance === 'yes'
                    ? 'Cảm Ơn Bạn Đã Xác Nhận!'
                    : 'Rất Tiếc Khi Bạn Không Thể Tham Dự'}
                </h3>

                <p className="text-charcoal-muted text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                  {formData.attendance === 'yes' ? (
                    <>
                      Minh Quân & Thảo My đã ghi nhận thông tin tham dự của bạn (
                      <strong>{formData.fullName}</strong> - <strong>{formData.guestCount} người</strong>).
                      Rất mong sớm được đón tiếp bạn trong ngày vui!
                    </>
                  ) : (
                    <>
                      Minh Quân & Thảo My xin chân thành cảm ơn lời chúc của bạn (
                      <strong>{formData.fullName}</strong>). Dù không thể đến dự, tình cảm của bạn luôn là món quà quý giá!
                    </>
                  )}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[48px] px-6 py-3 rounded-full bg-paper border border-gold/40 text-charcoal text-sm font-medium hover:bg-paper-dark transition-colors cursor-pointer"
                  >
                    Gửi phản hồi khác
                  </button>
                  <a
                    href="#guestbook"
                    className="min-h-[48px] px-6 py-3 rounded-full bg-burgundy text-paper-light text-sm font-medium hover:bg-burgundy-light transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-champagne" />
                    <span>Viết lời chúc vào sổ lưu bút</span>
                  </a>
                </div>
              </div>
            ) : (
              /* RSVP Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="rsvp-fullName" className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Họ và tên của bạn <span className="text-burgundy">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                      <User className="w-4 h-4 text-gold-dark" aria-hidden="true" />
                    </div>
                    <input
                      id="rsvp-fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value })
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                      }}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className={`w-full min-h-[48px] pl-10 pr-4 py-3 bg-paper rounded-xl border text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                        errors.fullName ? 'border-burgundy' : 'border-gold/30 hover:border-gold/60'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-burgundy flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="rsvp-phone" className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Số điện thoại liên hệ <span className="text-burgundy">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                      <Phone className="w-4 h-4 text-gold-dark" aria-hidden="true" />
                    </div>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        if (errors.phone) setErrors({ ...errors, phone: undefined })
                      }}
                      placeholder="Ví dụ: 0912 345 678"
                      className={`w-full min-h-[48px] pl-10 pr-4 py-3 bg-paper rounded-xl border text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${
                        errors.phone ? 'border-burgundy' : 'border-gold/30 hover:border-gold/60'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-burgundy flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Side / Relationship */}
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Bạn là khách của ai?
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'groom', label: 'Nhà Trai (Quân)' },
                      { value: 'bride', label: 'Nhà Gái (My)' },
                      { value: 'mutual', label: 'Bạn chung cả hai' },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, side: item.value as RsvpFormData['side'] })}
                        className={`min-h-[48px] px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center flex items-center justify-center cursor-pointer ${
                          formData.side === item.value
                            ? 'bg-emerald text-paper-light border-emerald shadow-xs'
                            : 'bg-paper text-charcoal border-gold/30 hover:border-gold/60'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attendance Radio Cards */}
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Khả năng tham dự
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                      className={`min-h-[52px] p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                        formData.attendance === 'yes'
                          ? 'bg-emerald/10 border-emerald text-emerald font-semibold shadow-xs'
                          : 'bg-paper border-gold/30 text-charcoal hover:border-gold/60'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.attendance === 'yes' ? 'border-emerald' : 'border-charcoal-muted'
                        }`}
                      >
                        {formData.attendance === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-emerald" />}
                      </div>
                      <span className="text-sm">Chắc chắn tham dự</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'no' })}
                      className={`min-h-[52px] p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                        formData.attendance === 'no'
                          ? 'bg-burgundy/10 border-burgundy text-burgundy font-semibold shadow-xs'
                          : 'bg-paper border-gold/30 text-charcoal hover:border-gold/60'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.attendance === 'no' ? 'border-burgundy' : 'border-charcoal-muted'
                        }`}
                      >
                        {formData.attendance === 'no' && <div className="w-2.5 h-2.5 rounded-full bg-burgundy" />}
                      </div>
                      <span className="text-sm">Rất tiếc không thể đến</span>
                    </button>
                  </div>
                </div>

                {/* Number of guests (only if attending) */}
                {formData.attendance === 'yes' && (
                  <div className="animate-in fade-in duration-200">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                      Số lượng người tham dự (bao gồm bạn)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setFormData({ ...formData, guestCount: count })}
                          className={`min-h-[48px] py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            formData.guestCount === count
                              ? 'bg-gold text-charcoal border-gold shadow-xs'
                              : 'bg-paper text-charcoal border-gold/30 hover:border-gold/60'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{count === 4 ? '4+ người' : `${count} người`}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary notes / Wishes */}
                <div>
                  <label htmlFor="rsvp-diet" className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                    Lưu ý món ăn hoặc lời nhắn riêng (nếu có)
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-charcoal-muted">
                      <Utensils className="w-4 h-4 text-gold-dark" aria-hidden="true" />
                    </div>
                    <textarea
                      id="rsvp-diet"
                      rows={3}
                      value={formData.dietaryNotes}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      placeholder="Ví dụ: Ăn chay, dị ứng hải sản, hoặc lời nhắn dành riêng cho cô dâu chú rể..."
                      className="w-full pl-10 pr-4 py-3 bg-paper rounded-xl border border-gold/30 hover:border-gold/60 text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-burgundy hover:bg-burgundy-light text-paper-light font-sans font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md shadow-burgundy/25 transition-all active:scale-[0.99] border border-gold/30 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-paper-light border-t-transparent rounded-full animate-spin" />
                      Đang gửi xác nhận...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-gold-light" aria-hidden="true" />
                      <span>Gửi Xác Nhận Tham Dự</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
