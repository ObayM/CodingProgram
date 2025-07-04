'use client';

import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

// Data for footer links for easy management
const footerLinks = {
  platform: [
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Showcase', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
    { icon: <FaTwitter />, href: '#', name: 'Twitter' },
    { icon: <FaGithub />, href: '#', name: 'GitHub' },
    { icon: <FaLinkedin />, href: '#', name: 'LinkedIn' },
    { icon: <FaYoutube />, href: '#', name: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="relative bg-black/40 text-white pt-20 overflow-hidden">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <motion.div
          className="absolute bottom-0 left-[-50%] top-0 w-[200%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-black/0 to-black/0"
          animate={{
            transform: [
              'translateX(0%) translateY(0%) scale(1)',
              'translateX(10%) translateY(15%) scale(1.2)',
              'translateX(0%) translateY(0%) scale(1)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >


        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold font-display">Tweakly</h3>
            <p className="text-muted-foreground mt-2 text-sm">
A learning platform That understand you!
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-bold tracking-wider text-white/90">Platform</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-wider text-white/90">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-wider text-white/90">Legal</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map(link => <FooterLink key={link.name} href={link.href}>{link.name}</FooterLink>)}
            </ul>
          </div>
          
          {/* Socials Column */}
          <div className="col-span-2 md:col-span-1">
             <h4 className="font-bold tracking-wider text-white/90">Follow Us</h4>
             <div className="flex mt-4 space-x-4">
                {socialLinks.map(social => (
                    <motion.a 
                        key={social.name} 
                        href={social.href} 
                        aria-label={social.name}
                        className="text-muted-foreground hover:text-primary transition-colors text-2xl"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {social.icon}
                    </motion.a>
                ))}
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tweakly. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

// A small helper component for footer links to keep the main component cleaner
const FooterLink = ({ href, children }) => (
  <li>
    <motion.a
      href={href}
      className="text-muted-foreground transition-colors hover:text-primary"
      whileHover={{ x: 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.a>
  </li>
);

export default Footer;