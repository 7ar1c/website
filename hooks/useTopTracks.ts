// hooks/useTopTracks.ts
import { useState, useEffect } from 'react';

const USERNAME = 'tar1c'; 
const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

export function useTopTracks() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        // 1. Fetch the list from Last.fm
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&format=json&period=1month&limit=10`
        );
        const data = await res.json();
        
        if (data.error || !data.toptracks || !data.toptracks.track) return;

        const rawTracks = Array.isArray(data.toptracks.track) 
          ? data.toptracks.track 
          : [data.toptracks.track];

        // 2. Process tracks AND fetch better artwork from iTunes in parallel
        const processedTracks = await Promise.all(
          rawTracks.map(async (t: any) => {
            const artist = t.artist.name;
            const song = t.name;
            let coverUrl = t.image[3]['#text'] || t.image[2]['#text']; // Try Last.fm first

            // If Last.fm gave us that "Star" image (usually ends in .png or is empty), try iTunes
            // Note: Last.fm star images often look like "2a96cbd8b46e442fc41c2b86b8...png"
            // We will just ALWAYS try iTunes if the image is missing or suspicious, 
            // or you can prefer iTunes generally for better quality.
            
            try {
              const query = encodeURIComponent(`${artist} ${song}`);
              const itunesRes = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
              const itunesData = await itunesRes.json();
              
              if (itunesData.results.length > 0) {
                // iTunes returns 100x100 by default. We swap it to 600x600 for HD quality.
                coverUrl = itunesData.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
              }
            } catch (err) {
              // If iTunes fails, keep whatever Last.fm gave us (or null)
              console.warn(`Failed to fetch artwork for ${song}`);
            }

            return {
              name: song,
              artist: artist,
              playcount: t.playcount,
              url: t.url,
              cover: coverUrl || null 
            };
          })
        );

        setTracks(processedTracks);
      } catch (error) {
        console.error("Top Tracks error:", error);
      }
    }

    fetchTopTracks();
  }, []);

  return tracks;
}