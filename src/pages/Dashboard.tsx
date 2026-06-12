import { useEffect, useState } from "react";
import ProvinceRanking from "../components/ProvinceRanking";
import KpiCard from "../components/KpiCard";
import PageHeader from "../components/PageHeader";
import IndonesiaMap from "../components/IndonesiaMap";
import { loadExcelData } from "../services/excelService";

import "./Dashboard.css";
import AnalyticsFilter from "../components/AnalyticsFilter";

type KpiData = {
  title: string;
  capaian: string;
  baseline: string;

  target2025: string;
  target2026: string;
  target2027: string;
  target2028: string;
  target2029: string;

  year: string;
};

function Dashboard() {
  const [kpis, setKpis] = useState<KpiData[]>([]);

  const [
    selectedProvince,
    setSelectedProvince,
  ] = useState<string | null>(null);
const [selectedIndicator,
  setSelectedIndicator] =
  useState("PIP");

const [selectedYear,
  setSelectedYear] =
  useState(2025);

  useEffect(() => {
    loadExcelData().then((rows: any[]) => {
      const indicators = ["SM", "PIP"];

      const kpiData = indicators.map(
        (indicatorId) => {
const indicatorRows = rows.filter(
  (row) =>
    row.id_indikator === indicatorId &&
    row.level?.toLowerCase() ===
      "nasional"
);

          const sortedRows =
            indicatorRows.sort(
              (a, b) => a.tahun - b.tahun
            );

          const baselineRow =
            sortedRows.find(
              (r) => r.tahun === 2024
            );

          const latestCapaianRow =
            [...sortedRows]
              .reverse()
              .find(
                (r) =>
                  r.capaian !== undefined &&
                  r.capaian !== null &&
                  r.capaian !== ""
              );

          const getTarget = (
            year: number
          ) => {
            const row = sortedRows.find(
              (r) => r.tahun === year
            );

            return row?.target
              ? `${row.target}%`
              : "-";
          };

          return {
            title:
              sortedRows[0]
                ?.nama_indikator ?? "",

            capaian: latestCapaianRow
              ? `${latestCapaianRow.capaian}%`
              : `${baselineRow?.capaian}%`,

            baseline: `${baselineRow?.capaian}%`,

            target2025:
              getTarget(2025),

            target2026:
              getTarget(2026),

            target2027:
              getTarget(2027),

            target2028:
              getTarget(2028),

            target2029:
              getTarget(2029),

            year: latestCapaianRow
              ? String(
                  latestCapaianRow.tahun
                )
              : "2024",
          };
        }
      );

      setKpis(kpiData);
    });
  }, []);

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
            target2025={kpi.target2025}
            target2026={kpi.target2026}
            target2027={kpi.target2027}
            target2028={kpi.target2028}
            target2029={kpi.target2029}
            year={kpi.year}
          />
        ))}
      </div>
<AnalyticsFilter
  selectedIndicator={
    selectedIndicator
  }
  selectedYear={
    selectedYear
  }
  onChange={(
    indicator,
    year
  ) => {
    setSelectedIndicator(
      indicator
    );

    setSelectedYear(year);
  }}
/>
      <div className="analytics-section">
       <IndonesiaMap
  selectedProvince={
    selectedProvince
  }
  setSelectedProvince={
    setSelectedProvince
  }
  selectedIndicator={
    selectedIndicator
  }
  selectedYear={
    selectedYear
  }
/>
<ProvinceRanking
  selectedProvince={
    selectedProvince
  }
  setSelectedProvince={
    setSelectedProvince
  }
  selectedIndicator={
    selectedIndicator
  }
  selectedYear={
    selectedYear
  }
/>
      </div>
    </>
  );
}

export default Dashboard;