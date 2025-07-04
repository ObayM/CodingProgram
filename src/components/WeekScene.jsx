'use client';

import { motion, useTransform } from 'framer-motion';

export const WeekScene = ({ item, index, totalScenes, scrollYProgress }) => {
  // Calculate the scroll range for this specific scene.
  // Each scene gets an equal fraction of the total scroll progress.
  const sceneFraction = 1 / totalScenes;
  const sceneStart = index * sceneFraction;
  const sceneEnd = sceneStart + sceneFraction;

  // Define key points within the scene's scroll range for animation.
  // We'll have it fade in for the first 20%, hold, and fade out for the last 20%.
  const fadeInPoint = sceneStart + sceneFraction * 0.2;
  const fadeOutPoint = sceneEnd - sceneFraction * 0.2;

  // Use `useTransform` to map the scroll progress to style properties.
  const opacity = useTransform(
    scrollYProgress,
    // Input range: [start, fadeIn, fadeOut, end]
    [sceneStart, fadeInPoint, fadeOutPoint, sceneEnd],
    // Output range: [0 (invisible), 1 (fully visible), 1, 0]
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [sceneStart, fadeInPoint, fadeOutPoint, sceneEnd],
    [0.85, 1, 1, 0.85]
  );

  const y = useTransform(
    scrollYProgress,
    [sceneStart, fadeInPoint, fadeOutPoint, sceneEnd],
    ['40px', '0px', '0px', '-40px']
  );

  return (
    // This div is positioned absolutely to stack on top of other scenes.
    // Its visibility is controlled entirely by the transformed opacity.
    <motion.div 
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
    >
      <div className="text-5xl text-primary mb-5">{item.icon}</div>
      <p className="font-bold text-primary/80 font-display tracking-wider">WEEK {item.week}</p>
      <h4 className="text-3xl sm:text-4xl font-bold text-white mt-1">{item.title}</h4>
      <p className="text-md text-muted-foreground mt-4 bg-white/10 px-4 py-2 rounded-full">
        Project: {item.project}
      </p>
    </motion.div>
  );
};