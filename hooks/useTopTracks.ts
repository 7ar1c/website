import { useState, useEffect } from 'react';

type TopTrack = {
  name: string;
  artist: string;
  popularity: number;
  url: string;
  cover: string | null;
};

export function useTopTracks() {
  const [tracks, setTracks] = useState<TopTrack[]>([]);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const res = await fetch('/api/spotify-top-tracks');
        if (!res.ok) {
          throw new Error(`Spotify top-tracks API returned ${res.status}`);
        }
        const data: TopTrack[] = await res.json();
        setTracks(data);
      } catch (error) {
        console.error('Top tracks hook error:', error);
      }
    }

    fetchTopTracks();
  }, []);

  return tracks;
}