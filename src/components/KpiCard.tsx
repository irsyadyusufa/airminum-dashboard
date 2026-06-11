import "./KpiCard.css";

type KpiCardProps = {
  title: string;
  capaian: string;
  target: string;
  gap: string;
};
function KpiCard({
  title,
  capaian,
  target,
  gap,
}: KpiCardProps) {
  return (
    <div className="kpi-card">
        <p className="kpi-title">{title}</p>
        <p className="kpi-value">{capaian}</p>
        <p>Target: {target}</p>
        <p className="kpi-gap">Gap: {gap}</p>
    </div>
  );
}

export default KpiCard;