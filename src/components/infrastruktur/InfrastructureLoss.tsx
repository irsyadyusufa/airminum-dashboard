import { useEffect, useState } from "react";

import { loadExcelData }
  from "../../services/excelService";

import "./InfrastructureLoss.css";

function InfrastructureLoss() {
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

      const ipa =
        getValue("IPA");

      const ipax =
        getValue("IPAX");

      const prodriil =
        getValue("PRODRIIL");

      const prodx =
        getValue("PRODX");

      const dis =
        getValue("DIS");

      const disx =
        getValue("DISX");

      const data = [
        {
          title:
            "NRW Distribusi",

          value:
            (disx / dis) *
            100,
        },

        {
          title:
            "IPA Tidak Dapat Dimanfaatkan",

          value:
            (ipax / ipa) *
            100,
        },

        {
          title:
            "NRW Produksi",

          value:
            (prodx /
              prodriil) *
            100,
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
    <div className="loss-card">

      <h3>
        Inefisiensi Infrastruktur
      </h3>

      {items.map(
        (item, index) => (
          <div
            key={item.title}
            className="loss-item"
          >

            <div className="loss-header">

              <div className="loss-title">

                <div className="loss-badge loss-badge-yellow">
                  {index + 1}
                </div>

                <span>
                  {item.title}
                </span>

              </div>

              <div className="loss-value loss-value-yellow">
                {item.value.toFixed(
                  1
                )}
                %
              </div>

            </div>

            <div className="loss-bar">

              <div
                className="loss-fill loss-fill-yellow"
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

export default InfrastructureLoss;