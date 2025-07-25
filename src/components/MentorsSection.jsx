import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

import { KineticGlassPanel } from './KineticGlassPanel';

const SocialIcon = ({ href, ariaLabel, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="hover:text-primary transition-colors duration-200">
        {children}
    </a>
);



const MentorCard = ({ mentor }) => {
    return (
        <KineticGlassPanel className="flex h-full flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">

            <img 
                src={mentor.image} 
                alt={`Portrait of ${mentor.name}`}
                className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-primary/50 shadow-lg"
            />
            <h4 className="text-xl font-bold text-foreground font-display">{mentor.name}</h4>
            <p className="text-primary font-semibold mb-3">{mentor.title}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{mentor.bio}</p>
            <div className="flex items-center space-x-4 text-gray-400 mt-auto pt-4">
                {mentor.socials.linkedin && (
                    <SocialIcon href={mentor.socials.linkedin} ariaLabel={`${mentor.name}'s LinkedIn Profile`}>
                        <FaLinkedin size={22} />
                    </SocialIcon>
                )}
                {mentor.socials.github && (
                    <SocialIcon href={mentor.socials.github} ariaLabel={`${mentor.name}'s GitHub Profile`}>
                        <FaGithub size={22} />
                    </SocialIcon>
                )}
                {mentor.socials.twitter && (
                    <SocialIcon href={mentor.socials.twitter} ariaLabel={`${mentor.name}'s Twitter Profile`}>
                        <FaTwitter size={22} />
                    </SocialIcon>
                )}
            </div>
        </KineticGlassPanel>
    );
};


const MentorsSection = () => {
    const mentors = [
        {
            id: 1,
            name: 'Alex Chen',
            title: 'Lead Instructor & AI Specialist',
            bio: 'A former senior engineer at Google, Arch is passionate about demystifying complex AI concepts for the next generation of builders.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            socials: { linkedin: '#', github: '#', twitter: '#' }
        },
        {
            id: 2,
            name: 'Jasmine  Kaur',
            title: 'Full-Stack & DevOps Mentor',
            bio: 'Jasmine architected scalable systems for startups and now forges resilient, full-stack developers ready for any challenge.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            socials: { linkedin: '#', github: '#', twitter: '#' }
        },
        {
            id: 3,
            name: 'Leo  Martinez',
            title: 'Security & Web3 Advisor',
            bio: "With a background in ethical hacking, Leo ensures our devs understand how to build secure, future-proof applications.",
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            socials: { linkedin: '#', github: '#' }
        },
        {
            id: 4,
            name: 'Sarah Lee',
            title: 'Lead UX/UI Design Mentor',
            bio: 'An award-winning designer, Sarah champions user-centric principles to help developers build products people love to use.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            socials: { linkedin: '#', twitter: '#' }
        },
        {
            id: 5,
            name: 'David Kim',
            title: 'Data Science & ML Mentor',
            bio: 'David transforms data into insight. He guides students in harnessing machine learning to build intelligent, data-driven applications.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            socials: { linkedin: '#', github: '#' }
        },
        {
            id: 6,
            name: 'Maria Rodriguez',
            title: 'Product & Project Management',
            bio: 'A certified Scrum Master, Maria teaches the art of shipping products effectively, from ideation to launch and iteration.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            socials: { linkedin: '#', twitter: '#' }
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    return (
        <section id="mentors" className="py-20 sm:py-28 text-center">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-4"
                >
                    Meet Our Mentors
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16"
                >
                    Our mentors aren't just teachers; they are active architects of the digital world, dedicated to shaping you into a formidable technologist.
                </motion.p>
                
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {mentors.map(mentor => (
                            <MentorCard key={mentor.id} mentor={mentor} />
                        ))}
                    </motion.div>
            </div>
        </section>
    );
};

export default MentorsSection;