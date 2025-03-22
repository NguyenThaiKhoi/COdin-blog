
import React, { useEffect, useRef } from 'react';
import { BookOpen, Globe, GraduationCap, Lightbulb, University, FileText, ScrollText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Topic {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  count: number;
}

const topics: Topic[] = [
  {
    id: 1,
    icon: BookOpen,
    title: "Literature & Cultural Studies",
    description: "Analyses of literary works, cultural phenomena, and critical theory",
    count: 42
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Education & Pedagogy",
    description: "Research on teaching methods and educational theory",
    count: 37
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Philosophy & Ethics",
    description: "Examinations of philosophical concepts and ethical frameworks",
    count: 29
  },
  {
    id: 4,
    icon: Globe,
    title: "Global Politics",
    description: "Analysis of international relations and political science",
    count: 45
  },
  {
    id: 5,
    icon: University,
    title: "History & Anthropology",
    description: "Exploration of historical events and human societies",
    count: 33
  },
  {
    id: 6,
    icon: FileText,
    title: "Economics & Society",
    description: "Research on economic systems and societal structures",
    count: 25
  }
];

const Topics = () => {
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
              }, i * 100);
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

  return (
    <section id="topics" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 staggered-reveal">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Topics</h2>
          <p className="text-muted-foreground mt-3 max-w-[700px] mx-auto">
            Browse our curated collection of academic topics spanning diverse disciplines
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Card 
                key={topic.id} 
                className={cn(
                  "group hover:shadow-md transition-all duration-300 border-border/40 overflow-hidden staggered-reveal",
                  "relative after:absolute after:inset-0 after:bg-gradient-to-tr after:from-accent/0 after:to-accent/0 after:opacity-0 hover:after:opacity-5 after:transition-opacity"
                )}
              >
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 text-accent group-hover:bg-accent/10 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm text-muted-foreground">{topic.count} articles</span>
                  </div>
                  <CardTitle className="font-serif">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-accent group-hover:text-accent group-hover:underline underline-offset-4 transition-all group-hover:translate-x-1">
                    Browse topic
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-12 staggered-reveal">
          <Button variant="outline" className="rounded-full">
            View all topics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topics;
