'use client';

import React, {useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import Lenis from 'lenis';
import { FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import { ProgramFeatures} from '@/components/ProgramFeatures';
import { AccordionFAQ } from '@/components/AccordionFAQ';
import { KineticGlassPanel } from '@/components/KineticGlassPanel';
import {CurriculumSection}  from '@/components/Curriculum';
import MentorsSection from '@/components/MentorsSection';
import Link from 'next/link';

const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08, 
            smoothWheel: true,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
};

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
      ease: [0.33, 1, 0.68, 1],
      duration: 0.8
    }
  }
};

const AnimatedTitle = ({ title, highlightedWords = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  const regex = new RegExp(`(${highlightedWords.join('|')})`, 'g');
  const parts = title.split(regex).filter(Boolean);

  const characters = parts.reduce((acc, part) => {
    const isHighlighted = highlightedWords.includes(part);
    const chars = part.split('').map(char => ({ char, isHighlighted }));
    return [...acc, ...chars];
  }, []);

  return (
    <motion.h1
      ref={ref}
      aria-label={title}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={titleContainerVariants}
      className="
        relative text-4xl sm:text-7xl md:text-8xl font-black font-display
        bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400
        tracking-tighter shimmer-effect rounded-2xl p-1
      "
    >
      {characters.map(({ char, isHighlighted }, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className={`inline-block ${
            isHighlighted 
            ? 'text-primary drop-shadow-[0_0_8px_theme(colors.primary)]' 
            : ''
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 } 
  },
};

const subtitleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.8, 
    },
  },
};

const AnimatedSubtitle = ({ text }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const words = text.split(" ");
  
    return (
      <motion.p
        ref={ref}
        variants={subtitleContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-6 text-lg sm:text-xl max-w-3xl text-muted-foreground"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.4em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    );
};


const IconListItem = ({ children }) => (
    <motion.li 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex items-start gap-3"
    >
        <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
        <span>{children}</span>
    </motion.li>
);

export default function HomePage() {
    useSmoothScroll();

    return (
        <div className="min-h-screen overflow-x-hidden antialiased">
            
            <main className="container mx-auto px-4 py-24 sm:py-32 space-y-36 sm:space-y-48 relative z-10">
                
                <section className="text-center flex flex-col items-center min-h-[60vh] justify-center">
                    
                    <AnimatedTitle title="Build Cool Stuff" highlightedWords={['Cool']} />
                    <AnimatedTitle title="Solve Real Problems" highlightedWords={['Problems']} />
                    
                    <AnimatedSubtitle 
                      text="A 6-week odyssey for ambitious young minds. We don't just teach. We transform you into a creator, a problem-solver, an innovator." 
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                      <button className="group relative inline-flex h-12 w-48 items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-3 text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
                          <span className="z-10"><Link href="/apply">Apply Now</Link></span>
                          <div className="absolute inset-0 h-full w-full -translate-x-full transform bg-white/20 transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
                      </button>
                      <button className="group relative inline-flex h-12 w-48 items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-transparent px-8 py-3 text-lg font-bold text-gray-200 transition-all duration-300 hover:border-white hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-background">
                         <a href='#features'> Know More </a>
                      </button>
                    </motion.div>
                </section>
                
                <KineticGlassPanel className="max-w-5xl mx-auto">
                    <div  id="overview"  className="flex flex-col md:flex-row items-center gap-10">
                        <FaGraduationCap className="text-8xl text-primary flex-shrink-0"/>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-3">More Than a Bootcamp. A Foundry.</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              Young Devs is a 6-week accelerator designed to teach coding for the next generation of tech innovators. We don&apos;t just teach you to code, we cultivate the mindset, skills, and confidence to solve any complex problem.
                            </p>
                        </div>
                    </div>
                </KineticGlassPanel>

                <ProgramFeatures />
                <CurriculumSection />
                {/* <MentorsSection /> //removed for now because of mock data */}

                <KineticGlassPanel id="why" className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 p-4">
                        <div>
                            <h3 className="text-3xl font-bold font-display text-foreground mb-6">What Makes Us Unique?</h3>
                            <ul className="space-y-4 text-lg text-muted-foreground">
                                <IconListItem>Designed specifically for ambitious under-18 learners.</IconListItem>
                                <IconListItem>Hands-on from day one—no boring, passive lectures.</IconListItem>
                                <IconListItem>Fosters confidence and creative problem-solving, not just coding.</IconListItem>
                                <IconListItem>An elite yet collaborative and inspiring community.</IconListItem>
                                <IconListItem>Every student graduates with a portfolio-worthy capstone project.</IconListItem>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold font-display text-foreground mb-6">Tangible Outcomes</h3>
                            <ul className="space-y-4 text-lg text-muted-foreground">
                                <IconListItem>Build a portfolio of 4+ projects and 1 major capstone.</IconListItem>
                                <IconListItem>Gain the ability to deconstruct and solve real-world problems with code.</IconListItem>
                                <IconListItem>Be prepared to accelerate into advanced coding paths.</IconListItem>
                                <IconListItem>Receive the official Young Devs Certificate of Achievement.</IconListItem>
                            </ul>
                        </div>
                    </div>
                </KineticGlassPanel>

                <AccordionFAQ />

            </main>
        </div>
    );
}

