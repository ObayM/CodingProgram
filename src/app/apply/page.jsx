// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { motion, useInView } from "framer-motion";
// import Lenis from 'lenis';
// import { 
//     FaUser, FaEnvelope, FaBirthdayCake, FaGlobe, FaCode, 
//     FaLightbulb, FaGithub, FaPaperPlane, FaHourglassStart, 
//     FaComments, FaAward 
// } from 'react-icons/fa';
// import { AnimatedSubtitle, useSmoothScroll, AnimatedTitle } from '@/components/shared';
// import { AppFAQ } from './AppFAQ';

// const formFieldVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
// };

// const KineticGlassPanel = ({ children, className, ...props }) => (
//     <div {...props} className={`bg-black/20 border border-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-lg ${className}`}>
//         {children}
//     </div>
// );


// const FormField = ({ id, label, type = "text", icon, value, onChange, placeholder, isTextArea = false, rows = 4 }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });
  
//   const InputComponent = isTextArea ? 'textarea' : 'input';

//   return (
//     <motion.div
//       ref={ref}
//       variants={formFieldVariants}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//     >
//       <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-2 ml-1">
//         {label}
//       </label>
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
//           {icon}
//         </div>
//         <InputComponent
//           id={id}
//           name={id}
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           rows={isTextArea ? rows : undefined}
//           required
//           className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 backdrop-blur-sm"
//         />
//       </div>
//     </motion.div>
//   );
// };

// const ProcessStep = ({ icon, title, description, delay, isLast = false }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true, amount: 0.5 });
    
//     return (
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0, x: -50 }}
//         animate={isInView ? { opacity: 1, x: 0 } : {}}
//         transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
//         className="relative pl-20"
//       >
//         <div className="absolute left-0 top-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/50 text-primary">
//           {icon}
//         </div>
//         {!isLast && (
//           <div className="absolute left-8 top-16 bottom-[-3rem] w-0.5 bg-gradient-to-b from-primary/50 to-primary/10"></div>
//         )}
//         <h4 className="font-bold text-xl text-foreground mb-1 pt-4">{title}</h4>
//         <p className="text-muted-foreground">{description}</p>
//       </motion.div>
//     );
//   };



// export default function ApplicationPage() {
//     useSmoothScroll();

//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         age: '',
//         country: '',
//         whyJoin: '',
//         experience: '',
//         github: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Application Submitted:", formData);
//         alert("Thank you for your application! We've received it and will be in touch soon.");
//     };

   

//     return (
//         <div className="min-h-screen overflow-x-hidden antialiased">
//             <main className="container mx-auto px-4 py-24 sm:py-32 space-y-36 sm:space-y-48 relative z-10">
                
//                 <section className="text-center flex flex-col items-center">
//                     <AnimatedTitle title="Your Journey Starts Now" highlightedWords={['Journey']} />
//                     <AnimatedSubtitle text="This is your first step towards becoming a tech innovator. Fill out the application below to join a cohort of passionate builders and problem-solvers." />
//                 </section>
                
//                 <KineticGlassPanel className="max-w-4xl mx-auto p-6 sm:p-10">
//                     <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-10 text-center">
//                         Application Form
//                     </h2>
//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         <div className="grid md:grid-cols-2 gap-8">
//                             <FormField id="fullName" label="Full Name" icon={<FaUser />} value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
//                             <FormField id="email" label="Email Address" type="email" icon={<FaEnvelope />} value={formData.email} onChange={handleChange} placeholder="you@example.com" />
//                             <FormField id="age" label="Age" type="number" icon={<FaBirthdayCake />} value={formData.age} onChange={handleChange} placeholder="16" />
//                             <FormField id="country" label="Country" icon={<FaGlobe />} value={formData.country} onChange={handleChange} placeholder="United States" />
//                         </div>
//                         <FormField id="whyJoin" label="Why do you want to join Young Devs?" isTextArea icon={<FaLightbulb />} value={formData.whyJoin} onChange={handleChange} placeholder="Tell us about your motivations and what you hope to achieve..." />
//                         <FormField id="experience" label="Describe your coding experience" isTextArea icon={<FaCode />} value={formData.experience} onChange={handleChange} placeholder="e.g., school classes, online tutorials, personal projects..." />
//                         <FormField id="github" label="GitHub or Portfolio Link (Optional)" icon={<FaGithub />} value={formData.github} onChange={handleChange} placeholder="github.com/your-username" />
                        
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.5, delay: 0.5 }}
//                             className="flex justify-center pt-6"
//                         >
//                             <button type="submit" className="group relative inline-flex h-14 w-60 items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-3 text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
//                                 <span className="z-10 mr-2">Submit</span>
//                                 <FaPaperPlane className="z-10 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45" />
//                                 <div className="absolute inset-0 h-full w-full -translate-x-full transform bg-white/20 transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
//                             </button>
//                         </motion.div>
//                     </form>
//                 </KineticGlassPanel>

//                 <section className="max-w-3xl mx-auto">
//                     <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-16 text-center">
//                         What Happens Next?
//                     </h2>
//                     <div className="space-y-12">
//                         <ProcessStep 
//                             icon={<FaHourglassStart size={28} />} 
//                             title="Step 1: Application Review"
//                             description="Our team will carefully review your application to understand your passion and potential. We read every single word."
//                             delay={0.1} 
//                         />
//                         <ProcessStep 
//                             icon={<FaComments size={28} />} 
//                             title="Step 2: Casual Interview"
//                             description="If your application stands out, we'll invite you for a short, informal chat to get to know you better. No trick questions, we promise!"
//                             delay={0.2} 
//                         />
//                         <ProcessStep 
//                             icon={<FaAward size={28} />} 
//                             title="Step 3: Admission Decision"
//                             description="You'll receive an official admission decision. If accepted, you'll be ready to start your journey with us!"
//                             delay={0.3} 
//                             isLast
//                         />
//                     </div>
//                 </section>
//                     <AppFAQ  />
//             </main>
//         </div>
//     );
// }

// Commetting this so it will be used instead of the fillout forms in the future cohorts

// This will now redirect to https://tweakly.fillout.com/t/svLpRA67hsus

import { redirect } from 'next/navigation';

export default async function redirectToFillout() {
    redirect('https://tweakly.fillout.com/t/svLpRA67hsus');
}
