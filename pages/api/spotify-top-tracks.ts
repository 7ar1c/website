import type { NextApiRequest, NextApiResponse } from 'next';
import { spotifyFetch } from '../../lib/spotify';

type SpotifyTopTrack = {
  name: string;
  popularity: number;
  external_urls?: { spotify?: string };
  artists?: Array<{ name: string }>;
  album?: {
    images?: Array<{ url: string }>;
  };
};

type SpotifyTopTracksResponse = {
  items?: SpotifyTopTrack[];
};

type TopTrackPayload = {
  name: string;
  artist: string;
  popularity: number;
  url: string;
  cover: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTrackPayload[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await spotifyFetch<SpotifyTopTracksResponse>('/v1/me/top/tracks?time_range=short_term&limit=10');
    const tracks: TopTrackPayload[] = (data?.items ?? []).map((track) => ({
      name: track.name,
      artist: track.artists?.map((artist) => artist.name).join(', ') ?? 'Unknown Artist',
      popularity: track.popularity,
      url: track.external_urls?.spotify ?? 'https://open.spotify.com',
      cover: track.album?.images?.[0]?.url ?? null,
    }));

    return res.status(200).json(tracks);
  } catch (error) {
    console.error('Spotify top-tracks error:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify top tracks' });
  }
}
