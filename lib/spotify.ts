type SpotifyTokenResponse = {
  access_token?: string;
  expires_in?: number;
};

type SpotifyApiError = {
  error?: {
    status?: number;
    message?: string;
  };
};

type SpotifyTokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: SpotifyTokenCache | null = null;

async function getSpotifyAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, or SPOTIFY_REFRESH_TOKEN');
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(`Spotify token refresh failed (${tokenRes.status}): ${errorText}`);
  }

  const tokenData: SpotifyTokenResponse = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error('Spotify token refresh response missing access_token');
  }

  const expiresIn = tokenData.expires_in ?? 3600;
  tokenCache = {
    accessToken: tokenData.access_token,
    expiresAt: Date.now() + Math.max(expiresIn - 60, 60) * 1000,
  };

  return tokenData.access_token;
}

export async function spotifyFetch<T>(path: string): Promise<T | null> {
  const accessToken = await getSpotifyAccessToken();
  const res = await fetch(`https://api.spotify.com${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    let details = '';
    try {
      const errJson: SpotifyApiError = await res.json();
      details = errJson.error?.message ?? '';
    } catch {
      details = await res.text();
    }

    throw new Error(`Spotify API request failed (${res.status})${details ? `: ${details}` : ''}`);
  }

  return (await res.json()) as T;
}
