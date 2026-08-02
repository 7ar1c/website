import type { NextApiRequest, NextApiResponse } from 'next';
import { spotifyFetch } from '../../lib/spotify';

type SpotifyTrackObject = {
  id?: string;
  name: string;
  external_urls?: { spotify?: string };
  artists?: Array<{ name: string }>;
  album?: {
    name?: string;
    images?: Array<{ url: string }>;
  };
};

type SpotifyCurrentlyPlayingResponse = {
  is_playing?: boolean;
  item?: SpotifyTrackObject | null;
};

type SpotifyRecentlyPlayedResponse = {
  items?: Array<{
    track?: SpotifyTrackObject;
    played_at?: string;
  }>;
};

type CurrentTrackPayload = {
  id: string | null;
  isPlaying: boolean;
  song: string;
  artist: string;
  album: string;
  url: string;
  cover: string | null;
};

type LastObservedTrack = {
  track: CurrentTrackPayload;
  observedAt: number;
};

let lastObservedTrack: LastObservedTrack | null = null;

function normalizeTrack(track: SpotifyTrackObject, isPlaying: boolean): CurrentTrackPayload {
  return {
    id: track.id ?? null,
    isPlaying,
    song: track.name,
    artist: track.artists?.map((artist) => artist.name).join(', ') ?? 'Unknown Artist',
    album: track.album?.name ?? 'Unknown Album',
    url: track.external_urls?.spotify ?? 'https://open.spotify.com',
    cover: track.album?.images?.[0]?.url ?? null,
  };
}

function isSameTrack(a: CurrentTrackPayload, b: CurrentTrackPayload): boolean {
  if (a.id && b.id) return a.id === b.id;
  return a.song === b.song && a.artist === b.artist;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrentTrackPayload | null | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const currentlyPlaying = await spotifyFetch<SpotifyCurrentlyPlayingResponse>('/v1/me/player/currently-playing');
    if (currentlyPlaying?.item) {
      const normalizedCurrent = normalizeTrack(currentlyPlaying.item, Boolean(currentlyPlaying.is_playing));
      lastObservedTrack = { track: normalizedCurrent, observedAt: Date.now() };
      return res.status(200).json(normalizedCurrent);
    }

    const recentlyPlayed = await spotifyFetch<SpotifyRecentlyPlayedResponse>('/v1/me/player/recently-played?limit=1');
    const recentItem = recentlyPlayed?.items?.[0];
    const recentTrack = recentItem?.track;
    if (!recentTrack) {
      if (lastObservedTrack) {
        return res.status(200).json({ ...lastObservedTrack.track, isPlaying: false });
      }
      return res.status(200).json(null);
    }

    const normalizedRecent = normalizeTrack(recentTrack, false);
    const recentPlayedAt = recentItem?.played_at ? Date.parse(recentItem.played_at) : NaN;

    if (lastObservedTrack) {
      if (isSameTrack(lastObservedTrack.track, normalizedRecent)) {
        return res.status(200).json({ ...lastObservedTrack.track, isPlaying: false });
      }

      if (!Number.isNaN(recentPlayedAt) && recentPlayedAt < lastObservedTrack.observedAt) {
        return res.status(200).json({ ...lastObservedTrack.track, isPlaying: false });
      }
    }

    lastObservedTrack = {
      track: normalizedRecent,
      observedAt: Number.isNaN(recentPlayedAt) ? Date.now() : recentPlayedAt,
    };

    return res.status(200).json(normalizedRecent);
  } catch (error) {
    console.error('Spotify currently-playing error:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify current track' });
  }
}
