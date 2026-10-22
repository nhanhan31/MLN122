export const ROUNDS = [
  { name: "Vòng 1 · Độc quyền", icon: "🏭", mult: 1, intro: "Độc quyền hình thành như thế nào và tác động ra sao?" },
  { name: "Vòng 2 · Tài phiệt & tư bản tài chính", icon: "🔗", mult: 1, intro: "Quyền lực kinh tế của tập đoàn lớn được tổ chức và mở rộng ra sao?" },
  { name: "Vòng 3 · Độc quyền nhà nước", icon: "🏛️", mult: 1, intro: "Nhà nước dùng công cụ nào để tác động lên nền kinh tế?" },
  { name: "Vòng 4 · Hồ sơ Hàn Quốc", icon: "📁", mult: 1, intro: "Những dữ kiện nào đã được các nguồn xác nhận?" },
  { name: "Vòng 5 · Kiểm chứng", icon: "🔍", mult: 1, intro: "Điều gì xác nhận được, điều gì cần thêm dữ liệu?" },
  { name: "Chung kết · Điểm x2", icon: "🏆", mult: 2, intro: "Hai câu chốt: mỗi câu đúng được gấp đôi điểm!" },
];

// Câu hỏi nhiều đáp án. options = [nội dung, giải thích].
const mc = (r, tag, q, options, answer, punch, src, extra = {}) =>
  ({ r, type: "choice", tag, q, options, answer, punch, src, ...extra });

// Câu hỏi xếp thẻ vào cột: bins là các đáp án.
const bin = (r, tag, card, bins, answer, punch, src, extra = {}) =>
  ({ r, type: "bin", tag, card, q: "Thẻ này thuộc nhóm nào?", options: bins.map((b, i) => [b, i === answer ? punch : ""]), answer, punch, src, ...extra });

export const QUESTIONS = [
  /* ---------- Vòng 1 ---------- */
  mc(0, "Tương tác 1 · Độc quyền & cạnh tranh", "Nhận định nào phù hợp nhất?", [
    ["Cạnh tranh vẫn diễn ra nên thị trường đã trở về trạng thái cạnh tranh hoàn hảo.", "Nhầm “có cạnh tranh” với các điều kiện của cạnh tranh hoàn hảo."],
    ["Sự tập trung thị trường và cạnh tranh giữa các tập đoàn có thể cùng tồn tại.", "Thể hiện quan hệ cùng tồn tại giữa cạnh tranh và độc quyền."],
    ["Có vị thế chi phối nên các tập đoàn không còn chịu áp lực cạnh tranh.", "Bỏ qua các quan hệ cạnh tranh vẫn tiếp tục diễn ra."],
  ], 1, "Các tập đoàn có sức mạnh kinh tế lớn vẫn chịu áp lực cạnh tranh. Đây là cơ sở để hiểu nhu cầu tiếp tục đầu tư, đổi mới và mở rộng hoạt động của họ.", "BGD&ĐT, 2019, tr. 86–87",
    { scenario: "Một thị trường có ba tập đoàn lớn chiếm ưu thế. Các tập đoàn vẫn đầu tư công nghệ, giảm giá một số sản phẩm và tìm cách mua lại doanh nghiệp nhỏ." }),
  mc(0, "Nguyên nhân hình thành độc quyền", "Điều nào KHÔNG thuộc các nguyên nhân hình thành độc quyền?", [
    ["Phát triển của lực lượng sản xuất dưới tác động của khoa học, kỹ thuật", "Là nguyên nhân thứ nhất."],
    ["Cạnh tranh gay gắt làm doanh nghiệp nhỏ phá sản hoặc bị thôn tính", "Là nguyên nhân thứ hai."],
    ["Khủng hoảng kinh tế và sự phát triển của hệ thống tín dụng", "Là nguyên nhân thứ ba."],
    ["Người tiêu dùng chủ động tập hợp lại để giảm số doanh nghiệp trên thị trường", "Không có trong các nguyên nhân được trình bày."],
  ], 3, "Ba nguyên nhân: lực lượng sản xuất – khoa học kỹ thuật; cạnh tranh; khủng hoảng và tín dụng.", "BGD&ĐT, 2019, tr. 80–82"),
  mc(0, "Giá cả độc quyền", "Tổ chức độc quyền áp đặt điều kiện giao dịch như thế nào để thu lợi nhuận độc quyền cao?", [
    ["Giá thấp khi bán, giá cao khi mua", "Ngược lại."],
    ["Giá cao khi bán, giá thấp khi mua", "Đúng: tăng lợi ích từ người mua, giảm chi phí và chuyển lợi ích từ người cung ứng."],
    ["Luôn bán đúng bằng giá trị, mua đúng bằng giá trị", "Không phải giá cả độc quyền."],
  ], 1, "Giá độc quyền cao khi bán; giá độc quyền thấp khi mua.", "BGD&ĐT, 2019, tr. 82"),
  bin(0, "Tác động của độc quyền", "Tập trung nguồn lực cho nghiên cứu và triển khai khoa học, kỹ thuật mà doanh nghiệp nhỏ khó thực hiện",
    ["Tác động tích cực (khả năng, có điều kiện)", "Tác động tiêu cực"], 0,
    "Tích cực nhưng chỉ là khả năng; kết quả phụ thuộc mục tiêu và cách sử dụng nguồn lực.", "BGD&ĐT, 2019, tr. 85"),
  bin(0, "Tác động của độc quyền", "Trì hoãn triển khai đổi mới khi đổi mới đe dọa lợi ích độc quyền",
    ["Tác động tích cực (khả năng, có điều kiện)", "Tác động tiêu cực"], 1,
    "Tiêu cực: có thể kìm hãm tiến bộ kỹ thuật.", "BGD&ĐT, 2019, tr. 86"),

  /* ---------- Vòng 2 ---------- */
  mc(1, "Tương tác 2 · Sở hữu trực tiếp và quyền kiểm soát", "Nhận định nào phù hợp nhất?", [
    ["Gia đình X có thể mở rộng quyền kiểm soát thông qua chuỗi sở hữu chi phối.", "Cơ chế kiểm soát gián tiếp trong “chế độ tham dự”."],
    ["Quyền kiểm soát của gia đình X luôn bằng tỷ lệ cổ phần họ trực tiếp sở hữu.", "Bỏ qua quyền kiểm soát qua doanh nghiệp trung gian."],
    ["Các công ty có tư cách pháp nhân riêng nên không hình thành quan hệ kiểm soát.", "Nhầm tính độc lập pháp lý với quan hệ sở hữu và kiểm soát."],
  ], 0, "Khi đánh giá sức mạnh tài phiệt, cần xem cả mạng lưới doanh nghiệp và quan hệ kiểm soát, bên cạnh cổ phần trực tiếp của một cá nhân.", "BGD&ĐT, 2019, tr. 90",
    { scenario: "Gia đình X kiểm soát công ty A. Công ty A kiểm soát B, còn B kiểm soát C. Gia đình X không trực tiếp sở hữu phần lớn cổ phần tại B và C." }),
  mc(1, "Dự đoán · Mô phỏng chế độ tham dự", "Mỗi công ty có tổng vốn 100. Gia đình X nắm 51% công ty A; A nắm 51% B; B nắm 51% C. Tổng cổ phần quy đổi của X ở cả 3 công ty (vốn thực) xấp xỉ bao nhiêu đơn vị?", [
    ["Khoảng 30 đơn vị", "Quá thấp so với tính toán."],
    ["Khoảng 90 đơn vị", "51 + 26 + 13,3 ≈ 90 đơn vị, nhưng chi phối 300 đơn vị tài sản (≈ ×3,3)."],
    ["Khoảng 153 đơn vị", "Đây là 51% × 300, bỏ qua việc nhân tỷ lệ qua từng tầng."],
  ], 1, "Cổ phần quy đổi giảm dần qua từng tầng (51% → 26% → 13,3%) nhưng quyền kiểm soát vẫn nguyên vẹn.", "Giả định minh họa cơ chế “chế độ tham dự” – BGD&ĐT, 2019, tr. 90",
    { sim: true }),
  bin(1, "Hình thức tổ chức độc quyền", "Doanh nghiệp còn độc lập về sản xuất, nhưng việc mua và bán do một bộ phận chung đảm nhận",
    ["Cartel", "Syndicate", "Trust", "Consortium"], 1,
    "Syndicate: độc lập sản xuất, mua – bán thống nhất qua đầu mối chung.", "BGD&ĐT, 2019, tr. 87–89"),
  bin(1, "Hình thức tổ chức độc quyền", "Sản xuất và tiêu thụ chịu sự quản lý thống nhất; chủ sở hữu các doanh nghiệp trở thành cổ đông, hưởng lợi theo cổ phần",
    ["Cartel", "Syndicate", "Trust", "Consortium"], 2,
    "Trust: quản lý thống nhất cả sản xuất và tiêu thụ; chủ doanh nghiệp thành cổ đông.", "BGD&ĐT, 2019, tr. 87–89"),
  mc(1, "Dữ liệu Jones (2018)", "Dữ liệu năm 2017 của bốn tập đoàn lớn nhất: gia đình 2,0%; công ty liên kết 48,6%; chủ thể nội bộ khác 1,9%; tổng nội bộ 52,5%. Dùng số liệu này thế nào là đúng?", [
    ["Minh họa vai trò mạng lưới sở hữu trong củng cố kiểm soát; là dữ liệu lịch sử 2017.", "Đúng với chú thích của hồ sơ."],
    ["Chứng minh gia đình sở hữu trực tiếp đa số cổ phần hiện nay.", "Sai: gia đình chỉ 2,0%, và không phải cơ cấu hiện tại."],
    ["Đại diện cho cơ cấu sở hữu của mọi tập đoàn Hàn Quốc năm 2026.", "Sai: số liệu của bốn tập đoàn lớn nhất, năm 2017."],
  ], 0, "Số liệu dùng để giải thích cơ chế, không đại diện cho cơ cấu sở hữu hiện tại.", "Jones, 2018, Bảng 3, tr. 15"),
  mc(1, "Xuất khẩu tư bản", "Một tập đoàn mua cổ phiếu, trái phiếu của doanh nghiệp nước ngoài và đầu tư qua quỹ, không trực tiếp quản lý hoạt động. Đây là hình thức nào?", [
    ["Đầu tư trực tiếp", "Đầu tư trực tiếp là xây dựng hoặc mua lại cơ sở để trực tiếp kinh doanh, quản lý."],
    ["Đầu tư gián tiếp", "Cho vay, mua cổ phiếu, trái phiếu, đầu tư qua quỹ mà không trực tiếp quản lý."],
    ["Không phải xuất khẩu tư bản vì chỉ là mua giấy tờ", "Vẫn là đưa giá trị ra nước ngoài nhằm thu lợi nhuận."],
  ], 1, "Xuất khẩu tư bản gồm đầu tư trực tiếp và đầu tư gián tiếp.", "BGD&ĐT, 2019, tr. 90–91"),

  /* ---------- Vòng 3 ---------- */
  mc(2, "Công cụ nhà nước · Phân biệt khái niệm", "Một bạn nói: “Chính phủ phục quyền cho lãnh đạo tập đoàn tức là doanh nghiệp tư nhân đó đã trở thành doanh nghiệp nhà nước.” Nhận định nào đúng nhất?", [
    ["Đúng, vì nhà nước đã can thiệp trực tiếp vào doanh nghiệp.", "Can thiệp bằng công cụ pháp lý không đồng nghĩa chuyển đổi sở hữu."],
    ["Sai, đặc xá/phục quyền là công cụ pháp lý, không làm đổi hình thức sở hữu của doanh nghiệp.", "Cần xác định đúng công cụ và lợi ích kỳ vọng."],
    ["Đúng, vì mọi quyết định của Tổng thống đều tạo ra sở hữu nhà nước.", "Sở hữu nhà nước hình thành qua vốn ngân sách, mua lại, mua cổ phần, huy động vốn."],
  ], 1, "Đặc xá hoặc phục quyền không làm doanh nghiệp tư nhân chuyển thành doanh nghiệp nhà nước.", "BGD&ĐT, 2019, tr. 93–95"),
  bin(2, "Công cụ điều tiết", "Điều kiện vốn, khả năng vay và hoạt động tài chính",
    ["Ngân sách, thuế", "Tiền tệ, tín dụng", "Doanh nghiệp nhà nước", "Chương trình, kế hoạch", "Hành chính, pháp lý"], 1,
    "Tiền tệ, tín dụng.", "BGD&ĐT, 2019, tr. 94–95"),
  bin(2, "Công cụ điều tiết", "Hướng dẫn, kiểm soát, khuyến khích và xử lý hành vi",
    ["Ngân sách, thuế", "Tiền tệ, tín dụng", "Doanh nghiệp nhà nước", "Chương trình, kế hoạch", "Hành chính, pháp lý"], 4,
    "Công cụ hành chính, pháp lý – nhóm mà đặc xá, phục quyền thuộc về.", "BGD&ĐT, 2019, tr. 94–95"),
  mc(2, "Nguyên nhân độc quyền nhà nước", "Vì sao nhà nước đảm nhận hoặc hỗ trợ các lĩnh vực như hạ tầng, năng lượng, giao thông, giáo dục, nghiên cứu cơ bản?", [
    ["Vì các lĩnh vực này cần vốn lớn, thu hồi chậm hoặc lợi nhuận thấp nên tư nhân khó hoặc ít muốn đầu tư", "Đúng: nguyên nhân thứ hai."],
    ["Vì nhà nước luôn muốn thay thế hoàn toàn tư nhân", "Không có trong lý luận."],
    ["Vì các lĩnh vực này không liên quan đến hoạt động kinh tế chung", "Ngược lại: chúng tạo điều kiện cho kinh tế nói chung."],
  ], 0, "Nhà nước tạo điều kiện cho hoạt động kinh tế nói chung và cho tư bản tư nhân.", "BGD&ĐT, 2019, tr. 83"),
  mc(2, "Bản chất", "Trong chủ nghĩa tư bản, độc quyền nhà nước hình thành chủ yếu nhằm phục vụ điều gì?", [
    ["Xóa bỏ hoàn toàn các tổ chức độc quyền tư nhân", "Trái với bản chất được nêu."],
    ["Lợi ích của các tổ chức độc quyền tư nhân và việc duy trì, phát triển chủ nghĩa tư bản", "Đúng với giáo trình."],
    ["Chỉ thu ngân sách, không liên quan đến tư bản tư nhân", "Bỏ qua sự kết hợp độc quyền tư nhân – nhà nước."],
  ], 1, "Ba mặt: sức mạnh độc quyền tăng, vai trò kinh tế nhà nước mở rộng, hai sức mạnh kết hợp thành cơ chế thống nhất.", "BGD&ĐT, 2019, tr. 84–85"),
  mc(2, "Kết hợp nhân sự", "Để xác định mức độ ảnh hưởng của tổ chức độc quyền lên nhà nước trong một trường hợp thực tế, cần tìm gì?", [
    ["Chỉ cần quy mô doanh thu của tập đoàn", "Chưa đủ."],
    ["Bằng chứng về nhân sự, tổ chức và quá trình ra quyết định", "Đúng theo mục 3.4."],
    ["Chỉ cần cảm nhận chung của dư luận", "Không phải chứng cứ."],
  ], 1, "Cần bằng chứng cụ thể thay vì suy diễn từ lợi ích giao nhau.", "BGD&ĐT, 2019, tr. 92–93"),

  /* ---------- Vòng 4 ---------- */
  mc(3, "Hồ sơ 2022 · Thẩm quyền", "Theo Điều 79 Hiến pháp Hàn Quốc, ai có quyền ân xá, giảm hình phạt và phục hồi quyền?", [
    ["Bộ Tư pháp tự quyết định và công bố.", "Bộ Tư pháp thông báo, triển khai."],
    ["Tổng thống; Bộ Tư pháp thông báo, triển khai.", "Cần phân biệt quyết định của Tổng thống với vai trò của Bộ Tư pháp."],
    ["Các tập đoàn đề xuất và Quốc hội phê chuẩn từng trường hợp.", "Không có căn cứ trong hồ sơ."],
  ], 1, "Điều 79: Tổng thống có quyền ân xá, giảm hình phạt và phục hồi quyền theo luật.", "Constitution of the Republic of Korea, art. 79"),
  mc(3, "Hồ sơ 2022 · Mốc thời gian", "Lee Jae-yong: 8/2021 được trả tự do có điều kiện; 29/7/2022 thời hạn án kết thúc; 8/2022 đợt quyết định của Tổng thống. Cách diễn đạt nào phù hợp nhất cho quyết định năm 2022?", [
    ["Ông được ra tù nhờ đặc xá tháng 8/2022.", "Sai mốc: ông đã được trả tự do có điều kiện từ 8/2021."],
    ["Ông được phục hồi quyền, gỡ những hạn chế còn lại đối với hoạt động kinh doanh.", "Phù hợp với các mốc."],
    ["Ông được xóa án trước khi thời hạn án kết thúc.", "Sai: thời hạn án kết thúc ngày 29/7/2022, trước đợt phục quyền."],
  ], 1, "Dùng đúng thuật ngữ: “phục hồi quyền”.", "Park, 2022"),
  mc(3, "Hồ sơ 2022 · Quy mô", "Đợt đặc xá và phục quyền công bố ngày 12/8/2022, hiệu lực 15/8/2022, áp dụng cho bao nhiêu người?", [
    ["693 người", "Sai số."],
    ["1.693 người", "Đúng theo thông báo của Bộ Tư pháp."],
    ["2.188 người", "Đây là số của đợt tháng 8/2025."],
  ], 1, "1.693 người; lãnh đạo kinh tế nêu tên gồm Lee Jae-yong, Shin Dong-bin, Chang Sae-joo, Kang Duk-soo.", "Ministry of Justice, 2022"),
  mc(3, "Hồ sơ 2022 · Mục tiêu công bố", "Đối với các lãnh đạo kinh tế, thông báo năm 2022 nêu mục tiêu nào?", [
    ["Thúc đẩy đầu tư công nghệ, việc làm và động lực tăng trưởng", "Đúng theo thông báo."],
    ["Chuyển các tập đoàn sang sở hữu nhà nước", "Không có trong thông báo."],
    ["Giảm vai trò của các tập đoàn trong nền kinh tế", "Không có trong thông báo."],
  ], 0, "Thông báo viện dẫn hậu quả COVID-19, kinh tế trì trệ, giá cả tăng.", "Ministry of Justice, 2022"),
  mc(3, "Đối chiếu 2025", "Đợt đặc xá, phục quyền hiệu lực 15/8/2025 có đặc điểm nào?", [
    ["2.188 người, trong đó có 16 lãnh đạo kinh tế", "Đúng theo thông báo 11/8/2025."],
    ["1.693 người, trong đó có 4 lãnh đạo kinh tế", "Đây là quy mô đợt 2022."],
    ["2.188 người, không có lãnh đạo kinh tế nào", "Sai."],
  ], 0, "Thông báo tiếp tục viện dẫn tạo việc làm và tăng trưởng trong bối cảnh bất định kinh tế toàn cầu.", "Ministry of Justice, 2025"),
  mc(3, "Góc nhìn 2026", "OECD Economic Surveys: Korea 2026 ghi nhận điều gì liên quan đến quản trị doanh nghiệp?", [
    ["Cải cách quản trị doanh nghiệp, tăng bảo vệ cổ đông, trách nhiệm hội đồng quản trị và cải thiện kiểm soát tham nhũng", "Đúng theo hồ sơ."],
    ["Không có thay đổi nào đáng kể", "Sai."],
    ["Việc hủy bỏ toàn bộ các tập đoàn lớn", "Không có trong hồ sơ."],
  ], 0, "Quan hệ nhà nước – doanh nghiệp lớn cần xem xét cả hỗ trợ, giám sát và cải cách.", "OECD, 2026, Chương 1"),

  /* ---------- Vòng 5 ---------- */
  mc(4, "Tương tác 3 · Mục tiêu chính sách và bằng chứng", "Kết luận nào có căn cứ nhất?", [
    ["Công bố dự án đã đủ chứng minh phục quyền làm kinh tế phục hồi.", "Nhầm sự kiện xảy ra sau với bằng chứng đầy đủ về quan hệ nhân quả."],
    ["Nhu cầu thế giới phục hồi đã đủ chứng minh phục quyền không có tác động.", "Quá mức: yếu tố khác chưa loại trừ tác động của chính sách."],
    ["Có nhiều yếu tố cùng tác động; cần kiểm tra đầu tư thực hiện và so sánh phù hợp.", "Phù hợp với yêu cầu xem xét bằng chứng và cách giải thích khác."],
  ], 2, "Có thể xác nhận mục tiêu được công bố và phân tích cơ chế kỳ vọng. Để kết luận hiệu quả thực tế, cần thêm dữ liệu và phương pháp so sánh.", "Phần 5, hồ sơ CQ5",
    { scenario: "Sau khi một lãnh đạo được phục quyền, tập đoàn công bố dự án đầu tư mới. Cùng thời gian đó, nhu cầu thế giới phục hồi và lãi suất giảm." }),
  mc(4, "Phán đoán · Động cơ cá nhân", "Một bạn kết luận: “Nhà nước và tập đoàn có lợi ích giao nhau nên chắc chắn quyết định đặc xá do vận động lợi ích hoặc trao đổi không minh bạch.” Đánh giá nào hợp lý nhất?", [
    ["Hợp lý, vì lợi ích giao nhau là bằng chứng đủ rồi.", "Lợi ích giao nhau chưa đủ xác định động cơ cá nhân."],
    ["Chưa đủ căn cứ: cần chứng cứ riêng về quan hệ cá nhân, vận động hoặc trao đổi không minh bạch.", "Tách giải thích cơ chế kinh tế khỏi cáo buộc động cơ."],
    ["Không thể nói gì vì quyết định của nhà nước độc lập với kinh tế.", "Bỏ qua quan hệ kinh tế – chính trị đã phân tích."],
  ], 1, "Giải thích cơ chế kinh tế là một chuyện; kết luận về động cơ cá nhân cần chứng cứ riêng.", "Phần 5, hồ sơ CQ5; BGD&ĐT, 2019, tr. 92–93"),
  bin(4, "Phân loại mệnh đề", "Các thông báo 2022 và 2025 đều viện dẫn đầu tư, việc làm, tăng trưởng",
    ["Xác nhận được từ hồ sơ", "Cần dữ liệu và so sánh", "Cần chứng cứ riêng"], 0,
    "Đây là nội dung được nêu trong thông báo của Bộ Tư pháp.", "Ministry of Justice, 2022, 2025"),
  bin(4, "Phân loại mệnh đề", "Việc phục quyền đã làm đầu tư thực tế của tập đoàn tăng lên",
    ["Xác nhận được từ hồ sơ", "Cần dữ liệu và so sánh", "Cần chứng cứ riêng"], 1,
    "Hiệu quả thực tế cần dữ liệu về đầu tư thực hiện và phương pháp so sánh.", "Phần 5, hồ sơ CQ5"),
  bin(4, "Phân loại mệnh đề", "Quyết định phục quyền xuất phát từ vận động lợi ích hoặc trao đổi không minh bạch",
    ["Xác nhận được từ hồ sơ", "Cần dữ liệu và so sánh", "Cần chứng cứ riêng"], 2,
    "Muốn kết luận về động cơ cần chứng cứ riêng.", "Phần 5, hồ sơ CQ5"),

  /* ---------- Chung kết ---------- */
  mc(5, "Chung kết · Câu 1", "Câu nào tóm tắt đúng nhất lý do chính quyền Hàn Quốc đặc xá/phục quyền cho một số lãnh đạo tập đoàn trong giai đoạn khó khăn?", [
    ["Vì pháp luật Hàn Quốc yêu cầu xóa án mỗi khi kinh tế suy thoái.", "Không có căn cứ trong hồ sơ."],
    ["Vì kỳ vọng họ đóng góp vào đầu tư, việc làm và tăng trưởng – một cơ chế kỳ vọng cần được kiểm chứng.", "Phản ánh mục tiêu được công bố và các cơ chế giải thích."],
    ["Vì đã chứng minh được phục quyền làm kinh tế phục hồi.", "Kết luận quá mức về hiệu quả."],
  ], 1, "Kỳ vọng đóng góp vào đầu tư, việc làm và tăng trưởng.", "Phần 5–6, hồ sơ CQ5"),
  mc(5, "Chung kết · Câu 2", "Vì sao khi đánh giá sức mạnh một tập đoàn, cần xem cả mạng lưới công ty liên kết, không chỉ cổ phần của gia đình?", [
    ["Vì gia đình có thể kiểm soát qua chuỗi sở hữu; dữ liệu 2017: gia đình 2,0% nhưng các công ty liên kết 48,6%.", "Đúng: cơ chế “chế độ tham dự”."],
    ["Vì cổ phần của gia đình luôn bằng quyền kiểm soát.", "Sai."],
    ["Vì các công ty liên kết luôn cạnh tranh làm yếu nhau.", "Không phải ý của hồ sơ."],
  ], 0, "Cần xem cả mạng lưới doanh nghiệp và quan hệ kiểm soát.", "BGD&ĐT, 2019, tr. 90; Jones, 2018, tr. 15"),
];
