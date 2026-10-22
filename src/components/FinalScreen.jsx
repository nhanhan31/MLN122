import { COMPANIES } from "../data/board.js";
import { controller, f1 } from "../game/logic.js";

const HEIGHTS = [260, 215, 175, 150, 130, 115];
const MEDALS = ["🥇", "🥈", "🥉"];

export default function FinalScreen({ G, actions }) {
  const ranked = G.teams.map((t, i) => ({ t, i })).sort((a, b) => b.t.score - a.t.score);
  const tie = ranked.length > 1 && ranked[0].t.score === ranked[1].t.score;

  return (
    <div className="card center enter final">
      <span className="tag">CHUNG CUỘC</span>
      <h1>🏆 Chủ đế chế: {ranked[0].t.name}</h1>
      {tie && (
        <p className="lead gold">
          Hai đội đồng điểm! Phân định bằng một câu hỏi phụ do người điều phối chọn.
        </p>
      )}

      <div className="podium">
        {ranked.map((r, i) => (
          <div
            key={r.i}
            className="pod"
            style={{ "--c": r.t.color, "--h": `${HEIGHTS[i]}px`, animationDelay: `${(ranked.length - i) * 0.2}s` }}
          >
            <div>{MEDALS[i] || i + 1}</div>
            <div>{r.t.name}</div>
            <div className="pts">{f1(r.t.score)}</div>
          </div>
        ))}
      </div>

      <div className="ctrls">
        {COMPANIES.map((c) => {
          const k = controller(G, c.id);
          return (
            <span key={c.id} className="tag">
              {c.icon} {c.name}: {k >= 0 ? G.teams[k].name : "chưa ai kiểm soát"}
            </span>
          );
        })}
      </div>

      <p className="muted">
        Bài học: tập trung nguồn lực và nắm công ty mẹ giúp chi phối cả mạng lưới; nhưng nhà nước,
        khủng hoảng và cạnh tranh luôn có thể đổi cuộc chơi. Kết luận và nguồn tham khảo nằm ở phần
        kiến thức.
      </p>

      <div className="acts center">
        <button className="btn big" onClick={actions.newGame}>
          Chơi ván mới
        </button>
        <a className="btn big" href="kienthuc.html">
          📚 Quay lại phần kiến thức
        </a>
      </div>
    </div>
  );
}
