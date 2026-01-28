import { Link, useLocation } from "wouter";
import { User, GraduationCap, Briefcase, BookOpen, Award, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", path: "/", icon: User },
  { label: "Education", path: "/education", icon: GraduationCap },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "Research", path: "/research", icon: BookOpen },
  { label: "Awards", path: "/awards", icon: Award },
  { label: "Contact", path: "/contact", icon: Mail },
];

export function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mb-12 mt-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-serif font-bold text-white tracking-wider"
        >
          NL. Swathi
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-sm mt-2 font-light uppercase tracking-widest"
        >
          Pharm D & PhD Scholar
        </motion.p>
      </div>
      
      <nav className="flex-1 space-y-3 relative z-10">
        {NAV_ITEMS.map((item, index) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 cursor-pointer group relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 relative z-10", isActive ? "text-white" : "text-slate-500 group-hover:text-white transition-colors")} />
                <span className="font-medium text-sm tracking-wide relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-white/5 text-[10px] text-slate-600 text-center uppercase tracking-widest relative z-10">
        &copy; {new Date().getFullYear()} NL. Swathi • Portfolio
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <span className="font-serif font-bold text-xl text-slate-900 tracking-tight">NL. Swathi</span>
        <button 
          onClick={toggleMenu}
          className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
          aria-label="Toggle Menu"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-slate-900 rounded-full transition-transform"
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-slate-900 rounded-full transition-opacity"
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-slate-900 rounded-full transition-transform"
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
