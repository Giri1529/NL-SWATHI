import { usePublications } from "@/hooks/use-portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Research() {
  const { data: publications, isLoading } = usePublications();

  return (
    <section id="research" className="py-20 border-t border-slate-100">
      <SectionHeader
        title="Research"
        subtitle="Publications and scholarly work."
      />

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : publications && publications.length > 0 ? (
            <div className="grid gap-6">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors shrink-0">
                      <BookOpen className="w-6 h-6 mb-1" />
                      <span className="text-xs font-bold">{pub.year || "N/A"}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                        {pub.title}
                      </h3>

                      <div className="mt-2 text-sm text-slate-600">
                        {pub.authors && <span className="font-medium">{pub.authors}</span>}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                        {pub.journal && (
                          <span className="italic font-serif text-slate-700 border-l-2 border-primary pl-2">
                            {pub.journal}
                          </span>
                        )}
                        <span className="sm:hidden flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {pub.year}
                        </span>
                      </div>

                      {pub.link && (
                        <div className="mt-4 flex justify-end">
                          <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary hover:bg-primary/5">
                              Read Publication <ExternalLink className="w-3 h-3" />
                            </Button>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">No publications found.</div>
          )}
    </section>
  );
}
