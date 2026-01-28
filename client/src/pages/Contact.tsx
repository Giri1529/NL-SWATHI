import { useContactForm, useProfile } from "@/hooks/use-portfolio";
import { Sidebar } from "@/components/Sidebar";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Send, Linkedin, MapPin } from "lucide-react";

export default function Contact() {
  const { mutate: sendMessage, isPending } = useContactForm();
  const { data: profile } = useProfile();

  const form = useForm<z.infer<typeof insertMessageSchema>>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof insertMessageSchema>) => {
    sendMessage(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 lg:p-12 xl:p-16">
        <div className="max-w-4xl mx-auto mt-16 lg:mt-0">
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
        </div>
      </main>
    </div>
  );
}
