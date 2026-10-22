import { COMPANIES } from "../data/board.js";
import { freeUnits } from "../game/logic.js";

export default function TradingFloor({ G, actions }) {
  const rows = G.teams
    .map((t, ti) => {
      if (t.tokens < 1) return null;
      const buys = COMPANIES.map((c) => (
        <button
          key={c.id}
          disabled={freeUnits(G, c.id) < 1}
          title={c.name}
          onClick={() => actions.buy(ti, c.id)}
        >
          {c.icon} {c.id} ({freeUnits(G, c.id)} trống)
        </button>
      ));
      const stealBtn =
        t.tokens >= 2 ? (
          <button className="steal" onClick={() => actions.stealStart(ti)}>
            ⚔ Thâu tóm (2 🎫)
          </button>
        ) : null;

      let sub = null;
      if (G.steal && G.steal.t === ti) {
        if (G.steal.c === null) {
          const cos = COMPANIES.filter((c) => G.hold[c.id].some((u, i) => i !== ti && u > 0));
          sub = (
            <div className="trline">
              Cướp cổ phần ở:{" "}
              {cos.length ? (
                cos.map((c) => (
                  <button key={c.id} className="steal" onClick={() => actions.stealPickC(c.id)}>
                    {c.icon} {c.id}
                  </button>
                ))
              ) : (
                <i className="muted">chưa có cổ phần nào của đội khác</i>
              )}{" "}
              <button onClick={actions.stealCancel}>Hủy</button>
            </div>
          );
        } else {
          sub = (
            <div className="trline">
              Cướp của:{" "}
              {G.teams.map((v, vi) =>
                vi !== ti && G.hold[G.steal.c][vi] > 0 ? (
                  <button key={vi} className="steal" onClick={() => actions.stealDo(ti, G.steal.c, vi)}>
                    {v.name} ({G.hold[G.steal.c][vi]})
                  </button>
                ) : null
              )}{" "}
              <button onClick={actions.stealCancel}>Hủy</button>
            </div>
          );
        }
      }

      return (
        <div key={ti}>
          <div className="trline">
            <span className="nm">
              <span className="dot" style={{ background: t.color }} /> {t.name} • {t.tokens} 🎫
            </span>
            {buys}
            {stealBtn}
          </div>
          {sub}
        </div>
      );
    })
    .filter(Boolean);

  return (
    <div className="trade">
      <h3>🎫 Sàn giao dịch cổ phần</h3>
      {rows.length ? rows : <span className="muted small">Không đội nào còn thẻ cổ phần.</span>}
    </div>
  );
}
