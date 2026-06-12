import KpiCard from "../components/KpiCard";
import PageHeader from "../components/PageHeader";

import "./Dashboard.css";

const kpis = [
  {
    title: "Rumah Tangga dengan Akses Air Minum Aman",
    capaian: "30,45%",
    baseline: "28%",
    annualTarget: "31%",
    target: "43%",
    year: "2025",
  },
  {
    title: "Rumah Tangga dengan Akses Air Minum Jaringan Perpipaan",
    capaian: "31,45%",
    baseline: "24%",
    annualTarget: "30%",
    target: "40,2%",
    year: "2025",
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
            baseline={kpi.baseline}
            target={kpi.target}
            annualTarget={kpi.annualTarget}
            year={kpi.year}
            />
        ))}
      </div>
    </>
  );
}

export default Dashboard;