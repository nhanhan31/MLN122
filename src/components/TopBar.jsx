export default function TopBar({ crumb, sound, onToggleSound, onToggleEdit, onFullscreen }) {
  return (
    <header className="topbar">
      <span className="brand">🏆 CQ5 · ĐẤU TRƯỜNG ĐỘI</span>
      <div className="crumb">{crumb}</div>
      <button className="tbtn" title="Âm thanh" onClick={onToggleSound}>
        {sound ? "🔊" : "🔇"}
      </button>
      <a className="tbtn" style={{ borderRadius: "12px" }} href="kienthuc.html" title="Mở lại phần kiến thức">
        📚 Phần kiến thức
      </a>
      
      <button className="tbtn" title="Chỉnh điểm thủ công" onClick={onToggleEdit}>
        ✎ Chỉnh điểm
      </button>
      <button className="tbtn" title="Toàn màn hình (F)" onClick={onFullscreen}>
        ⛶
      </button>
    </header>
  );
}
