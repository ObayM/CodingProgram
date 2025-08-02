'use client';

import { motion } from 'framer-motion';
import { KineticGlassPanel } from './KineticGlassPanel';
import { 
  FaHammer, FaChalkboardTeacher, FaUsers, FaTrophy, FaGamepad, FaCompass, FaCertificate 
} from 'react-icons/fa';
const features = [
  {
    icon: <FaHammer />,
    title: "Build From Day One",
    description: "No tutorials, no fake projects. Every week you’ll solve a real problem by building and launching something from scratch."
  },
  
  {
    icon: <FaCompass />,
    title: "Problem-First Learning",
    description: "Every project starts with a real-world problem — not a tutorial. We teach you how to think like a builder, find your own solutions, and turn vague prompts into working products."
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Live, Hands-On Sessions",
    description: "Each week includes quick lessons and a live workshop where we build in front of you — and help you build your own project."
  },
  {
    icon: <FaUsers />,
    title: "1:1 Mentor Calls",
    description: "You will get a 1:1 call with a mentor every week to get personalized feedback, guidance, and support on your projects."
  },
  {
    icon: <FaGamepad />,
    title: "Leaderboard",
    description: "Each week we will rank students based on the project quality and real metrics, don't worry we will keep things fun."
  },
  {
    icon: <FaTrophy />,
    title: "Final Launch Project",
    description: "In the last 2 weeks, you’ll build your biggest project yet with a team — and launch it publicly (will help you to make an impact,too)."
  }
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const ProgramFeatures = () => {
  return (
    <section id="features">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold font-display text-center mb-24 tracking-wide"
      >
       How It Works
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={itemVariants}>
            <KineticGlassPanel tiltEnable={false} className="h-full p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl text-primary mb-5">{feature.icon}</div>
                <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </KineticGlassPanel>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

