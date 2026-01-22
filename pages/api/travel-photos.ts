// pages/api/travel-photos.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- HELPER FUNCTIONS ---

// 1. Parse GPS (DMS to Decimal)
function parseDMS(dms: string) {
  if (!dms) return null;
  if (!isNaN(parseFloat(dms)) && !dms.includes('deg')) return parseFloat(dms);

  const parts = dms.match(/(\d+)\s*deg\s*(\d+)'\s*([\d.]+)"/);
  if (!parts) return parseFloat(dms);

  return parseFloat(parts[1]) + (parseFloat(parts[2]) / 60) + (parseFloat(parts[3]) / 3600);
}

// 2. Haversine Distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// 3. NEW: Extract City from Public ID (e.g., "travel/vienna/img123" -> "Vienna")
function getCityFromId(publicId: string) {
  if (!publicId) return null;

  // Split path: ["travel", "vienna", "img123"]
  const parts = publicId.split('/');
  
  // If we don't have enough parts (e.g. just "img123"), return null
  if (parts.length < 2) return null;

  // The folder is the item BEFORE the filename (second to last)
  const folderName = parts[parts.length - 2];

  // Ignore generic names like "travel" if that's the only folder
  if (folderName.toLowerCase() === 'travel') return null;

return folderName;
}

// --- API HANDLER ---

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret } = req.query;

  if (secret === process.env.MY_SECRET_KEY) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
  } else {
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');
  }

  try {
    const result = await cloudinary.search
      .expression('folder:travel/*') 
      .sort_by('created_at', 'desc')
      .with_field('context')
      .with_field('image_metadata')
      .max_results(100)
      .execute();

    // 1. Map & Clean Data
    const rawPhotos = result.resources.map((photo: any) => {
      let lat = parseDMS(photo.image_metadata?.GPSLatitude);
      let lng = parseDMS(photo.image_metadata?.GPSLongitude);
      
      const latRef = photo.image_metadata?.GPSLatitudeRef || '';
      const lngRef = photo.image_metadata?.GPSLongitudeRef || '';

      if (lat && (latRef === 'S' || latRef === 'South')) lat = -lat;
      if (lng && (lngRef === 'W' || lngRef === 'West')) lng = -lng;

      return {
        id: photo.public_id,
        url: photo.secure_url,
        // We pass the Public ID itself as the "folder" source
        publicId: photo.public_id, 
        date: photo.created_at,
        latitude: lat,
        longitude: lng,
      };
    }).filter((p: any) => p.latitude && p.longitude);

    // 2. Cluster Photos
    const clusters: any[] = [];
    const DISTANCE_THRESHOLD_KM = 50;

    rawPhotos.forEach((photo: any) => {
      if (typeof photo.latitude !== 'number' || typeof photo.longitude !== 'number') return;

      const match = clusters.find(c => {
         const dist = getDistanceFromLatLonInKm(c.latitude, c.longitude, photo.latitude, photo.longitude);
         return dist < DISTANCE_THRESHOLD_KM;
      });

      if (match) {
        match.photos.push(photo);
      } else {
        // FIX: Use the new helper to grab "Vienna" from "travel/vienna/img..."
        const cityTitle = getCityFromId(photo.publicId);
        
        clusters.push({
          id: photo.id,
          latitude: photo.latitude,
          longitude: photo.longitude,
          // Use City Name if found, otherwise Date
          title: cityTitle || new Date(photo.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          coverPhoto: photo.url,
          photos: [photo]
        });
      }
    });

    res.status(200).json(clusters);

  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || 'Failed to fetch photos' });
  }
}