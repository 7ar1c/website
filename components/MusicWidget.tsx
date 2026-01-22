// components/MusicWidget.tsx
import { useLastFM } from '../hooks/useLastFM';

export default function MusicWidget() {
  const track = useLastFM();

  if (!track) return null; // Hidden while loading

  return (
    <a 
      href={track.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm max-w-sm transition-all hover:shadow-md hover:scale-[1.02] group"
    >
      
      {/* Album Art (with spin animation if playing) */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden shadow-sm border border-neutral-100">
        <img 
          src={track.cover || '/default-vinyl.png'} // Add a fallback image in public folder just in case
          alt={track.album} 
          className={`w-full h-full object-cover ${track.isPlaying ? 'animate-spin-slow' : ''}`} 
        />
        {/* "Equalizer" overlay if playing */}
        {track.isPlaying && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-1">
            <div className="w-1 h-3 bg-white animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-1 h-5 bg-white animate-bounce [animation-delay:-0.1s]"></div>
            <div className="w-1 h-3 bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-bold uppercase tracking-wider text-green-600">
            {track.isPlaying ? 'Now Listening' : 'Last Played'}
          </p>
          {track.isPlaying && (
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
          )}
        </div>
        
        <p className="font-bold text-neutral-900 truncate leading-tight group-hover:text-green-600 transition-colors">
          {track.song}
        </p>
        <p className="text-sm text-neutral-500 truncate">
          {track.artist}
        </p>
      </div>
    </a>
  );
}