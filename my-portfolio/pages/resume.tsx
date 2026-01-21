// pages/resume.tsx
import Layout from '../components/Layout';

export default function Resume() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume</h1>
        <a 
          href="/resume.pdf" 
          download 
          className="bg-neutral-900 text-white px-4 py-2 text-sm rounded hover:bg-neutral-700 transition"
        >
          Download PDF
        </a>
      </div>
      
      <div className="aspect-[8.5/11] w-full bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center text-neutral-400">
         {/* Ideally, use an iframe here to display the PDF if desired */}
         <iframe src="/resume.pdf" className="w-full h-full rounded-lg" title="Resume PDF" />
      </div>
    </Layout>
  );
}