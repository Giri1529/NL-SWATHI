import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'talks', label: 'Talks' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionDotNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        const isHovered = hoveredSection === id;

        return (
          <div key={id} className="relative flex items-center justify-end">
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-8 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
                >
                  {label}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <button
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative p-2 group"
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <motion.span
                className={`block rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'bg-primary shadow-lg shadow-primary/30'
                    : 'bg-transparent border-2 border-slate-300 group-hover:border-primary/60'
                }`}
                animate={{
                  width: isActive ? 14 : 10,
                  height: isActive ? 14 : 10,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
              
              {/* Pulse effect for active */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="absolute w-6 h-6 rounded-full bg-primary/20 animate-ping" />
                </motion.span>
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
