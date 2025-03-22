
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import LoginForm from './LoginForm';
import { useApp } from '@/contexts/AppContext';

const NavBar = () => {
  const { t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.articles'), href: '#articles' },
    { name: t('nav.topics'), href: '#topics' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out border-b",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-border/40 shadow-sm" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="font-serif text-xl font-medium">CO<span className="font-bold">din</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium hovered-link transition-colors hover:text-accent"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <LanguageSelector />
            <Button variant="ghost" size="icon" className="ml-2" aria-label="Search">
              <Search className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <LoginForm />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <LanguageSelector />
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-20 px-6 flex flex-col transition-all duration-300 ease-in-out overflow-auto md:hidden",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center">
          {navItems.map((item, i) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-2xl font-medium font-serif tracking-tight py-2"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={toggleMobileMenu}
            >
              {item.name}
            </a>
          ))}
          <LoginForm />
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
