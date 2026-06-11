import KpiCard from "./components/KpiCard";
import "./App.css";
const kpis = [
  {
    title: "Target Akses",
    value: "Akses Aman: 78%",
  },
  {
    title: "Infrastruktur",
    value: "Kebutuhan Kapasitas: 15.000 L/det",
  },
  {
    title: "Kesehatan BUMD",
    value: "BUMD FCR: 65%",
  },
  {
    title: "Pendanaan",
    value: "Funding Gap: Rp 75 Triliun",
  },
];

function App() {
  return (
    <div className="app">
      <h1>Dashboard Air Minum Nasional</h1>

      <div className="kpi-container">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
           title={kpi.title}
           value={kpi.value}
          />
       ))}
     </div>
   </div>
  );
}

export default App;