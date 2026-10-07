import React, { useState } from 'react'
import { CheckCircle2, Sparkles, User, Phone, Users, Utensils, AlertCircle } from 'lucide-react'
import { triggerWeddingConfetti } from '../../utils/confetti.ts'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import { JourneyDetailModal } from '../ui/JourneyDetailModal.tsx'
import { JourneyTriggerButton } from '../ui/JourneyTriggerButton.tsx'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    }, 400)
  }

  const handleReset = () => {
    setFormData(initialForm)
    setIsSubmitted(false)
    setErrors({})
  }

  return (
    <section
      id="rsvp"
      data-journey-chapter="rsvp"
      aria-label="Xác nhận tham dự"
      className="journey-chapter relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Screen Reader Semantic Data */}
      <div className="sr-only">
        <h2>Xác nhận tham dự hôn lễ</h2>
        <p>Vui lòng hồi âm trước ngày 10/11/2026.</p>
      </div>

      {/* Floating Trigger Button: leaves 3D writing desk and candle completely visible */}
      <div className="relative z-20 flex justify-center px-4">
        <JourneyTriggerButton
          label="Xác Nhận Tham Dự (RSVP)"
          icon={<CheckCircle2 className="h-4 w-4 text-gold-light" />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* RSVP Form Modal displayed only upon click */}
      <JourneyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xác Nhận Tham Dự"
        subtitle="Hồi âm cho ngày chung đôi"
        icon={<Sparkles className="h-5 w-5 text-gold-light" />}
        maxWidth="2xl"
      >
        <div>
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald/20 border-2 border-emerald text-emerald flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-2xl text-white font-bold mb-2">
                {formData.attendance === 'yes'
                  ? 'Cảm Ơn Bạn Đã Xác Nhận!'
                  : 'Rất Tiếc Khi Bạn Không Thể Tham Dự'}
              </h3>

              <p className="text-sky-100/80 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                {formData.attendance === 'yes' ? (
                  <>
                    Minh Quân & Thảo My đã ghi nhận thông tin của bạn (
                    <strong className="text-gold-light">{formData.fullName}</strong> —{' '}
                    <strong className="text-gold-light">{formData.guestCount} người</strong>).
                    Rất mong sớm được đón tiếp bạn trong ngày vui!
                  </>
                ) : (
                  <>
                    Minh Quân & Thảo My chân thành cảm ơn tình cảm của bạn (
                    <strong className="text-gold-light">{formData.fullName}</strong>). Chúc bạn luôn an vui và hạnh phúc!
                  </>
                )}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="journey-button journey-button--gold min-h-[44px] px-6 text-xs font-semibold"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <p className="text-center font-serif text-xs italic text-sky-100/75 mb-2">
                Để chúng mình chuẩn bị chu đáo, xin quý khách vui lòng hồi âm trước ngày{' '}
                <strong className="text-gold-light">10/11/2026</strong>.
              </p>

              {/* Full Name */}
              <div>
                <label htmlFor="rsvp-fullName" className="block text-xs uppercase tracking-wider font-semibold text-gold-light mb-1.5">
                  Họ và tên của bạn <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-100/60">
                    <User className="w-4 h-4 text-gold-light" />
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
                    className="w-full min-h-[46px] pl-10 pr-4 py-2.5 bg-[#12283e] rounded-xl border border-gold/35 text-sm text-white placeholder:text-sky-100/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="rsvp-phone" className="block text-xs uppercase tracking-wider font-semibold text-gold-light mb-1.5">
                  Số điện thoại liên hệ <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-100/60">
                    <Phone className="w-4 h-4 text-gold-light" />
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
                    className="w-full min-h-[46px] pl-10 pr-4 py-2.5 bg-[#12283e] rounded-xl border border-gold/35 text-sm text-white placeholder:text-sky-100/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Side */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-gold-light mb-1.5">
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
                      className={`min-h-[44px] px-2 py-2 rounded-xl border text-xs font-medium transition-all text-center flex items-center justify-center cursor-pointer ${
                        formData.side === item.value
                          ? 'bg-gold text-charcoal font-bold border-gold shadow-md'
                          : 'bg-[#12283e] text-sky-100 border-gold/30 hover:border-gold/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendance */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-gold-light mb-1.5">
                  Khả năng tham dự
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                    className={`min-h-[48px] p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                      formData.attendance === 'yes'
                        ? 'bg-emerald/20 border-emerald text-emerald-300 font-semibold shadow-xs'
                        : 'bg-[#12283e] border-gold/30 text-sky-100 hover:border-gold/60'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.attendance === 'yes' ? 'border-emerald' : 'border-sky-100/40'
                    }`}>
                      {formData.attendance === 'yes' && <div className="w-2 h-2 rounded-full bg-emerald" />}
                    </div>
                    <span className="text-xs sm:text-sm">Chắc chắn tham dự</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'no' })}
                    className={`min-h-[48px] p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                      formData.attendance === 'no'
                        ? 'bg-red-500/20 border-red-400 text-red-300 font-semibold shadow-xs'
                        : 'bg-[#12283e] border-gold/30 text-sky-100 hover:border-gold/60'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.attendance === 'no' ? 'border-red-400' : 'border-sky-100/40'
                    }`}>
                      {formData.attendance === 'no' && <div className="w-2 h-2 rounded-full bg-red-400" />}
                    </div>
                    <span className="text-xs sm:text-sm">Rất tiếc không thể đến</span>
                  </button>
                </div>
              </div>

              {/* Guest Count */}
              {formData.attendance === 'yes' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gold-light mb-1.5">
                    Số lượng người tham dự (bao gồm bạn)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setFormData({ ...formData, guestCount: count })}
                        className={`min-h-[42px] py-2 px-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          formData.guestCount === count
                            ? 'bg-gold text-charcoal border-gold shadow-md'
                            : 'bg-[#12283e] text-sky-100 border-gold/30 hover:border-gold/60'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{count === 4 ? '4+ người' : `${count} người`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary notes */}
              <div>
                <label htmlFor="rsvp-diet" className="block text-xs uppercase tracking-wider font-semibold text-gold-light mb-1.5">
                  Lưu ý món ăn hoặc lời nhắn riêng (nếu có)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-sky-100/50">
                    <Utensils className="w-4 h-4 text-gold-light" />
                  </div>
                  <textarea
                    id="rsvp-diet"
                    rows={2}
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    placeholder="Ví dụ: Ăn chay, dị ứng hải sản..."
                    className="w-full pl-9 pr-4 py-2 bg-[#12283e] rounded-xl border border-gold/35 text-xs sm:text-sm text-white placeholder:text-sky-100/40 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark hover:from-gold hover:to-gold-light text-charcoal font-serif font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-gold/20 transition-all active:scale-[0.99] border border-gold cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                    Đang gửi xác nhận...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-charcoal" />
                    <span>Gửi Xác Nhận Tham Dự</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </JourneyDetailModal>
    </section>
  )
}

export default RsvpSection
