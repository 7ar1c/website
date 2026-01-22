// pages/api/calendly.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.CALENDLY_API_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Missing API Token' });
  }

  try {
    // 1. Get the current user's URI (ID)
    const userRes = await fetch('https://api.calendly.com/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await userRes.json();
    const userUri = userData.resource.uri;

    // 2. Fetch the Event Types for this user
    const eventsRes = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const eventsData = await eventsRes.json();

    // 3. Filter only active events and return relevant data
    const activeEvents = eventsData.collection
      .filter((event: any) => event.active)
      .map((event: any) => ({
        name: event.name,
        duration: event.duration, // e.g. 30 (minutes)
        description: event.description_plain,
        url: event.scheduling_url,
        color: event.color,
      }));

    res.status(200).json(activeEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Calendly data' });
  }
}