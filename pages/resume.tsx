// pages/resume.tsx
import Layout from '../components/Layout';

export default function Resume() {
  return (
    <Layout>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold leading-tight">resume</h1>
        <a 
          href="/resume.pdf" 
          download 
          className="bg-neutral-900 text-white px-4 py-2.5 sm:px-5 sm:py-2.5 text-sm rounded-lg hover:bg-neutral-700 transition min-h-[44px] inline-flex items-center justify-center"
        >
          download pdf
        </a>
      </div>
      
      <div className="w-full h-[70vh] sm:h-[85vh] bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
         <iframe 
           src="/resume.pdf" 
           className="w-full h-full" 
           title="Resume PDF"
           loading="lazy"
         />
      </div>
    </Layout>
  );
}