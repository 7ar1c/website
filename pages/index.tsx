// pages/index.tsx
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import LocationBadge from '../components/LocationBadge';
import { personalInfo } from '../lib/data';
import MusicWidget from "../components/MusicWidget";
import TopTracks from '../components/TopTracks';

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
      <section className="space-y-5 sm:space-y-6">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          welcome!
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
          hi, i'm {personalInfo.name}! welcome to my website! currently studying mathematical physics at uwaterloo.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="max-w-full">
            <LocationBadge location={currentLocation} timestamp={lastUpdated} />
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
            <a 
              href={"../contact"}
              target="_blank" 
              rel="noreferrer"
              className="ml-1 text-neutral-900 hover:underline"
            >
              let's grab a coffee →
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <h2 className="mt-2 text-xs sm:text-sm font-semibold text-neutral-900 uppercase tracking-wide">
            what's taric listening to?
          </h2>

          <div className="w-full max-w-xl">
            <MusicWidget />
          </div>

          <div className="w-full min-w-0">
            <TopTracks />
          </div>
        </div>

      </section>
    </Layout>
  );
}