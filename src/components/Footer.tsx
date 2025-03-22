
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "Articles", href: "#articles" },
        { name: "Topics", href: "#topics" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Style Guide", href: "#" },
        { name: "Submission Guidelines", href: "#" },
        { name: "Publishing Ethics", href: "#" },
        { name: "Accessibility", href: "#" },
        { name: "Peer Review Process", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Copyright", href: "#" },
        { name: "Licensing", href: "#" }
      ]
    }
  ];
  
  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "GitHub", icon: Github, href: "#" }
  ];

  return (
    <footer className="bg-background py-16 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <a href="/" className="inline-block mb-4">
              <span className="font-serif text-xl font-medium">Scholar<span className="font-bold">Insights</span></span>
            </a>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              A platform dedicated to fostering intellectual discourse and academic exploration across diverse disciplines.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1">
              <h3 className="font-medium mb-4 text-sm">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ScholarInsights. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
