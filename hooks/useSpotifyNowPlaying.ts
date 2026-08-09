import { useState, useEffect } from 'react';

type CurrentTrack = {
  isPlaying: boolean;
  song: string;
  artist: string;
  album: string;
  url: string;
  cover: string | null;
};

export function useSpotifyNowPlaying() {
  const [track, setTrack] = useState<CurrentTrack | null>(null);

  useEffect(() => {
    async function fetchMusic() {
      try {
        const res = await fetch('/api/spotify-currently-playing');
        if (!res.ok) {
          throw new Error(`Spotify currently-playing API returned ${res.status}`);
        }
        const data: CurrentTrack | null = await res.json();
        setTrack(data);
      } catch (error) {
        console.error('Spotify hook error:', error);
      }
    }

    fetchMusic();
    const interval = setInterval(fetchMusic, 10000);
    return () => clearInterval(interval);
  }, []);

  return track;
}
