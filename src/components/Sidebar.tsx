import {
  LayoutDashboard,
  Droplets,
  Factory,
  Building2,
  Scale,
  Wallet,
  Map,
  MapPinned,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="menu-title">
        Dashboard
        <br />
        Air Minum Nasional
      </div>

      <div className="menu-container">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <LayoutDashboard size={20} />
          <span className="menu-text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/akses-air-minum"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <Droplets size={20} />
          <span className="menu-text">Akses Air Minum</span>
        </NavLink>

        <NavLink
          to="/infrastruktur"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <Factory size={20} />
          <span className="menu-text">Infrastruktur</span>
        </NavLink>

        <NavLink
          to="/kelembagaan"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <Building2 size={20} />
          <span className="menu-text">Kelembagaan</span>
        </NavLink>

        <NavLink
          to="/regulasi"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <Scale size={20} />
          <span className="menu-text">Regulasi</span>
        </NavLink>

        <NavLink
          to="/pendanaan"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <Wallet size={20} />
          <span className="menu-text">Pendanaan</span>
        </NavLink>

        <NavLink
          to="/provinsi"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <Map size={20} />
          <span className="menu-text">Provinsi</span>
        </NavLink>

        <NavLink
          to="/kabupaten-kota"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <MapPinned size={20} />
          <span className="menu-text">Kabupaten/Kota</span>
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;