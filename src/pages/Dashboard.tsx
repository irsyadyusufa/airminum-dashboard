import KpiCard from "../components/KpiCard";
import PageHeader from "../components/PageHeader";

import "./Dashboard.css";

const kpis = [
  {
    title: "Akses Air Minum Aman",
    capaian: "30,45%",
    target: "43%",
    gap: "12,55%",
  },
  {
    title: "Akses Perpipaan",
    capaian: "31,45%",
    target: "40,2%",
    gap: "8,75%",
  },
  {
    title: "BUMD Sehat",
    capaian: "65%",
    target: "100%",
    gap: "35%",
  },
  {
    title: "BUMD dengan Tarif FCR",
    capaian: "46%",
    target: "100%",
    gap: "54%",
  },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard Air Minum Nasional"
        subtitle="Pemantauan RPJMN 2025-2029"
      />

      <div className="kpi-container">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            capaian={kpi.capaian}
            target={kpi.target}
            gap={kpi.gap}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;