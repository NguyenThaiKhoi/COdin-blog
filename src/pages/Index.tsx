
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeaturedArticles from '@/components/FeaturedArticles';
import Topics from '@/components/Topics';
import About from '@/components/About';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll implementation
  useEffect(() => {
    const handleNavLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80, // Offset for fixed header
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    document.addEventListener('click', handleNavLinkClick);
    
    // Create intersection observer for fade-in animations of sections
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
      });
    };
    
    observeElements();
    
    return () => {
      document.removeEventListener('click', handleNavLinkClick);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col antialiased smooth-scroll">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <FeaturedArticles />
        <Topics />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
