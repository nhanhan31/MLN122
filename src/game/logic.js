import {
  COMPANIES,
  EVENTS,
  UNITS,
  PARENT_STAKE,
  CONTROL_MIN,
  CONTROL_BONUS,
} from "../data/board.js";
import { QUESTIONS } from "../data/rounds.js";

// Làm tròn 1 chữ số thập phân + định dạng dấu phẩy kiểu Việt
export const r1 = (x) => Math.round(x * 10) / 10;
export const f1 = (x) => String(r1(x)).replace(".", ",");

export const co = (id) => COMPANIES.find((c) => c.id === id);
export const freeUnits = (G, id) => UNITS - G.hold[id].reduce((a, b) => a + b, 0);

// Chỉ số đội đang kiểm soát công ty, hoặc -1.
// Công ty con do bên kiểm soát công ty mẹ chi phối (60%).
export function controller(G, id) {
  const c = co(id);
  if (c.parent) return controller(G, c.parent);
  const u = G.hold[id];
  const max = Math.max(...u);
  if (max < CONTROL_MIN || u.filter((x) => x === max).length > 1) return -1;
  return u.indexOf(max);
}

// Chia lợi nhuận cuối vòng. Hàm này CÓ mutate G (teams.score, teams.tokens).
export function distribute(G, ev, mult) {
  const n = G.teams.length;
  const rows = [];
  const total = Array(n).fill(0);
  const viaMother = Array(n).fill(0);
  let note = "";
  COMPANIES.forEach((c) => {
    const ctrl = controller(G, c.id);
    let f = mult;
    if (ev.id === "crisis") f *= 0.5;
    if (ev.id === "export" && (c.id === "C" || c.id === "D")) f *= 1.5;
    if (ev.id === "tech" && ctrl >= 0) f *= 1.25;
    const base = c.value * f;
    const cells = Array(n).fill(0);
    let own = base;
    if (c.parent) {
      const up = base * PARENT_STAKE;
      own = base - up;
      for (let i = 0; i < n; i++) {
        const v = (up * G.hold[c.parent][i]) / UNITS;
        cells[i] += v;
        viaMother[i] += v;
      }
    }
    for (let i = 0; i < n; i++) cells[i] += (own * G.hold[c.id][i]) / UNITS;
    if (ctrl >= 0 && ev.id !== "reg") cells[ctrl] += CONTROL_BONUS * c.value * mult;
    cells.forEach((v, i) => {
      total[i] += v;
    });
    rows.push({ c, ctrl, cells });
  });
  if (ev.id === "pardon") {
    const h = G.hold.H;
    const max = Math.max(...h);
    const who = max >= CONTROL_MIN && h.filter((x) => x === max).length === 1 ? h.indexOf(max) : -1;
    if (who >= 0) {
      total[who] += 15;
      note = `${G.teams[who].name} kiểm soát Holdings → +15 điểm kỳ vọng đầu tư.`;
    } else {
      note = "Chưa đội nào kiểm soát Holdings → quyết định chưa tạo tác động nào.";
    }
  }
  if (ev.id === "crisis") {
    const min = Math.min(...G.teams.map((t) => t.score));
    const low = G.teams.map((t, i) => (t.score === min ? i : -1)).filter((i) => i >= 0);
    low.forEach((i) => {
      G.teams[i].tokens += 2;
    });
    note = `Cứu trợ: ${low.map((i) => G.teams[i].name).join(", ")} nhận +2 thẻ cổ phần.`;
  }
  G.teams.forEach((t, i) => {
    t.score = r1(t.score + total[i]);
  });
  return { rows, total, viaMother, note };
}

// Rút thẻ biến cố ngẫu nhiên, không lặp cho tới khi dùng hết. Mutate G.used.
export function pickEvent(G) {
  let pool = EVENTS.filter((e) => !G.used.includes(e.id));
  if (!pool.length) {
    G.used = [];
    pool = EVENTS.slice();
  }
  const e = pool[Math.floor(Math.random() * pool.length)];
  G.used.push(e.id);
  return e;
}

// Dựng lộ trình các bước chơi từ thiết lập.
export function buildPlan(setup, ROUNDS) {
  const plan = [];
  setup.rounds.forEach((on, r) => {
    if (!on) return;
    let qs = QUESTIONS.filter((q) => q.r === r);
    if (setup.qpr) qs = qs.slice(0, setup.qpr);
    if (!qs.length) return;
    plan.push({ k: "round", r });
    qs.forEach((q) => plan.push({ k: "q", q: QUESTIONS.indexOf(q) }));
    plan.push({ k: "sum", r });
  });
  plan.push({ k: "final" });
  return plan;
}

export const emptyHold = (n) =>
  Object.fromEntries(COMPANIES.map((c) => [c.id, Array(n).fill(0)]));
