import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search } from 'lucide-react';

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

// Sample articles data - in a real application, this would come from an API or context
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

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  // Handle keyboard shortcut to open search dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Filter articles based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = articles.filter(
      article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={t('search.placeholder') || 'Search articles...'}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>{t('search.noResults') || 'No results found.'}</CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup heading={t('search.articles') || 'Articles'}>
              {searchResults.map((article) => (
                <CommandItem
                  key={article.id}
                  onSelect={() => {
                    // In a real app, this would navigate to the article
                    window.location.href = `#article-${article.id}`;
                    onOpenChange(false);
                  }}
                  className="flex flex-col items-start py-3"
                >
                  <div className="flex w-full justify-between">
                    <span className="font-medium">{article.title}</span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{article.category}</span>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {article.description}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchDialog;