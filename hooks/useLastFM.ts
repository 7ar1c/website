// hooks/useLastFM.ts
import { useState, useEffect } from 'react';

const USERNAME = 'tar1c'; // Replace with your Last.fm username
const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY; // <--- Uses the .env variable

export function useLastFM() {
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    async function fetchMusic() {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
        );
        const data = await res.json();
        const recent = data.recenttracks.track[0];

        if (!recent) return;

        setTrack({
          // Check if currently playing (Last.fm adds an '@attr' field for this)
          isPlaying: recent['@attr']?.nowplaying === 'true',
          song: recent.name,
          artist: recent.artist['#text'],
          album: recent.album['#text'],
          url: `https://open.spotify.com/search/${encodeURIComponent(recent.name + " " + recent.artist['#text'])}`,
          // Get the "extra large" image (index 3) for better quality
          cover: recent.image[3]['#text']
        });

      } catch (error) {
        console.error("Last.fm error:", error);
      }
    }

    fetchMusic();
    const interval = setInterval(fetchMusic, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return track;
}