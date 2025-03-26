"use client";

import { Location } from "@/types";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix Leaflet marker icon issue in Next.js
const createMarkerIcon = (color: string, size: number = 25) => {
  return L.divIcon({
    className: "custom-marker-icon",
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

interface NepalMapProps {
  locations: Location[];
  selectedLocationId: string | null;
  onLocationSelect: (location: Location) => void;
}

export default function NepalMap({
  locations,
  selectedLocationId,
  onLocationSelect,
}: NepalMapProps) {
  // Center of Nepal: approximately 28.3949° N, 84.1240° E
  const NEPAL_CENTER: [number, number] = [28.3949, 84.124];
  const DEFAULT_ZOOM = 7;

  // We need client-side only rendering for Leaflet
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[500px] bg-slate-700 rounded-xl flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
      <MapContainer
        center={NEPAL_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        attributionControl={true}
      >
        {/* Using MapTiler's English language map tiles */}
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png?language=en"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={
              [location.coordinates.lat, location.coordinates.lng] as [
                number,
                number
              ]
            }
            icon={createMarkerIcon(
              selectedLocationId === location.id ? "#3B82F6" : "#EF4444",
              selectedLocationId === location.id ? 30 : 25
            )}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -20]}
              permanent={selectedLocationId === location.id ? true : false}
            >
              {location.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
