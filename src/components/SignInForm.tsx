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
import { UserPlus } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { GoogleLogin } from '@react-oauth/google';
import { Separator } from '@/components/ui/separator';

const signInSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { t, login, loginWithGoogle } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log('Sign In data:', data);
    // Create a user object and call the login function from context
    login({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
    });
    
    // Show success toast
    toast({
      title: t('signin.success'),
      description: t('signin.success.description'),
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full" data-signin-trigger>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('signin.button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('signin.title')}</DialogTitle>
          <DialogDescription>
            Create your account to join our community
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('signin.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('signin.email')}</FormLabel>
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
                  <FormLabel>{t('signin.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('signin.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t('signin.terms')}
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span>{t('signin.login')}</span>
                <button 
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    // We need to wait for the sign in dialog to close before opening the login dialog
                    setTimeout(() => {
                      const loginButton = document.querySelector('button:has(.h-4.w-4)');
                      if (loginButton) {
                        (loginButton as HTMLButtonElement).click();
                      }
                    }, 100);
                  }}
                  className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  {t('signin.login.link')}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t('signin.button')}
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
                    title: 'Sign In Failed',
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

export default SignInForm;