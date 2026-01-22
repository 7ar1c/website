// pages/experience.tsx
import Layout from '../components/Layout';
import { experience, projects, education } from '../lib/data';

export default function Experience() {
  return (
    <Layout>
      <div className="space-y-16">
        
        {/* --- SECTION 1: EDUCATION --- */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">education</h2>
          <div className="space-y-8">
            {education.map((item, index) => (
              <div key={index} className="pl-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3 className="font-semibold text-lg text-neutral-900">{item.school}</h3>
                  <span className="text-sm text-neutral-400 font-mono">{item.period}</span>
                </div>
                <div className="text-neutral-700 font-medium mb-2">{item.degree}</div>
                <p className="text-sm text-neutral-500 max-w-3xl">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: WORK EXPERIENCE --- */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-neutral-900">experience</h2>
          <div className="space-y-10">
            {experience.map((item, index) => (
              <div key={index} className="group relative border-l-2 pl-6 border-neutral-100 hover:border-neutral-800 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3 className="font-semibold text-lg text-neutral-900">{item.role}</h3>
                  <span className="text-sm text-neutral-400 font-mono shrink-0">{item.period}</span>
                </div>
                <div className="text-neutral-500 font-medium mb-3">{item.company}</div>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                  {item.description}
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="ml-1 text-neutral-900 hover:underline"
                    >
                      See TAF Blog →
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: PROJECTS --- */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">projects</h2>
          <div className="grid grid-cols-1 gap-6">
            {projects.map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                target="_blank" 
                rel="noreferrer"
                className="block p-5 rounded-lg border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-neutral-900">{item.title}</h3>
                  <span className="text-neutral-400">↗</span>
                </div>
                <div className="text-xs font-mono text-neutral-500 mb-3 bg-neutral-100 inline-block px-2 py-1 rounded">
                  {item.tech.join(" • ")}
                </div>
                <p className="text-sm text-neutral-600 text-sm leading-relaxed">
                  {item.description}
                </p>
                {item.video && (
                  <video 
                    className="mt-3 w-full rounded border border-neutral-200" 
                    controls 
                    preload="metadata"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                )}
              </a>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}