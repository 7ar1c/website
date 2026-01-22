export const personalInfo = {
  name: "taric",
  tagline: "mathematical physics student",
  bio: "I am an Honours Bachelor of Science student at the University of Waterloo, specializing in Mathematical Physics. My work bridges the gap between rigorous theoretical modeling—like quantum mechanics and complex analysis—and practical applications in sustainable capital markets and clean electrification.",
  email: "taric.somani@uwaterloo.ca",
  github: "github.com/7ar1c",
  linkedin: "linkedin.com/in/taric-somani",
  location: "Waterloo, Canada",
};

export const experiences = [
  {
    id: 1,
    role: "Junior Analyst, Clean Electrification",
    company: "The Atmospheric Fund (TAF)",
    period: "May 2025 - Aug 2025",
    description: "Supported initiatives in clean electrification and sustainable development, focusing on data analysis and technical consulting for energy markets.",
  },
  {
    id: 2,
    role: "Project Coordinator",
    company: "Edgecom Energy",
    period: "Sept 2024 - Apr 2025",
    description: "Managed energy performance projects, utilizing SQL and Python to streamline data reporting and assist in energy market analysis.",
  },
  {
    id: 3,
    role: "Tax Professional (Level 4)",
    company: "H&R Block",
    period: "Feb 2024 - Apr 2024 & Feb 2025 - Apr 2025",
    description: "Provided expert tax preparation services during peak seasons, ensuring compliance and accuracy for diverse client portfolios.",
  }
];

export const education = [
  {
    degree: "Honours B.Sc. in Mathematical Physics",
    school: "University of Waterloo",
    period: "Sept 2022 - Apr 2027 (Proj.)",
    details: "currently taking courses in quantum mechanics, statistical mechanics, machine learning, partial differential equations and complex analysis. last semester, my average was 91.8%.",
  }
];

export const projects = [
  {
    title: "three body problem simulation",
    tech: ["Python", "OpenGL"],
    description: "Designed a simulation that models the gravitational interactions of three bodies in space, visualized using OpenGL."
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