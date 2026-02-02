import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", description: "Welcome & Introduction" },
  { label: "Education", href: "#education", description: "Academic journey & qualifications" },
  { label: "Experience", href: "#experience", description: "Professional journey & roles" },
  { label: "Research", href: "#research", description: "Publications & scholarly work" },
  { label: "Talks", href: "#talks", description: "Speaking engagements" },
  { label: "Awards", href: "#awards", description: "Honors & recognition" },
  { label: "Contact", href: "#contact", description: "Get in touch" },
];

interface NavLinkProps {
  item: NavItem;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isActive: boolean;
}

const NavLink = ({ item, isHovered, onHover, onLeave, isActive }: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add a small delay to ensure the scroll works properly
    setTimeout(() => {
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 10);
  };

  return (
    <li className="relative">
      <a
        href={item.href}
        onClick={handleClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={cn(
          "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
          "text-slate-600 dark:text-slate-400",
          "hover:text-slate-900 dark:hover:text-slate-100",
          isActive && "text-primary font-semibold"
        )}
      >
        {/* Hover background pill */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              layoutId="navHoverBg"
              className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        <span className="relative z-10">{item.label}</span>
      </a>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg whitespace-nowrap shadow-xl z-50"
          >
            {item.description}
            {/* Tooltip arrow */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  return (
    <button
      className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      onClick={onClick}
    >
      <span className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
      <span className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
      <span className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-300 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
    </button>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
  const handleItemClick = (href: string, closeMenu: () => void) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Close menu after a small delay to allow scrolling to start
      setTimeout(closeMenu, 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 shadow-xl z-50 md:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-end mb-6">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block py-3 text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.href, onClose);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });

        if (bestEntry) {
          const targetId = bestEntry.target.getAttribute('id');
          if (targetId) {
            setActiveItem(targetId);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn(
      "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-full max-w-4xl rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl overflow-hidden",
      scrolled
        ? "bg-white/90 dark:bg-slate-950/90 shadow-lg"
        : "bg-white/60 dark:bg-slate-900/60"
    )}>

      <nav className="relative px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              // Add a small delay to ensure the scroll works properly
              setTimeout(() => {
                const targetElement = document.querySelector('#home');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }, 10);
            }}
            className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 relative z-10"
          >
            NLS
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isHovered={hoveredItem === item.href}
                onHover={() => setHoveredItem(item.href)}
                onLeave={() => setHoveredItem(null)}
                isActive={activeItem === item.href.slice(1)}
              />
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}

// PageTransition component
interface PageTransitionProps {
  isActive: boolean;
  origin: { x: number; y: number };
  color?: string;
}

export function PageTransition({
  isActive,
  origin,
  color = "bg-slate-900 dark:bg-slate-100"
}: PageTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={`fixed inset-0 z-[100] pointer-events-none ${color}`}
          initial={{
            clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`
          }}
          animate={{
            clipPath: isActive
              ? `circle(150% at ${origin.x}px ${origin.y}px)`
              : `circle(0% at ${origin.x}px ${origin.y}px)`
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

// Hook for page transitions

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const navigateWithTransition = useCallback((
    href: string,
    event: React.MouseEvent
  ) => {
    event.preventDefault();

    // Capture click position for circle reveal
    setTransitionOrigin({ x: event.clientX, y: event.clientY });
    setTargetSection(href);
    setIsTransitioning(true);

    // After transition completes, scroll to section
    setTimeout(() => {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 10);

      // Reverse transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 600); // Match transition duration
  }, []);

  return {
    isTransitioning,
    transitionOrigin,
    navigateWithTransition
  };
}
