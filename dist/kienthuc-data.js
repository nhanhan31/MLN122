"use strict";

const SECTIONS = ["Mở đầu", "1 · Độc quyền", "2 · Năm đặc điểm", "3 · Độc quyền nhà nước", "4 · Hàn Quốc", "5 · Giải thích CQ5", "6 · Kết luận"];
const BGD = "Bộ Giáo dục và Đào tạo, 2019";

/* Mỗi slide: sec = chỉ số SECTIONS; phần tử class="frag" xuất hiện lần lượt khi bấm Tiếp */
const SLIDES = [
  { sec: 0, title: "Bìa", html: `<div class="cover"><span class="tag">KINH TẾ CHÍNH TRỊ MÁC – LÊNIN</span>
    <h1>CQ5 — Vì sao Chính phủ Hàn Quốc ân xá cho các nhà tài phiệt trong thời kỳ khủng hoảng kinh tế?</h1>
    <p class="lead muted">Phần kiến thức · cuối bài bấm “🎮 Phần tương tác” để vào trò chơi cho các đội</p></div>` },

  { sec: 0, title: "Đặt vấn đề", html: `<h2>Một quyết định pháp lý, nhiều câu hỏi kinh tế</h2>
    <p class="lead">Khi một lãnh đạo doanh nghiệp bị kết án, trách nhiệm cá nhân thường được nhìn từ góc độ pháp luật. Nhưng nếu người đó giữ vai trò điều hành trong một tập đoàn lớn, quyết định của nhà nước còn đặt ra câu hỏi về <b class="gold">đầu tư, sản xuất, việc làm và lợi ích kinh tế</b>.</p>
    <div class="quote">Vì sao trong thời kỳ kinh tế khó khăn, chính quyền Hàn Quốc lại lựa chọn đặc xá hoặc phục hồi quyền cho một số lãnh đạo tập đoàn?</div>
    <div class="grid"><div class="card frag"><h3>Chặng 1</h3><p>Độc quyền hình thành như thế nào và tác động ra sao?</p></div>
    <div class="card frag"><h3>Chặng 2</h3><p>Năm đặc điểm kinh tế của độc quyền; tư bản tài chính, tài phiệt</p></div>
    <div class="card frag"><h3>Chặng 3</h3><p>Độc quyền nhà nước – cơ sở lý luận trực tiếp</p></div>
    <div class="card frag"><h3>Chặng 4</h3><p>Hồ sơ thực tiễn Hàn Quốc 2022, 2025, 2026</p></div>
    <div class="card frag"><h3>Chặng 5–6</h3><p>Giải thích trực tiếp CQ5 và kết luận</p></div></div>` },

  /* ===== 1. ĐỘC QUYỀN ===== */
  { sec: 1, title: "1.1 Khái niệm độc quyền", html: `<span class="tag">1.1</span><h2>Khái niệm độc quyền</h2>
    <div class="quote">Độc quyền là sự liên minh giữa các doanh nghiệp lớn, có khả năng <b class="gold">thâu tóm việc sản xuất và tiêu thụ</b> một số loại hàng hóa, định ra <b class="gold">giá cả độc quyền</b> nhằm thu lợi nhuận độc quyền cao.</div>
    <ul class="b"><li class="frag">Khả năng chi phối: thỏa thuận giá cả, sản lượng, phân chia thị trường, phối hợp quyết định kinh doanh quan trọng.</li>
    <li class="frag">Hình thành từ vận động của thị trường <b>hoặc</b> từ can thiệp của nhà nước tạo ra tổ chức có vị thế độc quyền.</li>
    <li class="frag">Điểm cần chú ý: sự tập trung nguồn lực đi cùng khả năng chi phối hoạt động kinh tế.</li></ul>
    <div class="src">Nguồn: ${BGD}, tr. 80–82</div>` },

  { sec: 1, title: "1.2 Nguyên nhân hình thành", html: `<span class="tag">1.2</span><h2>Ba nguyên nhân hình thành độc quyền</h2>
    <div class="grid">
    <div class="card frag"><h3>Một là: lực lượng sản xuất, khoa học – kỹ thuật</h3><p>Ngành mới đòi hỏi vốn lớn, thiết bị hiện đại, quy mô tổ chức cao → doanh nghiệp phải tích tụ, tập trung sản xuất. Tiến bộ kỹ thuật làm tăng năng suất, tích lũy → mở rộng tiếp.</p></div>
    <div class="card frag"><h3>Hai là: cạnh tranh</h3><p>Doanh nghiệp vừa và nhỏ phá sản hoặc bị thôn tính; doanh nghiệp lớn phải tiếp tục tích tụ, liên kết để củng cố sức cạnh tranh → độc quyền có điều kiện xuất hiện.</p></div>
    <div class="card frag"><h3>Ba là: khủng hoảng kinh tế &amp; tín dụng</h3><p>Khủng hoảng làm nhiều doanh nghiệp phá sản, nguồn lực dồn vào số còn lại (ví dụ năm 1873). Tín dụng và công ty cổ phần huy động vốn vượt khả năng một nhà tư bản.</p></div></div>
    <div class="punch frag">Cạnh tranh và khủng hoảng đều có thể thúc đẩy mức độ tập trung kinh tế, tạo cơ sở hình thành độc quyền.</div>
    <div class="src">Nguồn: ${BGD}, tr. 80–82</div>` },

  { sec: 1, title: "1.3 Giá cả & lợi nhuận độc quyền", html: `<span class="tag">1.3</span><h2>Giá cả độc quyền và nguồn gốc lợi nhuận độc quyền cao</h2>
    <div class="grid"><div class="card hl frag"><h3>Khi bán</h3><p>Giá độc quyền <b>cao</b> → tăng phần lợi ích thu từ người mua.</p></div>
    <div class="card hl frag"><h3>Khi mua</h3><p>Giá độc quyền <b>thấp</b> → giảm chi phí, chuyển lợi ích từ người cung ứng.</p></div></div>
    <h3 class="frag" style="margin-top:14px">Nguồn của lợi nhuận độc quyền cao (phân tích Mác – Lênin)</h3>
    <ul class="b"><li class="frag">Lao động của công nhân trong các xí nghiệp độc quyền</li>
    <li class="frag">Phần lao động không công của công nhân tại các xí nghiệp ngoài độc quyền</li>
    <li class="frag">Một phần giá trị thặng dư của tư bản vừa và nhỏ bị mất đi trong cạnh tranh</li>
    <li class="frag">Lao động thặng dư, thậm chí một phần lao động tất yếu, của người sản xuất nhỏ và người lao động ở nước tư bản, thuộc địa, phụ thuộc</li></ul>
    <div class="src">Nguồn: ${BGD}, tr. 82</div>` },

  { sec: 1, title: "1.4 Tác động tích cực", html: `<span class="tag">1.4</span><h2>Tác động tích cực của độc quyền</h2>
    <div class="grid">
    <div class="card frag"><h3>Thứ nhất: nghiên cứu &amp; triển khai</h3><p>Quy mô lớn, tiềm lực tài chính tạo điều kiện đầu tư nghiên cứu mà doanh nghiệp nhỏ khó làm.</p></div>
    <div class="card frag"><h3>Thứ hai: năng suất &amp; cạnh tranh</h3><p>Vốn lớn → áp dụng công nghệ, quản lý, tổ chức sản xuất tiên tiến; nếu dùng hiệu quả có thể tăng năng suất, giảm chi phí.</p></div>
    <div class="card frag"><h3>Thứ ba: sản xuất lớn hiện đại</h3><p>Đầu tư vào lĩnh vực trọng tâm, mũi nhọn, tạo năng lực sản xuất quy mô lớn.</p></div></div>
    <div class="punch frag">Đây là một <b>khả năng</b>. Việc chuyển khả năng thành kết quả còn phụ thuộc vào mục tiêu kinh tế và cách sử dụng nguồn lực.</div>
    <div class="src">Nguồn: ${BGD}, tr. 85</div>` },

  { sec: 1, title: "1.5 Tác động tiêu cực", html: `<span class="tag">1.5</span><h2>Tác động tiêu cực của độc quyền</h2>
    <div class="grid">
    <div class="card frag"><h3>Thứ nhất: cạnh tranh không hoàn hảo</h3><p>Ưu thế chi phí chưa bảo đảm giá bán giảm tương ứng. Có thể áp giá bán cao, giá mua thấp, hạn chế lượng cung ứng → thiệt hại cho người tiêu dùng, người cung ứng, xã hội.</p></div>
    <div class="card frag"><h3>Thứ hai: có thể kìm hãm tiến bộ kỹ thuật</h3><p>Nguồn lực nghiên cứu lớn đi cùng động cơ bảo vệ vị thế; nếu đổi mới đe dọa lợi ích độc quyền có thể bị trì hoãn.</p></div>
    <div class="card frag"><h3>Thứ ba: phân hóa giàu nghèo &amp; lợi ích cục bộ</h3><p>Quyền lực kinh tế mở rộng sang chính trị, xã hội → chính sách có nguy cơ ưu tiên lợi ích của chủ thể có sức chi phối.</p></div></div>
    <div class="punch frag">Khi phân tích một tập đoàn lớn, cần xem đồng thời năng lực đóng góp và cách quyền lực kinh tế được sử dụng.</div>
    <div class="src">Nguồn: ${BGD}, tr. 86</div>` },

  { sec: 1, title: "1.6 Cạnh tranh trong độc quyền", html: `<span class="tag">1.6</span><h2>Cạnh tranh trong trạng thái độc quyền</h2>
    <p class="lead">Độc quyền sinh ra từ cạnh tranh tự do, nhưng <b class="gold">không thủ tiêu cạnh tranh</b>; quan hệ cạnh tranh có thể đa dạng, gay gắt hơn.</p>
    <div class="grid">
    <div class="card frag"><h3>Một là</h3><p>Giữa tổ chức độc quyền với doanh nghiệp ngoài độc quyền: chi phối hoặc thôn tính qua kiểm soát nguyên liệu, vận tải, tín dụng.</p></div>
    <div class="card frag"><h3>Hai là</h3><p>Giữa các tổ chức độc quyền với nhau.</p></div>
    <div class="card frag"><h3>Ba là</h3><p>Trong nội bộ tổ chức độc quyền: quyền kiểm soát, tỷ lệ cổ phần, vị trí chi phối, phân chia lợi ích.</p></div></div>
    <div class="punch frag">Mức độ cạnh tranh và độc quyền phụ thuộc điều kiện cụ thể của từng nền kinh tế, từng thị trường.</div>
    <div class="src">Nguồn: ${BGD}, tr. 86–87</div>` },
];
