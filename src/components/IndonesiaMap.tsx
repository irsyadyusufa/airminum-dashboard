import { useEffect, useState } from "react";

import {
  MapContainer,
  GeoJSON,
} from "react-leaflet";

import "./IndonesiaMap.css";

import { LatLngBounds } from "leaflet";

function IndonesiaMap() {

  const indonesiaCenter: [number, number] = [
    -2.5,
    118,
  ];

  const [geoData, setGeoData] =
    useState<any>(null);

const indonesiaBounds = new LatLngBounds(
  [-12, 94],
  [8, 142]
);

  useEffect(() => {
    fetch("/maps/indonesia.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <div className="map-card">
      <h3>Peta Indonesia</h3>

<MapContainer
  center={indonesiaCenter}
  zoom={4}
  minZoom={4}
  maxZoom={4}
  maxBounds={indonesiaBounds}
  maxBoundsViscosity={1.0}
  zoomControl={false}
  className="indonesia-map"
>
        {geoData && (
          <GeoJSON data={geoData} />
        )}
      </MapContainer>
    </div>
  );
}

export default IndonesiaMap;