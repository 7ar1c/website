// pages/api/get-location.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';



const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the data
    const data = await redis.get('current_location');

    console.log("Raw Redis Data:", data);

    // Handle "Old" Data (if you haven't run the update script yet)
    if (typeof data === 'string') {
      return res.status(200).json({ location: data, timestamp: null });
    }

    // Handle "New" Data (Object)
    if (data && typeof data === 'object' && 'name' in data) {
       // @ts-ignore
      return res.status(200).json({ location: data.name, timestamp: data.timestamp });
    }

    // Fallback
    res.status(200).json({ location: null, timestamp: null });

  } catch (error) {
    res.status(200).json({ location: null, timestamp: null });
  }
}