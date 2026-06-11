import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import AksesAirMinum from "./pages/AksesAirMinum";
import Infrastruktur from "./pages/Infrastruktur";
import Kelembagaan from "./pages/Kelembagaan";
import Regulasi from "./pages/Regulasi";
import Pendanaan from "./pages/Pendanaan";
import Provinsi from "./pages/Provinsi";
import Kabupatenkota from "./pages/Kabupatenkota";

import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Routes>

          {/* buka website langsung masuk dashboard */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/akses-air-minum"
            element={<AksesAirMinum />}
          />

          <Route
            path="/infrastruktur"
            element={<Infrastruktur />}
          />

          <Route
            path="/kelembagaan"
            element={<Kelembagaan />}
          />

          <Route
            path="/regulasi"
            element={<Regulasi />}
          />

          <Route
            path="/pendanaan"
            element={<Pendanaan />}
          />

          <Route
            path="/provinsi"
            element={<Provinsi />}
          />

          <Route
            path="/kabupaten-kota"
            element={<Kabupatenkota />}
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;