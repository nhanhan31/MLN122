import { useEffect } from "react";
import { ROUNDS, QUESTIONS } from "./data/rounds.js";
import { useGame } from "./game/useGame.js";
import { useSound } from "./hooks/useSound.js";
import { useFullscreen } from "./hooks/useFullscreen.js";
import TopBar from "./components/TopBar.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import SetupScreen from "./components/SetupScreen.jsx";
import RoundIntro from "./components/RoundIntro.jsx";
import QuestionScreen from "./components/QuestionScreen.jsx";
import RoundSummary from "./components/RoundSummary.jsx";
import FinalScreen from "./components/FinalScreen.jsx";
import SideBoard from "./components/SideBoard.jsx";

export default function App() {
  const sound = useSound();
  const toggleFullscreen = useFullscreen();
  const { state, actions } = useGame(sound.beep);
  const { G, setup, saved, edit } = state;

  const step = G ? G.plan[G.pi] : null;
  const isFinal = step && step.k === "final";
  const full = !G || isFinal;

  // thanh breadcrumb
  let crumb = "Thiết lập";
  if (G) {
    const r = step.r !== undefined ? step.r : step.k === "q" ? QUESTIONS[step.q].r : null;
    crumb = r !== null ? ROUNDS[r].name : "Chung cuộc";
  }
  const progress = G ? G.pi / (G.plan.length - 1) : 0;

  // phím tắt (đã bỏ mọi thao tác liên quan đồng hồ)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" && e.target.type === "text") return;
      if (e.target.tagName === "BUTTON") e.target.blur();
      const k = e.key.toLowerCase();
      if (k === "f") {
        toggleFullscreen();
        return;
      }
      if (!G) return;
      const st = G.plan[G.pi];
      if (k === " " || k === "enter") {
        e.preventDefault();
        if (st.k === "sum") return actions.sumAdvance();
        if (st.k !== "q") return actions.nextStep();
        if (G.phase === "answer") actions.reveal();
        else actions.nextStep();
      } else if (st.k === "q" && G.phase === "answer") {
        const q = QUESTIONS[st.q];
        if (/^[1-6]$/.test(k) && +k <= G.teams.length) actions.selectTeam(+k - 1);
        else if (G.sel !== null && /^[a-e]$/.test(k) && k.charCodeAt(0) - 97 < q.options.length)
          actions.pick(G.sel, k.charCodeAt(0) - 97);
        else if (k === "j" && G.sel !== null && G.jokerOn && (G.teams[G.sel].joker || G.jk[G.sel]))
          actions.toggleJoker(G.sel);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [G, actions, toggleFullscreen]);

  let main;
  if (!G) main = <SetupScreen setup={setup} saved={saved} actions={actions} />;
  else if (step.k === "round") main = <RoundIntro G={G} step={step} onNext={actions.nextStep} />;
  else if (step.k === "q") main = <QuestionScreen G={G} actions={actions} />;
  else if (step.k === "sum") main = <RoundSummary G={G} actions={actions} />;
  else main = <FinalScreen G={G} actions={actions} />;

  return (
    <div className="app">
      <TopBar
        crumb={crumb}
        sound={sound.on}
        onToggleSound={sound.toggle}
        onToggleEdit={actions.toggleEdit}
        onFullscreen={toggleFullscreen}
      />
      <ProgressBar value={progress} />
      <div className={`body ${full ? "full" : ""}`}>
        <main className="main">{main}</main>
        {G && !isFinal && <SideBoard G={G} edit={edit} actions={actions} />}
      </div>
    </div>
  );
}
