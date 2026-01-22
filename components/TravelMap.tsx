// components/TravelMap.tsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- 1. Fix Leaflet Icons (Keep this outside the component) ---
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- 2. Define Types ---
export type TravelCluster = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  coverPhoto: string;
  photos: { url: string; date: string }[];
};

type Props = {
  onClusterSelect: (cluster: TravelCluster) => void;
};

// --- 3. The Component ---
export default function TravelMap({ onClusterSelect }: Props) {
  const [clusters, setClusters] = useState<TravelCluster[]>([]);

  // --- 4. The Single, Correct UseEffect ---
  useEffect(() => {
    fetch('/api/travel-photos')
      .then((res) => res.json())
      .then((data) => {
        // SAFETY CHECK: Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setClusters(data);
        } else {
          console.error("API returned invalid data:", data);
          setClusters([]); // Prevents the .map crash
        }
      })
      .catch((err) => {
        console.error("Network/API Error:", err);
        setClusters([]);
      });
  }, []);

  // --- 5. Custom Marker Helper ---
  const createPhotoIcon = (url: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-image: url('${url}');
        background-size: cover;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });
  };

  return (
    <div className="h-full w-full z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {clusters.map((cluster) => (
          <Marker 
            key={cluster.id} 
            position={[cluster.latitude, cluster.longitude]}
            icon={createPhotoIcon(cluster.coverPhoto)}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                onClusterSelect(cluster);
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}