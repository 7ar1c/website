// pages/contact.tsx
import React, { useEffect, useState } from 'react';
import { PopupModal } from 'react-calendly';
import Layout from '../components/Layout';
import { personalInfo } from '../lib/data';

// Define the shape of our event data
type CalendlyEvent = {
  name: string;
  duration: number;
  description: string;
  url: string;
  color: string;
};

export default function Contact() {
const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State to control the popup
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

  // 1. Fetch data from our new API route on load
useEffect(() => {
    fetch('/api/calendly')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Calendly Error:", err);
        setLoading(false); // <--- IMPORTANT: Stop loading on error
      });
  }, []);

  // 2. Handler to open the modal
  const handleBookClick = (url: string) => {
    setSelectedUrl(url);
    setIsOpen(true);
  };
 return (
    <Layout>
      {/* 1. INCREASED WIDTH to max-w-2xl so the grid cards fit nicely */}
      <section className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-neutral-900 leading-tight">get in touch</h1>
        
        <p className="text-neutral-600 mb-12 leading-relaxed text-base sm:text-lg break-words">
            let's grab a coffee and talk about life!
        </p>

        {/* 2. MAIN SPACING WRAPPER (Separates Contact Info from Calendar) */}
        <div className="space-y-16">
          
          {/* SECTION A: Contact Details */}
          <div className="space-y-6">
            {/* Email */}
            <div className="group">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-1">Email</h3>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="text-lg text-neutral-900 hover:text-neutral-500 transition-colors border-b border-neutral-200 hover:border-neutral-500 pb-0.5"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Phone */}
            <div className="group">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-1">Phone</h3>
              <a 
                href={`tel:${personalInfo.phone}`} 
                className="text-lg text-neutral-900 hover:text-neutral-500 transition-colors"
              >
                {personalInfo.phone}
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">On the Web</h3>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-neutral-900 hover:text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-all"
                >
                  LinkedIn ↗
                </a>
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-neutral-900 hover:text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-all"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          {/* SECTION B: Calendar (Now separate with more breathing room) */}
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-6">Schedule a Chat</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {loading ? (
                // Show 2 skeletons so it looks like a grid is loading
                <>
                  <div className="h-32 bg-neutral-50 animate-pulse rounded-xl border border-neutral-100"></div>
                  <div className="h-32 bg-neutral-50 animate-pulse rounded-xl border border-neutral-100"></div>
                </>
              ) : (
                events.map((event, index) => (
                  <button
                    key={index}
                    onClick={() => handleBookClick(event.url)}
                    className="group text-left p-5 sm:p-6 rounded-2xl border border-neutral-200 hover:border-neutral-800 hover:shadow-sm transition-all bg-white min-h-[120px]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-mono rounded">
                        {event.duration} min
                      </span>
                      <span className="text-neutral-300 group-hover:text-neutral-900 transition-colors">→</span>
                    </div>
                    
                    <h3 className="font-bold text-neutral-900 mb-1 group-hover:underline decoration-neutral-300 underline-offset-4">
                      {event.name}
                    </h3>
                  </button>
                ))
              )}
            </div>

            {/* Modal Logic */}
            {typeof window !== 'undefined' && (
              <PopupModal
                url={selectedUrl}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById('__next') || document.body}
              />
            )}
          </div>

        </div>
      </section>
    </Layout>
  );
}