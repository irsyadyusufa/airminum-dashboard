import PageHeader from "../components/PageHeader";

import InfrastructureKPI from "../components/infrastruktur/InfrastructureKPI";

import InfrastructureGap from "../components/infrastruktur/InfrastructureGap";

import InfrastructureLoss from "../components/infrastruktur/InfrastructureLoss";

import "./Infrastruktur.css";

import InfrastructureIntervention
  from "../components/infrastruktur/InfrastructureIntervention";

import WaterSankey
  from "../components/infrastruktur/WaterSankey";

function Infrastruktur() {
  return (
    <>
<PageHeader
  title="Dashboard Infrastruktur Air Minum Nasional"
  subtitle={
    <>
      Pemantauan pada Wilayah Pelayanan BUMD Air Minum di Indonesia
      <br />
      Berdasarkan Buku Kinerja BUMD Air Minum Tahun 2024
    </>
  }
/>

      <InfrastructureKPI />

      <WaterSankey />

      <div className="infra-analysis-row">
        <InfrastructureGap />
        <InfrastructureLoss />
      </div>

      <InfrastructureIntervention />

    </>
  );
}

export default Infrastruktur;