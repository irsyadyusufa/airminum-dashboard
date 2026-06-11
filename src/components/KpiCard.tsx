import "./KpiCard.css";

type KpiCardProps = {
  title: string;
  value: string;
};

function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className="kpi-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default KpiCard;