# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavioral Guidelines

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Project Overview

**D--Webdding** là dự án website thiệp cưới điện tử cao cấp với trải nghiệm không gian 3D tương tác chân thực, sang trọng và đầy tính nghệ thuật (Creative & Realistic 3D Digital Wedding Invitation).

Mục tiêu chính:
- **Tái hiện chân thực cảm giác mở thiệp cưới ngoài đời thực**: Bao thư 3D với con dấu sáp (wax seal), nếp gấp giấy, hiệu ứng ánh sáng bề mặt (PBR roughness/normal mapping).
- **Không gian trải nghiệm 3D điện ảnh**: Cánh hoa rơi, hạt ánh sáng lung linh, chuyển động camera mượt mà, khung cảnh sân khấu/cổng hoa lãng mạn.
- **Tối ưu hóa tối đa cho thiết bị di động (Mobile-first WebGL performance)**: Đạt 60 FPS mượt mà.

---

## Kiến Trúc Dự Án (High-Level Architecture)

Dự án được xây dựng theo mô hình phân tách tầng 3D Canvas và 2D UI Overlay:

1. **3D Canvas & Scene Layer (`/src/components/canvas/`)**:
   - `EnvelopeScene`: Scene bao thư 3D tương tác (click để mở sáp niêm phong, phong bì mở và lá thư từ từ mở rộng ra).
   - `PopUpBookScene / StoryScene`: Album ảnh 3D hoặc thiệp pop-up 3D chuyển động theo hành động cuộn/lướt.
   - `Environment & Lighting`: Ánh sáng PBR chân thực, HDRI, hiệu ứng chiều sâu (Depth of Field), bloom dịu nhẹ và hạt bụi/cánh hoa bay.
2. **2D Overlay & Content Layer (`/src/components/ui/` & `/src/components/sections/`)**:
   - `AudioPlayer`: Điều khiển nhạc nền lãng mạn (fade-in khi mở thiệp, nút bật/tắt tinh tế).
   - `Hero & Invitation`: Thông tin Cô dâu & Chú rể, ngày lành tháng tốt, đồng hồ đếm ngược (Countdown).
   - `Timeline & LoveStory`: Hành trình tình yêu với animation tương tác.
   - `EventDetails`: Chi tiết lễ Vu Quy, Thành Hôn, Tiệc Cưới kèm bản đồ chỉ đường (Google Maps GPS).
   - `RSVP & Guestbook`: Form xác nhận tham dự và Sổ lưu bút gửi lời chúc kèm hiệu ứng chúc phúc.
   - `GiftBox`: Hộp mừng cưới tinh tế (QR code chuyển khoản, lời cảm ơn).
3. **State Management & Audio Controller (`/src/store/` & `/src/hooks/`)**:
   - Quản lý trạng thái mở thiệp (`isOpened`, `envelopePhase`), trạng thái âm thanh, và hiệu suất hiển thị.

---

## Tech Stack Đề Xuất

- **Framework**: React + Vite (hoặc Next.js App Router) với TypeScript.
- **3D Graphics & Animation**: Three.js, `@react-three/fiber`, `@react-three/drei`, GSAP / Framer Motion.
- **Styling**: Tailwind CSS.
- **Audio**: Howler.js / Web Audio API.
- **Icons & UI Utilities**: Lucide-react, Canvas Confetti.

---

## Common Development Commands

- Cài đặt dependencies: `npm install`
- Chạy môi trường phát triển: `npm run dev`
- Build production: `npm run build`
- Kiểm tra lỗi code / Lint: `npm run lint`
- Preview bản build: `npm run preview`

---

## Quy Chuẩn Tối Ưu Hóa 3D & Mobile

- **Dung lượng 3D Assets**: Nén texture sang định dạng `.webp` hoặc `.ktx2`, mô hình 3D định dạng `.glb` được tối ưu qua Draco / Meshopt compression.
- **Adaptive Resolution**: Sử dụng `dpr={[1, 2]}` trên Canvas để tránh tụt FPS trên màn hình Retina/High-DPI của điện thoại.
- **Audio Policy**: Âm thanh chỉ phát sau tương tác đầu tiên của khách (chạm để mở thiệp) để tuân thủ chính sách Autoplay của trình duyệt iOS Safari & Android Chrome.

---

## Project Skills & Design Guidelines

- **UI/UX Design Skill**: Đặt tại `.claude/skills/ui-design/SKILL.md` (và `skills/ui-design/SKILL.md`).
- Khi phát triển giao diện hoặc tạo component mới, luôn tham chiếu quy chuẩn trong `ui-design`:
  - Bản sắc riêng, độc bản cho thiệp cưới, tránh template lỗi thời hoặc SaaS card kit rập khuôn.
  - Bộ màu chất liệu (Paper cream, Gold foil, Burgundy wax, Emerald, Rose champagne).
  - Nghệ thuật kiểu chữ (Display Serif thanh lịch + Sans-serif hiện đại cho thông tin).
  - Tối ưu hóa chuyển động 3D và tương tác cảm ứng di động.
