'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';
import ParallaxTilt from 'react-parallax-tilt';

export const KineticGlassPanel = ({ children, className, tiltEnable = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'aurora-border relative bg-blue-200/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60 shadow-glass-inset',
        className
      )}
    >
      {children}
    </motion.div>
  );

  return tiltEnable ? (
    <ParallaxTilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="rgba(0, 0, 0, 0)"
      glarePosition="all"
      scale={1.02}
      transitionSpeed={3000}
      
    >
      {content}
    </ParallaxTilt>
  ) : (
    content
  );
};
