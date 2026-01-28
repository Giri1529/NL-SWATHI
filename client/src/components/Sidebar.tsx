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
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-6 shadow-2xl">
      <div className="mb-10 mt-4">
        <h1 className="text-2xl font-serif font-bold text-white tracking-wider">NL. Swathi</h1>
        <p className="text-slate-400 text-sm mt-1">Pharm D & PhD Scholar</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-1"
                    : "text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-white transition-colors")} />
                <span className="font-medium text-sm tracking-wide">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10 text-xs text-slate-500 text-center">
        &copy; {new Date().getFullYear()} NL. Swathi
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b px-4 py-3 flex justify-between items-center shadow-sm">
        <span className="font-serif font-bold text-slate-900">NL. Swathi</span>
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
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
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
