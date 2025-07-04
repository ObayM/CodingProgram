'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import Lenis from 'lenis';

export const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);
};

export const AnimatedTitle = ({ title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
  };
  const titleContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2, ease: [0.33, 1, 0.68, 1], duration: 0.8 } }
  };
  return (
    <motion.h1 ref={ref} aria-label={title} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={titleContainerVariants}
      className="relative text-6xl sm:text-7xl md:text-8xl font-black font-display bg-clip-text bg-gradient-to-b from-gray-50 to-gray-400 tracking-tighter shimmer-effect rounded-2xl p-1">
      {title.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export const AnimatedSubtitle = ({ text }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const words = text.split(" ");
    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };
    const subtitleContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } },
    };
    return (
      <motion.p ref={ref} variants={subtitleContainerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mt-6 text-lg sm:text-xl max-w-3xl text-muted-foreground">
        {words.map((word, index) => (
          <motion.span key={index} variants={wordVariants} className="inline-block mr-[0.4em]">
            {word}
          </motion.span>
        ))}
      </motion.p>
    );
};