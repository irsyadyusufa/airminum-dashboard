import { useEffect, useState } from "react";

import {
  MapContainer,
  GeoJSON,
} from "react-leaflet";

import "./IndonesiaMap.css";

import { loadExcelData } from "../services/excelService";

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

function IndonesiaMap({
  selectedProvince,
  setSelectedProvince,
  selectedIndicator,
  selectedYear,
}: Props) {
  const indonesiaCenter: [number, number] = [
    -2.5,
    118,
  ];

  const [geoData, setGeoData] =
    useState<any>(null);

  const [provinceData, setProvinceData] =
    useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/maps/indonesia.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));

    loadExcelData().then((rows: any[]) => {
      const filteredRows = rows.filter(
        (row) =>
          row.id_indikator ===
            selectedIndicator &&
          row.level === "provinsi" &&
          row.tahun === selectedYear &&
          row.capaian
      );

      const lookup:
        Record<string, number> = {};

      filteredRows.forEach((row) => {
        const provinceName =
          row.wilayah.replace(
            "Provinsi ",
            ""
          );

        lookup[provinceName] =
          Number(row.capaian);
      });

      setProvinceData(lookup);
    });
  }, [
    selectedIndicator,
    selectedYear,
  ]);

  const getColor = (
    province: string
  ) => {
    const value =
      provinceData[province];

    if (!value)
      return "#e5e7eb";

    if (value >= 60)
      return "#0f3d66";

    if (value >= 40)
      return "#235a88";

    if (value >= 20)
      return "#8bb7dd";

    return "#dbeafe";
  };

  const indicatorLabel =
    selectedIndicator === "SM"
      ? "Air Minum Aman"
      : "Air Minum Perpipaan";

  return (
    <div className="map-card">
      <MapContainer
        center={indonesiaCenter}
        zoom={5}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        className="indonesia-map"
      >
        {geoData && (
          <GeoJSON
            key={`${selectedIndicator}-${selectedYear}-${selectedProvince}`}
            data={geoData}
            style={(feature: any) => ({
              fillColor: getColor(
                feature.properties
                  .PROVINSI
              ),

              fillOpacity: 1,

              color:
                feature.properties
                  .PROVINSI ===
                selectedProvince
                  ? "#111827"
                  : "#ffffff",

              weight:
                feature.properties
                  .PROVINSI ===
                selectedProvince
                  ? 3
                  : 1,
            })}
            onEachFeature={(
              feature,
              layer
            ) => {
              const province =
                feature.properties
                  .PROVINSI;

              const value =
                provinceData[
                  province
                ];

              layer.bindTooltip(
                `
                <div>
                  <strong>${province}</strong>
                  <br/>
                  ${indicatorLabel}
                  ${selectedYear}:
                  ${
                    value
                      ? value.toFixed(2)
                      : "No Data"
                  }%
                </div>
                `,
                {
                  sticky: true,
                }
              );

              layer.on({
                mouseover: () => {
                  setSelectedProvince(
                    province
                  );
                },

                mouseout: () => {
                  setSelectedProvince(
                    null
                  );
                },
              });
            }}
          />
        )}
      </MapContainer>

      <div className="map-legend">
        <div className="legend-item">
          <span
            className="legend-color"
            style={{
              background:
                "#0f3d66",
            }}
          />
          ≥ 60%
        </div>

        <div className="legend-item">
          <span
            className="legend-color"
            style={{
              background:
                "#235a88",
            }}
          />
          40–59%
        </div>

        <div className="legend-item">
          <span
            className="legend-color"
            style={{
              background:
                "#8bb7dd",
            }}
          />
          20–39%
        </div>

        <div className="legend-item">
          <span
            className="legend-color"
            style={{
              background:
                "#dbeafe",
            }}
          />
          &lt; 20%
        </div>
      </div>
    </div>
  );
}

export default IndonesiaMap;