// pages/index.tsx
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LocationBadge from '../components/LocationBadge';
import { personalInfo } from '../lib/data';

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(personalInfo.location);
  // 1. ADD THIS STATE
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/get-location')
      .then((res) => res.json())
      .then((data) => {
        if (data.location) {
          setCurrentLocation(data.location);
          // 2. ADD THIS LINE
          // This saves the time from the API to your state
          if (data.timestamp) setLastUpdated(data.timestamp);
        }
      });
  }, []);

  return (
    <Layout>
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Hi, I'm {personalInfo.name}.
        </h1>
        
        {/* 3. PASS THE TIMESTAMP PROP HERE */}
        <LocationBadge location={currentLocation} timestamp={lastUpdated} />

        <p className="text-lg text-neutral-600 leading-relaxed">
          {personalInfo.tagline}. I build tools at the intersection of 
          <span className="font-semibold text-neutral-800"> computational physics</span> and 
          <span className="font-semibold text-neutral-800"> sustainable energy</span>.
        </p>
        
        {/* ... rest of your code ... */}
      </section>
    </Layout>
  );
}