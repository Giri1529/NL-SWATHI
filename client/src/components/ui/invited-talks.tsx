"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users, MapPin, Play, Pause, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Talk {
  id: string
  title: string
  event: string
  audience: string
  description: string
  attendees?: string
  image: string
  badge?: string
  badgeColor?: "primary" | "secondary" | "accent" | "highlight"
  link?: string
  linkText?: string
}

const TALKS_DATA: Talk[] = [
  {
    id: "01",
    title: "Sharing Experiences in Clinical Research",
    event: "Internship at Believers Church Medical College",
    audience: "Pharm D interns",
    description: "Delivered an inspiring talk on my experiences in clinical research, emphasizing its importance and impact, and motivated fellow Pharm D interns to explore opportunities in this dynamic field.",
    image: "/images/talk-1.jpg",
    badge: "Clinical Research",
    badgeColor: "primary"
  },
  {
    id: "02",
    title: "Insights into Pharm D Career Opportunities",
    event: "Invited by Dr. Jeffry Winner",
    audience: "Aspiring Pharm D professionals",
    description: "Shared insights about the Pharm D program, including career opportunities, advantages, and challenges, helping attendees gain a deeper understanding of the field and make informed career decisions.",
    image: "/images/talk-2.jpg",
    badge: "Career Guidance",
    badgeColor: "secondary"
  },
  {
    id: "03",
    title: "Career Path and Achievements",
    event: "Featured Speaker at CLIMED",
    audience: "Over 200 attendees",
    description: "Selected as the Best Intern at CLIMED, I addressed a large audience, sharing my career path, achievements, and professional insights, inspiring future healthcare professionals.",
    attendees: "200+",
    image: "/images/talk-3.jpg",
    badge: "Best Intern",
    badgeColor: "accent",
    link: "#",
    linkText: "Watch Interview"
  },
  {
    id: "04",
    title: "Reading Habits in Young Minds",
    event: "Karpagam College Of Pharmacy, Coimbatore",
    audience: "Over 300 attendees",
    description: "Engaged with a diverse academic audience to discuss the importance of reading habits and continuous learning in professional development.",
    attendees: "300+",
    image: "/images/talk-4.jpg",
    badge: "Education",
    badgeColor: "highlight"
  },
  {
    id: "05",
    title: "Scientific Training and Writing",
    event: "Sri Venkateswara College of Pharmacy",
    audience: "Pharmacy students and faculty",
    description: "Provided comprehensive insights into scientific writing methodologies and research training, equipping students with essential skills for academic and professional success.",
    image: "/images/talk-5.jpg",
    badge: "Research",
    badgeColor: "primary"
  }
]

interface InvitedTalksProps {
  talks?: Talk[]
  autoPlayInterval?: number
  className?: string
}

export function InvitedTalks({
  talks = TALKS_DATA,
  autoPlayInterval = 5000,
  className = ""
}: InvitedTalksProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 })
  const cardRef = React.useRef<HTMLDivElement>(null)

  const activeTalk = talks[activeIndex]

  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % talks.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, talks.length, autoPlayInterval])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotationX = (y - centerY) / 30
      const rotationY = -(x - centerX) / 30

      setRotation({ x: rotationX, y: rotationY })
    }
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % talks.length)
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + talks.length) % talks.length)
  }

  const badgeStyles = {
    primary: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    secondary: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    accent: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
    highlight: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
  }

  return (
    <section id="talks" className={cn("relative py-20 px-4 bg-gradient-to-br from-background via-slate-50 to-background overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">
            Invited <span className="text-primary">Talks</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sharing knowledge and inspiring future healthcare professionals across various platforms
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Card Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative [perspective:1000px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTalk.id}
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: "preserve-3d"
                }}
                className="relative group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-2xl">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <motion.img
                      src={activeTalk.image}
                      alt={activeTalk.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Badge */}
                    {activeTalk.badge && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={cn(
                          "absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90",
                          badgeStyles[activeTalk.badgeColor || "primary"]
                        )}
                      >
                        {activeTalk.badge}
                      </motion.div>
                    )}

                    {/* Talk Number */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-lg border border-white/20">
                      {activeTalk.id}
                    </div>
                  </div>

                  {/* Content for Mobile (visible only on small screens) */}
                  <div className="lg:hidden p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {activeTalk.title}
                    </h3>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTalk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    Talk {activeTalk.id} of {talks.length}
                  </h4>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 font-serif hidden lg:block">
                    {activeTalk.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{activeTalk.event}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{activeTalk.audience}</span>
                    </div>
                    {activeTalk.attendees && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{activeTalk.attendees} attendees</span>
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {activeTalk.description}
                  </p>
                  {activeTalk.link && (
                    <a href={activeTalk.link} className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:underline">
                      {activeTalk.linkText || "Learn more"} <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Progress</span>
                    <span>{Math.round(((activeIndex + 1) / talks.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeIndex + 1) / talks.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <button
                    onClick={goToPrevious}
                    className="w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center hover:scale-110 hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={goToNext}
                    className="w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center hover:scale-110 hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="flex-1 flex gap-2">
                    {talks.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          index === activeIndex
                            ? "bg-primary"
                            : "bg-slate-200 hover:bg-primary/50"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Timeline Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 hidden md:block"
        >
          <div className="relative px-4">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2" />
            <div className="relative flex justify-between">
              {talks.map((talk, index) => (
                <button
                  key={talk.id}
                  onClick={() => setActiveIndex(index)}
                  className="group relative"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 bg-white",
                      index === activeIndex
                        ? "text-primary border-primary scale-125 shadow-lg"
                        : index < activeIndex
                          ? "text-primary border-primary/50"
                          : "text-slate-400 border-slate-200 hover:border-primary/50"
                    )}
                  >
                    {talk.id}
                  </div>
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-100">
                      {talk.title.split(' ').slice(0, 3).join(' ')}...
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"
        />
      </div>
    </section>
  )
}
