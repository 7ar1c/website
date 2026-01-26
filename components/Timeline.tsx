// components/Timeline.tsx
import { motion } from 'framer-motion';

const timelineData = [
  {
    date: "2004-2009",
    title: "early years",
    description: `my parents would describe me as a curious kid. they like to tell me how i was always just observing with a peculiar
    look on my face, trying to make sense of the world around me. i was fascinated by how things worked, i think when i was three or four,
    i (ungracefully) ripped apart an old laptop just to see what was inside. i also got into music during this time. my mom's friend bought
    me a small keyboard for christmas one year, and i was sold! from then on, music has been a massive part of my life.
    `,
    image: "/images/taric_young1.jpg" 
  },
  {
    date: "2009-2017",
    title: "elementary school",
    description: `rapid fire elementary school highlights: learned to read/write, started cross country running (10km in <1hr in grade 4!), was the vampire in dear edwina jr. (shoutout dr. bespflug),
    and got really into basketball. 
    `,
    image: "/images/elementary1.jpg"
  },
  {
    date: "2017-2020",
    title: "high school pt 1",
    description: `you know how sometimes you really have to remind yourself to not be too hard on your former self?
    this period was just a couple of years of trying to figure out who i was and where i fit in. made some friends,
    and lost some too. i messed up a lot, but learned a lot as well. picked up model un, guitar and the bass clarinet. joined the local orchestra 
    and the basketball team. lots of lunchtime jam sessions in the band room with friends.
    `,
    image: "/images/high_school1.jpg"
  },
  {
    date: "2020",
    title: "covid",
    description: `the quintessential pandemic experience: online school, messed up sleep schedule, and way too much screen time.
    picked up mountain biking as a hobby during this time as well, one of the best decisions i've made! started working at a restaurant 
    in summer 2020 as a busser which was nice to get me out of the house and socializing a bit.
    `,
    image: "/images/covid1.jpg"
  },
  {
    date: "2020-2022",
    title: "high school pt 2",
    description: `back in person! at a different school this time. i transferred to a program that allowed me to take
    advanced courses in grade 11, and take university courses in grade 12 at sfu. this is where i first really got into physics.
    also joined the jazz band and got to learn tenor sax. got promoted to server, then assistant manager at the restaurant.
    other cool things i did: wrote and presented a ted talk about moral philosophy, played varsity soccer, got my duke of edinburgh bronze award.`,
    image: "/images/hspt21.jpeg"
  },
  {
    date: "2022-present",
    title: "university",
    description: `by far the biggest transition of my life. moved to a new province and started living on my own.
    originally accepted to science and business at uwaterloo, but quickly realized it wasn't for me, so switched to mathematical physics
    after my first semester. in between 2nd and 3rd year, lived in toronto for a year for internships. 
    started travelling a lot more too. since i started university, i've been to kenya, japan, and a few countries in europe.
    `,
    image: "/images/taricuni1.jpeg"
  },
  {
    date: "present - ??",
    title: "whats next?",
    description: `still figuring that out! i want to keep travelling for sure, and hopefully get to live in different parts of the world.
    career-wise, i'm hoping to get involved in technical consulting in the energy industry, or maybe persue a masters in data science.
    either way, i'm excited to see where life takes me! one thing i know for sure, is that i will never stop being the curious kid i was back in 2004.
    `,
    image: "/images/future1.jpeg"


  }
];

export default function Timeline() {
  return (
    <div className="w-full max-w-[90%] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-24 text-neutral-900">
        life so far
      </h2>

      <div className="relative">
        {/* THE CENTER LINE */}
        {/* Hidden on mobile, Center on desktop */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 md:-ml-[0.5px]" />

        {/* BOTTOM PADDING FIX */}
        <div className="space-y-24 pb-[40vh]"> 
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
  // Logic: First item (index 0) = Text Right. Second item (index 1) = Text Left.
  const isEven = index % 2 === 0; 
  // "Even" in code (0, 2) is "Odd" visually (1st, 3rd), so:
  // Index 0 (1st item): Text Right (Default for your request)
  // Index 1 (2nd item): Text Left
  
  const isTextRight = isEven; 

  const centerViewport = { margin: "-20% 0px -20% 0px" };

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      viewport={centerViewport}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0`}
    >
      
      {/* --- LEFT SIDE --- */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-8 ${!isTextRight ? 'text-right' : ''}`}>
        
        {/* If text is supposed to be on Left (Index 1, 3...), render Text here */}
        {!isTextRight && (
          <TimelineContent item={item} align="right" centerViewport={centerViewport} />
        )}

        {/* If text is Right (Index 0, 2...), render IMAGE here */}
        {isTextRight && (
           <TimelineImage src={item.image} alt={item.title} centerViewport={centerViewport} />
        )}

      </div>


      {/* --- CENTER DOT --- */}
      <motion.div 
        className="absolute left-4 md:left-1/2 top-0 md:top-1/2 rounded-full z-10 -ml-[5px] md:-mt-[5px]"
        initial={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#d4d4d4" }}
        whileInView={{ 
          width: "0.75rem", 
          height: "0.75rem", 
          backgroundColor: "#16a34a", 
          x: -1, 
          y: -1
        }}
        viewport={centerViewport}
        transition={{ duration: 0.3 }}
      />


      {/* --- RIGHT SIDE --- */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-8`}>
        
        {/* If text is Right (Index 0, 2...), render Text here */}
        {isTextRight && (
          <TimelineContent item={item} align="left" centerViewport={centerViewport} />
        )}

        {/* If text is Left (Index 1, 3...), render IMAGE here */}
        {!isTextRight && (
           <TimelineImage src={item.image} alt={item.title} centerViewport={centerViewport} />
        )}

      </div>

    </motion.div>
  );
}

// Sub-component for Text to keep things clean
function TimelineContent({ item, align, centerViewport }: any) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'md:items-end' : 'md:items-start'}`}>
      <motion.h3 
        className="text-xl font-bold mb-1"
        initial={{ color: "#a3a3a3" }}
        whileInView={{ color: "#171717" }}
        viewport={centerViewport}
      >
        {item.title}
      </motion.h3>
      
      {/* Date is now combined with Subtitle */}
      <motion.p 
        className="text-sm font-semibold mb-3 flex items-center gap-2"
        initial={{ color: "#a3a3a3" }}
        whileInView={{ color: "#15803d" }}
        viewport={centerViewport}
      >
        <span>{item.date}</span>
      </motion.p>
      
      <motion.p 
        className="leading-relaxed text-left md:text-inherit w-full"
        initial={{ color: "#d4d4d4" }}
        whileInView={{ color: "#525252" }}
        viewport={centerViewport}
      >
      {item.description}
      </motion.p>
    </div>
  );
}

// Sub-component for Image
function TimelineImage({ src, alt, centerViewport }: any) {
  return (
    <motion.div 
      className="hidden md:block w-full aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 shadow-sm"
      initial={{ filter: "grayscale(100%) opacity(0.5)" }}
      whileInView={{ filter: "grayscale(0%) opacity(1)" }}
      viewport={centerViewport}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={src || "/default-placeholder.jpg"} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}