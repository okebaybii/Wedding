---
name: ui-design
description: Thiết kế giao diện website thiệp cưới 3D chuẩn chỉ, sáng tạo, sang trọng và độc bản. Sử dụng khi cần thiết kế UI, xây dựng layout, bảng màu, typography, và các hiệu ứng tương tác 3D.
metadata:
  author: Claude Code
  version: "1.0.0"
---

# UI/UX & Frontend Design Skill (Chuyên Biệt Cho Website Thiệp Cưới 3D)

Kỹ năng này định hướng phong cách thiết kế giao diện (UI/UX) đạt đẳng cấp thẩm mỹ cao nhất: **Sang trọng, Độc bản, Chân thực và Giàu cảm xúc**, loại bỏ hoàn toàn các lỗi thiết kế khuôn mẫu, rập khuôn dạng template phổ thông.

---

## 1. Triết Lý Thiết Kế: Bản Sắc Riêng & Độc Bản (Distinct Identity)

Mỗi đám cưới là một câu chuyện tình yêu độc nhất. Giao diện thiệp cưới không được phép giống một template SaaS hay website tin tức thương mại:
- **Ngôn ngữ thiết kế (Design Language)**: Kết hợp hài hòa giữa chất liệu nghệ thuật cổ điển (giấy mỹ thuật thủ công, sáp niêm phong, chữ dập nổi, ép kim vàng foil) và công nghệ đồ họa 3D hiện đại (Three.js WebGL, ánh sáng PBR chân thực, hiệu ứng hạt lung linh).
- **Tránh các khuôn mẫu AI/Template lỗi thời**:
  - Không dùng các thẻ bo tròn trắng xám vô hồn (SaaS card kit) lặp đi lặp lại.
  - Không lạm dụng hiệu ứng đổ bóng mờ nhạt `rgba(0,0,0,0.1)`.
  - Không dùng quá nhiều hiệu ứng bay lượn ngẫu nhiên gây phân tâm; chỉ sử dụng chuyển động có chủ đích phản hồi lại tương tác của người xem (mở phong bì, lật trang thiệp, chạm nhẹ làm gợn cánh hoa).

---

## 2. Hệ Thống Màu Sắc & Chất Liệu (Color Tokens & Materiality)

Xây dựng bảng màu với 4–6 tone màu chủ đạo gắn liền với chất liệu thực tế:

| Token Name | Mã Màu Đề Xuất | Ứng Dụng |
| :--- | :--- | :--- |
| `paper-cream` | `#FDFBF7` / `#FAF6F0` | Nền giấy mỹ thuật có vân nhẹ, dịu mắt và ấm cúng |
| `gold-accent` | `#C8A86B` / `#D4AF37` | Chi tiết ép kim foil vàng, viền hoa văn, con dấu sáp |
| `rose-champagne`| `#EAD5CD` / `#C58B7E` | Điểm nhấn lãng mạn, cánh hoa, ánh sáng hoàng hôn |
| `deep-emerald` | `#1A3329` / `#23372B` | Màu chữ tiêu đề tương phản cao, phong thái quý tộc cổ điển |
| `burgundy-wax` | `#72262B` / `#801D24` | Con dấu sáp đỏ rượu nồng nàn trên bao thư |
| `charcoal-ink` | `#2D2A26` | Chữ nội dung chính (body text), đảm bảo độ tương phản chuẩn WCAG AA |

---

## 3. Hệ Thống Typography (Nghệ Thuật Kiểu Chữ Cưới)

- **Display Font (Tên Cô Dâu - Chú Rể & Tiêu đề chính)**:
  - Sử dụng Serif thanh lịch, bay bổng hoặc Calligraphy/Didone có chân sang trọng (như *Playfair Display, Cinzel, Cormorant Garamond, Great Vibes, Pinyon Script*).
  - Khoảng cách chữ (letter-spacing) được cân chỉnh tỉ mỉ, không kéo giãn quá đà.
- **Body & Information Font (Thời gian, địa điểm, form RSVP)**:
  - Sử dụng Sans-serif hiện đại, nét mảnh, dễ đọc ở kích thước nhỏ trên điện thoại (như *Montserrat, Plus Jakarta Sans, Inter*).
  - Chiều dài dòng văn bản lý tưởng dưới 75 ký tự/dòng. Khoảng cách dòng (`line-height`: 1.6 - 1.8) thoáng đãng, dễ tiếp nhận.

---

## 4. Tầng Không Gian 3D & UI Overlay (3D Scene Layering)

Giao diện kết hợp 2 tầng màn hình mượt mà:
1. **Tầng 3D WebGL (Z-Index thấp)**:
   - Bao thư 3D tương tác mở sáp niêm phong (Wax seal fracture animation).
   - Lá thiệp nổi bật trong ánh sáng dịu (soft studio lighting), phản chiếu nhũ vàng khi xoay góc nhìn.
   - Hạt ánh sáng / cánh hoa rơi nhẹ nhàng bằng Shader/Particles tối ưu hiệu năng.
2. **Tầng 2D UI Overlay (Z-Index cao, `pointer-events-none` trên vùng trống)**:
   - Nút bật/tắt nhạc nền (Floating Audio Controller) với hoạt ảnh sóng âm tinh tế.
   - Thanh điều hướng nhanh (Quick Anchor Links: Lịch trình, Chỉ đường, RSVP, Mừng cưới).
   - Modal hiển thị album ảnh cưới toàn màn hình (Lightbox 60fps).
   - Form RSVP tối giản, tiện lợi: khách chọn số lượng người, xác nhận tham dự chỉ với 2-3 lượt chạm.

---

## 5. Quy Chuẩn Trải Nghiệm Trên Di Động (Mobile-First)

- **90% khách mời xem thiệp trên điện thoại thông minh**:
  - Tỷ lệ khung nhìn (Aspect Ratio) tự động căn chỉnh cho màn hình dọc (Portrait 9:16 - 19.5:9).
  - Nút bấm và vùng chạm (Touch targets) tối thiểu **48x48px**, tránh chạm nhầm.
  - Tích hợp cảm biến chuyển động con quay hồi chuyển (**DeviceOrientation / Gyroscope**): Khi khách nghiêng điện thoại, thiệp cưới 3D và ánh kim sẽ hơi nghiêng và bắt sáng theo thực tế.
  - Tôn trọng thuộc tính hệ thống `prefers-reduced-motion`: Giảm bớt chuyển động xoay 3D mạnh nếu thiết bị của khách bật chế độ hạn chế chuyển động.

---

## 6. Quy Trình Thiết Kế Khi Thực Thi (Execution Checklist)

Trước khi viết code cho bất kỳ component UI nào:
1. **Xác định mục tiêu chính của màn hình**: Khách cần cảm nhận được điều gì (trang trọng, ấm cúng hay bất ngờ)?
2. **Phác thảo bố cục (Layout Structure)**: Căn giữa đối xứng (Symmetrical balance) tạo cảm giác trang nghiêm hay bố cục tạp chí lệch trục (Editorial asymmetry) tạo sự phá cách?
3. **Kiểm tra độ tương phản & khả năng đọc**: Màu chữ trên nền giấy 3D có rõ ràng trong mọi điều kiện ánh sáng không?
4. **Kiểm tra trên Mobile**: Thử nghiệm vuốt chạm, mở form không bị bàn phím ảo che khuất, âm thanh phát êm tai.
