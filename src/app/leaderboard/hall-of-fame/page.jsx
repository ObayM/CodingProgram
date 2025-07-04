'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { FaTrophy, FaGithub } from 'react-icons/fa';

import { KineticGlassPanel } from '@/components/KineticGlassPanel';
import { AnimatedTitle, AnimatedSubtitle, useSmoothScroll } from '@/components/shared'; 

const leaderboardData = [
  { rank: 1, name: 'Alia Varma', avatar: 'https://avatar.vercel.sh/alia.png', project: 'QuantumLeap AI', score: 9850, github: '#' },
  { rank: 2, name: 'Ben Carter', avatar: 'https://avatar.vercel.sh/ben.png', project: 'Project Nebula', score: 9720, github: '#' },
  { rank: 3, name: 'Sophia Chen', avatar: 'https://avatar.vercel.sh/sophia.png', project: 'EchoStream', score: 9680, github: '#' },
  { rank: 4, name: 'Leo Rodriguez', avatar: 'https://avatar.vercel.sh/leo.png', project: 'DataWeave Analytics', score: 9540, github: '#' },
  { rank: 5, name: 'Mia Kim', avatar: 'https://avatar.vercel.sh/mia.png', project: 'Aether Platform', score: 9490, github: '#' },
  { rank: 6, name: 'David Singh', avatar: 'https://avatar.vercel.sh/david.png', project: 'BioSynth Modeler', score: 9310, github: '#' },
  { rank: 7, name: 'Chloe Nguyen', avatar: 'https://avatar.vercel.sh/chloe.png', project: 'SecurePass Protocol', score: 9250, github: '#' },
  { rank: 8, name: 'Ethan Wright', avatar: 'https://avatar.vercel.sh/ethan.png', project: 'Momentum OS', score: 9180, github: '#' },
];

const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400 glow-gold';
    if (rank === 2) return 'text-slate-300 glow-silver';
    if (rank === 3) return 'text-amber-600 glow-bronze';
    return 'text-gray-400';
};

const LeaderboardRow = ({ entry, index }) => {
    const rankColor = getRankColor(entry.rank);
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <motion.div variants={rowVariants}
            className={`grid grid-cols-12 items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${index > 0 ? 'border-t border-white/10' : ''}`}>
            <div className="col-span-2 sm:col-span-1 flex items-center justify-start gap-3">
                <span className={`text-xl sm:text-2xl font-bold ${rankColor}`}>{entry.rank}</span>
                {entry.rank <= 3 && <FaTrophy className={`hidden sm:inline-block ${rankColor}`} />}
            </div>
            <div className="col-span-6 sm:col-span-5 flex items-center gap-4">
                <Image src={entry.avatar} alt={entry.name} width={40} height={40} className="rounded-full border-2 border-white/20" />
                <span className="font-medium text-white truncate">{entry.name}</span>
            </div>
            <div className="hidden sm:block sm:col-span-4 text-gray-300 truncate">{entry.project}</div>
            <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-4 text-white font-mono">
                <span>{entry.score}</span>
                <a href={entry.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"><FaGithub size={20} /></a>
            </div>
        </motion.div>
    );
};

export default function HallOfFamePage() {
    useSmoothScroll();

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
    };

    return (
        <div className="min-h-screen overflow-x-hidden antialiased text-gray-200">

            <main className="container mx-auto px-4 py-24 sm:py-32 space-y-24 sm:space-y-32 relative z-10">

                <section className="text-center flex flex-col items-center">
                    <AnimatedTitle title="Hall of Fame" />
                    <AnimatedSubtitle text="Celebrating the exceptional projects and problem-solvers from our past cohorts. This is where legends are forged." />
                </section>

                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}>
                    <KineticGlassPanel className="max-w-5xl mx-auto p-4 sm:p-6">
                        <div className="grid grid-cols-12 items-center gap-4 px-4 py-2 mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wider border-b border-white/10">
                            <div className="col-span-2 sm:col-span-1">#</div>
                            <div className="col-span-6 sm:col-span-5">Student</div>
                            <div className="hidden sm:block sm:col-span-4">Capstone Project</div>
                            <div className="col-span-4 sm:col-span-2 text-right">Score</div>
                        </div>
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                            {leaderboardData.map((entry, index) => (
                                <LeaderboardRow key={entry.rank} entry={entry} index={index} />
                            ))}
                        </motion.div>
                    </KineticGlassPanel>
                </motion.div>
            </main>
        </div>
    );
}

