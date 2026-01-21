// components/Map.tsx
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { travelLocations, PhotoLocation } from "../lib/data";

// Minimalist custom marker style (CSS-based dot)
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8], // Center the icon
  });
};

type MapProps = {
  onLocationSelect: (loc: PhotoLocation) => void;
};

export default function Map({ onLocationSelect }: MapProps) {
  return (
    <MapContainer
      center={[20, 0]} // Start with a world view
      zoom={2}
      className="w-full h-full rounded-xl z-0"
      scrollWheelZoom={true}
    >
      {/* Dark/Minimalist Map Style from CartoDB (Optional, looks cleaner than default OSM) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {travelLocations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={createCustomIcon()}
          eventHandlers={{
            click: () => onLocationSelect(loc),
          }}
        />
      ))}
    </MapContainer>
  );
}