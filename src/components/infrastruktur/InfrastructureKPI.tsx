import { useEffect, useState } from "react";

import { loadExcelData } from "../../services/excelService";

import "./InfrastructureKPI.css";

type KpiCardData = {
  title: string;
  value: string;
};

function InfrastructureKPI() {
  const [kpis, setKpis] = useState<
    KpiCardData[]
  >([]);

  useEffect(() => {
    loadExcelData("infrastruktur").then(
      (rows: any[]) => {
        const getValue = (
          id: string
        ) =>
          Number(
            rows.find(
              (row) =>
                row.id_indikator === id
            )?.nilai ?? 0
          );

        const kebutuhan =
          getValue("KEB");

        const airBaku =
          getValue("AB");

        const ipa =
          getValue("IPA");

        const terjual =
          getValue("JUAL");

        const utilisasi =
          airBaku > 0
            ? (
                (terjual /
                  airBaku) *
                100
              ).toFixed(1)
            : "0";

        setKpis([
          {
            title:
              "Kebutuhan Air 2029",
            value:
              kebutuhan.toLocaleString(
                "id-ID"
              ) + " L/dt",
          },

          {
            title:
              "Kapasitas Air Baku Terbangun",
            value:
              airBaku.toLocaleString(
                "id-ID"
              ) + " L/dt",
          },

          {
            title:
              "Kapasitas IPA Terpasang",
            value:
              ipa.toLocaleString(
                "id-ID"
              ) + " L/dt",
          },

          {
            title:
              "Volume Air Terjual",
            value:
              terjual.toLocaleString(
                "id-ID"
              ) + " L/dt",
          },

          {
            title:
              "Utilisasi SPAM",
            value:
              `${utilisasi}%`,
          },
        ]);
      }
    );
  }, []);

  return (
    <div className="infra-kpi-container">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="infra-kpi-card"
        >
          <div className="infra-kpi-title">
            {kpi.title}
          </div>

          <div className="infra-kpi-value">
            {kpi.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfrastructureKPI;