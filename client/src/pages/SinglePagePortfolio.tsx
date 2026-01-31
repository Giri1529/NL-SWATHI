import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useProfile, useSkills, useEducation, useExperience, usePublications, useAwards, useContactForm } from '@/hooks/use-portfolio';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertMessageSchema, type InsertMessage } from '@shared/schema';
import SectionDotNav from '@/components/SectionDotNav';
import Navbar from '@/components/NavigationBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin, Linkedin, Mail, Send, GraduationCap, Calendar,
  Briefcase, BookOpen, ExternalLink, Trophy, Award, Mic, Users
} from 'lucide-react';
import { ReleaseTimeLine, type TimelineEntry as ReleaseTimelineEntry } from '@/components/ui/release-time-line';
import { EducationTimeline, type TimelineEntry as EducationTimelineEntry } from "@/components/ui/education-timeline";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// ===== HERO SECTION =====
function HeroSection() {
  const { data: profile, isLoading } = useProfile();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-800"
    >
      {/* Parallax background elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-16 w-3/4 mx-auto bg-white/10" />
            <Skeleton className="h-8 w-1/2 mx-auto bg-white/10" />
            <Skeleton className="h-24 w-full bg-white/10" />
          </div>
        ) : profile ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-medium mb-6 border border-white/20">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/80 font-light"
            >
              {profile.title}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 text-white/70"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </span>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                {profile.email}
              </a>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              {profile.bio}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4 pt-6">
              <a href="#contact">
                <Button size="lg" className="rounded-full px-8 bg-white text-slate-900 hover:bg-white/90 shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all">
                  Get in Touch
                </Button>
              </a>
              <a href="#research">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  View Research
                </Button>
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-white/60">Profile information unavailable.</p>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ===== SKILLS SECTION =====
function SkillsSection() {
  const { data: skills, isLoading } = useSkills();

  return (
    <section id="skills" className="py-24 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Technical Expertise</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            A diverse skill set spanning computational biology, clinical research, and scientific communication.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
          </div>
        ) : skills && skills.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.id}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-500 will-change-transform"
              >
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary/60" />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-slate-500">No skills data available.</p>
        )}
      </div>
    </section>
  );
}

// ===== EDUCATION SECTION =====
function EducationTimelineSkeleton() {
  return (
    <div className="w-full py-20 px-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-16 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-10">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <Skeleton className="h-40 flex-1 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EducationSection() {
  const { data: education, isLoading } = useEducation();

  if (isLoading) {
    return <EducationTimelineSkeleton />;
  }

  const timelineData: EducationTimelineEntry[] = education?.map((edu) => ({
    title: edu.year === "Current" ? "Present" : edu.year,
    content: (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <GraduationCap className="h-5 w-5 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="text-lg font-serif font-semibold text-slate-900 dark:text-slate-100">
              {edu.degree}
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              {edu.institution}
            </p>
            {edu.details && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{edu.details}</p>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="mt-2">
          {edu.year === "Current" ? "In Progress" : edu.year}
        </Badge>
      </div>
    ),
  })) || [];

  return (
    <EducationTimeline
      data={timelineData}
      title="Education"
      subtitle="My academic journey and qualifications."
    />
  );
}

// ===== EXPERIENCE SECTION =====
function ExperienceSection() {
  const { data: experience, isLoading } = useExperience();

  const experienceEntries: ReleaseTimelineEntry[] = experience?.map((exp) => ({
    icon: Briefcase,
    title: exp.role,
    subtitle: `${exp.company} • ${exp.period}`,
    description: exp.description?.split('\n')[0] || '',
    items: exp.description?.split('\n').slice(1).filter(Boolean) || [],
    // image: exp.companyLogo, // Map if available in schema
    // button: exp.projectUrl ? { url: exp.projectUrl, text: "View Project" } : undefined
  })) || [];

  return (
    <section id="experience" className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="mb-16 md:mb-24"
        >
          <SectionHeader title="Experience" subtitle="Professional roles and contributions." />
        </motion.div>

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2].map((i) => <Skeleton key={i} className="h-64 w-full rounded-3xl" />)}
          </div>
        ) : experienceEntries.length > 0 ? (
          <ReleaseTimeLine entries={experienceEntries} />
        ) : (
          <p className="text-center text-slate-500 font-sans">No experience data available.</p>
        )}
      </div>
    </section>
  );
}

// ===== INVITED TALKS SECTION =====
interface InvitedTalk {
  id: number;
  title: string;
  event: string;
  venue?: string;
  audience: string;
  audienceCount?: number;
  description: string;
  link?: string;
}

const invitedTalks: InvitedTalk[] = [
  {
    id: 1,
    title: "Sharing Experiences in Clinical Research",
    event: "Internship Program",
    venue: "Believers Church Medical College",
    audience: "Pharm D interns",
    description: "Delivered an inspiring talk on experiences in clinical research, emphasizing its importance and impact.",
  },
  {
    id: 2,
    title: "Insights into Pharm D Career Opportunities",
    event: "Career Guidance Session",
    venue: "Invited by Dr. Jeffry Winner",
    audience: "Aspiring Pharm D professionals",
    description: "Shared insights about the Pharm D program, including career opportunities, advantages, and challenges.",
  },
  {
    id: 3,
    title: "Career Path and Achievements",
    event: "Featured Speaker at CLIMED",
    audience: "Healthcare professionals",
    audienceCount: 200,
    description: "Selected as Best Intern at CLIMED, addressed audience sharing career path and professional insights.",
    link: "https://example.com/interview"
  },
  {
    id: 4,
    title: "Reading Habits in Young Minds",
    event: "Guest Lecture",
    venue: "Karpagam College of Pharmacy, Coimbatore",
    audience: "Professors and students",
    audienceCount: 300,
    description: "Invited speaker session on cultivating reading habits among pharmacy students.",
  },
  {
    id: 5,
    title: "Scientific Training and Writing",
    event: "Workshop Session",
    venue: "Sri Venkateswara College of Pharmacy",
    audience: "Pharmacy students",
    description: "Interactive session on scientific training methodologies and academic writing skills.",
  }
];

function TalkCard({ talk, index }: { talk: InvitedTalk; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
          <Mic className="w-6 h-6" />
        </div>
        {talk.audienceCount && (
          <Badge variant="secondary" className="gap-1 bg-slate-100 text-slate-700">
            <Users className="w-3 h-3" />
            {talk.audienceCount}+
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors mb-2">
        {talk.title}
      </h3>
      
      <div className="text-sm text-primary font-medium mb-1">
        {talk.event}
      </div>
      {talk.venue && (
        <div className="text-sm text-slate-500 mb-3 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {talk.venue}
        </div>
      )}
      
      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3">
        Audience: {talk.audience}
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {talk.description}
      </p>
      
      {talk.link && (
        <a 
          href={talk.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-primary hover:underline"
        >
          Watch Interview <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
}

function InvitedTalksSection() {
  return (
    <section id="talks" className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <SectionHeader
            title="Invited Talks"
            subtitle="Sharing knowledge and inspiring future healthcare professionals across academic and clinical settings."
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {invitedTalks.map((talk, index) => (
            <TalkCard key={talk.id} talk={talk} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
function PublicationCard({ pub, index }: { pub: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, margin: "0px 100px 0px 0px" }}
      className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] aspect-[16/11] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden shadow-lg hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-colors duration-300 group will-change-transform"
      role="listitem"
    >
      {/* Top Visual Area */}
      <div className="relative h-2/5 overflow-hidden">
        {/* Abstract Gradient Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/10 to-transparent" />
        {/* Grid/Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        {/* Year Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-3 py-1">
            {pub.year || 'N/A'}
          </Badge>
        </div>

        {/* Icon */}
        <div className="absolute top-4 right-4 text-white/20 group-hover:text-primary/40 transition-colors duration-500">
          <BookOpen className="w-12 h-12 rotate-12" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col h-3/5 justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {pub.title}
          </h3>
          <div className="mt-3 space-y-1">
            {pub.authors && (
              <p className="text-sm text-slate-400 line-clamp-1">{pub.authors}</p>
            )}
            {pub.journal && (
              <p className="text-xs text-slate-500 italic font-serif border-l-2 border-primary/50 pl-2 line-clamp-1">
                {pub.journal}
              </p>
            )}
          </div>
        </div>

        {pub.link && (
          <div className="mt-4 flex items-center justify-between">
            <a 
              href={pub.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group/link"
            >
              Read Publication 
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ScrollProgressBar({ progress }: { progress: any }) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-slate-200/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-violet-500"
        style={{ scaleX: progress, transformOrigin: 'left' }}
      />
    </div>
  );
}

function ResearchSection() {
  const { data: publications, isLoading } = usePublications();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const cardCount = publications?.length || 3;
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Calculate horizontal translation
  // We want to scroll from 0 to -(totalWidth - viewportWidth)
  // Approximate total width: cards (450px max) + gaps (24px)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(cardCount - 1) * 25}%`]);
  
  // Refined x calculation based on viewport
  // For better accuracy, we can use a more dynamic approach if needed, 
  // but for now, we'll map progress to a negative percentage
  const horizontalX = useTransform(scrollYProgress, [0, 1], ["0px", `-${(cardCount * 450) - 800}px`]);

  return (
    <section 
      id="research" 
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + (cardCount * 50)}vh` }}
    >
      <div className="sticky top-0 h-screen w-full bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 overflow-hidden flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <SectionHeader title="Research" subtitle="Scroll to explore publications and scholarly work." />
          </motion.div>
        </div>

        <div className="relative w-full">
          {/* Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-violet-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-fuchsia-50 to-transparent z-10 pointer-events-none" />

          {isLoading ? (
            <div className="flex gap-6 px-6 lg:px-[calc((100vw-896px)/2+24px)] overflow-hidden">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] aspect-[16/11] rounded-2xl bg-white/50" />
              ))}
            </div>
          ) : publications && publications.length > 0 ? (
            <motion.div
              className="flex gap-6 px-6 lg:px-[calc((100vw-896px)/2+24px)] pb-8 pt-4"
              style={{ x: horizontalX }}
              role="list"
              aria-label="Publications carousel"
            >
              {publications.map((pub, index) => (
                <PublicationCard key={pub.id} pub={pub} index={index} />
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-slate-500">No publications found.</p>
          )}
        </div>

        <ScrollProgressBar progress={scrollYProgress} />
      </div>
    </section>
  );
}

// ===== AWARDS SECTION =====
function AwardsSection() {
  const { data: awards, isLoading } = useAwards();

  return (
    <section id="awards" className="py-24 px-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <SectionHeader title="Honors & Awards" subtitle="Recognition of academic and professional excellence." />
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : awards && awards.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-amber-100/50 hover:shadow-xl hover:border-amber-200 transition-all duration-500 will-change-transform relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="w-24 h-24 text-amber-500 rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors pr-8">{award.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 font-medium uppercase tracking-wider">{award.issuer}</p>
                  <div className="mt-4 pt-4 border-t border-amber-100 flex items-center gap-2 text-amber-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{award.date}</span>
                  </div>
                  {award.description && (
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">{award.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-slate-500">No awards listed.</p>
        )}
      </div>
    </section>
  );
}

// ===== CONTACT SECTION =====
function ContactSection() {
  const { mutate: sendMessage, isPending } = useContactForm();
  const { data: profile } = useProfile();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage(data, { onSuccess: () => form.reset() });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-800 via-slate-900 to-primary/80 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get in Touch</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Let's connect. Feel free to reach out for collaborations or inquiries.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="md:col-span-1 space-y-6">
            {profile?.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-sm text-white/70 hover:text-white transition-colors break-all">
                    {profile.email}
                  </a>
                </div>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p className="text-sm text-white/70">{profile.location}</p>
                </div>
              </div>
            )}
            {profile?.linkedin && (
              <div className="flex items-start gap-3">
                <Linkedin className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <p className="font-medium text-white">Social</p>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can I help you?"
                            className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-slate-900 hover:bg-white/90 font-medium py-6 rounded-xl shadow-2xl shadow-black/20 transition-all hover:shadow-white/10 hover:-translate-y-0.5"
                    disabled={isPending}
                  >
                    {isPending ? 'Sending...' : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} NL. Swathi. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}

// ===== MAIN COMPONENT =====
export default function SinglePagePortfolio() {
  return (
    <div className="relative">
      <Navbar />
      <SectionDotNav />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="education">
          <EducationSection />
        </section>
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="research">
          <ResearchSection />
        </section>
        <section id="talks">
          <InvitedTalksSection />
        </section>
        <section id="awards">
          <AwardsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}
