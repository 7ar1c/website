// pages/about.tsx
import Layout from "../components/Layout";
import Timeline from "../components/Timeline";

export default function About() {
  return (
    <Layout wide={true}>
      <div className="space-y-12">

        {/* TIMELINE: Sits outside the narrow container, so it goes wide */}
        <Timeline />
      </div>
    </Layout>
  );
}