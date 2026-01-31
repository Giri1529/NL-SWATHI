import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type TimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

interface ReleaseTimeLineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function ReleaseTimeLine({ entries, className }: ReleaseTimeLineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.2,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [entries]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveIndex(index);
    }
    if (e.key === 'ArrowDown' && index < entries.length - 1) {
      itemRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (e.key === 'ArrowUp' && index > 0) {
      itemRefs.current[index - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={cn("space-y-12 md:space-y-20", className)}>
      {entries.map((entry, index) => {
        const isActive = activeIndex === index;
        const Icon = entry.icon;

        return (
          <motion.div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col md:flex-row gap-4 md:gap-12"
          >
            {/* Sticky Meta Column */}
            <div className="top-24 flex h-min w-full md:w-64 shrink-0 items-center gap-4 md:sticky mb-4 md:mb-0 z-20">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className={cn(
                  "text-xs font-sans uppercase tracking-widest transition-colors duration-500",
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                )}>
                  {entry.subtitle}
                </span>
              </div>
            </div>

            {/* Card */}
            <motion.article
              tabIndex={0}
              role="article"
              aria-expanded={isActive}
              onKeyDown={(e) => handleKeyDown(e, index)}
              whileHover={{
                scale: isActive ? 1.01 : 1,
                boxShadow: isActive ? "0 20px 40px -15px rgba(0,0,0,0.05)" : "none"
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex-1 rounded-3xl border p-6 md:p-10 transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-primary relative overflow-hidden",
                isActive
                  ? "bg-card border-card-border shadow-2xl shadow-primary/5 ring-1 ring-primary/5"
                  : "bg-white/40 border-slate-100 opacity-40 blur-[0.5px]"
              )}
            >
              <h3 className={cn(
                "text-xl font-serif font-bold leading-tight md:text-2xl mb-4 transition-colors duration-500",
                isActive ? "text-slate-900" : "text-slate-400"
              )}>
                {entry.title}
              </h3>

              <p className={cn(
                "text-sm font-sans leading-relaxed md:text-base mb-6 transition-colors duration-500",
                isActive ? "text-slate-600" : "text-slate-400"
              )}>
                {entry.description}
              </p>

              <motion.div
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? 24 : 0
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                {entry.image && (
                  <div className="relative mb-8 rounded-2xl overflow-hidden group/img">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-48 md:h-80 rounded-2xl object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                )}

                {entry.items && entry.items.length > 0 && (
                  <div className="rounded-2xl border border-slate-200/60 bg-slate-50/80 backdrop-blur-sm p-6 md:p-8 mb-8">
                    <ul className="grid grid-cols-1 gap-4">
                      {entry.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-sm md:text-base text-slate-600 group/item">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.button && (
                  <Button
                    asChild
                    className="rounded-full px-8 py-6 h-auto text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                    variant="default"
                  >
                    <a href={entry.button.url} target="_blank" rel="noopener noreferrer">
                      {entry.button.text}
                    </a>
                  </Button>
                )}
              </motion.div>
              
              {/* Background accent for active card */}
              {isActive && (
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              )}
            </motion.article>
          </motion.div>
        );
      })}
    </div>
  );
}
