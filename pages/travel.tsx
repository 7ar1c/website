// pages/travel.tsx
import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { PhotoLocation } from "../lib/data";

// 1. Dynamic import with NO SSR
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] bg-neutral-100 animate-pulse rounded-xl flex items-center justify-center">
      <span className="text-neutral-400">Loading Map...</span>
    </div>
  ),
});

export default function Travel() {
  const [selectedLocation, setSelectedLocation] = useState<PhotoLocation | null>(null);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Travel Log</h1>
      <p className="text-neutral-600 mb-8">
        A visual record of places I've visited. Click a marker to view the gallery.
      </p>

      {/* Map Container */}
      <div className="h-[60vh] w-full border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <Map onLocationSelect={setSelectedLocation} />
      </div>

      {/* Album Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
             onClick={() => setSelectedLocation(null)}>
          
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedLocation.title}</h2>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="text-neutral-400 hover:text-black transition"
              >
                ✕
              </button>
            </div>

            {/* Photo Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-50">
              {selectedLocation.photos.map((photo, idx) => (
                <div key={idx} className="relative aspect-[4/3] group">
                  <img
                    src={photo}
                    alt={`${selectedLocation.title} ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}