import { useEducation } from "@/hooks/use-portfolio";
import { Sidebar } from "@/components/Sidebar";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

export default function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-12 xl:p-16">
        <div className="max-w-4xl mx-auto mt-16 lg:mt-0">
          <SectionHeader 
            title="Education" 
            subtitle="My academic journey and qualifications."
          />

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-2xl" />
              ))}
            </div>
          ) : education && education.length > 0 ? (
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {education.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start group"
                >
                  <div className="absolute left-0 mt-2 ml-2 h-6 w-6 rounded-full border-4 border-white bg-slate-300 group-hover:bg-primary transition-colors shadow-sm z-10" />
                  
                  <div className="ml-12 w-full">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md group-hover:border-primary/20 transition-all">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mt-1">
                            <GraduationCap className="w-4 h-4" />
                            <span className="font-medium">{edu.institution}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full w-fit">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.year}
                        </div>
                      </div>
                      
                      {edu.details && (
                        <p className="text-slate-600 leading-relaxed text-sm border-t border-slate-50 pt-4 mt-2">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">Education history not available.</div>
          )}
        </div>
      </main>
    </div>
  );
}
