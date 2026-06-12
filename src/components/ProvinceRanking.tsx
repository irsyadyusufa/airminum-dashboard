import "./ProvinceRanking.css";
import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { loadExcelData } from "../services/excelService";

type ProvinceData = {
  wilayah: string;
  capaian: number;
};

function ProvinceRanking() {
  const [data, setData] = useState<
    ProvinceData[]
  >([]);

  useEffect(() => {
    loadExcelData().then((rows: any[]) => {
      const provinceData = rows
        .filter(
          (row) =>
            row.id_indikator === "PIP" &&
            row.level === "provinsi" &&
            row.tahun === 2025 &&
            row.capaian
        )
        .map((row) => ({
          wilayah: row.wilayah.replace(
            "Provinsi ",
            ""
          ),
          capaian: Number(row.capaian),
        }))
        .sort(
          (a, b) =>
            b.capaian - a.capaian
        );

      setData(provinceData);
    });
  }, []);

  return (
    <div className="ranking-card">
      <h3>
        Ranking Provinsi - PIP 2025
      </h3>

      <ResponsiveContainer
        width="100%"
        height={900}
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="wilayah"
            width={120}
          />

          <Tooltip />

          <Bar
            dataKey="capaian"
            fill="#235a88"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProvinceRanking;