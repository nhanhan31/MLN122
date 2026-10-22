import { ROUNDS, QUESTIONS } from "../data/rounds.js";
import OptionList from "./OptionList.jsx";
import AnswerPad from "./AnswerPad.jsx";
import TradingFloor from "./TradingFloor.jsx";

export default function QuestionScreen({ G, actions }) {
  const step = G.plan[G.pi];
  const q = QUESTIONS[step.q];
  const reveal = G.phase === "reveal";
  const mult = ROUNDS[q.r].mult;

  const dots = G.plan.map((s, i) => {
    if (!(s.k === "q" && QUESTIONS[s.q].r === q.r)) return null;
    const cls = i < G.pi || (i === G.pi && reveal) ? "done" : i === G.pi ? "now" : "";
    return <i key={i} className={cls} />;
  });

  return (
    <div className="card enter question">
      <div className="progress">{dots}</div>

      <div className="qhead">
        <span className="tag">{q.tag}</span>
        {mult > 1 && <span className="tag b">THƯỞNG x{mult}</span>}
      </div>

      {q.scenario && (
        <div className="scen">
          <b>Tình huống giả định:</b> {q.scenario}
        </div>
      )}
      {q.card && <div className="cardq">🃏 {q.card}</div>}

      <div className="q">{q.q}</div>

      <OptionList q={q} reveal={reveal} G={G} />
      <AnswerPad q={q} G={G} reveal={reveal} actions={actions} />

      {reveal && (
        <>
          <div className="punch">
            “{q.punch}”<div className="src">Nguồn: {q.src}</div>
          </div>
          {q.sim && (
            <div className="simchain">
              <div className="n">👨‍👩‍👧 X</div>→ 51% →<div className="n">A<br />51%</div>→ 51% →
              <div className="n">B<br />26%</div>→ 51% →<div className="n">C<br />13,3%</div>
              <b className="simnote">Vốn thực ≈ 90 • chi phối 300 (×3,3)</b>
            </div>
          )}
          <TradingFloor G={G} actions={actions} />
        </>
      )}

      <div className="acts">
        {!reveal ? (
          <button className="btn go big" onClick={actions.reveal}>
            Chốt đáp án
          </button>
        ) : (
          <>
            <div className="bonus">
              Giải thích hay +1 🎫:{" "}
              {G.teams.map((t, ti) => (
                <button
                  key={ti}
                  className={G.bonus[ti] ? "got" : ""}
                  style={{ borderLeft: `5px solid ${t.color}` }}
                  onClick={() => actions.toggleBonus(ti)}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <button className="btn go push" onClick={actions.nextStep}>
              Tiếp ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
}
