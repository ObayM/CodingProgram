'use client';
import { KineticGlassPanel } from '@/components/KineticGlassPanel';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { clsx } from 'clsx';

const faqItems = [
  {
    question: "Who is this program for?",
    answer: "YoungDevs is for teens (13–18) who’ve learned a bit of coding, maybe from YouTube, school, or a course — but want to go from 'I kind of know how to code' to 'I can actually build stuff on my own.' but don't worry even if you have no coding experience, we will help you get started."
  },
  {
    question: "What do I need to join?",
    answer: "Just a laptop, internet, and a basic understanding of how coding works (like what a variable or function is). If you've used Python, HTML/CSS, or JavaScript even once or twice — you're good. We’ll help you fill in the gaps, but beginners are welcome too."
  },
  {
    question: "How much time does it take each week?",
    answer: "Around 10–12 hours a week if you're focused. There’s one live session, one optional workshop, one project to build, and mentor check-ins. Some people go all-in and spend more, but if you show up and ship every week, that’s enough."
  },
  {
    question: "What happens if I fall behind?",
    answer: "We get it — life happens. You can miss a session and catch up with recordings. But if you skip 2 weeks without shipping a project, you’ll be removed from the cohort. This keeps things real and fair for everyone putting in the work."
  },
  {
    question: "Do I get to choose what I build?",
    answer: "Yep. Each week, we give you a problem to solve, and sometimes constraints (like 'use an API' or 'store user data'). But you decide how you solve it. don't worry, we’ll help you brainstorm ideas and guide you through the process."
  },
  {
    question: "How are projects reviewed?",
    answer: "You submit your project every Thrusday. Mentors and peers give feedback the next day, what’s good, what can improve, what could make it stand out more."
  },
  {
    question: "Is this free?",
    answer: "Yep, YoungDevs is completely free. We want to make sure anyone who’s serious about building can join, no matter their background."
  },
  {
    question: "Can I use AI tools during the program?",
    answer: "Yes, but not to write full projects for you. Use it like a co-pilot: ask it for help, suggestions, or explanations. But if you submit code you clearly didn’t understand or change, you’ll be asked to re-do it. This is about learning, not cheating."
  },
  {
    question: "What will I walk away with?",
    answer: "By the end, you’ll have 5 shipped projects, a final capstone, a public GitHub with real code, and a solid dev identity. You'll know how to take an idea, plan it, build it, and launch it in a week. That’s rare."
  },
  {
    question: "Can I join if I’m outside the Middle East?",
    answer: "Not yet, but we’re working on expanding. For now, we’re focused on the Middle East to build a strong local community. If you’re outside this region, stay tuned for future cohorts!"}
];


const AccordionItem = ({ item, isOpen, onClick }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left py-6 px-2"
    >
      <span className="text-lg font-medium text-foreground">{item.question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaChevronDown className={clsx("text-primary transition-colors", { "text-primary": isOpen })} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="pb-6 px-2 text-muted-foreground leading-relaxed">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const AccordionFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto">
       <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold font-display text-center mb-16 tracking-wide"
      >
        Frequently Asked Questions
      </motion.h2>
      <KineticGlassPanel tiltEnable={false}>
        <div className="p-4">
            {faqItems.map((item, index) => (
                <AccordionItem 
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
      </KineticGlassPanel>
    </section>
  );
};