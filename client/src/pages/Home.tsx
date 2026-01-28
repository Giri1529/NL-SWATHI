import { useProfile, useSkills } from "@/hooks/use-portfolio";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink, Linkedin, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: skills, isLoading: isSkillsLoading } = useSkills();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-12 xl:p-16">
        <div className="max-w-4xl mx-auto mt-16 lg:mt-0">
          
          {/* Hero Section */}
          <section className="min-h-[60vh] flex flex-col justify-center">
            {isProfileLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : profile ? (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                <div>
                  <motion.div variants={item} className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Welcome to my portfolio
                  </motion.div>
                  <motion.h1 variants={item} className="text-5xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight">
                    {profile.name}
                  </motion.h1>
                  <motion.p variants={item} className="text-xl lg:text-2xl text-slate-600 mt-4 font-light">
                    {profile.title}
                  </motion.p>
                </div>

                <motion.div variants={item} className="flex flex-wrap gap-4 text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </a>
                </motion.div>

                <motion.p variants={item} className="text-lg leading-relaxed text-slate-600 max-w-3xl">
                  {profile.bio}
                </motion.p>

                <motion.div variants={item} className="flex gap-4 pt-4">
                  <Link href="/contact">
                    <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                      Get in Touch
                    </Button>
                  </Link>
                  <Link href="/research">
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 hover:bg-slate-50">
                      View Research
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <div className="text-center py-20 text-slate-400">Profile information unavailable.</div>
            )}
          </section>

          {/* Skills Section */}
          <section className="mt-20">
            <h3 className="text-2xl font-serif font-bold mb-8">Technical Expertise</h3>
            {isSkillsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
              </div>
            ) : skills && skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup, idx) => (
                  <motion.div
                    key={skillGroup.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-700 hover:bg-slate-100">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Skills information loading...</p>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
