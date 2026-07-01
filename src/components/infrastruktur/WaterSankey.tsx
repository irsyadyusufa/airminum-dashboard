import { useEffect, useState } from "react";

import { ResponsiveSankey } from "@nivo/sankey";

import { loadExcelData }
  from "../../services/excelService";

function WaterSankey() {
  const [data, setData] =
    useState<any>(null);

  useEffect(() => {
    loadExcelData(
      "infrastruktur"
    ).then((rows: any[]) => {

      const getRow = (
        id: string
      ) =>
        rows.find(
          (row) =>
            row.id_indikator === id
        );

      const getName = (
        id: string
      ) =>
        getRow(id)
          ?.nama_indikator ?? id;

      const getValue = (
        id: string
      ) =>
        Number(
          getRow(id)?.nilai ?? 0
        );

      const makeLabel = (
        id: string
      ) =>
        `${getName(id)}
${getValue(id).toLocaleString(
  "id-ID"
)} L/dt`;

      const gapAirBaku =
        getValue("KEB") -
        getValue("AB");

      const gapLabel =
        `Gap Air Baku
${gapAirBaku.toLocaleString(
  "id-ID"
)} L/dt`;

      const kebutuhanLabel =
        makeLabel("KEB");

      const airBakuLabel =
        makeLabel("AB");

      const abIdleLabel =
        makeLabel("ABIC");

      const ipaLabel =
        makeLabel("IPA");

      const ipaRusakLabel =
        makeLabel("IPAX");

      const produksiLabel =
        makeLabel("PROD");

      const idleCapacityLabel =
        makeLabel("PRODIC");

      const produksiRiilLabel =
        makeLabel("PRODRIIL");

      const nrwProduksiLabel =
        makeLabel("PRODX");

      const distribusiLabel =
        makeLabel("DIS");

      const nrwDistribusiLabel =
        makeLabel("DISX");

      const airTerjualLabel =
        makeLabel("JUAL");

      setData({
        nodes: [
          {
            id:
              kebutuhanLabel,
          },

          {
            id:
              gapLabel,
          },

          {
            id:
              airBakuLabel,
          },

          {
            id:
              abIdleLabel,
          },

          {
            id:
              ipaLabel,
          },

          {
            id:
              ipaRusakLabel,
          },

          {
            id:
              produksiLabel,
          },

          {
            id:
              idleCapacityLabel,
          },

          {
            id:
              produksiRiilLabel,
          },

          {
            id:
              nrwProduksiLabel,
          },

          {
            id:
              distribusiLabel,
          },

          {
            id:
              nrwDistribusiLabel,
          },

          {
            id:
              airTerjualLabel,
          },
        ],

        links: [
          {
            source:
              kebutuhanLabel,
            target:
              gapLabel,
            value:
              gapAirBaku,
          },

          {
            source:
              kebutuhanLabel,
            target:
              airBakuLabel,
            value:
              getValue("AB"),
          },

          {
            source:
              airBakuLabel,
            target:
              abIdleLabel,
            value:
              getValue("ABIC"),
          },

          {
            source:
              airBakuLabel,
            target:
              ipaLabel,
            value:
              getValue("IPA"),
          },

          {
            source:
              ipaLabel,
            target:
              ipaRusakLabel,
            value:
              getValue("IPAX"),
          },

          {
            source:
              ipaLabel,
            target:
              produksiLabel,
            value:
              getValue("PROD"),
          },

          {
            source:
              produksiLabel,
            target:
              idleCapacityLabel,
            value:
              getValue("PRODIC"),
          },

          {
            source:
              produksiLabel,
            target:
              produksiRiilLabel,
            value:
              getValue(
                "PRODRIIL"
              ),
          },

          {
            source:
              produksiRiilLabel,
            target:
              nrwProduksiLabel,
            value:
              getValue("PRODX"),
          },

          {
            source:
              produksiRiilLabel,
            target:
              distribusiLabel,
            value:
              getValue("DIS"),
          },

          {
            source:
              distribusiLabel,
            target:
              nrwDistribusiLabel,
            value:
              getValue("DISX"),
          },

          {
            source:
              distribusiLabel,
            target:
              airTerjualLabel,
            value:
              getValue("JUAL"),
          },
        ],
      });
    });
  }, []);

  if (!data) return null;

  return (
    <div
      style={{
        height: 600,
        background: "#fff",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <ResponsiveSankey
        data={data}
        margin={{
          top: 40,
          right: 40,
          bottom: 70,
          left: 40,
        }}
        align="center"
colors={(node) => {
  const id = String(node.id);

  if (
    id.includes("Gap") ||
    id.includes("Rusak") ||
    id.includes("Idle") ||
    id.includes("NRW")
  ) {
    return "#f2c94c";
  }

  return "#67a2da";
}}
        nodeOpacity={1}
        nodeThickness={18}
        nodeSpacing={36}
        nodeBorderWidth={1}
        nodeBorderColor="#ffffff"
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={12}
        labelTextColor="#334155"
      />
    </div>
  );
}

export default WaterSankey;