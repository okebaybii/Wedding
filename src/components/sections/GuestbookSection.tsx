import React, { useState } from 'react'
import { MessageSquareHeart, Send, Sparkles, User, Users, Quote, Check } from 'lucide-react'
import { triggerWeddingConfetti } from '../../utils/confetti.ts'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import { JourneyDetailModal } from '../ui/JourneyDetailModal.tsx'
import { JourneyTriggerButton } from '../ui/JourneyTriggerButton.tsx'

export const GuestbookSection: React.FC = () => {
  const { state, addWish } = useWeddingData()
  const wishes = state.wishes
  const groomName = state.couple?.groom?.shortName || 'Minh Quân'
  const brideName = state.couple?.bride?.shortName || 'Thảo My'
  const quickWishesList = [
    'Chúc hai bạn trăm năm tình viên mãn, đầu bạc răng long! 💍',
    `Chúc ${groomName} & ${brideName} mãi ngọt ngào, hạnh phúc bền lâu!`,
    'Một hành trình mới thật nhiều tiếng cười và thành công rực rỡ!',
    'Chúc cặp đôi vàng sớm có hoàng tử nhỏ và công chúa đáng yêu!',
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [relationship, setRelationship] = useState('Bạn bè')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successNotice, setSuccessNotice] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!senderName.trim()) {
      setErrorMessage('Vui lòng nhập tên của bạn.')
      return
    }

    if (!message.trim()) {
      setErrorMessage('Vui lòng viết đôi lời chúc phúc.')
      return
    }

    addWish({
      senderName: senderName.trim(),
      relationship: relationship.trim() || 'Khách quý',
      message: message.trim(),
    })

    setSenderName('')
    setMessage('')
    setErrorMessage('')
    setSuccessNotice(true)

    triggerWeddingConfetti()
    setTimeout(() => setSuccessNotice(false), 4000)
  }

  const handleApplyQuickWish = (text: string) => {
    setMessage((prev) => (prev ? `${prev} ${text}` : text))
  }

  return (
    <section
      id="guestbook"
      data-journey-chapter="guestbook"
      aria-label="Sổ lưu bút chúc phúc"
      className="journey-chapter relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Screen Reader Semantic Data */}
      <div className="sr-only">
        <h2>Sổ lưu bút chúc phúc</h2>
        <p>Đã có {wishes.length} lời chúc từ quan khách.</p>
      </div>

      {/* Floating Trigger Button: leaves 3D romantic arch & floating wish notes completely visible */}
      <div className="relative z-20 flex justify-center px-4">
        <JourneyTriggerButton
          label="Gửi Lời Chúc Phúc & Đọc Sổ Lưu Bút"
          icon={<MessageSquareHeart className="h-4 w-4 text-gold-light" />}
          badge={wishes.length}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Guestbook Modal displayed only upon click */}
      <JourneyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sổ Lưu Bút Chúc Phúc"
        subtitle="Livre d'or · Cuốn sổ của yêu thương"
        icon={<Sparkles className="h-5 w-5 text-gold-light" />}
        maxWidth="5xl"
      >
        <div className="space-y-6">
          <p className="text-center font-serif text-sm italic text-sky-100/80">
            Mỗi lời nhắn là một trang ký ức chúng mình sẽ trân trọng trong hành trình mới.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-gold/45 bg-[#12283e]/90 p-5 shadow-xl">
              <h3 className="font-serif text-lg text-white font-bold mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-light" />
                <span>Gửi lời chúc của bạn</span>
              </h3>
              <p className="text-[11px] text-sky-100/70 mb-4">
                Lời chúc sẽ được lưu giữ mãi mãi trong cuốn sổ kỷ niệm ngày cưới
              </p>

              {successNotice && (
                <div className="mb-4 p-3 rounded-xl bg-emerald/20 border border-emerald/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Cảm ơn bạn! Lời chúc đã được gửi thành công.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="wish-name" className="block text-[11px] uppercase tracking-wider font-semibold text-gold-light mb-1">
                    Tên của bạn <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-100/60">
                      <User className="w-3.5 h-3.5 text-gold-light" />
                    </div>
                    <input
                      id="wish-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Ví dụ: Hoàng Long, Chị Thu Hà..."
                      className="w-full min-h-[42px] pl-9 pr-3 py-2 bg-[#0c1e30] rounded-xl border border-gold/30 text-xs text-white placeholder:text-sky-100/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="wish-rel" className="block text-[11px] uppercase tracking-wider font-semibold text-gold-light mb-1">
                    Mối quan hệ
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-100/60">
                      <Users className="w-3.5 h-3.5 text-gold-light" />
                    </div>
                    <select
                      id="wish-rel"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full min-h-[42px] pl-9 pr-3 py-2 bg-[#0c1e30] rounded-xl border border-gold/30 text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
                    >
                      <option value="Bạn bè">Bạn bè</option>
                      <option value="Bạn thân Chú Rể">Bạn thân Chú Rể</option>
                      <option value="Bạn thân Cô Dâu">Bạn thân Cô Dâu</option>
                      <option value="Đồng nghiệp">Đồng nghiệp</option>
                      <option value="Họ hàng nội ngoại">Họ hàng nội ngoại</option>
                      <option value="Anh chị em">Anh chị em</option>
                      <option value="Khách quý">Khách quý</option>
                    </select>
                  </div>
                </div>

                {/* Quick suggestions */}
                <div>
                  <span className="block text-[10px] uppercase tracking-wider font-medium text-gold-light mb-1">
                    Gợi ý câu chúc nhanh:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {quickWishesList.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyQuickWish(q)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#0c1e30] hover:bg-gold/20 text-sky-100 border border-gold/25 transition-colors text-left cursor-pointer truncate max-w-full"
                      >
                        {q.slice(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="wish-message" className="block text-[11px] uppercase tracking-wider font-semibold text-gold-light mb-1">
                    Lời chúc mừng của bạn <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="wish-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Gửi gắm những lời chúc ý nghĩa nhất tới đôi tân lang tân nương..."
                    className="w-full p-3 bg-[#0c1e30] rounded-xl border border-gold/30 text-xs text-white placeholder:text-sky-100/40 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-400">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark hover:from-gold hover:to-gold-light text-charcoal font-serif font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md shadow-gold/20 transition-all active:scale-[0.99] border border-gold cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-charcoal" />
                  <span>Gửi Lời Chúc Phúc</span>
                </button>
              </form>
            </div>

            {/* Wishes Feed Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gold-light uppercase tracking-wider">
                  Lời chúc gần đây ({wishes.length})
                </span>
                <span className="text-[11px] text-sky-100/60">Mới nhất xếp trên</span>
              </div>

              {wishes.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-gold/35 bg-[#12283e]/85 p-4 shadow-md hover:border-gold/60 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold-light font-bold text-xs">
                        {item.senderName.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-white">
                          {item.senderName}
                        </h4>
                        <span className="inline-block text-[10px] px-1.5 py-0.2 rounded-full bg-[#0c1e30] text-gold-light border border-gold/20">
                          {item.relationship}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] text-sky-100/50">
                      {item.createdAt}
                    </span>
                  </div>

                  <div className="relative pl-5 pt-1">
                    <Quote className="w-3.5 h-3.5 text-gold-light/40 absolute top-1 left-0" aria-hidden="true" />
                    <p className="text-xs text-sky-100/90 leading-relaxed font-sans">
                      {item.message}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </JourneyDetailModal>
    </section>
  )
}

export default GuestbookSection
