
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const staggeredElements = heroRef.current?.querySelectorAll('.staggered-reveal');
    staggeredElements?.forEach(el => observer.observe(el));

    return () => {
      staggeredElements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-accent/5 via-accent/10 to-blue-100/5 blur-3xl -top-64 -right-96"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/10 via-accent/5 to-accent/5 blur-3xl -bottom-64 -left-64"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 pt-20">
          <div className="overflow-hidden">
            <p className="inline-block text-sm font-medium py-1 px-3 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-sm mb-4 staggered-reveal">
              A Modern Space for Academic Discourse
            </p>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight text-balance staggered-reveal">
              Where Intellectual Curiosity Meets Thoughtful Discourse
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto staggered-reveal">
              Explore in-depth analyses, research insights, and academic perspectives on topics that shape our understanding of the world.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center staggered-reveal">
            <Button size="lg" className="rounded-full px-8">
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Browse Topics
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in opacity-0" style={{ animationDelay: '1.5s' }}>
        <div className="w-0.5 h-16 bg-gradient-to-b from-transparent to-border rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/60 to-accent animate-[scrolldown_2s_ease-in-out_infinite]"></div>
        </div>
        <span className="text-xs font-medium mt-2 text-muted-foreground">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
