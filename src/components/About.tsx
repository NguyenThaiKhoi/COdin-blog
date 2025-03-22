
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, FileText, ArrowRight } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.staggered-reveal');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed');
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px 0px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { icon: BookOpen, value: "1,240+", label: "Published Articles" },
    { icon: Users, value: "65+", label: "Academic Contributors" },
    { icon: FileText, value: "18", label: "Disciplines Covered" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent/5 via-accent/5 to-white blur-3xl -top-96 -left-96"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 staggered-reveal">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">About ScholarInsights</h2>
            <p className="text-muted-foreground">
              ScholarInsights is dedicated to democratizing academic knowledge and fostering intellectual discourse across diverse disciplines. Our platform brings together scholars, researchers, and curious minds to explore complex ideas and exchange perspectives.
            </p>
            <p className="text-muted-foreground">
              Founded by a team of academics with a passion for accessible knowledge sharing, we strive to create a space where rigorous thinking meets engaging presentation. Our contributors range from established professors to emerging researchers, all committed to advancing public understanding.
            </p>
            <Button className="rounded-full group" variant="outline">
              Learn more about our mission
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-border/50 staggered-reveal">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="font-bold text-3xl mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
