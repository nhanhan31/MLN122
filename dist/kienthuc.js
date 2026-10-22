"use strict";

const $ = id => document.getElementById(id);
let cur = 0, shown = 0;

const frags = () => $("stage").querySelectorAll(".frag");

function render(showAll = false) {
  const s = SLIDES[cur];
  $("stage").innerHTML = `<div class="slide">${s.html}</div>`;
  const f = frags();
  shown = showAll ? f.length : 0;
  f.forEach((el, i) => el.classList.toggle("show", i < shown));
  $("stage").scrollTop = 0;
  chrome();
}

function chrome() {
  const s = SLIDES[cur], f = frags().length;
  $("secs").innerHTML = SECTIONS.map((n, i) => `<button class="chip ${i === s.sec ? "now" : i < s.sec ? "done" : ""}" data-sec="${i}">${n}</button>`).join("");
  $("prog").firstElementChild.style.width = ((cur + 1) / SLIDES.length * 100) + "%";
  $("info").textContent = `${cur + 1} / ${SLIDES.length} · ${s.title}` + (f ? ` · ${shown}/${f}` : "");
  $("btnPrev").disabled = cur === 0 && shown === 0;
  const end = cur === SLIDES.length - 1 && shown >= f;
  $("btnNext").textContent = end ? "🎮 Sang phần tương tác" : "Tiếp ▶";
}

function next() {
  const f = frags();
  if (shown < f.length) {
    f[shown].classList.add("show"); shown++;
    f[shown - 1].scrollIntoView({ block: "nearest", behavior: "smooth" });
    return chrome();
  }
  if (cur < SLIDES.length - 1) { cur++; render(); }
  else location.href = "tuongtac.html";
}
function prev() {
  if (shown > 0) { frags()[--shown].classList.remove("show"); return chrome(); }
  if (cur > 0) { cur--; render(true); }
}
function goto(i) { cur = i; render(); closeOutline(); }

function openOutline() {
  $("outList").innerHTML = SLIDES.map((s, i) => `<button class="${i === cur ? "cur" : ""}" data-go="${i}">${i + 1}. [${SECTIONS[s.sec]}] ${s.title}</button>`).join("");
  $("outline").classList.remove("hidden");
}
function closeOutline() { $("outline").classList.add("hidden"); }

$("btnNext").addEventListener("click", next);
$("btnPrev").addEventListener("click", prev);
$("btnOut").addEventListener("click", openOutline);
$("outClose").addEventListener("click", closeOutline);
$("outList").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) goto(+b.dataset.go); });
$("secs").addEventListener("click", e => {
  const b = e.target.closest("[data-sec]"); if (!b) return;
  goto(SLIDES.findIndex(s => s.sec === +b.dataset.sec));
});
$("btnFs").addEventListener("click", toggleFs);
function toggleFs() { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); }

document.addEventListener("keydown", e => {
  if (e.target.tagName === "BUTTON") e.target.blur();
  const k = e.key;
  if (!$("outline").classList.contains("hidden")) { if (k === "Escape") closeOutline(); return; }
  if (k === "ArrowRight" || k === " " || k === "Enter" || k === "PageDown") { e.preventDefault(); next(); }
  else if (k === "ArrowLeft" || k === "PageUp") { e.preventDefault(); prev(); }
  else if (k === "Home") goto(0);
  else if (k === "End") goto(SLIDES.length - 1);
  else if (k.toLowerCase() === "o") openOutline();
  else if (k.toLowerCase() === "f") toggleFs();
});

const hashSec = /#s=(\d)/.exec(location.hash);
if (hashSec) { const i = SLIDES.findIndex(s => s.sec === +hashSec[1]); if (i >= 0) cur = i; }
render();
