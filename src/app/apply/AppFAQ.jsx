'use client';
import { KineticGlassPanel } from '@/components/KineticGlassPanel';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { clsx } from 'clsx';

const applicationFaqs = [
        {
            question: "Is there an application fee?",
            answer: "No, applying to Young Devs is completely free. We believe that opportunity should be accessible to everyone."
        },
        {
            question: "When will I hear back about my application?",
            answer: "We review applications on a rolling basis. You can typically expect a response within 7-10 business days after submission."
        },
        {
            question: "What are you looking for in an applicant?",
            answer: "We look for passion, curiosity, and a drive to create. While prior coding experience is a plus, a strong desire to learn and a history of tackling challenges are what truly matter to us."
        },
        {
            question: "Do I need my own project ideas to apply?",
            answer: "Not at all! We encourage you to bring your own ideas, but our curriculum is designed to help you discover and develop projects you're passionate about, even if you're starting with a blank slate."
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




export const AppFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto">
       <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold font-display text-center mb-16 tracking-wide"
      >
      Application FAQs
      </motion.h2>
      <KineticGlassPanel tiltEnable={false}>
        <div className="p-4">
            {applicationFaqs.map((item, index) => (
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