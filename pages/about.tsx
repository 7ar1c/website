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
    </Layout>
  );
}