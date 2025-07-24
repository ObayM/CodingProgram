'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KineticGlassPanel } from './KineticGlassPanel'; 
import curriculumData from '@/utils/CurriculumData.json';

import { 
  FaRocket, FaLightbulb, FaProjectDiagram, FaTools, FaCloudSun, FaTrophy,
  FaReact, FaCogs, FaPaperclip, FaRoute, FaStore, FaChartBar,
  FaServer, FaDatabase, FaPlug, FaUserShield, FaVial, FaCloudUploadAlt
} from 'react-icons/fa';

const iconMap = {
  FaRocket: <FaRocket />, FaLightbulb: <FaLightbulb />, FaProjectDiagram: <FaProjectDiagram />,
  FaTools: <FaTools />, FaCloudSun: <FaCloudSun />, FaTrophy: <FaTrophy />,
  FaReact: <FaReact />, FaCogs: <FaCogs />, FaPaperclip: <FaPaperclip />, FaRoute: <FaRoute />,
  FaStore: <FaStore />, FaChartBar: <FaChartBar />, FaServer: <FaServer />,
  FaDatabase: <FaDatabase />, FaPlug: <FaPlug />, FaUserShield: <FaUserShield />,
  FaVial: <FaVial />, FaCloudUploadAlt: <FaCloudUploadAlt />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const CurriculumSection = () => {
  const [activeTrackId, setActiveTrackId] = useState(curriculumData.tracks[0].id);
  
  const activeTrack = curriculumData.tracks.find(t => t.id === activeTrackId);
  const [activeModuleId, setActiveModuleId] = useState(activeTrack.modules[0].id);

  const activeModule = activeTrack?.modules.find(m => m.id === activeModuleId);

  const handleTrackChange = (trackId) => {
    setActiveTrackId(trackId);
    const newTrack = curriculumData.tracks.find(t => t.id === trackId);
    if (newTrack && newTrack.modules.length > 0) {
      setActiveModuleId(newTrack.modules[0].id);
    }
  };

  return (
    <section id="curriculum" className="py-20 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-4 tracking-tight"
        >
          Explore Our Curriculum
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-16"
        >
          {activeTrack.description}
        </motion.p>
        
        <div className="flex justify-center mb-12">
          <div className="relative flex items-center gap-2 p-1 rounded-full bg-black/30 border border-white/10">
            {curriculumData.tracks.map(track => (
              <button
                key={track.id}
                onClick={() => handleTrackChange(track.id)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-full z-10 transition-colors duration-300 ${
                  activeTrackId === track.id ? 'text-gray-900' : 'text-gray-300 hover:text-white'
                }`}
              >
                {track.name}
                {activeTrackId === track.id && (
                  <motion.div
                    layoutId="active-track-indicator"
                    className="absolute inset-0 bg-primary rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          className="flex flex-col md:flex-row gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="md:w-1/3">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 h-full">
              <h3 className="text-lg font-bold text-white/90 mb-4 px-2">Track Modules</h3>
              <div className="flex flex-col gap-2">
                {activeTrack?.modules.map((module) => (
                  <motion.button
                    key={module.id}
                    onClick={() => setActiveModuleId(module.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      activeModuleId === module.id 
                        ? 'bg-primary/30 border border-primary/50 text-white' 
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <p className="font-bold tracking-wider text-xs opacity-80">MODULE {module.id}</p>
                    <p className="font-semibold text-base">{module.title}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:w-2/3">
            <AnimatePresence mode="wait">
              {activeModule && (
<motion.div
  key={activeTrack.id + activeModule.id}
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -30 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  className="h-full"
>
  <KineticGlassPanel tiltEnable={true} className="h-full w-full">
    <div className="flex flex-col items-center text-center p-8 lg:p-12 h-full justify-center">
      <div className="text-5xl lg:text-6xl text-primary mb-5">{iconMap[activeModule.icon]}</div>
      <p className="font-bold text-primary/80 font-display tracking-wider">MODULE {activeModule.id}</p>
      <h4 className="text-3xl lg:text-4xl font-bold mt-2">{activeModule.title}</h4>
      <p className="text-base text-gray-300 mt-4 max-w-md">
        {activeModule.description}
      </p>
      <p className="text-sm text-white mt-8 bg-black/30 px-4 py-2 rounded-full font-medium border border-white/10">
        Project: <span className="font-bold">{activeModule.project}</span>
      </p>
    </div>
  </KineticGlassPanel>
</motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};