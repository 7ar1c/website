// pages/index.tsx
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LocationBadge from '../components/LocationBadge';
import { personalInfo } from '../lib/data';

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(personalInfo.location);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/get-location')
      .then((res) => res.json())
      .then((data) => {
        if (data.location) {
          setCurrentLocation(data.location);
          if (data.timestamp) setLastUpdated(data.timestamp);
        }
      });
  }, []);

  return (
    <Layout>
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          welcome!
        </h1>
        
        {/* 3. PASS THE TIMESTAMP PROP HERE */}
        <LocationBadge location={currentLocation} timestamp={lastUpdated} />

        <p className="text-lg text-neutral-600 leading-relaxed">
          hi, i'm {personalInfo.name}! welcome to my website! currently studying mathematical physics at uwaterloo.
        </p>
      </section>
    </Layout>
  );
}