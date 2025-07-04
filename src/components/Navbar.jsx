import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

const FloatingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: 'overview', label: 'Overview' },
    { to: 'features', label: 'Features' },
    { to: 'curriculum', label: 'Curriculum' },
    { to: 'contact', label: 'Contact' },
  ];

  // --- Animation Variants ---

  // For the main floating navbar container
  const navContainerVariants = {
    hidden: { y: -100, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100, delay: 0.3 } 
    },
  };

  // For the mobile menu overlay
  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  
  // For the mobile menu links container (stagger effect)
  const mobileLinkContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  // For individual mobile menu links
  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* --- Desktop & Mobile Navbar --- */}
      {/* This outer div positions the floating navbar */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20"
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <FaCode className="text-3xl text-cyan-400" />
                <span className="hidden sm:block text-xl font-bold text-slate-100">Young Devs</span>
              </motion.div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-100} // Adjust offset for floating nav
                  duration={500}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer relative group"
                  activeClass="text-cyan-400 font-bold"
                >
                  {link.label}
                  <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
                </Link>
              ))}
            </div>

            {/* Desktop & Mobile CTA / Menu Button */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 211, 238, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full transition-shadow duration-300"
                >
                  Apply Now
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={toggleMenu} className="text-slate-100 z-50 p-2">
                    {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-xl"
            onClick={closeMenu} // Close menu when clicking the overlay
          >
            <motion.div
              variants={mobileLinkContainerVariants}
              initial="hidden"
              animate="visible"
              className="h-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.to} variants={mobileLinkVariants}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="text-slate-200 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer text-2xl"
                    activeClass="text-cyan-400 font-bold"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileLinkVariants}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 211, 238, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-10 py-4 rounded-full mt-6 text-lg"
                  onClick={closeMenu}
                >
                  Apply Now
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavbar;