
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogin } from '@react-oauth/google';
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { t, login, loginWithGoogle } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login data:', data);
    
    // Create a user object and call the login function from context
    login({
      id: crypto.randomUUID(),
      name: data.email.split('@')[0], // Use part of email as name for demo
      email: data.email,
    });
    
    // Show success toast
    toast({
      title: 'Login Successful',
      description: `Welcome, ${data.email}`,
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-full">
          <LogIn className="mr-2 h-4 w-4" />
          {t('nav.login')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('login.title')}</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between text-sm">
              <a href="#" className="text-primary hover:underline">
                {t('login.forgot')}
              </a>
              <div className="flex items-center gap-1">
                <span>{t('login.register')}</span>
                <button 
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    // We need to wait for the login dialog to close before opening the sign in dialog
                    setTimeout(() => {
                      const signInButton = document.querySelector('[data-signin-trigger]');
                      if (signInButton) {
                        (signInButton as HTMLButtonElement).click();
                      }
                    }, 100);
                  }}
                  className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  {t('login.register.link')}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t('login.button')}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={loginWithGoogle}
                onError={() => {
                  toast({
                    title: 'Login Failed',
                    description: 'Google authentication failed. Please try again.',
                    variant: 'destructive'
                  });
                }}
                useOneTap
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
