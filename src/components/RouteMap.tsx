import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// Configure default marker icons (Leaflet's defaults break under bundlers)
const goldIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 14px; height: 14px; border-radius: 50%;
    background: oklch(0.66 0.115 70);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const inkIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 14px; height: 14px; border-radius: 50%;
    background: oklch(0.18 0.015 260);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function FitBounds({ from, to }: { from: [number, number]; to: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([from, to]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
  }, [from, to, map]);
  return null;
}

interface RouteMapProps {
  from: [number, number];
  to: [number, number];
  fromLabel?: string;
  toLabel?: string;
}

export default function RouteMap({ from, to }: RouteMapProps) {
  return (
    <MapContainer
      center={from}
      zoom={9}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ height: "100%", width: "100%", background: "oklch(0.96 0.006 80)" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      <Marker position={from} icon={goldIcon} />
      <Marker position={to} icon={inkIcon} />
      <Polyline
        positions={[from, to]}
        pathOptions={{
          color: "oklch(0.66 0.115 70)",
          weight: 3,
          dashArray: "8 6",
          opacity: 0.9,
        }}
      />
      <FitBounds from={from} to={to} />
    </MapContainer>
  );
}
