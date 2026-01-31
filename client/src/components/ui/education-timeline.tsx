"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface EducationTimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
}

export function EducationTimeline({ 
  data,
  title = "Education",
  subtitle = "My academic journey and qualifications."
}: EducationTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      id="education"
      className="w-full bg-slate-50 dark:bg-slate-950 font-sans md:px-10"
      ref={containerRef}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl mb-4 font-serif font-bold text-slate-900 dark:text-slate-100">
          {title}
          <span className="block w-16 h-1 bg-primary rounded-full mt-4" />
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg">
          {subtitle}
        </p>
      </div>

      {/* Timeline */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            {/* Sticky year column */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                <motion.div 
                  className="h-4 w-4 rounded-full bg-primary"
                  whileInView={{ 
                    scale: [0.5, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(14, 116, 144, 0)",
                      "0 0 0 8px rgba(14, 116, 144, 0.2)",
                      "0 0 0 0 rgba(14, 116, 144, 0)"
                    ]
                  }}
                  transition={{ duration: 0.8, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              {/* Year label */}
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-serif font-bold text-slate-300 dark:text-slate-700">
                {item.title}
              </h3>
            </div>

            {/* Content card */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-serif font-bold text-slate-400">
                {item.title}
              </h3>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                {item.content}
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Animated progress line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-primary/60 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
