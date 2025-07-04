'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KineticGlassPanel } from './KineticGlassPanel';
import { 
  FaRocket, FaLightbulb, FaProjectDiagram, FaTools, FaBrain, FaTrophy
} from 'react-icons/fa';

// The same curriculum data
const curriculum = [
    { week: 1, title: 'Code & Concepts', project: 'Mini Calculator', icon: <FaRocket/>, description: 'Lay the foundation. Learn essential syntax, variables, functions, and the core principles of programming logic.' },
    { week: 2, title: 'Logic & Loops', project: 'Guess the Number', icon: <FaLightbulb/>, description: 'Master control flow. Dive deep into conditional statements, loops, and building interactive, logic-driven applications.' },
    { week: 3, title: 'Structure & Data', project: 'Expense Tracker', icon: <FaProjectDiagram/>, description: 'Organize your code and information. Explore arrays, objects, and how to structure data for complex applications.' },
    { week: 4, title: 'Bugs & Breakthroughs', project: 'Fix the Game', icon: <FaTools/>, description: 'Embrace the debugging process. Learn powerful techniques to find, diagnose, and fix bugs, turning frustration into triumph.' },
    { week: 5, title: 'Libraries & Creativity', project: 'Habit Tracker', icon: <FaBrain/>, description: 'Stand on the shoulders of giants. Integrate third-party libraries and APIs to rapidly expand your project\'s capabilities.' },
    { week: 6, title: 'Capstone & Celebration', project: 'Final Project', icon: <FaTrophy/>, description: 'Bring it all together. Plan, build, and deploy a complete final project of your own design, showcasing your new skills.' },
];

// Animation variants for the main container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  },
};

// Animation variants for the children (TOC and Content Panel)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const CurriculumChapterBook = () => {
  const [activeWeek, setActiveWeek] = useState(curriculum[0].week);

  const activeItem = curriculum.find(item => item.week === activeWeek);

  return (
    <section id="curriculum" className="relative py-20">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold font-display text-center mb-16 tracking-wide"
      >
        The 6-Week Journey
      </motion.h2>

      <motion.div 
        className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Panel: Table of Contents */}
        <motion.div variants={itemVariants} className="md:w-1/3">
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white/90 mb-4 px-2">Table of Contents</h3>
            <div className="flex flex-col gap-2">
              {curriculum.map((item) => (
                <motion.button
                  key={item.week}
                  onClick={() => setActiveWeek(item.week)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    activeWeek === item.week 
                      ? 'bg-primary/30 border border-primary/50 text-white' 
                      : 'text-muted-foreground hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <p className="font-bold tracking-wider text-sm opacity-80">WEEK {item.week}</p>
                  <p className="font-semibold text-lg">{item.title}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Panel: Content Page */}
        <motion.div variants={itemVariants} className="md:w-2/3">
          {/* AnimatePresence handles the transition between different content items */}
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.week} // The key is crucial for AnimatePresence
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full"
              >
                <KineticGlassPanel tiltEnable={true} className="h-full w-full">
                  <div className="flex flex-col items-center text-center p-8 lg:p-12">
                    <div className="text-5xl lg:text-6xl text-primary mb-5">{activeItem.icon}</div>
                    <p className="font-bold text-primary/80 font-display tracking-wider">WEEK {activeItem.week}</p>
                    <h4 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">{activeItem.title}</h4>
                    <p className="text-base text-muted-foreground mt-4 max-w-md">
                      {activeItem.description}
                    </p>
                    <p className="text-sm text-foreground mt-8 bg-muted/50 px-4 py-2 rounded-full font-medium">
                      Project: <span className="font-bold">{activeItem.project}</span>
                    </p>
                  </div>
                </KineticGlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CurriculumChapterBook;