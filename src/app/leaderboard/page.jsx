'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaTrophy, FaUsers, FaArrowRight } from 'react-icons/fa';

import { KineticGlassPanel } from '@/components/KineticGlassPanel';
import { AnimatedTitle, AnimatedSubtitle, useSmoothScroll } from '@/components/shared'; 

const LeaderboardCard = ({ icon, title, description, href, ctaText, isComingSoon }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };
    
    const cardContent = (
        <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="h-full"
        >
            <KineticGlassPanel className="h-full flex flex-col p-8 rounded-2xl">
                <div className="flex-shrink-0 text-primary mb-4">{icon}</div>
                <h3 className="text-2xl font-bold font-display text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="group-hover:text-white transition-colors duration-300 font-semibold flex items-center gap-2">
                        {ctaText}
                        {!isComingSoon && <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
                    </span>
                    {isComingSoon && (
                        <span className="text-xs font-bold uppercase tracking-widest bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                            Soon
                        </span>
                    )}
                </div>
            </KineticGlassPanel>
        </motion.div>
    );

    if (isComingSoon) {
        return <div className="group cursor-not-allowed">{cardContent}</div>;
    }

    return (
        <Link href={href} className="group block">
            {cardContent}
        </Link>
    );
};

export default function LeaderboardHubPage() {
    useSmoothScroll();

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 1.5 } },
    };

    return (
        <div className="min-h-screen overflow-x-hidden antialiased text-gray-200">
            
            <main className="container mx-auto px-4 py-24 sm:py-32 space-y-24 sm:space-y-32 relative z-10">

                <section className="text-center flex flex-col items-center">
                    <AnimatedTitle title="Our Leaderboards" />
                    <AnimatedSubtitle text="Track progress, celebrate achievements, and see who stands at the pinnacle of innovation within the Young Devs community." />
                </section>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
                >
                    <LeaderboardCard
                        icon={<FaTrophy size={40} />}
                        title="Hall of Fame"
                        description="A showcase of the all-time greatest capstone projects. These are the innovators who set the benchmark for excellence."
                        href="/leaderboard/hall-of-fame"
                        ctaText="View Legends"
                    />
                    <LeaderboardCard
                        icon={<FaUsers size={40} />}
                        title="Current Cohort"
                        description="Track the real-time progress of our current batch of developers as they tackle challenges and build their projects."
                        href="#"
                        ctaText="View Rankings"
                        isComingSoon={true}
                    />
                </motion.div>
            </main>
        </div>
    );
}
