import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useContactForm, useProfile } from "@/hooks/use-portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Send, Linkedin, MapPin, Search } from "lucide-react"; // Keep existing icons for now, as the instruction's code edit only goes up to SectionHeader
import { SiOrcid, SiScopus } from "react-icons/si";

const { mutate: sendMessage, isPending } = useContactForm();
const { data: profile } = useProfile();

// Helper function to handle link formatting
const getFullUrl = (value: string | undefined | null, type: 'orcid' | 'scopus' | 'researchid') => {
  if (!value) {
    // Return default fallbacks
    switch (type) {
      case 'orcid': return "https://orcid.org/my-orcid?orcid=0000-0002-3695-0732";
      case 'scopus': return "https://www.scopus.com/authid/detail.uri?authorId=58336556300";
      case 'researchid': return "https://researchid.co/nl.swathi";
      default: return "#";
    }
  }

  // If it's already a URL, return it
  if (value.startsWith('http')) return value;

  // Otherwise, construct the full URL based on type
  switch (type) {
    case 'orcid': return `https://orcid.org/my-orcid?orcid=${value}`;
    case 'scopus': return `https://www.scopus.com/authid/detail.uri?authorId=${value}`;
    case 'researchid': return value.includes('.') ? `https://researchid.co/${value}` : value;
    default: return value;
  }
};

const form = useForm<InsertMessage>({
  resolver: zodResolver(insertMessageSchema),
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});

const onSubmit = (data: InsertMessage) => {
  sendMessage(data, {
    onSuccess: () => form.reset(),
  });
};

return (
  <section id="contact" className="py-20 border-t border-slate-100">
    <SectionHeader
      title="Contact"
      subtitle="Let's connect. Feel free to reach out for collaborations or inquiries."
    />

    <div className="grid md:grid-cols-3 gap-12 mt-12">
      {/* Contact Info */}
      <div className="md:col-span-1 space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold font-serif mb-6 text-slate-900">Get in Touch</h3>

          <div className="space-y-6">
            {profile?.email && (
              <div className="flex items-start gap-3 text-slate-600">
                <Mail className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-sm hover:text-primary transition-colors break-all">
                    {profile.email}
                  </a>
                </div>
              </div>
            )}

            {profile?.location && (
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-slate-900">Location</p>
                  <p className="text-sm">{profile.location}</p>
                </div>
              </div>
            )}

            {profile?.linkedin && (
              <div className="flex items-start gap-3 text-slate-600">
                <Linkedin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <p className="font-medium text-slate-900">Social</p>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 text-slate-600">
              <SiOrcid className="w-5 h-5 mt-1 text-primary" />
              <div>
                <p className="font-medium text-slate-900">ORCID</p>
                <a href={getFullUrl(profile?.orcid, 'orcid')} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                  View Research Profile
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-600">
              <SiScopus className="w-5 h-5 mt-1 text-primary" />
              <div>
                <p className="font-medium text-slate-900">Scopus</p>
                <a href={getFullUrl(profile?.scopus, 'scopus')} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                  View Scopus Profile
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-600">
              <Search className="w-5 h-5 mt-1 text-primary" />
              <div>
                <p className="font-medium text-slate-900">ResearchID</p>
                <a href={getFullUrl(profile?.researchid, 'researchid')} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                  View Researcher Profiles
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form */}
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" />
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can I help you?"
                        className="min-h-[150px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
                disabled={isPending}
              >
                {isPending ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  </section>
);
}
