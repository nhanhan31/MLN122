import { useCallback, useEffect, useReducer } from "react";
import { ROUNDS, QUESTIONS } from "../data/rounds.js";
import {
  buildPlan,
  distribute,
  emptyHold,
  freeUnits,
  pickEvent,
  r1,
} from "./logic.js";
import { COLORS, DEFAULT_NAMES, SAVE_KEY } from "./constants.js";

/* ---------- Lưu / khôi phục ---------- */
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY));
  } catch (e) {
    return null;
  }
}

/* ---------- Vào một bước mới (trả về G mới) ---------- */
function enterStep(G, i) {
  const g = structuredClone(G);
  g.pi = i;
  g.phase = "answer"; // bỏ đồng hồ: vào thẳng pha chọn đáp án
  g.sel = null;
  g.steal = null;
  const st = g.plan[i];
  if (st.k === "round") g.roundStart = g.teams.map((t) => t.score);
  if (st.k === "q") {
    const n = g.teams.length;
    g.picks = Array(n).fill(null);
    g.jk = Array(n).fill(false);
    g.bonus = Array(n).fill(false);
    g.gain = Array(n).fill(0);
    g.pen = Array(n).fill(0);
  }
  if (st.k === "sum") {
    g.sumPhase = "trade";
    g.event = null;
    g.report = null;
  }
  return g;
}

function init() {
  return {
    G: null,
    setup: { n: 3, names: DEFAULT_NAMES.slice(), rounds: ROUNDS.map(() => true), qpr: 0, joker: true },
    edit: false,
    saved: loadSaved(),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "SETUP_PATCH":
      return { ...state, setup: { ...state.setup, ...action.patch } };
    case "CLEAR_SAVED":
      return { ...state, saved: null };

    case "RESET":
      return { ...state, G: null, saved: null, edit: false };

    case "START_GAME": {
      const s = state.setup;
      const names = s.names.map((nm, i) => (nm && String(nm).trim()) || DEFAULT_NAMES[i]);
      const plan = buildPlan({ ...s, names }, ROUNDS);
      const teams = Array.from({ length: s.n }, (_, i) => ({
        name: names[i],
        color: COLORS[i],
        score: 0,
        tokens: 0,
        joker: s.joker,
      }));
      const base = { teams, hold: emptyHold(s.n), plan, pi: 0, jokerOn: s.joker, roundStart: [], used: [] };
      return { ...state, G: enterStep(base, 0), edit: false };
    }

    case "RESUME": {
      const sv = action.saved;
      const base = {
        teams: sv.teams,
        hold: sv.hold,
        plan: sv.plan,
        pi: sv.pi,
        jokerOn: sv.jokerOn,
        roundStart: sv.roundStart || [],
        used: sv.used || [],
      };
      const i = sv.done ? Math.min(sv.pi + 1, sv.plan.length - 1) : sv.pi;
      return { ...state, G: enterStep(base, i), edit: false };
    }

    case "GO_STEP":
      return { ...state, G: enterStep(state.G, action.i), edit: false };

    case "NEXT_STEP": {
      const G = state.G;
      if (G.pi < G.plan.length - 1) return { ...state, G: enterStep(G, G.pi + 1), edit: false };
      return state;
    }

    case "SELECT_TEAM": {
      const g = structuredClone(state.G);
      g.sel = action.ti;
      return { ...state, G: g };
    }

    case "PICK": {
      if (state.G.phase !== "answer") return state;
      const g = structuredClone(state.G);
      g.picks[action.ti] = action.oi;
      g.sel = action.ti;
      return { ...state, G: g };
    }

    case "TOGGLE_JOKER": {
      const G = state.G;
      if (G.phase !== "answer") return state;
      const t = G.teams[action.ti];
      if (!G.jokerOn || !(t.joker || G.jk[action.ti])) return state;
      const g = structuredClone(G);
      g.jk[action.ti] = !g.jk[action.ti];
      return { ...state, G: g };
    }

    case "REVEAL": {
      const G = state.G;
      if (G.phase === "reveal") return state;
      const st = G.plan[G.pi];
      if (st.k !== "q") return state;
      const g = structuredClone(G);
      const q = QUESTIONS[st.q];
      const mult = ROUNDS[q.r].mult;
      g.phase = "reveal";
      g.teams.forEach((t, i) => {
        const ok = g.picks[i] === q.answer;
        g.gain[i] = ok ? mult * (g.jk[i] ? 2 : 1) : 0;
        g.pen[i] = !ok && g.jk[i] ? 5 : 0;
        t.tokens += g.gain[i];
        t.score = r1(t.score - g.pen[i]);
        if (g.jk[i]) t.joker = false;
      });
      return { ...state, G: g };
    }

    case "TOGGLE_BONUS": {
      const g = structuredClone(state.G);
      const i = action.i;
      const t = g.teams[i];
      if (g.bonus[i]) {
        if (t.tokens < 1) return state;
        t.tokens--;
        g.gain[i]--;
      } else {
        t.tokens++;
        g.gain[i]++;
      }
      g.bonus[i] = !g.bonus[i];
      return { ...state, G: g };
    }

    case "BUY": {
      const { ti, cid } = action;
      if (state.G.teams[ti].tokens < 1 || freeUnits(state.G, cid) < 1) return state;
      const g = structuredClone(state.G);
      g.teams[ti].tokens--;
      g.hold[cid][ti]++;
      return { ...state, G: g };
    }

    case "STEAL_START": {
      const g = structuredClone(state.G);
      g.steal = { t: action.ti, c: null };
      return { ...state, G: g };
    }
    case "STEAL_PICK_C": {
      const g = structuredClone(state.G);
      if (g.steal) g.steal.c = action.cid;
      return { ...state, G: g };
    }
    case "STEAL_CANCEL": {
      const g = structuredClone(state.G);
      g.steal = null;
      return { ...state, G: g };
    }
    case "STEAL_DO": {
      const { ti, cid, vi } = action;
      if (state.G.teams[ti].tokens < 2 || state.G.hold[cid][vi] < 1) return state;
      const g = structuredClone(state.G);
      g.teams[ti].tokens -= 2;
      g.hold[cid][vi]--;
      g.hold[cid][ti]++;
      g.steal = null;
      return { ...state, G: g };
    }

    case "SUM_ADVANCE": {
      const G = state.G;
      if (G.sumPhase === "trade") {
        const g = structuredClone(G);
        g.sumPhase = "event";
        g.event = pickEvent(g);
        return { ...state, G: g };
      }
      if (G.sumPhase === "event") {
        const g = structuredClone(G);
        g.report = distribute(g, g.event, ROUNDS[g.plan[g.pi].r].mult);
        g.sumPhase = "paid";
        return { ...state, G: g };
      }
      if (G.pi < G.plan.length - 1) return { ...state, G: enterStep(G, G.pi + 1), edit: false };
      return state;
    }

    case "ADJUST": {
      const g = structuredClone(state.G);
      const { i, p, k } = action;
      g.teams[i].score = r1(g.teams[i].score + p);
      g.teams[i].tokens = Math.max(0, g.teams[i].tokens + k);
      return { ...state, G: g };
    }

    case "TOGGLE_EDIT":
      return { ...state, edit: !state.edit };

    default:
      return state;
  }
}

export function useGame(beep) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const { G } = state;

  // Lưu tiến trình mỗi khi G đổi
  useEffect(() => {
    if (!G) return;
    const st = G.plan[G.pi];
    const done = (st.k === "q" && G.phase === "reveal") || (st.k === "sum" && G.sumPhase === "paid");
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        teams: G.teams,
        hold: G.hold,
        plan: G.plan,
        pi: G.pi,
        done,
        roundStart: G.roundStart,
        jokerOn: G.jokerOn,
        used: G.used,
      })
    );
  }, [G]);

  const actions = {
    setupPatch: useCallback((patch) => dispatch({ type: "SETUP_PATCH", patch }), []),
    clearSaved: useCallback(() => {
      localStorage.removeItem(SAVE_KEY);
      dispatch({ type: "CLEAR_SAVED" });
    }, []),
    newGame: useCallback(() => {
      localStorage.removeItem(SAVE_KEY);
      dispatch({ type: "RESET" });
    }, []),
    startGame: useCallback(() => {
      const plan = buildPlan(state.setup, ROUNDS);
      if (plan.length <= 1) {
        alert("Hãy chọn ít nhất một vòng thi.");
        return;
      }
      dispatch({ type: "START_GAME" });
    }, [state.setup]),
    resume: useCallback((saved) => dispatch({ type: "RESUME", saved }), []),
    goStep: useCallback((i) => dispatch({ type: "GO_STEP", i }), []),
    nextStep: useCallback(() => dispatch({ type: "NEXT_STEP" }), []),
    selectTeam: useCallback((ti) => dispatch({ type: "SELECT_TEAM", ti }), []),
    pick: useCallback((ti, oi) => dispatch({ type: "PICK", ti, oi }), []),
    toggleJoker: useCallback((ti) => dispatch({ type: "TOGGLE_JOKER", ti }), []),
    reveal: useCallback(() => {
      dispatch({ type: "REVEAL" });
      beep(1040, 250);
    }, [beep]),
    toggleBonus: useCallback((i) => dispatch({ type: "TOGGLE_BONUS", i }), []),
    buy: useCallback(
      (ti, cid) => {
        dispatch({ type: "BUY", ti, cid });
        beep(700, 80);
      },
      [beep]
    ),
    stealStart: useCallback((ti) => dispatch({ type: "STEAL_START", ti }), []),
    stealPickC: useCallback((cid) => dispatch({ type: "STEAL_PICK_C", cid }), []),
    stealCancel: useCallback(() => dispatch({ type: "STEAL_CANCEL" }), []),
    stealDo: useCallback(
      (ti, cid, vi) => {
        dispatch({ type: "STEAL_DO", ti, cid, vi });
        beep(300, 250);
      },
      [beep]
    ),
    sumAdvance: useCallback(() => {
      const g = state.G;
      if (g && g.sumPhase === "trade") beep(520, 200);
      else if (g && g.sumPhase === "event") beep(1040, 250);
      dispatch({ type: "SUM_ADVANCE" });
    }, [state.G, beep]),
    adjust: useCallback((i, p, k) => dispatch({ type: "ADJUST", i, p, k }), []),
    toggleEdit: useCallback(() => dispatch({ type: "TOGGLE_EDIT" }), []),
  };

  return { state, actions };
}
