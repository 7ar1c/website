// pages/travel.tsx
import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import type { TravelCluster } from "../components/TravelMap";

// 1. Dynamic import with NO SSR (Critical for Leaflet)
const TravelMap = dynamic(() => import("../components/TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] bg-neutral-100 animate-pulse rounded-xl flex items-center justify-center">
      <span className="text-neutral-400">loading map...</span>
    </div>
  ),
});

export default function Travel() {
  const [selectedCluster, setSelectedCluster] = useState<TravelCluster | null>(null);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">travel log</h1>
      <p className="text-neutral-600 mb-8">
        my global footprint.
      </p>

      {/* Map */}
      <div className="h-[60vh] w-full border border-neutral-200 rounded-xl overflow-hidden shadow-sm relative z-0">
        <TravelMap onClusterSelect={setSelectedCluster} />
      </div>

      {/* Album Modal */}
      {selectedCluster && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedCluster(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
              <div>
                 {/* This title comes from the Folder Name or Date */}
                 <h2 className="text-xl font-bold lowercase">{selectedCluster.title}</h2>
                 <span className="text-xs text-neutral-400 font-mono">
                   {selectedCluster.photos.length} photos
                 </span>
              </div>
              <button onClick={() => setSelectedCluster(null)} className="text-neutral-400 hover:text-black transition">✕</button>
            </div>

            {/* Grid of Photos */}
            <div className="p-6 overflow-y-auto bg-neutral-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {selectedCluster.photos.map((photo, idx) => (
                  <div key={idx} className="relative aspect-square group">
                    <img
                      src={photo.url}
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