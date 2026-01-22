export const personalInfo = {
  name: "taric",
  tagline: "mathematical physics student",
  bio: "I am an Honours Bachelor of Science student at the University of Waterloo, specializing in Mathematical Physics. My work bridges the gap between rigorous theoretical modeling—like quantum mechanics and complex analysis—and practical applications in sustainable capital markets and clean electrification.",
  email: "taric.somani@uwaterloo.ca",
  github: "https://github.com/7ar1c",
  linkedin: "https://linkedin.com/in/taric-somani",
  location: "Waterloo, Canada",
  phone: "+1 (236) 688-1109",
  calendly: "https://calendly.com/taric-somani/"
};

export const experience = [
  {
    id: 1,
    role: "junior analyst, clean electrification",
    company: "the atmospheric fund (taf)",
    period: "may 2025 - aug 2025",
    description: `developed a research brief on the IESO's readiness for electrification,
    created a KPI framework for a residential solar and storage pilot, redesigned the data pipelines for the annual TAF emissions factor report,
    wrote a couple of blog posts.`,
    link: "https://taf.ca/author/taric/",
  },
  {
    id: 2,
    role: "project coordinator",
    company: "utrack energy",
    period: "sept 2024 - apr 2025",
    description: `conducted capex/opex analysis for submetering/DER systems 
    for multi-unit residential buildings, designed a utility bill verification product which
    generated $133,000 in revenue in 2025, secured $85,000 in non-dilutive funding for product development.`,
  },
  {
    id: 3,
    role: "level 4 tax professional",
    company: "h&r block",
    period: "feb 2024 - apr 2024",
    description: "prepared over 600 tax returns for individuals and sole proprietors, earned a national top performer award.",
  }
];

export const education = [
  {
    degree: "honours b.sc in mathematical physics",
    school: "university of waterloo",
    period: "sept 2022 - apr 2027 (proj.)",
    details: "currently taking courses in quantum mechanics, statistical mechanics, machine learning, partial differential equations and complex analysis. last semester, my average was 91.8%.",
  }
];

export const projects = [
  {
    title: "three body problem simulation",
    tech: ["python", "opengl"],
    description: "designed a simulation that models the gravitational interactions of three bodies in space, visualized using OpenGL.",
    link: "https://github.com/7ar1c/three-body-problem",
    video: "/videos/threebody.mp4",
  },
  {
    title: "email cleaner",
    tech: ["javascript"],
    description: `instead of giving my data to a third party, used the google api to sort my spam emails
    and unsubscribe from mailing lists.`,
    link: "https://github.com/7ar1c/email_cleaner"
  },
  {
    title: "hamiltonian solver",
    tech: ["matlab"],
    description: "finds the problability of a spin-1 particle being in each of its basis states after a time given a time independent hamiltonian.",
    link: "https://github.com/7ar1c/Hamiltonian-Solver"
  }
];

// Add to lib/data.ts

export type PhotoLocation = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  photos: string[]; // URLs to images
};

export const travelLocations: PhotoLocation[] = [
  {
    id: "london",
    title: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    photos: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "toronto",
    title: "Toronto, ON",
    lat: 43.65107, 
    lng: -79.347015,
    photos: [
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
    ],
  },
];