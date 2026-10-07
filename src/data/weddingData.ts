import { CoupleInfo, Milestone, WeddingEvent, GuestWish, BankAccount, GalleryPhoto, RsvpEntry } from '../types/wedding.ts'

export const weddingCouple: CoupleInfo = {
  groom: {
    fullName: 'Nguyễn Minh Quân',
    shortName: 'Minh Quân',
    title: 'Chú Rể',
    parents: 'Ông Nguyễn Văn Nam & Bà Trần Thị Lan',
    bio: 'Kỹ sư phần mềm đam mê công nghệ và du lịch. Người luôn mang lại nụ cười và sự vững chãi cho Thảo My.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  bride: {
    fullName: 'Lê Hoàng Thảo My',
    shortName: 'Thảo My',
    title: 'Cô Dâu',
    parents: 'Ông Lê Minh Tuấn & Bà Phạm Hồng Nga',
    bio: 'Nhà thiết kế sáng tạo yêu nghệ thuật và ẩm thực. Người mang ánh nắng ấm áp và sự ngọt ngào vào cuộc sống của Quân.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop'
  },
  // Ảnh cưới chụp chung giữa hai người (Master Couple Portrait)
  jointImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  // Danh sách các bức ảnh chạy banner trang đầu (Hero Wedding Slides)
  heroBanners: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1400&auto=format&fit=crop',
  ],
  monogram: 'Q & M',
  weddingDate: '2026-11-20T17:30:00',
  quote: '“Tình yêu đích thực không phải là tìm kiếm một người hoàn hảo, mà là cùng nhau học cách yêu thương những điều chưa hoàn hảo một cách trọn vẹn nhất.”'
}

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    title: 'Khoảnh Khắc Hạnh Phúc',
    category: 'ceremony',
    aspectRatio: 'tall',
    caption: 'Ánh mắt trao nhau trong ngày trọng đại nhất đời người.'
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
    title: 'Ngoại Cảnh Bình Minh',
    category: 'outdoor',
    aspectRatio: 'wide',
    caption: 'Đón tia nắng đầu tiên của ngày mới tại biển lộng gió.'
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
    title: 'Nhẫn Cưới & Hoa Cưới',
    category: 'moments',
    aspectRatio: 'square',
    caption: 'Vật đính ước trăm năm tình viên mãn.'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
    title: 'Dưới Vòm Hoa Lãng Mạn',
    category: 'ceremony',
    aspectRatio: 'tall',
    caption: 'Cùng nhau bước qua cổng hoa cưới rực rỡ sắc màu.'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
    title: 'Hoàng Hôn Cao Nguyên',
    category: 'outdoor',
    aspectRatio: 'tall',
    caption: 'Chiều hoàng hôn mộng mơ trên đồi thông Đà Lạt.'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop',
    title: 'Nụ Cười Tình Yêu',
    category: 'moments',
    aspectRatio: 'square',
    caption: 'Những nụ cười tự nhiên và chân thành nhất của đôi ta.'
  },
  {
    id: 'gal-7',
    url: 'https://images.unsplash.com/photo-1519225424976-135832a82967?q=80&w=1000&auto=format&fit=crop',
    title: 'Lễ Đường Lung Linh',
    category: 'ceremony',
    aspectRatio: 'wide',
    caption: 'Không gian tiệc cưới ấm cúng ngập tràn ánh nến và hoa tươi.'
  },
  {
    id: 'gal-8',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000&auto=format&fit=crop',
    title: 'Nắm Tay Dạo Bước',
    category: 'outdoor',
    aspectRatio: 'tall',
    caption: 'Đi bên nhau qua mọi nẻo đường của tuổi thanh xuân.'
  }
]

export const initialRsvps: RsvpEntry[] = [
  {
    id: 'rsvp-1',
    fullName: 'Trần Văn Hoàng',
    phone: '0912345678',
    side: 'groom',
    attendance: 'yes',
    guestCount: 2,
    dietaryNotes: 'Không ăn cay',
    submittedAt: '2026-10-01 14:30'
  },
  {
    id: 'rsvp-2',
    fullName: 'Nguyễn Thị Ngọc Ánh',
    phone: '0987654321',
    side: 'bride',
    attendance: 'yes',
    guestCount: 1,
    dietaryNotes: 'Ăn chay nhẹ',
    submittedAt: '2026-10-01 16:15'
  },
  {
    id: 'rsvp-3',
    fullName: 'Lê Quốc Bảo',
    phone: '0903112233',
    side: 'mutual',
    attendance: 'yes',
    guestCount: 2,
    submittedAt: '2026-10-02 09:40'
  }
]

export const loveMilestones: Milestone[] = [
  {
    id: '1',
    date: '15 / 10 / 2021',
    title: 'Ngày Đầu Tiên Gặp Gỡ',
    description: 'Một buổi chiều thu dịu mát tại quán cà phê sách góc phố quen, ánh mắt chạm nhau mở đầu cho bản giao hưởng tình yêu.',
    location: 'Hà Nội'
  },
  {
    id: '2',
    date: '24 / 12 / 2021',
    title: 'Lời Tỏ Tình Dưới Đèn Giáng Sinh',
    description: 'Trong không khí se lạnh đêm Noel rực rỡ ánh đèn, cái nắm tay đầu tiên và lời hẹn ước cùng nhau đi qua mọi mùa đông ấm áp.',
    location: 'Hồ Gươm'
  },
  {
    id: '3',
    date: '14 / 02 / 2025',
    title: 'Hoàng Hôn Cầu Hôn Trên Đỉnh Đồi',
    description: 'Chiếc nhẫn đính hôn lấp lánh dưới ánh hoàng hôn rực rỡ Đà Lạt, và câu trả lời "Em đồng ý" làm tim vỡ òa hạnh phúc.',
    location: 'Đà Lạt'
  },
  {
    id: '4',
    date: '20 / 11 / 2026',
    title: 'Ngày Chung Đôi Trọn Vẹn',
    description: 'Chúng mình cùng viết nên chương mới tuyệt đẹp nhất của cuộc đời, tay trong tay bước vào lễ đường dưới sự chúc phúc của gia đình và bạn bè.',
    location: 'Riverside Palace'
  }
]

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'ceremony-bride',
    title: 'Lễ Vu Quy (Nhà Gái)',
    type: 'ceremony',
    time: '08:30 Sáng',
    date: 'Thứ Sáu, 20 / 11 / 2026',
    locationName: 'Tư Gia Nhà Gái',
    address: '128 Đường Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=128+Nguyen+Dinh+Chieu+District+3+Ho+Chi+Minh',
    notes: 'Kính mời quý quan khách tới dự lễ xuất giá của cô dâu.'
  },
  {
    id: 'ceremony-groom',
    title: 'Lễ Thành Hôn (Nhà Trai)',
    type: 'ceremony',
    time: '10:30 Sáng',
    date: 'Thứ Sáu, 20 / 11 / 2026',
    locationName: 'Tư Gia Nhà Trai',
    address: '45 Đường Nam Kỳ Khởi Nghĩa, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=45+Nam+Ky+Khoi+Nghia+District+1+Ho+Chi+Minh',
    notes: 'Kính mời người thân & bạn bè tới dự lễ gia tiên nhà trai.'
  },
  {
    id: 'reception',
    title: 'Tiệc Cưới & Dạ Yến (Reception)',
    type: 'reception',
    time: '17:30 (Đón khách) • 18:30 (Khai tiệc)',
    date: 'Thứ Sáu, 20 / 11 / 2026',
    locationName: 'Trung Tâm Tiệc Cưới Riverside Palace',
    address: '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+District+4+Ho+Chi+Minh',
    notes: 'Đón khách lúc 17:30 - Khai tiệc lúc 18:30 với chương trình âm nhạc và tiệc tối lãng mạn.'
  }
]

export const initialGuestWishes: GuestWish[] = [
  {
    id: 'w-1',
    senderName: 'Anh Tuấn & Phương Linh',
    relationship: 'Bạn thân Đại học',
    message: 'Chúc hai bạn một hành trình mới ngập tràn tiếng cười, hạnh phúc và luôn bao dung, thấu hiểu cho nhau như những ngày đầu!',
    createdAt: 'Hôm nay'
  },
  {
    id: 'w-2',
    senderName: 'Gia đình Bác Hùng',
    relationship: 'Họ hàng nhà trai',
    message: 'Chúc mừng hạnh phúc hai cháu! Chúc hai cháu trăm năm tình viên mãn, đầu bạc răng long, xây dựng gia đình êm ấm thịnh vượng.',
    createdAt: 'Hôm qua'
  },
  {
    id: 'w-3',
    senderName: 'Hội Bạn Cấp 3 Chuyên Toán',
    relationship: 'Bạn cấp 3 chú rể',
    message: 'Cuối cùng thì chàng trai của chúng ta cũng đã rước nàng về dinh. Chúc cặp đôi vàng mãi ngọt ngào và hạnh phúc bền lâu!',
    createdAt: '2 ngày trước'
  }
]

export const bankAccounts: { groom: BankAccount; bride: BankAccount } = {
  groom: {
    bankName: 'MB Bank (Quân Đội)',
    accountNumber: '999988886868',
    accountHolder: 'NGUYEN MINH QUAN',
    branch: 'Chi nhánh Sài Gòn',
    qrUrl: 'https://api.vietqr.io/image/970422-999988886868-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Minh%20Quan%20Thao%20My'
  },
  bride: {
    bankName: 'Vietcombank',
    accountNumber: '0071001234567',
    accountHolder: 'LE HOANG THAO MY',
    branch: 'Chi nhánh Bến Thành',
    qrUrl: 'https://api.vietqr.io/image/970436-0071001234567-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Thao%20My%20Minh%20Quan'
  }
}
