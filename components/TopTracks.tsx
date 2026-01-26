// components/TopTracks.tsx
import { useTopTracks } from '../hooks/useTopTracks';

export default function TopTracks() {
  const tracks = useTopTracks();

  if (!tracks.length) return null;

  return (
    <div className="w-full border border-neutral-200 rounded-xl bg-white/50 p-6 shadow-sm">
      <h3 className="font-bold text-neutral-900 mb-4">
        Top Tracks <span className="text-neutral-400 font-normal text-sm ml-1">(Last 30 Days)</span>
      </h3>
      
      {/* GRID LAYOUT: 2 columns on mobile, 5 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tracks.map((track, index) => (
          <a 
            key={index}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            {/* Album Art + Rank Overlay */}
            <div className="relative aspect-square w-full rounded-md overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
              <img 
                src={track.cover || '/default-vinyl.png'} 
                alt={track.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              {/* Tiny Rank Badge */}
              <div className="absolute top-1 left-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                #{index + 1}
              </div>
            </div>

            {/* Text Info */}
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-green-600">
                {track.name}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">
                {track.artist}
              </p>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                {track.playcount} plays
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}