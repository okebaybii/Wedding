import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Sparkles, Heart } from 'lucide-react'
import { weddingAudioManager } from '../../hooks/useWeddingAudio.ts'

export interface Envelope3DSceneProps {
  isOpened: boolean
  onOpen?: () => void
  isMuted?: boolean
  className?: string
  monogram?: string
  groomName?: string
  brideName?: string
  groomFullName?: string
  brideFullName?: string
  groomParents?: string
  brideParents?: string
  weddingDate?: string
  weddingTime?: string
  lunarDate?: string
  venueName?: string
  venueHall?: string
  venueAddress?: string
}

interface CardTextureParams {
  monogram: string
  groomName: string
  brideName: string
  groomFullName: string
  brideFullName: string
  groomParents: string
  brideParents: string
  weddingDate: string
  weddingTime: string
  lunarDate: string
  venueName: string
  venueHall: string
  venueAddress: string
}

// Generates procedural burgundy wax seal texture with embossed gold monogram
function createWaxSealTexture(monogramText: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const center = 256
    const radius = 230

    // Serene French Royal Slate Blue wax base radial gradient
    const grad = ctx.createRadialGradient(center - 40, center - 40, 20, center, center, radius)
    grad.addColorStop(0, '#3A6084') // Lighter serene royal blue highlight
    grad.addColorStop(0.5, '#254465') // Classic royal French slate blue wax
    grad.addColorStop(0.85, '#172C42') // Deep royal blue shade
    grad.addColorStop(1, '#0F1E2E') // Dark wax perimeter
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, Math.PI * 2)
    ctx.fill()

    // Subtle wax surface texture / stippling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
    for (let i = 0; i < 600; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * (radius - 20)
      ctx.beginPath()
      ctx.arc(center + Math.cos(a) * r, center + Math.sin(a) * r, Math.random() * 2 + 1, 0, Math.PI * 2)
      ctx.fill()
    }

    // Outer concentric gold beaded ring
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(center, center, 205, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(center, center, 192, 0, Math.PI * 2)
    ctx.stroke()

    // Gold bead studs along the ring
    const beadCount = 36
    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2
      const bx = center + Math.cos(angle) * 198
      const by = center + Math.sin(angle) * 198
      ctx.fillStyle = '#FFE599'
      ctx.beginPath()
      ctx.arc(bx, by, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#AA7A1E'
      ctx.beginPath()
      ctx.arc(bx + 1, by + 1, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Laurel branches wreath (left & right)
    ctx.save()
    ctx.translate(center, center)
    ctx.strokeStyle = '#C8A86B'
    ctx.fillStyle = '#DFBF7A'
    ctx.lineWidth = 2.5

    for (let side = -1; side <= 1; side += 2) {
      ctx.save()
      ctx.scale(side, 1)
      ctx.beginPath()
      ctx.arc(0, 0, 160, Math.PI * 0.25, Math.PI * 0.75, false)
      ctx.stroke()

      // Leaves along the arc
      const leafCount = 9
      for (let j = 0; j < leafCount; j++) {
        const theta = Math.PI * 0.28 + (j / (leafCount - 1)) * (Math.PI * 0.44)
        const lx = Math.cos(theta) * 160
        const ly = Math.sin(theta) * 160
        ctx.save()
        ctx.translate(lx, ly)
        ctx.rotate(theta + Math.PI / 2)
        ctx.beginPath()
        ctx.ellipse(0, 0, 5, 12, 0.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      ctx.restore()
    }
    ctx.restore()

    // Embossed gold monogram "Q & M"
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 112px "Playfair Display", "Cinzel", "Times New Roman", serif'

    // Deep embossed shadow
    ctx.fillStyle = '#0F1E2E'
    ctx.fillText(monogramText, center + 4, center + 5)

    // Gold foil shimmer gradient
    const goldGrad = ctx.createLinearGradient(center - 100, center - 100, center + 100, center + 100)
    goldGrad.addColorStop(0, '#FFE89E')
    goldGrad.addColorStop(0.3, '#E5C068')
    goldGrad.addColorStop(0.6, '#B8860B')
    goldGrad.addColorStop(0.85, '#FFDF73')
    goldGrad.addColorStop(1, '#AA7A1E')

    ctx.fillStyle = goldGrad
    ctx.fillText(monogramText, center, center)

    // Top specular highlight edge for 3D raised stamping
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'rgba(255, 245, 200, 0.75)'
    ctx.strokeText(monogramText, center - 1, center - 1)

    // Bottom seal text "WEDDING"
    ctx.font = '600 24px "Cinzel", serif'
    ctx.letterSpacing = '6px'
    ctx.fillStyle = '#DFBF7A'
    ctx.fillText('INVITATION', center, center + 120)

    ctx.restore()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Bump map generator for realistic tactile wax embossing
function createWaxSealBumpMap(monogramText: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const center = 256
    // Neutral base gray
    ctx.fillStyle = '#555555'
    ctx.fillRect(0, 0, 512, 512)

    // Outer rim raised ridge
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(center, center, 205, 0, Math.PI * 2)
    ctx.stroke()

    // Inner rim groove
    ctx.strokeStyle = '#222222'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(center, center, 192, 0, Math.PI * 2)
    ctx.stroke()

    // Monogram raised height
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 112px "Playfair Display", "Cinzel", "Times New Roman", serif'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(monogramText, center, center)

    // Subtext
    ctx.font = '600 24px "Cinzel", serif'
    ctx.letterSpacing = '6px'
    ctx.fillStyle = '#CCCCCC'
    ctx.fillText('INVITATION', center, center + 120)
    ctx.restore()
  }

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// Generates luxury Vietnamese royal wedding invitation card texture
function createCardTexture({
  monogram,
  groomName,
  brideName,
  groomFullName,
  brideFullName,
  groomParents,
  brideParents,
  weddingDate,
  weddingTime,
  lunarDate,
  venueName,
  venueHall,
  venueAddress,
}: CardTextureParams): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1600
  canvas.height = 1120
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const w = canvas.width
    const h = canvas.height

    // 1. Fine-art ivory/cream parchment gradient base
    const baseGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, 920)
    baseGrad.addColorStop(0, '#FFFDF8')
    baseGrad.addColorStop(0.65, '#FAF5EB')
    baseGrad.addColorStop(1, '#F2E9D8')
    ctx.fillStyle = baseGrad
    ctx.fillRect(0, 0, w, h)

    // Subtle paper grain noise
    ctx.fillStyle = 'rgba(0, 0, 0, 0.015)'
    for (let i = 0; i < 4000; i++) {
      const rx = Math.random() * w
      const ry = Math.random() * h
      ctx.fillRect(rx, ry, 1, 1)
    }

    // 2. Triple French Gilded Borders
    // Outer border
    ctx.strokeStyle = '#C5A059'
    ctx.lineWidth = 3.5
    ctx.strokeRect(36, 36, w - 72, h - 72)

    // Middle hairline border
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)'
    ctx.lineWidth = 1
    ctx.strokeRect(46, 46, w - 92, h - 92)

    // Inner ornate border
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 1.8
    ctx.strokeRect(58, 58, w - 116, h - 116)

    // Corner decorative flourishes at 4 corners
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rot)
      ctx.strokeStyle = '#D4AF37'
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(36, 0)
      ctx.arc(36, 36, 36, -Math.PI / 2, Math.PI, true)
      ctx.lineTo(0, 36)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(18, 18, 4.5, 0, Math.PI * 2)
      ctx.fillStyle = '#D4AF37'
      ctx.fill()
      ctx.restore()
    }
    drawCorner(58, 58, 0)
    drawCorner(w - 58, 58, Math.PI / 2)
    drawCorner(w - 58, h - 58, Math.PI)
    drawCorner(58, h - 58, -Math.PI / 2)

    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    // 3. Royal Fleur-de-lis / Crown Accent
    ctx.fillStyle = '#D4AF37'
    ctx.beginPath()
    ctx.moveTo(w / 2, 70)
    ctx.lineTo(w / 2 + 10, 84)
    ctx.lineTo(w / 2 + 20, 75)
    ctx.lineTo(w / 2 + 14, 92)
    ctx.lineTo(w / 2 - 14, 92)
    ctx.lineTo(w / 2 - 20, 75)
    ctx.lineTo(w / 2 - 10, 84)
    ctx.closePath()
    ctx.fill()

    // Circular Monogram Crest
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(w / 2, 134, 34, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(w / 2, 134, 40, 0, Math.PI * 2)
    ctx.stroke()

    ctx.font = 'bold 30px "Playfair Display", "Cinzel", serif'
    const crestGrad = ctx.createLinearGradient(w / 2 - 25, 116, w / 2 + 25, 152)
    crestGrad.addColorStop(0, '#9E782F')
    crestGrad.addColorStop(0.5, '#F5DE96')
    crestGrad.addColorStop(1, '#9E782F')
    ctx.fillStyle = crestGrad
    ctx.fillText(monogram, w / 2, 116)

    // 4. Header: "THIỆP MỜI THÀNH HÔN"
    ctx.font = 'bold 24px "Cinzel", "Playfair Display", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '8px'
    ctx.fillStyle = '#967431'
    ctx.fillText('THIỆP MỜI THÀNH HÔN', w / 2, 186)

    ctx.font = 'italic 400 19px "Cormorant Garamond", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0.5px'
    ctx.fillStyle = '#5A554E'
    ctx.fillText('Trân trọng kính mời Quý Khách tới dự tiệc rượu mừng Lễ Thành Hôn cùng hai gia đình', w / 2, 224)

    // 5. Two-column Royal Family Heraldry
    const drawBadge = (bx: number, by: number, bw: number, bh: number, label: string) => {
      ctx.save()
      ctx.fillStyle = '#254465'
      ctx.strokeStyle = '#D4AF37'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.roundRect(bx - bw / 2, by, bw, bh, bh / 2)
      ctx.fill()
      ctx.stroke()
      ctx.font = 'bold 12px "Cinzel", sans-serif'
      if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
      ctx.fillStyle = '#FCE7B8'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, bx, by + bh / 2 + 1)
      ctx.restore()
    }

    // Left Column: Nhà Trai (centered at x = 420)
    drawBadge(420, 262, 160, 28, 'NHÀ TRAI')

    const groomParentsParts = groomParents ? groomParents.split('&').map((s) => s.trim()) : ['Ông: Nguyễn Văn Nam', 'Bà: Trần Thị Lan']
    ctx.font = '400 18px "Cormorant Garamond", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0.5px'
    ctx.fillStyle = '#38332E'
    ctx.fillText(groomParentsParts[0] || 'Ông: Nguyễn Văn Nam', 420, 305)
    ctx.fillText(groomParentsParts[1] ? (groomParentsParts[1].startsWith('Bà') ? groomParentsParts[1] : `Bà: ${groomParentsParts[1]}`) : 'Bà: Trần Thị Lan', 420, 332)

    ctx.font = 'italic 500 16px "Cormorant Garamond", serif'
    ctx.fillStyle = '#8C6F34'
    ctx.fillText('Trưởng nam:', 420, 366)

    ctx.font = 'bold 34px "Playfair Display", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '1.5px'
    const groomGrad = ctx.createLinearGradient(280, 0, 560, 0)
    groomGrad.addColorStop(0, '#254465')
    groomGrad.addColorStop(0.5, '#B8860B')
    groomGrad.addColorStop(1, '#254465')
    ctx.fillStyle = groomGrad
    ctx.fillText(groomFullName || groomName, 420, 392)

    // Center Column: Double Happiness 囍
    ctx.font = 'bold 48px "Playfair Display", serif'
    ctx.fillStyle = '#D4AF37'
    ctx.fillText('囍', w / 2, 330)

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(w / 2, 298)
    ctx.lineTo(w / 2, 320)
    ctx.moveTo(w / 2, 396)
    ctx.lineTo(w / 2, 418)
    ctx.stroke()

    // Right Column: Nhà Gái (centered at x = 1180)
    drawBadge(1180, 262, 160, 28, 'NHÀ GÁI')

    const brideParentsParts = brideParents ? brideParents.split('&').map((s) => s.trim()) : ['Ông: Lê Minh Tuấn', 'Bà: Phạm Hồng Nga']
    ctx.font = '400 18px "Cormorant Garamond", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0.5px'
    ctx.fillStyle = '#38332E'
    ctx.fillText(brideParentsParts[0] || 'Ông: Lê Minh Tuấn', 1180, 305)
    ctx.fillText(brideParentsParts[1] ? (brideParentsParts[1].startsWith('Bà') ? brideParentsParts[1] : `Bà: ${brideParentsParts[1]}`) : 'Bà: Phạm Hồng Nga', 1180, 332)

    ctx.font = 'italic 500 16px "Cormorant Garamond", serif'
    ctx.fillStyle = '#8C6F34'
    ctx.fillText('Út nữ:', 1180, 366)

    ctx.font = 'bold 34px "Playfair Display", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '1.5px'
    const brideGrad = ctx.createLinearGradient(1040, 0, 1320, 0)
    brideGrad.addColorStop(0, '#254465')
    brideGrad.addColorStop(0.5, '#B8860B')
    brideGrad.addColorStop(1, '#254465')
    ctx.fillStyle = brideGrad
    ctx.fillText(brideFullName || brideName, 1180, 392)

    // 6. Horizontal Divider with Diamond Motif
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.moveTo(w / 2 - 280, 452)
    ctx.lineTo(w / 2 - 35, 452)
    ctx.moveTo(w / 2 + 35, 452)
    ctx.lineTo(w / 2 + 280, 452)
    ctx.stroke()

    ctx.fillStyle = '#D4AF37'
    ctx.beginPath()
    ctx.moveTo(w / 2, 444)
    ctx.lineTo(w / 2 + 9, 452)
    ctx.lineTo(w / 2, 460)
    ctx.lineTo(w / 2 - 9, 452)
    ctx.closePath()
    ctx.fill()

    // 7. Wedding Date & Time Golden Cartouche Box
    const boxW = 1080
    const boxH = 135
    const boxX = w / 2 - boxW / 2
    const boxY = 480
    ctx.fillStyle = 'rgba(255, 253, 248, 0.96)'
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(boxX, boxY, boxW, boxH, 18)
    ctx.fill()
    ctx.stroke()

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(boxX + 6, boxY + 6, boxW - 12, boxH - 12, 14)
    ctx.stroke()

    ctx.font = 'bold 13px "Cinzel", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
    ctx.fillStyle = '#254465'
    ctx.fillText('HÔN LỄ ĐƯỢC TỔ CHỨC VÀO LÚC', w / 2, boxY + 20)

    ctx.font = 'bold 28px "Cinzel", "Playfair Display", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
    ctx.fillStyle = '#1C1917'
    ctx.fillText(`${weddingTime ? weddingTime.toUpperCase() : '18:00 TỐI'}  •  ${weddingDate ? weddingDate.toUpperCase() : 'THỨ SÁU, NGÀY 20 THÁNG 11 NĂM 2026'}`, w / 2, boxY + 48)

    ctx.font = 'italic 18px "Cormorant Garamond", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '1px'
    ctx.fillStyle = '#7A6230'
    ctx.fillText(lunarDate || '(Nhằm ngày 12 tháng 10 năm Bính Ngọ)', w / 2, boxY + 92)

    // 8. Venue & Reception Location Information
    ctx.font = 'bold 24px "Cinzel", "Playfair Display", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
    ctx.fillStyle = '#254465'
    ctx.fillText(venueName ? venueName.toUpperCase() : 'TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI RIVERSIDE PALACE', w / 2, 645)

    ctx.font = '600 20px "Playfair Display", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '1px'
    ctx.fillStyle = '#9E782F'
    ctx.fillText(venueHall || 'Sảnh Grand Ballroom (Tầng 2)', w / 2, 684)

    ctx.font = '500 17px "Plus Jakarta Sans", sans-serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0.5px'
    ctx.fillStyle = '#3F3B36'
    ctx.fillText(venueAddress || '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh', w / 2, 718)

    ctx.font = 'italic 17px "Cormorant Garamond", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '1px'
    ctx.fillStyle = '#6E675D'
    ctx.fillText('Đón khách lúc: 17:30   •   Khai tiệc lúc: 18:30', w / 2, 752)

    // 9. Horizontal Divider & Solemn Closing Words
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(w / 2 - 200, 792)
    ctx.lineTo(w / 2 + 200, 792)
    ctx.stroke()

    ctx.font = 'italic 19px "Cormorant Garamond", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0.5px'
    ctx.fillStyle = '#524C44'
    ctx.fillText('“Sự hiện diện của Quý Khách là niềm vinh hạnh lớn lao cho hai gia đình chúng tôi”', w / 2, 814)

    ctx.font = 'bold 15px "Cinzel", serif'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
    ctx.fillStyle = '#9E782F'
    ctx.fillText('RẤT HÂN HẠNH ĐƯỢC ĐÓN TIẾP!', w / 2, 854)

    ctx.restore()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Generates gold bokeh particle sprite texture
function createBokehTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
    grad.addColorStop(0.2, 'rgba(255, 230, 160, 0.9)')
    grad.addColorStop(0.5, 'rgba(200, 168, 107, 0.5)')
    grad.addColorStop(0.8, 'rgba(200, 168, 107, 0.15)')
    grad.addColorStop(1, 'rgba(200, 168, 107, 0.0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(32, 32, 32, 0, Math.PI * 2)
    ctx.fill()
  }
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// Synthesized Web Audio API sound for wax breaking, paper rustling, celestial chime, and BGM serenade
function playAudioOpen(isMuted?: boolean) {
  if (isMuted || typeof window === 'undefined') return
  try {
    // Start music synchronously in user click gesture to ensure AudioContext resumes
    weddingAudioManager.startMusic()
    weddingAudioManager.playWaxBreakSFX()
    window.setTimeout(() => {
      weddingAudioManager.playPaperRustleSFX()
    }, 100)
    window.setTimeout(() => {
      weddingAudioManager.playChimeSFX()
    }, 450)
  } catch {
    // Autoplay restrictions or audio disabled, gracefully handled
  }
}

export const Envelope3DScene: React.FC<Envelope3DSceneProps> = ({
  isOpened,
  onOpen,
  isMuted = false,
  className = '',
  monogram = 'Q & M',
  groomName = 'Minh Quân',
  brideName = 'Thảo My',
  groomFullName = 'Nguyễn Minh Quân',
  brideFullName = 'Lê Hoàng Thảo My',
  groomParents = 'Ông Nguyễn Văn Nam & Bà Trần Thị Lan',
  brideParents = 'Ông Lê Minh Tuấn & Bà Phạm Hồng Nga',
  weddingDate = 'Thứ Sáu, ngày 20 tháng 11 năm 2026',
  weddingTime = '18:00 Tối',
  lunarDate = '(Nhằm ngày 12 tháng 10 năm Bính Ngọ)',
  venueName = 'Trung Tâm Hội Nghị Tiệc Cưới Riverside Palace',
  venueHall = 'Sảnh Grand Ballroom (Tầng 2)',
  venueAddress = '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Stable callback ref to prevent unneeded effect re-runs
  const onOpenRef = useRef(onOpen)
  useEffect(() => {
    onOpenRef.current = onOpen
  }, [onOpen])

  const isMutedRef = useRef(isMuted)
  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  // State refs for animation loop
  const isOpenedRef = useRef(isOpened)
  useEffect(() => {
    isOpenedRef.current = isOpened
    if (!isOpened) {
      setHasInteracted(false)
    }
  }, [isOpened])

  const openProgressRef = useRef(isOpened ? 1.0 : 0.0)

  // Handle direct click
  const handleOpenTrigger = useCallback(() => {
    if (openProgressRef.current > 0.05) return
    setHasInteracted(true)
    playAudioOpen(isMutedRef.current)
    onOpenRef.current?.()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || 600

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    const initialAspect = width / height
    const initialCamZ = initialAspect < 1.0 ? 5.2 * Math.min(1.4, 0.95 / initialAspect) : 5.2
    camera.position.set(0, 0, initialCamZ)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    // 2. Lighting Rig (3-Point Soft Studio Light)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.95)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff6ec, 1.6)
    keyLight.position.set(3.5, 5.0, 4.0)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 12
    keyLight.shadow.bias = -0.001
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xead5cd, 0.7)
    fillLight.position.set(-3.5, 1.5, 3.0)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.1)
    rimLight.position.set(0, 4.0, -3.5)
    scene.add(rimLight)

    // Top accent light on the wax seal
    const sealLight = new THREE.PointLight(0xffe8a0, 1.2, 5)
    sealLight.position.set(0, 0, 2.5)
    scene.add(sealLight)

    // 3. Materials
    // Luxury cream/ivory paper material (#FAF6F0) with realistic bevels and paper roughness
    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xfaf6f0,
      roughness: 0.72,
      metalness: 0.04,
      side: THREE.DoubleSide,
    })

    const paperInnerMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3ede3,
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.DoubleSide,
    })

    // Gold rim material
    const goldRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    })

    // Textures
    const waxTexture = createWaxSealTexture(monogram)
    const waxBumpTexture = createWaxSealBumpMap(monogram)
    const cardTexture = createCardTexture({
      monogram,
      groomName,
      brideName,
      groomFullName,
      brideFullName,
      groomParents,
      brideParents,
      weddingDate,
      weddingTime,
      lunarDate,
      venueName,
      venueHall,
      venueAddress,
    })
    const bokehTexture = createBokehTexture()

    // Royal French Slate Blue wax seal material (#254465) with embossed monogram
    const waxSealMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x254465,
      roughness: 0.32,
      metalness: 0.12,
      clearcoat: 0.65,
      clearcoatRoughness: 0.25,
      map: waxTexture,
      bumpMap: waxBumpTexture,
      bumpScale: 0.035,
    })

    // 4. Envelope Geometry Construction
    const envelopeGroup = new THREE.Group()
    scene.add(envelopeGroup)

    const envW = 3.6
    const envH = 2.4
    const envDepth = 0.05

    // A. Back Panel
    const backGeometry = new THREE.BoxGeometry(envW, envH, 0.015)
    const backMesh = new THREE.Mesh(backGeometry, paperInnerMaterial)
    backMesh.position.set(0, 0, -envDepth / 2)
    backMesh.castShadow = true
    backMesh.receiveShadow = true
    envelopeGroup.add(backMesh)

    // B. Front Pocket with authentic V-cut opening
    const frontShape = new THREE.Shape()
    frontShape.moveTo(-envW / 2, -envH / 2)
    frontShape.lineTo(envW / 2, -envH / 2)
    frontShape.lineTo(envW / 2, 0.35)
    frontShape.lineTo(0, -0.25) // V-neck dip
    frontShape.lineTo(-envW / 2, 0.35)
    frontShape.closePath()

    const frontExtrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.015,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
    }
    const frontGeometry = new THREE.ExtrudeGeometry(frontShape, frontExtrudeSettings)
    const frontMesh = new THREE.Mesh(frontGeometry, paperMaterial)
    frontMesh.position.set(0, 0, envDepth / 2 - 0.01)
    frontMesh.castShadow = true
    frontMesh.receiveShadow = true
    envelopeGroup.add(frontMesh)

    // C. Wedding Invitation Card Inside
    const cardW = 3.35
    const cardH = 2.35
    const cardGeometry = new THREE.BoxGeometry(cardW, cardH, 0.015)
    const cardMaterials = [
      paperMaterial, // right
      paperMaterial, // left
      paperMaterial, // top
      paperMaterial, // bottom
      new THREE.MeshStandardMaterial({
        map: cardTexture,
        roughness: 0.45,
        metalness: 0.15,
      }), // front (with invitation text and gold foil)
      paperMaterial, // back
    ]
    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterials)
    cardMesh.position.set(0, 0.02, 0.005) // Tucked safely inside the pocket
    cardMesh.castShadow = true
    cardMesh.receiveShadow = true
    envelopeGroup.add(cardMesh)

    // D. Top Triangular Flap with Hinge at top edge (y = envH / 2 = 1.2)
    const topFlapGroup = new THREE.Group()
    topFlapGroup.position.set(0, envH / 2, envDepth / 2 + 0.005)
    envelopeGroup.add(topFlapGroup)

    const flapShape = new THREE.Shape()
    flapShape.moveTo(-envW / 2, 0)
    flapShape.lineTo(envW / 2, 0)
    flapShape.lineTo(0.18, -1.45)
    flapShape.quadraticCurveTo(0, -1.52, -0.18, -1.45)
    flapShape.lineTo(-envW / 2, 0)
    flapShape.closePath()

    const flapGeometry = new THREE.ExtrudeGeometry(flapShape, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    })
    const flapMesh = new THREE.Mesh(flapGeometry, paperMaterial)
    flapMesh.position.set(0, 0, 0)
    flapMesh.castShadow = true
    flapMesh.receiveShadow = true
    topFlapGroup.add(flapMesh)

    // E. 3D Wax Seal Mesh (Organic melted wax disc + embossed monogram face + gold rim)
    const waxSealGroup = new THREE.Group()
    // Position seal at the tip of the flap
    waxSealGroup.position.set(0, -1.35, 0.025)
    topFlapGroup.add(waxSealGroup)

    // Organic melted wax rim shape
    const sealPoints = 36
    const sealShape = new THREE.Shape()
    for (let i = 0; i <= sealPoints; i++) {
      const angle = (i / sealPoints) * Math.PI * 2
      // Radial waviness for authentic melted edge
      const radiusPerturb =
        0.38 +
        Math.sin(angle * 7) * 0.02 +
        Math.cos(angle * 4 + 0.8) * 0.015 +
        Math.sin(angle * 11) * 0.008
      const px = Math.cos(angle) * radiusPerturb
      const py = Math.sin(angle) * radiusPerturb
      if (i === 0) sealShape.moveTo(px, py)
      else sealShape.lineTo(px, py)
    }

    const sealBaseGeometry = new THREE.ExtrudeGeometry(sealShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3,
    })
    const sealBaseMesh = new THREE.Mesh(sealBaseGeometry, waxSealMaterial)
    sealBaseMesh.castShadow = true
    waxSealGroup.add(sealBaseMesh)

    // Golden rim reflection ring
    const goldRimGeo = new THREE.TorusGeometry(0.33, 0.012, 12, 48)
    const goldRimMesh = new THREE.Mesh(goldRimGeo, goldRimMaterial)
    goldRimMesh.position.set(0, 0, 0.024)
    waxSealGroup.add(goldRimMesh)

    // Seal front cap face with embossed monogram texture
    const sealFaceGeo = new THREE.CircleGeometry(0.32, 48)
    const sealFaceMesh = new THREE.Mesh(sealFaceGeo, waxSealMaterial)
    sealFaceMesh.position.set(0, 0, 0.025)
    waxSealGroup.add(sealFaceMesh)

    // F. Golden Sparkle Burst Particles for Wax Breaking Effect
    const burstCount = 28
    const burstGeometry = new THREE.BufferGeometry()
    const burstPositions = new Float32Array(burstCount * 3)
    const burstVelocities: { x: number; y: number; z: number }[] = []

    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = 0
      burstPositions[i * 3 + 1] = 0
      burstPositions[i * 3 + 2] = 0
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI
      const speed = Math.random() * 2.2 + 0.8
      burstVelocities.push({
        x: Math.cos(theta) * Math.cos(phi) * speed,
        y: Math.sin(phi) * speed + 0.5,
        z: Math.sin(theta) * Math.cos(phi) * speed + 0.5,
      })
    }
    burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3))
    const burstMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffdf7a,
      map: bokehTexture,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const burstPoints = new THREE.Points(burstGeometry, burstMaterial)
    burstPoints.position.set(0, -0.15, 0.1) // Located at initial wax seal world pos
    envelopeGroup.add(burstPoints)

    // 5. 3D Floating Particles System (40-50 rose petals & golden bokeh)
    // A. 25 Rose Petals
    const petalCount = 25
    const petalGroup = new THREE.Group()
    scene.add(petalGroup)

    const petalShape = new THREE.Shape()
    petalShape.moveTo(0, -0.08)
    petalShape.bezierCurveTo(0.09, -0.04, 0.11, 0.1, 0, 0.16)
    petalShape.bezierCurveTo(-0.11, 0.1, -0.09, -0.04, 0, -0.08)

    const petalGeo = new THREE.ShapeGeometry(petalShape)
    const petalColors = [0xffffff, 0xf0f7fd, 0xdbeafe, 0xbae6fd, 0xe0f2fe]

    interface PetalData {
      mesh: THREE.Mesh
      vx: number
      vy: number
      vz: number
      drx: number
      dry: number
      drz: number
      seedX: number
      seedZ: number
    }
    const petals: PetalData[] = []

    for (let i = 0; i < petalCount; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: petalColors[i % petalColors.length],
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(petalGeo, mat)
      const scale = Math.random() * 0.7 + 0.65
      mesh.scale.set(scale, scale, scale)

      mesh.position.set(
        (Math.random() - 0.5) * 7.5,
        (Math.random() - 0.5) * 6.5,
        (Math.random() - 0.5) * 4.0
      )
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )

      petals.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.35 + 0.25),
        vz: (Math.random() - 0.5) * 0.12,
        drx: (Math.random() - 0.5) * 1.5,
        dry: (Math.random() - 0.5) * 1.8,
        drz: (Math.random() - 0.5) * 1.2,
        seedX: Math.random() * 100,
        seedZ: Math.random() * 100,
      })
      petalGroup.add(mesh)
    }

    // B. 22 Golden Bokeh Glowing Particles
    const bokehCount = 22
    const bokehGroup = new THREE.Group()
    scene.add(bokehGroup)

    interface BokehData {
      sprite: THREE.Sprite
      baseY: number
      baseScale: number
      vy: number
      pulsePhase: number
    }
    const bokehList: BokehData[] = []

    for (let i = 0; i < bokehCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: bokehTexture,
        color: 0xffe29a,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.3,
        blending: THREE.AdditiveBlending,
      })
      const sprite = new THREE.Sprite(mat)
      const baseScale = Math.random() * 0.22 + 0.12
      sprite.scale.set(baseScale, baseScale, 1)

      sprite.position.set(
        (Math.random() - 0.5) * 7.0,
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 3.5
      )

      bokehList.push({
        sprite,
        baseY: sprite.position.y,
        baseScale,
        vy: Math.random() * 0.12 + 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
      })
      bokehGroup.add(sprite)
    }

    // 6. Interactive Raycasting & Mouse Tilt
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-999, -999)
    const targetTilt = { x: 0, y: 0 }
    const currentTilt = { x: 0, y: 0 }

    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -(((clientY - rect.top) / rect.height) * 2 - 1)

      // Smooth envelope tilt toward cursor (within refined angles)
      targetTilt.y = pointer.x * 0.22
      targetTilt.x = -pointer.y * 0.18
    }

    const onPointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY)

      // Check hover on interactive objects
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects([waxSealGroup, envelopeGroup], true)
      if (intersects.length > 0 && openProgressRef.current < 0.1) {
        setIsHovered(true)
        canvas.style.cursor = 'pointer'
      } else {
        setIsHovered(false)
        canvas.style.cursor = 'default'
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY)
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects([waxSealGroup, envelopeGroup], true)

      if (intersects.length > 0 || openProgressRef.current < 0.05) {
        handleOpenTrigger()
      }
    }

    // Mobile Gyroscope support
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp angles gracefully
        const clampedGamma = Math.max(-30, Math.min(30, e.gamma))
        const clampedBeta = Math.max(-30, Math.min(30, e.beta - 45))
        targetTilt.y = (clampedGamma / 30) * 0.2
        targetTilt.x = (clampedBeta / 30) * 0.15
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerdown', onPointerDown)
    const onCanvasClick = () => {
      if (openProgressRef.current < 0.05) {
        handleOpenTrigger()
      }
    }
    canvas.addEventListener('click', onCanvasClick)
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true })
    }

    // 7. Smooth Resize Handler
    const onResize = () => {
      if (!container || !canvas) return
      const newW = container.clientWidth || window.innerWidth
      const newH = container.clientHeight || 600
      const aspect = newW / newH
      camera.aspect = aspect
      if (aspect < 1.0) {
        camera.position.z = 5.2 * Math.min(1.4, 0.95 / aspect)
      } else {
        camera.position.z = 5.2
      }
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    // 8. Main Render & Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    let burstActive = false
    let burstTimer = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.1)
      const elapsedTime = clock.getElapsedTime()

      // Target state sync
      const shouldBeOpened = isOpenedRef.current
      if (shouldBeOpened && openProgressRef.current < 1.0) {
        openProgressRef.current = Math.min(1.0, openProgressRef.current + delta * 0.85)
      } else if (!shouldBeOpened && openProgressRef.current > 0.0) {
        openProgressRef.current = Math.max(0.0, openProgressRef.current - delta * 0.95)
      }

      const p = openProgressRef.current

      // A. Idle floating animation + Mouse/Gyro Tilt
      currentTilt.x += (targetTilt.x - currentTilt.x) * (delta * 5.0)
      currentTilt.y += (targetTilt.y - currentTilt.y) * (delta * 5.0)

      const floatY = Math.sin(elapsedTime * 1.5) * 0.06
      const floatRotZ = Math.sin(elapsedTime * 1.1) * 0.015

      envelopeGroup.position.y = floatY
      envelopeGroup.rotation.x = currentTilt.x
      envelopeGroup.rotation.y = currentTilt.y
      envelopeGroup.rotation.z = floatRotZ

      // B. Opening Sequence Animations
      // 1. Wax seal fracture / scale-fade effect (progress 0.0 -> 0.28)
      if (p > 0.01 && p < 0.35) {
        if (!burstActive && p > 0.04) {
          burstActive = true
          burstTimer = 0
        }
        const sealFade = Math.max(0, 1.0 - p / 0.28)
        waxSealGroup.scale.set(sealFade, sealFade, sealFade)
        waxSealMaterial.opacity = sealFade
        waxSealMaterial.transparent = true
      } else if (p >= 0.35) {
        waxSealGroup.scale.set(0.001, 0.001, 0.001)
        waxSealGroup.visible = false
      } else {
        waxSealGroup.scale.set(1, 1, 1)
        waxSealMaterial.opacity = 1.0
        waxSealMaterial.transparent = false
        waxSealGroup.visible = true
      }

      // Sparkle burst progression
      if (burstActive) {
        burstTimer += delta
        burstMaterial.opacity = Math.max(0, 1.0 - burstTimer / 0.85) * 0.85
        const posAttr = burstGeometry.attributes.position as THREE.BufferAttribute
        const posArray = posAttr.array as Float32Array
        for (let i = 0; i < burstCount; i++) {
          posArray[i * 3] += burstVelocities[i].x * delta
          posArray[i * 3 + 1] += burstVelocities[i].y * delta
          posArray[i * 3 + 2] += burstVelocities[i].z * delta
          burstVelocities[i].y -= 2.0 * delta // gentle gravity
        }
        posAttr.needsUpdate = true
        if (burstTimer > 0.85) {
          burstActive = false
        }
      }

      // 2. Flap Rotation Open (progress 0.1 -> 0.60)
      const flapT = THREE.MathUtils.smoothstep(p, 0.1, 0.60)
      // Positive rotation swings flap backwards behind envelope
      topFlapGroup.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.98, flapT)
      topFlapGroup.position.z = THREE.MathUtils.lerp(envDepth / 2 + 0.005, -envDepth / 2 - 0.015, flapT)

      // 3. Invitation Card Slide Up (progress 0.35 -> 1.0)
      const cardT = THREE.MathUtils.smoothstep(p, 0.35, 1.0)
      // Ease out cubic
      const cardEase = 1 - Math.pow(1 - cardT, 3)
      cardMesh.position.y = THREE.MathUtils.lerp(0.02, 1.48, cardEase)
      cardMesh.position.z = THREE.MathUtils.lerp(0.005, 0.22, cardEase)
      cardMesh.rotation.x = THREE.MathUtils.lerp(0, -0.04, cardEase)
      const cardScale = THREE.MathUtils.lerp(1.0, 1.04, cardEase)
      cardMesh.scale.set(cardScale, cardScale, 1.0)

      // 4. Camera subtle zoom & framing
      const camT = THREE.MathUtils.smoothstep(p, 0.25, 0.95)
      const currentAspect = (container.clientWidth || window.innerWidth) / (container.clientHeight || 600)
      const baseCamZ = currentAspect < 1.0 ? 5.2 * Math.min(1.4, 0.95 / currentAspect) : 5.2
      const targetCamZ = currentAspect < 1.0 ? baseCamZ * 0.88 : 4.45
      camera.position.z = THREE.MathUtils.lerp(baseCamZ, targetCamZ, camT)
      camera.position.y = THREE.MathUtils.lerp(0.0, 0.72, camT)
      camera.lookAt(0, THREE.MathUtils.lerp(0.0, 0.65, camT), 0)

      // C. 3D Floating Particles Animation
      // Rose petals drifting with sinusoidal turbulence
      for (let i = 0; i < petals.length; i++) {
        const pt = petals[i]
        pt.mesh.position.y += pt.vy * delta
        pt.mesh.position.x += Math.sin(elapsedTime * 0.8 + pt.seedX) * 0.004
        pt.mesh.position.z += Math.cos(elapsedTime * 0.6 + pt.seedZ) * 0.003

        pt.mesh.rotation.x += pt.drx * delta
        pt.mesh.rotation.y += pt.dry * delta
        pt.mesh.rotation.z += pt.drz * delta

        // Seamless bounding wrap
        if (pt.mesh.position.y < -3.6) {
          pt.mesh.position.y = 3.6
          pt.mesh.position.x = (Math.random() - 0.5) * 7.5
          pt.mesh.position.z = (Math.random() - 0.5) * 4.0
        }
      }

      // Golden bokeh particles hover & pulse
      for (let i = 0; i < bokehList.length; i++) {
        const bk = bokehList[i]
        bk.sprite.position.y += bk.vy * delta
        const pulse = Math.sin(elapsedTime * 2.2 + bk.pulsePhase)
        const scale = bk.baseScale * (1 + pulse * 0.25)
        bk.sprite.scale.set(scale, scale, 1)

        if (bk.sprite.position.y > 3.6) {
          bk.sprite.position.y = -3.6
          bk.sprite.position.x = (Math.random() - 0.5) * 7.0
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // 9. Thorough Cleanup on Component Unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('click', onCanvasClick)
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', onDeviceOrientation)
      }

      // Dispose Geometries, Materials, and Textures
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material?.dispose()
          }
        } else if (obj instanceof THREE.Points) {
          obj.geometry?.dispose()
          if (obj.material instanceof THREE.Material) {
            obj.material.dispose()
          }
        } else if (obj instanceof THREE.Sprite) {
          obj.material.dispose()
        }
      })

      waxTexture.dispose()
      waxBumpTexture.dispose()
      cardTexture.dispose()
      bokehTexture.dispose()

      // Gracefully dispose WebGL renderer without forcing context loss (enables React StrictMode re-mount)
      renderer.dispose()
    }
  }, [
    monogram,
    groomName,
    brideName,
    groomFullName,
    brideFullName,
    groomParents,
    brideParents,
    weddingDate,
    weddingTime,
    lunarDate,
    venueName,
    venueHall,
    venueAddress,
    handleOpenTrigger,
  ])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[480px] md:min-h-[580px] flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-pointer outline-none"
        aria-label="Interactive 3D Wedding Envelope"
      />

      {/* Floating Action Affordance Indicator (Fades out when opened) */}
      <div
        className={`absolute bottom-6 md:bottom-8 z-20 left-1/2 -translate-x-1/2 transition-all duration-700 pointer-events-none flex flex-col items-center gap-2 ${
          isOpened || hasInteracted ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <button
          type="button"
          onClick={handleOpenTrigger}
          className={`pointer-events-auto group px-6 py-2.5 rounded-full backdrop-blur-md bg-paper-light/80 hover:bg-paper-light border border-gold/40 hover:border-gold shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all duration-300 flex items-center gap-2.5 text-xs md:text-sm tracking-wider uppercase font-serif text-charcoal hover:text-burgundy cursor-pointer ${
            isHovered ? 'scale-105 border-gold shadow-gold/30' : ''
          }`}
        >
          <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform duration-500 animate-pulse" />
          <span>Chạm để mở thiệp</span>
          <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy/20 group-hover:scale-125 transition-transform duration-300" />
        </button>

        <p className="text-[11px] font-sans text-charcoal-muted tracking-wide flex items-center gap-1.5 opacity-75">
          <span>Di chuyển chuột hoặc nghiêng điện thoại để ngắm nhìn</span>
        </p>
      </div>
    </div>
  )
}

export default Envelope3DScene
