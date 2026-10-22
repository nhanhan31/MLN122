import { ROUNDS, QUESTIONS } from "../data/rounds.js";
import { ROUND_SECTION } from "../data/board.js";

export default function RoundIntro({ G, step, onNext }) {
  const R = ROUNDS[step.r];
  const n = G.plan.filter((s) => s.k === "q" && QUESTIONS[s.q].r === step.r).length;
  return (
    <div className="card center enter round-intro">
      <div className="ban">{R.icon}</div>
      <span className="tag">VÒNG MỚI</span>
      <h1>{R.name}</h1>
      <p className="lead">{R.intro}</p>
      <p className="muted">
        {n} câu hỏi • đúng được {R.mult} 🎫 thẻ cổ phần
        {R.mult > 1 && (
          <>
            {" "}
            • <b className="gold">lợi nhuận cuối vòng x{R.mult}</b>
          </>
        )}
      </p>
      <div className="acts center">
        <button className="btn go big" onClick={onNext}>
          Bắt đầu vòng ▶
        </button>
        <a className="btn" href={`kienthuc.html#s=${ROUND_SECTION[step.r]}`} target="_blank" rel="noopener">
          📚 Ôn nhanh kiến thức (tab mới)
        </a>
      </div>
    </div>
  );
}
