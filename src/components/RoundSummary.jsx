import { ROUNDS } from "../data/rounds.js";
import { f1 } from "../game/logic.js";
import TradingFloor from "./TradingFloor.jsx";

function EventCard({ e }) {
  return (
    <div className="evt">
      <h2>
        {e.icon} Thẻ biến cố: {e.name}
      </h2>
      <p>{e.text}</p>
      <div className="src">Cơ sở lý luận: {e.theory}</div>
    </div>
  );
}

export default function RoundSummary({ G, actions }) {
  const step = G.plan[G.pi];
  const R = ROUNDS[step.r];
  const ph = G.sumPhase;

  let body;
  let act;

  if (ph === "trade") {
    body = (
      <>
        <p className="lead">Phiên giao dịch cuối vòng: dùng nốt thẻ cổ phần trước khi chia lợi nhuận.</p>
        <TradingFloor G={G} actions={actions} />
      </>
    );
    act = (
      <button className="btn go big" onClick={actions.sumAdvance}>
        🎴 Rút thẻ biến cố
      </button>
    );
  } else if (ph === "event") {
    body = <EventCard e={G.event} />;
    act = (
      <button className="btn go big" onClick={actions.sumAdvance}>
        💰 Chia lợi nhuận
      </button>
    );
  } else {
    const rep = G.report;
    body = (
      <>
        <EventCard e={G.event} />
        {rep.note && <div className="punch">{rep.note}</div>}
        <table className="rep">
          <thead>
            <tr>
              <th>Công ty (giá trị)</th>
              {G.teams.map((t, i) => (
                <th key={i} style={{ color: t.color }}>
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rep.rows.map((row, ri) => (
              <tr key={ri}>
                <td>
                  {row.c.icon} {row.c.name} ({row.c.value})
                </td>
                {row.cells.map((v, i) => (
                  <td key={i} className={row.ctrl === i ? "k" : ""}>
                    {v ? f1(v) : "–"}
                    {row.ctrl === i ? " 👑" : ""}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="tot">
              <td>Tổng lợi nhuận vòng này</td>
              {rep.total.map((v, i) => (
                <td key={i}>+{f1(v)}</td>
              ))}
            </tr>
            <tr>
              <td>Trong đó từ “đòn bẩy” công ty mẹ</td>
              {rep.viaMother.map((v, i) => (
                <td key={i} className="k">
                  {v ? f1(v) : "–"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="muted small">
          👑 = đội kiểm soát công ty (nhận thêm lợi nhuận độc quyền cao). Công ty con chia 60% lợi
          nhuận cho Holdings.
        </p>
      </>
    );
    const nextFinal = G.plan[G.pi + 1].k === "final";
    act = (
      <button className="btn go big" onClick={actions.sumAdvance}>
        {nextFinal ? "Xem kết quả chung cuộc 🏆" : "Vòng tiếp theo ▶"}
      </button>
    );
  }

  return (
    <div className="card enter summary">
      <span className="tag">KẾT THÚC VÒNG</span>
      <h2>
        {R.icon} {R.name} – cuối vòng
      </h2>
      {body}
      <div className="acts">
        <span className="push" />
        {act}
      </div>
    </div>
  );
}
