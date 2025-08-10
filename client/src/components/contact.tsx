import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, Globe, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit contact form');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-green">GET IN</span> <span className="text-white">TOUCH</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to create something amazing together? Let's discuss your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glassmorphism rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-neon-cyan mb-6">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                          placeholder="Your name"
                        />
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
                      <FormLabel className="text-sm font-medium text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="email"
                          className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                          placeholder="your@email.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-cyber-navy border-gray-600">
                          <SelectItem value="Digital Art Commission">Digital Art Commission</SelectItem>
                          <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                          <SelectItem value="Branding Package">Branding Package</SelectItem>
                          <SelectItem value="3D Design">3D Design</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={5}
                          className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                          placeholder="Tell me about your project..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full py-4 bg-neon-cyan text-cyber-dark font-semibold hover:bg-opacity-80 transition-all duration-300"
                >
                  <Send className="mr-2" size={16} />
                  {contactMutation.isPending ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glassmorphism rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-neon-cyan mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-cyan rounded-full flex items-center justify-center">
                    <Mail className="text-cyber-dark" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <p className="text-white font-semibold">hello@digitalart.studio</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300">Response Time</p>
                    <p className="text-white font-semibold">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center">
                    <Globe className="text-cyber-dark" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300">Available Worldwide</p>
                    <p className="text-white font-semibold">Remote collaboration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glassmorphism rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-neon-cyan mb-6">Follow My Work</h3>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="#" 
                  className="flex items-center justify-center py-3 bg-cyber-navy rounded-lg hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300"
                >
                  <i className="fab fa-behance text-2xl mr-2"></i>
                  Behance
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center py-3 bg-cyber-navy rounded-lg hover:bg-neon-pink hover:text-white transition-all duration-300"
                >
                  <i className="fab fa-dribbble text-2xl mr-2"></i>
                  Dribbble
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center py-3 bg-cyber-navy rounded-lg hover:bg-neon-green hover:text-cyber-dark transition-all duration-300"
                >
                  <i className="fab fa-instagram text-2xl mr-2"></i>
                  Instagram
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center py-3 bg-cyber-navy rounded-lg hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300"
                >
                  <i className="fab fa-twitter text-2xl mr-2"></i>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
