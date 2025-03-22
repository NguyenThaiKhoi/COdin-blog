
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our next academic digest soon."
    });
  };

  return (
    <section className="py-20 bg-accent text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-accent-foreground/5 blur-3xl -top-96 -right-96"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-accent-foreground/5 blur-3xl -bottom-96 -left-96"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-accent-foreground/10 flex items-center justify-center backdrop-blur-sm">
              <ScrollText className="h-6 w-6" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight mb-4">
              Stay Updated with Academic Insights
            </h2>
            <p className="text-accent-foreground/80 max-w-xl mx-auto">
              Join our newsletter to receive the latest research, analyses, and expert perspectives delivered directly to your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-accent-foreground/10 border-accent-foreground/20 placeholder:text-accent-foreground/50 focus-visible:ring-accent-foreground/30 text-white"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-accent hover:bg-white/90 rounded-full"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-accent-foreground/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
