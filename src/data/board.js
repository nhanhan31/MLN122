// Mô hình bàn cờ thâu tóm: tích tụ – tập trung tư bản và "chế độ tham dự"
export const UNITS = 10; // mỗi công ty có 10 cổ phần lẻ để các đội mua
export const PARENT_STAKE = 0.6; // công ty mẹ nắm 60% công ty con (phần còn lại là cổ phần lẻ)
export const CONTROL_MIN = 3; // cần tối thiểu 3 cổ phần và nhiều nhất để kiểm soát công ty độc lập
export const CONTROL_BONUS = 0.2; // "lợi nhuận độc quyền cao": thưởng 20% giá trị công ty cho bên kiểm soát

export const COMPANIES = [
  { id: "H", icon: "🏢", name: "Hanguk Holdings", note: "Công ty mẹ", value: 20, parent: null },
  { id: "A", icon: "📱", name: "Điện tử Hanguk", note: "Con của Holdings", value: 40, parent: "H" },
  { id: "B", icon: "🧪", name: "Hóa chất Hanguk", note: "Con của Holdings", value: 30, parent: "H" },
  { id: "C", icon: "🏦", name: "Ngân hàng Tài phiệt", note: "Độc lập", value: 30, parent: null },
  { id: "D", icon: "🏗️", name: "Thép Đông Á", note: "Độc lập", value: 20, parent: null },
];

export const EVENTS = [
  {
    id: "crisis",
    icon: "📉",
    name: "Khủng hoảng kinh tế",
    text: "Cầu giảm, nhiều doanh nghiệp phá sản: lợi nhuận mọi công ty ×0,5. Nhà nước can thiệp cứu trợ: đội đang thấp điểm nhất được thêm 2 thẻ cổ phần.",
    theory: "Khủng hoảng thúc đẩy tập trung nguồn lực; nhà nước can thiệp khi kinh tế khó khăn (BGD&ĐT, 2019, tr. 80–84)",
  },
  {
    id: "reg",
    icon: "🏛️",
    name: "Nhà nước điều tiết",
    text: "Luật và thuế được siết chặt: vòng này bãi bỏ “lợi nhuận độc quyền cao” (không có thưởng kiểm soát).",
    theory: "Nhà nước dùng công cụ ngân sách, thuế, hành chính – pháp lý để điều tiết (BGD&ĐT, 2019, tr. 94–95)",
  },
  {
    id: "pardon",
    icon: "⚖️",
    name: "Đặc xá & phục quyền",
    text: "Lãnh đạo tập đoàn được phục quyền: đội đang kiểm soát Hanguk Holdings nhận +15 điểm “kỳ vọng đầu tư”. Nếu chưa ai kiểm soát, quyết định không tạo tác động nào.",
    theory: "Mục tiêu công bố khác với hiệu quả thực tế: cần dữ liệu và chứng cứ (Phần 4–5)",
  },
  {
    id: "export",
    icon: "🌍",
    name: "Xuất khẩu tư bản",
    text: "Mở rộng đầu tư ra nước ngoài: lợi nhuận Ngân hàng Tài phiệt và Thép Đông Á ×1,5.",
    theory: "Xuất khẩu tư bản đưa giá trị ra nước ngoài để thu giá trị thặng dư (BGD&ĐT, 2019, tr. 90–91)",
  },
  {
    id: "tech",
    icon: "🔬",
    name: "Đột phá khoa học – kỹ thuật",
    text: "Công ty có chủ kiểm soát đầu tư nghiên cứu: lợi nhuận ×1,25. Công ty chưa ai kiểm soát thì không hưởng lợi – đây chỉ là khả năng có điều kiện.",
    theory: "Tác động tích cực của độc quyền là khả năng, phụ thuộc cách sử dụng nguồn lực (BGD&ĐT, 2019, tr. 85)",
  },
];

// Mỗi vòng ứng với một phần trong trang kiến thức
export const ROUND_SECTION = [1, 2, 3, 4, 5, 6];
