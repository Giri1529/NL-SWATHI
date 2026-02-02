import { ProjectShowcase } from "@/components/ui/project-showcase";
import { InvitedTalks } from "@/components/ui/invited-talks";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-2xl space-y-20">
        <ProjectShowcase />
        <InvitedTalks />
      </div>
    </main>
  )
}