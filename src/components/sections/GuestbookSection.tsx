import React, { useState } from 'react'
import { MessageSquareHeart, Send, Sparkles, User, Users, Quote, Check } from 'lucide-react'
import { triggerWeddingConfetti } from '../../utils/confetti.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'
import { useWeddingData } from '../../store/WeddingContext.tsx'

const quickWishes = [
  'Chúc hai bạn trăm năm tình viên mãn, đầu bạc răng long! 💍',
  'Chúc Minh Quân & Thảo My mãi ngọt ngào, hạnh phúc bền lâu!',
  'Một hành trình mới thật nhiều tiếng cười và thành công rực rỡ!',
  'Chúc cặp đôi vàng sớm có hoàng tử nhỏ và công chúa đáng yêu!',
]

export const GuestbookSection: React.FC = () => {
  const { state, addWish } = useWeddingData()
  const wishes = state.wishes

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
      aria-label="Sổ lưu bút chúc phúc"
      className="relative py-20 sm:py-28 px-4 bg-paper overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-light border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
              <MessageSquareHeart className="w-3.5 h-3.5 text-burgundy" aria-hidden="true" />
              <span>Sổ Lưu Bút Chúc Phúc</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
              Gửi Lời Chúc Mừng
            </h2>
            <p className="mt-3 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-light">
              Những lời chúc tốt lành và tình cảm của quý vị là hành trang đẹp nhất cho khởi đầu mới của chúng mình
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Top: Interactive Post Wish Form (5 cols on lg) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={150}>
              <div className="bg-paper-light border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-md relative">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark rounded-t-3xl" />

                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-bold tracking-tight mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-dark" />
                  <span>Gửi lời chúc của bạn</span>
                </h3>
                <p className="text-xs text-charcoal-muted mb-6">
                  Lời chúc sẽ được lưu giữ mãi mãi trong cuốn sổ kỷ niệm ngày cưới
                </p>

                {successNotice && (
                  <div className="mb-5 p-3.5 rounded-xl bg-emerald/15 border border-emerald/40 text-emerald text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-200">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Cảm ơn bạn! Lời chúc đã được đăng thành công.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="wish-name" className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5">
                      Tên của bạn <span className="text-burgundy">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                        <User className="w-4 h-4 text-gold-dark" aria-hidden="true" />
                      </div>
                      <input
                        id="wish-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Ví dụ: Hoàng Long, Chị Thu Hà..."
                        className="w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-paper rounded-xl border border-gold/30 hover:border-gold/60 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="wish-rel" className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5">
                      Mối quan hệ
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                        <Users className="w-4 h-4 text-gold-dark" aria-hidden="true" />
                      </div>
                      <select
                        id="wish-rel"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-paper rounded-xl border border-gold/30 hover:border-gold/60 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50"
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
                    <span className="block text-[11px] uppercase tracking-wider font-medium text-gold-dark mb-1.5">
                      Gợi ý câu chúc nhanh:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickWishes.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleApplyQuickWish(q)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-paper hover:bg-gold/20 text-charcoal border border-gold/25 transition-colors text-left"
                        >
                          {q.slice(0, 32)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="wish-message" className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5">
                      Lời chúc mừng của bạn <span className="text-burgundy">*</span>
                    </label>
                    <textarea
                      id="wish-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Gửi gắm những lời chúc ý nghĩa nhất tới đôi tân lang tân nương..."
                      className="w-full p-3.5 bg-paper rounded-xl border border-gold/30 hover:border-gold/60 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-burgundy font-medium">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-burgundy hover:bg-burgundy-light text-paper-light font-medium text-sm tracking-wide flex items-center justify-center gap-2 shadow-md shadow-burgundy/20 transition-all active:scale-[0.99] border border-gold/30 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-gold-light" />
                    <span>Gửi Lời Chúc Phúc</span>
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Wishes List Stream (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={250}>
              <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-gold-dark">
                    Lời chúc gần đây ({wishes.length})
                  </span>
                  <span className="text-[11px] text-charcoal-muted">Mới nhất xếp trên</span>
                </div>

                {wishes.map((item) => (
                  <article
                    key={item.id}
                    className="bg-paper-light/90 border border-gold/30 rounded-2xl p-5 shadow-xs hover:border-gold/60 transition-all duration-200 relative group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        {/* Monogram / Avatar circle */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne via-paper to-gold-light/40 border border-gold/40 flex items-center justify-center text-charcoal font-display font-bold text-sm shadow-xs">
                          {item.senderName.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-charcoal">
                            {item.senderName}
                          </h4>
                          <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-paper text-emerald font-medium border border-emerald/20">
                            {item.relationship}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] text-charcoal-muted whitespace-nowrap">
                        {item.createdAt}
                      </span>
                    </div>

                    <div className="relative pl-6 pt-1">
                      <Quote className="w-4 h-4 text-gold-dark/40 absolute top-1 left-0" aria-hidden="true" />
                      <p className="font-sans text-sm text-charcoal leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
