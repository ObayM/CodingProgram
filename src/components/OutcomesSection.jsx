'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket } from 'react-icons/fa';

const tangibleOutcomes = [
    { text: "Build a portfolio of 4+ projects & 1 major capstone." },
    { text: "Deconstruct and solve real-world problems with code." },
    { text: "Accelerate into advanced computer science paths." },
    { text: "Earn the official Young Devs Certificate of Achievement." },
];

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const gridItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -45 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 15,
            duration: 0.5,
        },
    },
};

export const OutcomesSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">

            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="relative">
                    <FaRocket className="text-[25rem] text-primary/5 -rotate-12" />
                    <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent to-70% rounded-full"></div>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-16 font-display text-4xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400"
                >
                Outcomes
                </motion.h2>

                <motion.div
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
                    style={{ perspective: 1000 }}
                >
                    {tangibleOutcomes.map((outcome, i) => (
                        <motion.div
                            key={i}
                            variants={gridItemVariants}
                            className="group relative p-8 bg-gray-900/40 backdrop-blur-lg rounded-2xl 
                                       border border-white/10 shadow-lg overflow-hidden"
                        >

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                            bg-gradient-to-br from-primary via-transparent to-primary
                                            blur-[3px]"></div>
                            <div className="absolute inset-px bg-gray-900/60 rounded-xl"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <FaCheckCircle className="text-3xl text-primary mb-4" />
                                <p className="text-xl font-semibold text-gray-200 flex-grow">
                                    {outcome.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

