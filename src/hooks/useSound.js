import { useCallback, useRef, useState } from "react";

// Âm thanh beep bằng Web Audio, có thể bật/tắt.
export function useSound() {
  const [on, setOn] = useState(true);
  const ctxRef = useRef(null);

  const beep = useCallback(
    (freq = 660, ms = 120) => {
      if (!on) return;
      try {
        ctxRef.current = ctxRef.current || new (window.AudioContext || window.webkitAudioContext)();
        const actx = ctxRef.current;
        const o = actx.createOscillator();
        const g = actx.createGain();
        o.frequency.value = freq;
        g.gain.value = 0.08;
        o.connect(g);
        g.connect(actx.destination);
        o.start();
        o.stop(actx.currentTime + ms / 1000);
      } catch (e) {
        /* trình duyệt có thể chặn âm thanh */
      }
    },
    [on]
  );

  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, beep, toggle };
}
