'use client';
import { KineticGlassPanel } from '@/components/KineticGlassPanel';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { clsx } from 'clsx';

const faqItems = [
  {
    question: "Who is this program for?",
    answer: "Young Devs is designed for ambitious learners aged 13-18 who are passionate about technology and problem-solving. It's for beginners with a strong drive and for those with some experience who want to solidify their fundamental skills."
  },
  {
    question: "Do I need any prior coding experience?",
    answer: "No prior experience is required. We start from the absolute fundamentals. All you need is a curious mind, a willingness to be challenged, and a commitment to the 6-week program."
  },
  {
    question: "What technology will we be using?",
    answer: "The core curriculum is built around Python, a versatile and powerful language used by companies like Google, Netflix, and NASA. This provides a strong foundation applicable to any area of software development."
  },
  {
    question: "What is the time commitment per week?",
    answer: "Expect to commit around 5-7 hours per week. This includes live interactive sessions, hands-on project work, and engaging with the community. The more you put in, the more you'll get out."
  },
  {
    question: "What happens after I graduate?",
    answer: "You'll leave with a portfolio of projects, a formal certification, and the problem-solving confidence to tackle more advanced topics like web development, data science, or AI. You'll also be part of the exclusive Young Devs alumni network."
  }
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
        Clearing the Nebula
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