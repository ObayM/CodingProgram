'use client';

import { motion } from 'framer-motion';
import { KineticGlassPanel } from './KineticGlassPanel';
import { 
  FaHammer, FaChalkboardTeacher, FaUsers, FaTrophy, FaGamepad, FaQuestionCircle, FaCertificate 
} from 'react-icons/fa';

const features = [
  {
    icon: <FaHammer />,
    title: "Project-Based Forging",
    description: "You won't just learn theory. You'll build impactful, real-world projects from day one, solidifying concepts through creation."
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Dynamic, Interactive Sessions",
    description: "Engage in deep discussions, see real-world examples, and get your hands dirty with guided project implementation in every session."
  },
  {
    icon: <FaUsers />,
    title: "Elite Mentor Support",
    description: "Receive dedicated, personalized feedback and guidance from your instructor to overcome challenges and accelerate your growth."
  },
  {
    icon: <FaGamepad />,
    title: "Gamified Ascendance",
    description: "Thrive in a competitive yet supportive environment with weekly leaderboards and interactive quizzes that celebrate top performers."
  },
  {
    icon: <FaTrophy />,
    title: "Capstone Presentation",
    description: "Culminate your journey by building and presenting a final capstone project that showcases your newfound expertise."
  },
  {
    icon: <FaCertificate />,
    title: "Official Certification",
    description: "Graduate with an official Young Devs certificate, a powerful testament to your skills and dedication."
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
        The Blueprint for Brilliance
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

