import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full" />
        </h2>
        {subtitle && (
          <p className="text-slate-500 max-w-2xl mt-4 text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
