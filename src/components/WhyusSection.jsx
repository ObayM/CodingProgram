'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; 

import { FaCheckCircle, FaLightbulb } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const uniqueFeatures = [
    { text: "Designed for the ambitious under-18 innovator." },
    { text: "Hands-on from day one. No boring theory." },
    { text: "Fosters confidence and creative problem-solving." },
    { text: "Join an elite, collaborative & inspiring community." },
    { text: "Graduate with a portfolio-worthy capstone project." },
];

export const WhyUsSection = () => {
    const mainRef = useRef(null);
    const cardsRef = useRef([]);
    cardsRef.current = []; 

    useGSAP(() => {
        const cards = cardsRef.current;
        
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current, 
                pin: true,
                scrub: 1,        
                start: "top top",  
                end: "+=4000",
                markers: false,
            }
        });

        timeline.to(".gsap-title", {
            y: 20,
            duration: 0.4
        });

        cards.forEach((card, index) => {
            // if (index === cards.length - 1) return; 

            const animDuration = 1;
            const opacityStartProgress = 0.7;

            const opacityStartTimeOffset = animDuration * opacityStartProgress;
            const opacityDuration = animDuration * (1 - opacityStartProgress);

            timeline
                .to(
                    card, 
                    {
                        yPercent: -25,
                        scale: 1.5,
                        duration: animDuration,
                        ease: "power1.inOut"
                    },
                    "<+0.5" 
                )
                .to(
                    card, 
                    {
                        opacity: 0,
                        duration: opacityDuration, 
                        ease: "power1.in"
                    },
                    `<+${opacityStartTimeOffset}`
                );
        });

    }, { scope: mainRef });

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <div ref={mainRef} className="relative">
            <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <FaLightbulb className="text-[25rem] text-primary/5" />
                    <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent to-70% rounded-full"></div>
                </div>

                <div className="gsap-title relative z-10 flex flex-col items-center text-center mb-16">
                    <h2 className="font-display text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
                        What Makes Us Unique?
                    </h2>
                    <p className="mt-4 max-w-md text-lg text-gray-400">
                        Scroll to see what makes our program a launchpad for innovators.
                    </p>
                </div>
                
                <div className="relative w-4/6 h-102">
                    {uniqueFeatures.map((feature, i) => (
                        <div
                            key={i}
                            ref={addToRefs} 
                            className="absolute top-0 left-0 w-full h-full p-8 flex items-center
                                     bg-blue-200/10 backdrop-blur-2xl rounded-3xl border-white/10
                                      shadow-2xl shadow-primary/10"
                            style={{
                                transform: `translateY(${i * 15}px) scale(${1 - (i * 0.04)})`,
                                zIndex: (uniqueFeatures.length - i)+10,

                            }}
                        >
                            <p className="text-5xl font-bold text-center text-stone-300 leading-snug">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

