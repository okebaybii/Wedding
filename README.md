# D--Webdding - 3D Digital Wedding Invitation

Website thiệp cưới điện tử cao cấp với trải nghiệm không gian 3D tương tác chân thực, sang trọng và đầy tính nghệ thuật.

## ✨ Tính Năng Nổi Bật

- **Màn Mở Thiệp 3D Tương Tác**: Chạm vào con dấu sáp niêm phong hoàng gia (wax seal) để mở nắp phong bì và lá thiệp cưới trồi lên, tự động chuyển vào trang chính với hiệu ứng pháo sáng kim tuyến.
- **Sân Khấu Cưới Điện Ảnh Toàn Màn Hình (Hero 100vh)**:
  - Video Reel 4K & Ảnh nghệ thuật Fullscreen với viền tối điện ảnh (filmic vignette).
  - Thanh chọn khoảnh khắc 3D tương tác ở đáy màn hình: chạm vào thẻ nào hiển thị thước phim/ảnh đó trên màn hình chính.
- **Quyển Lịch Tháng 11/2026 Trực Quan (Save The Date)**:
  - Nổi bật ngày hôn lễ (Thứ Sáu, 20/11) bằng trái tim nhung phát sáng.
  - Cụm đồng hồ đếm ngược Ngày - Giờ - Phút - Giây nằm bên dưới lưới lịch.
  - Nút thêm vào Google Calendar và tải file .ics (Apple / Outlook).
- **Cặp Đôi Hạnh Phúc & Bức Bích Họa Chung Đôi**:
  - Bố cục 3 khối (Chú Rể | Bức Chân Dung Cưới Chụp Chung | Cô Dâu).
- **Dòng Chảy Tình Yêu (Love Story)**:
  - Các dấu mốc thời gian đáng nhớ từ ngày đầu gặp gỡ đến ngày cầu hôn.
- **Chi Tiết Sự Kiện & Bản Đồ Google Maps**:
  - Lịch trình Lễ Vu Quy, Lễ Thành Hôn, Tiệc Cưới kèm liên kết chỉ đường GPS.
- **Album Ảnh Cưới (Gallery & Lightbox)**:
  - Phân loại danh mục (Tất Cả, Nghi Lễ, Ngoại Cảnh, Khoảnh Khắc).
  - Trình xem ảnh phóng to toàn màn hình với phím điều hướng Next/Prev/Esc.
- **Xác Nhận Tham Dự (RSVP)**:
  - Khách mời xác nhận số lượng, phía nhà trai/gái, chế độ ăn uống.
- **Sổ Lưu Bút (Guestbook)**:
  - Khách gửi lời chúc kèm hiệu ứng chúc phúc.
- **Hộp Mừng Cưới & VietQR**:
  - Thông tin tài khoản ngân hàng và mã QR chuyển khoản cho cả Chú Rể và Cô Dâu.
- **Bảng Quản Trị Admin**:
  - Quản lý toàn bộ thông tin cô dâu chú rể, banner, upload ảnh từ máy tính (nén Canvas Base64 tự động).
  - Xem danh sách khách RSVP và xuất file Excel CSV chuẩn tiếng Việt (UTF-8 BOM).
  - Dữ liệu lưu trữ bền vững qua `localStorage` kèm nút Xuất/Nhập file JSON sao lưu.

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **3D Graphics & Canvas**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation**: Lucide Icons, Canvas Confetti
- **Audio**: Web Audio API / HTML5 Audio

## 🚀 Khởi Chạy Dự Án

```bash
# Cài đặt dependencies
npm install

# Chạy môi trường phát triển (Dev server)
npm run dev

# Build production
npm run build
```
