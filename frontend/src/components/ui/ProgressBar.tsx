export const ProgressBar: React.FC<{
  value: number;
  max: number;
  colorClass: string;
}> = ({ value, max, colorClass }) => (
  <div className="h-2 bg-slate-700 rounded-full">
    <div
      className={`h-full rounded-full ${colorClass}`}
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);
