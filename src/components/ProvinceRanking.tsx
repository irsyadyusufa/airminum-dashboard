import "./ProvinceRanking.css";
import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { loadExcelData } from "../services/excelService";

type ProvinceData = {
  wilayah: string;
  capaian: number;
};

type Props = {
  selectedProvince: string | null;

  setSelectedProvince:
    React.Dispatch<
      React.SetStateAction<
        string | null
      >
    >;

  selectedIndicator: string;
  selectedYear: number;
};

const getColor = (value: number) => {
  if (value >= 60) return "#0f3d66";
  if (value >= 40) return "#235a88";
  if (value >= 20) return "#8bb7dd";

  return "#dbeafe";
};

function ProvinceRanking({
  selectedProvince,
  setSelectedProvince,
  selectedIndicator,
  selectedYear,
}: Props) {
  const [data, setData] = useState<
    ProvinceData[]
  >([]);

  useEffect(() => {
    loadExcelData().then((rows: any[]) => {
const provinceData = rows
  .filter(
    (row) =>
      row.id_indikator ===
        selectedIndicator &&
      row.level === "provinsi" &&
      row.tahun === selectedYear &&
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
}, [
  selectedIndicator,
  selectedYear,
]);

  return (
    <div className="ranking-card">
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
          <XAxis
            type="number"
            unit="%"
            tick={{
              fontSize: 14,
              fill: "#64748b",
            }}
          />

          <YAxis
            type="category"
            dataKey="wilayah"
            width={220}
            interval={0}
            tick={{
              fontSize: 14,
              fill: "#64748b",
            }}
          />

          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(2)}%`,
              "PIP 2025",
            ]}
          />

          <Bar dataKey="capaian">
            {data.map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.wilayah ===
                    selectedProvince
                      ? "#f59e0b"
                      : getColor(
                          entry.capaian
                        )
                  }
                  onMouseEnter={() =>
                    setSelectedProvince(
                      entry.wilayah
                    )
                  }
                  onMouseLeave={() =>
                    setSelectedProvince(
                      null
                    )
                  }
                />
              )
            )}

            <LabelList
              dataKey="capaian"
              position="right"
              formatter={(
                value: number
              ) =>
                `${value.toFixed(1)}%`
              }
              style={{
                fill: "#334155",
                fontSize: 12,
                fontWeight: 600,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProvinceRanking;