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
        


        <p className="text-lg text-neutral-600 leading-relaxed">
          hi, i'm {personalInfo.name}! welcome to my website! currently studying mathematical physics at uwaterloo.
        </p>

{/* 1. Wrap them in a div to group them together */}
<div className="flex flex-col gap-2"> 
  
  {/* The Badge */}
  <div> {/* Optional: Wrap in div to strip 'inline' behavior if needed */}
     <LocationBadge location={currentLocation} timestamp={lastUpdated} />
  </div>

  {/* The Text - Now only 'gap-2' (0.5rem) away instead of 'space-y-6' */}
  <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
    <a 
      href={"testlink"}
      target="_blank" 
      rel="noreferrer"
      className="ml-1 text-neutral-900 hover:underline"
    >
      let's grab a coffee →
    </a>
  </p>
  
</div>

      </section>
    </Layout>
  );
}