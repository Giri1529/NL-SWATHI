import { useAwards } from "@/hooks/use-portfolio";
import { Sidebar } from "@/components/Sidebar";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Award, Calendar, BadgeCheck } from "lucide-react";

export default function Awards() {
  const { data: awards, isLoading } = useAwards();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-12 xl:p-16">
        <div className="max-w-4xl mx-auto mt-16 lg:mt-0">
          <SectionHeader 
            title="Honors & Awards" 
            subtitle="Recognition of academic and professional excellence."
          />

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))}
            </div>
          ) : awards && awards.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <motion.div 
                  key={award.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Award className="w-24 h-24 text-primary rotate-12" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                      <BadgeCheck className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors pr-8">
                      {award.title}
                    </h3>
                    
                    <div className="mt-2 text-sm text-slate-500 font-medium uppercase tracking-wider">
                      {award.issuer}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{award.date}</span>
                    </div>

                    {award.description && (
                      <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                        {award.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">No awards listed.</div>
          )}
        </div>
      </main>
    </div>
  );
}
