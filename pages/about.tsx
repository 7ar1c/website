// pages/about.tsx
import Layout from '../components/Layout';
import { personalInfo, education, projects } from '../lib/data';

export default function About() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">me!</h1>
      
      <div className="prose prose-neutral mb-12">
        <p className="text-neutral-600 leading-7">{personalInfo.bio}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Education</h2>
      <div className="mb-10 space-y-4">
        {education.map((edu, idx) => (
          <div key={idx}>
            <h3 className="font-semibold">{edu.school}</h3>
            <p className="text-sm text-neutral-500">{edu.degree} | {edu.period}</p>
            <p className="text-sm text-neutral-600 mt-1">{edu.details}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Technical Projects</h2>
      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div key={idx} className="border-l-2 border-neutral-200 pl-4">
            <h3 className="font-semibold">{proj.title}</h3>
            <p className="text-xs font-mono text-neutral-400 mb-2">{proj.tech.join(" • ")}</p>
            <p className="text-sm text-neutral-600">{proj.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}