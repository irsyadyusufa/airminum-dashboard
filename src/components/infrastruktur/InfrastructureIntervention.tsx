import { useEffect, useState } from "react";

import { loadExcelData } from "../../services/excelService";

import "./InfrastructureIntervention.css";

type Intervention = {
  title: string;
  value: string;
};

function InfrastructureIntervention() {
  const [data, setData] = useState<
    Intervention[]
  >([]);

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

      const ipax =
        getValue("IPAX");

      const prodic =
        getValue("PRODIC");

      const prodx =
        getValue("PRODX");

      const disx =
        getValue("DISX");

      const PerbaikanIPA =
        ipax + prodx;


      setData([
        {
          title:
            "Pembangunan SPAM dari Gap Air Baku (Air Baku, IPA, Distribusi, SR)",

          value: `${(
            keb - ab
          ).toLocaleString(
            "id-ID"
          )} L/dt`,
        },


        {
          title:
            "Pembangunan / Peningkatan IPA dari Idle Capacity Air Baku (IPA, Distribusi, SR)",

          value: `${(
            abic
          ).toLocaleString(
            "id-ID"
          )} L/dt`,
        },

        {
          title:
            "Perluasan Distribusi & SR dari Idle Capacity IPA (Distribusi, SR)",

          value: `${(
            prodic
            ).toLocaleString(
            "id-ID"
          )} L/dt`,
        },

        {
          title:
            "Perbaikan IPA",

          value: `${PerbaikanIPA.toLocaleString(
            "id-ID"
          )} L/dt`,
        },

        {
          title:
            "Perbaikan Distribusi & SR",

          value: `${disx.toLocaleString(
            "id-ID"
          )} L/dt`,
        },
      ]);
    });
  }, []);

  return (
    <div className="intervention-card">
      <h3>
        Kebutuhan Intervensi
      </h3>

      <div className="intervention-grid">
        {data.map((item) => (
          <div
            key={item.title}
            className="intervention-item"
          >
            <div className="intervention-title">
              {item.title}
            </div>

            <div className="intervention-value">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfrastructureIntervention;