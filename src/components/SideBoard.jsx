import { COMPANIES, UNITS } from "../data/board.js";
import { PIP } from "../game/constants.js";
import { controller, freeUnits, f1 } from "../game/logic.js";

function Pips({ G, id }) {
  const cells = [];
  G.hold[id].forEach((u, i) => {
    for (let k = 0; k < u; k++) cells.push(PIP[i]);
  });
  while (cells.length < UNITS) cells.push(null);
  return (
    <div className="pips">
      {cells.map((c, i) => (
        <i key={i} style={c ? { background: c } : undefined} />
      ))}
    </div>
  );
}

export default function SideBoard({ G, edit, actions }) {
  const max = Math.max(...G.teams.map((t) => t.score));
  const step = G.plan[G.pi];

  return (
    <aside className="side card">
      <h3 className="first">🏆 Điểm • 🎫 thẻ</h3>
      {G.teams.map((t, i) => {
        const d = step.k === "q" && G.gain ? G.gain[i] : 0;
        return (
          <div key={i} className="trow" style={{ "--c": t.color }}>
            <span className="n">
              {t.name}
              {t.score > 0 && t.score === max ? " 👑" : ""}
            </span>
            {G.jokerOn && t.joker ? <span>⭐</span> : null}
            <span className="d">{d ? `+${d}` : ""}</span>
            <span className="tk">{t.tokens}🎫</span>
            <span className="p">{f1(t.score)}</span>
            {edit && (
              <span className="adj">
                <button onClick={() => actions.adjust(i, -5, 0)}>−5đ</button>
                <button onClick={() => actions.adjust(i, 5, 0)}>+5đ</button>
                <button onClick={() => actions.adjust(i, 0, -1)}>−🎫</button>
                <button onClick={() => actions.adjust(i, 0, 1)}>+🎫</button>
              </span>
            )}
          </div>
        );
      })}

      <h3>🏢 Bàn cờ thâu tóm</h3>
      {COMPANIES.map((c) => {
        const k = controller(G, c.id);
        return (
          <div key={c.id} className={`co ${c.parent ? "sub" : ""}`}>
            <div className="t">
              <span>{c.icon}</span>
              <b>{c.name}</b>
              <span className="v">{c.value}đ</span>
            </div>
            {c.parent && <div className="c lev">Holdings nắm 60% • cổ phần lẻ 40%</div>}
            <Pips G={G} id={c.id} />
            <div className="c">
              {k >= 0 ? (
                <>
                  👑 <b style={{ color: PIP[k] }}>{G.teams[k].name}</b>
                  {c.parent ? <span className="lev"> (qua Holdings)</span> : null}
                </>
              ) : (
                "chưa ai kiểm soát"
              )}{" "}
              · {freeUnits(G, c.id)} trống
            </div>
          </div>
        );
      })}
    </aside>
  );
}
