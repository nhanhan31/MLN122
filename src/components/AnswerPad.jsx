import { LETTERS } from "../game/constants.js";

export default function AnswerPad({ q, G, reveal, actions }) {
  const answering = G.phase === "answer";
  return (
    <div className="pad">
      {G.teams.map((t, ti) => {
        const showJoker = G.jokerOn && (t.joker || G.jk[ti]);
        let status;
        if (reveal) {
          status = G.gain[ti] ? `+${G.gain[ti]} 🎫` : G.pen[ti] ? `−${G.pen[ti]} điểm` : "0";
        } else {
          status = G.picks[ti] === null ? "chưa chọn" : "đã chọn";
        }
        return (
          <div key={ti} className={`prow ${G.sel === ti ? "sel" : ""}`}>
            <div className="nm" onClick={() => actions.selectTeam(ti)}>
              <span className="dot" style={{ background: t.color }} />
              <span>
                {ti + 1}. {t.name}
              </span>
            </div>
            <div className="choices">
              {q.options.map((_, i) => (
                <button
                  key={i}
                  className={`ab ${G.picks[ti] === i ? "sel" : ""}`}
                  disabled={!answering}
                  onClick={() => actions.pick(ti, i)}
                >
                  {LETTERS[i]}
                </button>
              ))}
              {showJoker && (
                <button
                  className={`jk ${G.jk[ti] ? "on" : ""}`}
                  disabled={!answering}
                  title="Ngôi sao may mắn"
                  onClick={() => actions.toggleJoker(ti)}
                >
                  ⭐{G.jk[ti] ? " ×2" : ""}
                </button>
              )}
            </div>
            <div className="st">{status}</div>
          </div>
        );
      })}
    </div>
  );
}
