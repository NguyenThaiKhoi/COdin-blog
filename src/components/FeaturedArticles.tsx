
import React, { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, ArrowUpRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    image: string;
  };
  image: string;
  date: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Evolution of Machine Learning in Academic Research",
    description: "Examining how machine learning algorithms have transformed the landscape of academic research methodology.",
    category: "Technology",
    readTime: "8 min read",
    author: {
      name: "Dr. Emily Chen",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2023"
  },
  {
    id: 2,
    title: "Climate Data Analysis: New Approaches for Complex Systems",
    description: "A detailed analysis of emerging methodologies for processing and interpreting climate data sets.",
    category: "Environment",
    readTime: "12 min read",
    author: {
      name: "Prof. Mark Johnson",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "June 3, 2023"
  },
  {
    id: 3,
    title: "The Neuroscience of Decision-Making Under Uncertainty",
    description: "How does the brain process information when faced with ambiguous choices? New research reveals fascinating insights.",
    category: "Neuroscience",
    readTime: "10 min read",
    author: {
      name: "Dr. Sarah Williams",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "April 22, 2023"
  }
];

const FeaturedArticles = () => {
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

  return (
    <section id="articles" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 mb-12 staggered-reveal">
          <div className="space-y-1 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Articles</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Discover our most impactful and thought-provoking academic content
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <Card key={article.id} className="overflow-hidden border-border/50 transition-all duration-300 hover:shadow-md staggered-reveal">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-white/90 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-background/50">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <CardTitle className="font-serif line-clamp-2 hover:text-accent transition-colors">
                  <a href="#" className="block">
                    {article.title}
                  </a>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {article.description}
                </CardDescription>
              </CardHeader>
              
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={article.author.image} 
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover mr-2 border border-border"
                  />
                  <span className="text-sm font-medium">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12 staggered-reveal">
          <a 
            href="#" 
            className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors group"
          >
            View all articles
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
