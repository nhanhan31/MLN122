import { ROUNDS, QUESTIONS } from "../data/rounds.js";
import { COLORS, DEFAULT_NAMES } from "../game/constants.js";
import { f1 } from "../game/logic.js";

const QCOUNT = ROUNDS.map((_, r) => QUESTIONS.filter((q) => q.r === r).length);

export default function SetupScreen({ setup, saved, actions }) {
  const setName = (i, v) => {
    const names = setup.names.slice();
    names[i] = v;
    actions.setupPatch({ names });
  };
  const toggleRound = (i) => {
    const rounds = setup.rounds.slice();
    rounds[i] = !rounds[i];
    actions.setupPatch({ rounds });
  };

  return (
    <div className="card enter setup">
      <span className="tag">DÀNH CHO NGƯỜI ĐIỀU PHỐI</span>
      <h1>🏢 Đế chế Chaebol – Cuộc chiến thâu tóm</h1>
      <p className="lead">
        Các đội là những nhà tư bản tranh giành quyền kiểm soát tập đoàn. Trả lời đúng để lấy thẻ cổ
        phần, mua cổ phần các công ty và hưởng lợi nhuận cuối mỗi vòng – đúng cơ chế “tích tụ, tập
        trung tư bản” và “chế độ tham dự”.
      </p>

      <div className="rules">
        <b>Luật chơi:</b>
        <ul>
          <li>Đúng → <b>+1 🎫 thẻ cổ phần</b> (chung kết +2). Giải thích tốt: +1 🎫.</li>
          <li>Mỗi thẻ mua 1 cổ phần (10%) của một công ty. Có đủ ≥3 cổ phần và nhiều nhất = <b>kiểm soát</b> công ty, hưởng thêm “lợi nhuận độc quyền cao”.</li>
          <li><b>Hanguk Holdings</b> nắm 60% hai công ty con: kiểm soát Holdings là kiểm soát cả hai công ty con – <b>đòn bẩy của tài phiệt</b>.</li>
          <li><b>⚔ Thâu tóm thù địch:</b> đổi 2 thẻ để cướp 1 cổ phần của đội khác (cạnh tranh trong độc quyền).</li>
          <li>Cuối mỗi vòng: rút <b>thẻ biến cố</b> (khủng hoảng, nhà nước điều tiết, đặc xá, xuất khẩu tư bản…) rồi chia lợi nhuận. Đội nhiều điểm nhất thắng.</li>
          <li>⭐ Ngôi sao may mắn: 1 lần/đội, đúng → nhận gấp đôi thẻ; sai → −5 điểm.</li>
        </ul>
      </div>

      {saved && (
        <div className="row">
          <button className="btn go" onClick={() => actions.resume(saved)}>
            ▶ Tiếp tục ván đang dở ({saved.teams.map((t) => `${t.name} ${f1(t.score)}`).join(" • ")})
          </button>
          <button className="btn" onClick={actions.clearSaved}>
            Xóa ván cũ
          </button>
        </div>
      )}

      <div className="row">
        <b>Số đội:</b>
        <div className="seg">
          {[2, 3, 4, 5, 6].map((n) => (
            <button key={n} className={n === setup.n ? "on" : ""} onClick={() => actions.setupPatch({ n })}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="tin">
        {Array.from({ length: setup.n }, (_, i) => (
          <div key={i}>
            <label style={{ color: COLORS[i], fontWeight: 700 }} htmlFor={`tn${i}`}>
              Đội {i + 1}
            </label>
            <input
              id={`tn${i}`}
              type="text"
              maxLength={22}
              value={setup.names[i]}
              placeholder={DEFAULT_NAMES[i]}
              onChange={(e) => setName(i, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="row">
        <b>Số câu mỗi vòng:</b>
        <div className="seg">
          {[[2, "2 (nhanh)"], [3, "3"], [0, "Tất cả"]].map(([v, l]) => (
            <button key={v} className={v === setup.qpr ? "on" : ""} onClick={() => actions.setupPatch({ qpr: v })}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        <b>Vòng thi:</b>
        <div className="rounds-pick">
          {ROUNDS.map((r, i) => (
            <label key={i} className="rchk">
              <input type="checkbox" checked={setup.rounds[i]} onChange={() => toggleRound(i)} /> {r.icon}{" "}
              {r.name} <span className="muted">({QCOUNT[i]} câu)</span>
            </label>
          ))}
        </div>
      </div>

      <div className="row">
        <label className="rchk">
          <input
            type="checkbox"
            checked={setup.joker}
            onChange={(e) => actions.setupPatch({ joker: e.target.checked })}
          />{" "}
          ⭐ Bật “Ngôi sao may mắn”
        </label>
      </div>

      <div className="muted hint">
        Phím tắt: Space = bước tiếp • 1–6 chọn đội • A–E chọn đáp án • J bật ⭐ • F toàn màn hình
      </div>

      <div className="row">
        <button className="btn go big" onClick={actions.startGame}>
          Vào trận ▶
        </button>
        <a className="btn" href="kienthuc.html">
          📚 Xem lại phần kiến thức
        </a>
      </div>
    </div>
  );
}
