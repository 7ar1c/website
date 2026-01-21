// pages/experience.tsx
import Layout from '../components/Layout';
import { experiences } from '../lib/data';

export default function Experience() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Past Experiences</h1>
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-lg font-semibold group-hover:text-blue-700 transition">
                {exp.company}
              </h3>
              <span className="text-sm font-mono text-neutral-400">{exp.period}</span>
            </div>
            <p className="text-medium text-neutral-800 mb-2">{exp.role}</p>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}