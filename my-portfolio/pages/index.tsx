// pages/index.tsx
import Layout from '../components/Layout';
import { personalInfo } from '../lib/data';

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Hi, I'm {personalInfo.name}.
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          {personalInfo.tagline}. I build tools at the intersection of 
          <span className="font-semibold text-neutral-800"> computational physics</span> and 
          <span className="font-semibold text-neutral-800"> sustainable energy</span>.
        </p>
        <div className="pt-4">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-block border-b-2 border-neutral-800 pb-0.5 hover:border-neutral-400 transition"
            >
              Get in touch
            </a>
        </div>
      </section>
    </Layout>
  );
}