import { LETTERS } from "../game/constants.js";

export default function OptionList({ q, reveal, G }) {
  return (
    <div className="opts">
      {q.options.map((o, i) => {
        const cls = reveal ? (i === q.answer ? "correct" : "wrong") : "";
        return (
          <div key={i} className={`opt ${cls}`}>
            <span className="L">{LETTERS[i]}</span>
            <div className="opt-body">
              {o[0]}
              {reveal && o[1] && (
                <span className="why">
                  {i === q.answer ? "✔" : "✘"} {o[1]}
                </span>
              )}
            </div>
            {reveal && (
              <span className="votes">
                {G.teams.map((t, ti) =>
                  G.picks[ti] === i ? (
                    <span key={ti} className="dot" style={{ background: t.color }} title={t.name} />
                  ) : null
                )}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
