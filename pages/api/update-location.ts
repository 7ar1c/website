// pages/api/update-location.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, location } = req.query;

  if (secret !== process.env.MY_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ error: 'Missing location text' });
  }

  try {
    // NEW: Save an object with the name AND the current time
    const data = {
      name: location,
      timestamp: Date.now()
    };

    await redis.set('current_location', data);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update location' });
  }
}