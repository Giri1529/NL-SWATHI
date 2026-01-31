import { useExperience } from "@/hooks/use-portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="py-20 border-t border-slate-100">
      <SectionHeader
        title="Experience"
        subtitle="Professional roles and contributions."
      />

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-2xl" />
              ))}
            </div>
          ) : experience && experience.length > 0 ? (
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-primary mt-1 font-medium">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                      <p className="whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">Experience history not available.</div>
          )}
    </section>
  );
}
