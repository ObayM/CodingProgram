'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { FaTrophy, FaGithub } from 'react-icons/fa';
import { KineticGlassPanel } from '@/components/KineticGlassPanel';
import { AnimatedTitle, AnimatedSubtitle, useSmoothScroll } from '@/components/shared';


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

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('/api/leaderboard');
                if (!response.ok) {
                    const mockData = [
                        { rank: 1, avatar: '/images/avatars/avatar1.png', name: 'Alex Johnson', project: 'AI-Powered Code Reviewer', score: 98, github: '#' },
                        { rank: 2, avatar: '/images/avatars/avatar2.png', name: 'Maria Garcia', project: 'Decentralized Social Network', score: 95, github: '#' },
                        { rank: 3, avatar: '/images/avatars/avatar3.png', name: 'Chen Wei', project: 'Real-time Data Visualization', score: 92, github: '#' },
                        { rank: 4, avatar: '/images/avatars/avatar4.png', name: 'Fatima Al-Sayed', project: 'E-commerce Recommendation Engine', score: 90, github: '#' },
                    ];
                    setLeaderboardData(mockData);
                    return;
                }
                const data = await response.json();
                setLeaderboardData(data);
            } catch (err) {
                 const mockData = [
                    { rank: 1, avatar: 'https://i.pravatar.cc/40?u=1', name: 'Alex Johnson', project: 'AI-Powered Code Reviewer', score: 98, github: '#' },
                    { rank: 2, avatar: 'https://i.pravatar.cc/40?u=2', name: 'Maria Garcia', project: 'Decentralized Social Network', score: 95, github: '#' },
                    { rank: 3, avatar: 'https://i.pravatar.cc/40?u=3', name: 'Chen Wei', project: 'Real-time Data Visualization', score: 92, github: '#' },
                    { rank: 4, avatar: 'https://i.pravatar.cc/40?u=4', name: 'Fatima Al-Sayed', project: 'E-commerce Recommendation Engine', score: 90, github: '#' },
                    { rank: 5, avatar: 'https://i.pravatar.cc/40?u=5', name: 'David Smith', project: 'IoT Home Automation Hub', score: 88, github: '#' },
                ];
                setLeaderboardData(mockData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

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
                        <div className="relative">
                            
                            <div className="blur-md select-none pointer-events-none">
                                <div className="grid grid-cols-12 items-center gap-4 px-4 py-2 mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wider border-b border-white/10">
                                    <div className="col-span-2 sm:col-span-1">#</div>
                                    <div className="col-span-6 sm:col-span-5">Student</div>
                                    <div className="hidden sm:block sm:col-span-4">Capstone Project</div>
                                    <div className="col-span-4 sm:col-span-2 text-right">Score</div>
                                </div>
                                
                                {isLoading && <div className="text-center py-8 text-gray-400">Loading Hall of Fame...</div>}
                                {error && <div className="text-center py-8 text-red-500">Error: {error}</div>}
                                {!isLoading && !error && (
                                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                                        {leaderboardData.map((entry, index) => (
                                            <LeaderboardRow key={entry.rank} entry={entry} index={index} />
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            <motion.div 
                                className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-lg bg-black/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <FaTrophy className="text-5xl text-primary mb-4 animate-pulse" />
                                <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg mb-2">
                                    Coming Soon!
                                </h3>
                                <p className="text-gray-300 max-w-xs">
                                Check back soon!
                                </p>
                            </motion.div>

                        </div>
                    </KineticGlassPanel>
                </motion.div>
            </main>
        </div>
    );
}