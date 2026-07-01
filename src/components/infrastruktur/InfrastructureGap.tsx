import { useEffect, useState } from "react";

import { loadExcelData }
  from "../../services/excelService";

import "./InfrastructureGap.css";

function InfrastructureGap() {
  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {
    loadExcelData(
      "infrastruktur"
    ).then((rows: any[]) => {

      const getValue = (
        id: string
      ) =>
        Number(
          rows.find(
            (row) =>
              row.id_indikator === id
          )?.nilai ?? 0
        );

      const keb =
        getValue("KEB");
      const ab =
        getValue("AB");
      const abic =
        getValue("ABIC");

      const prodic =
        getValue("PRODIC");

const data = [
  {
    title:
      "Gap Air Baku",
    value:
      keb - ab,
  },

  {
    title:
      "Idle Capacity Air Baku",
    value: abic,
  },

  {
    title:
      "Idle Capacity IPA",
    value: prodic,
  },
].sort(
        (a, b) =>
          b.value - a.value
      );

      setItems(data);
    });
  }, []);

  if (!items.length)
    return null;

  const maxValue =
    items[0].value;

  return (
    <div className="gap-card">

      <h3>
        Gap Infrastruktur
      </h3>

      {items.map(
        (item, index) => (
          <div
            key={item.title}
            className="gap-item"
          >

            <div className="gap-header">

              <div className="gap-title">

                <div className="gap-badge">
                  {index + 1}
                </div>

                <span>
                  {item.title}
                </span>

              </div>

              <div className="gap-value">
                {item.value.toLocaleString(
                  "id-ID"
                )}{" "}
                L/dt
              </div>

            </div>

            <div className="gap-bar">

              <div
                className="gap-fill gap-fill-blue"
                style={{
                  width: `${
                    (item.value /
                      maxValue) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>
        )
      )}

    </div>
  );
}

export default InfrastructureGap;