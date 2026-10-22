export default function ProgressBar({ value }) {
  return (
    <div className="progbar">
      <i style={{ width: `${value * 100}%` }} />
    </div>
  );
}
