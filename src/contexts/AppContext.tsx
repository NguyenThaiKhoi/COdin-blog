
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Language = 'en' | 'vi';
type Theme = 'light' | 'dark';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider?: 'email' | 'google';
}

interface AppContextType {
  language: Language;
  theme: Theme;
  user: User | null;
  isAuthenticated: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  login: (user: User) => void;
  loginWithGoogle: (credential: any) => void;
  logout: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.topics': 'Topics',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.subscribe': 'Subscribe',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.title': 'Where Coding Wisdom Meets Innovation',
    'hero.subtitle': 'Exploring the intersection of programming, technology, and Norse wisdom',
    'hero.cta': 'Start Reading',
    
    // Sections
    'section.featuredArticles': 'Featured Articles',
    'section.topics': 'Popular Topics',
    'section.about': 'About COdin',
    
    // Newsletter
    'newsletter.title': 'Stay Updated with COdin',
    'newsletter.description': 'Join our newsletter to receive the latest research, analyses, and expert perspectives delivered directly to your inbox.',
    'newsletter.placeholder': 'Your email address',
    'newsletter.button': 'Subscribe',
    'newsletter.privacy': 'We respect your privacy. Unsubscribe at any time.',
    'newsletter.success': 'Thanks for subscribing!',
    'newsletter.success.description': 'You\'ll receive our next digest soon.',
    
    // Footer
    'footer.rights': 'All rights reserved',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    
    // Language
    'language.en': 'English',
    'language.vi': 'Vietnamese',
    
    // Login
    'login.title': 'Login to COdin',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.register': 'Don\'t have an account?',
    'login.register.link': 'Register',
    'login.forgot': 'Forgot password?',
    
    // Sign In
    'signin.title': 'Sign In to COdin',
    'signin.name': 'Full Name',
    'signin.email': 'Email',
    'signin.password': 'Password',
    'signin.confirmPassword': 'Confirm Password',
    'signin.button': 'Sign In',
    'signin.login': 'Already have an account?',
    'signin.login.link': 'Login',
    'signin.terms': 'By signing in, you agree to our Terms and Privacy Policy',
    'signin.success': 'Sign In Successful',
    'signin.success.description': 'Welcome to COdin!',
    
    // Search
    'search.placeholder': 'Search articles...',
    'search.noResults': 'No results found.',
    'search.articles': 'Articles',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.articles': 'Bài viết',
    'nav.topics': 'Chủ đề',
    'nav.about': 'Giới thiệu',
    'nav.contact': 'Liên hệ',
    'nav.subscribe': 'Đăng ký',
    'nav.login': 'Đăng nhập',
    'nav.logout': 'Đăng xuất',
    
    // Hero
    'hero.title': 'Nơi Trí Tuệ Lập Trình Gặp Gỡ Đổi Mới',
    'hero.subtitle': 'Khám phá sự giao thoa giữa lập trình, công nghệ và trí tuệ Bắc Âu',
    'hero.cta': 'Bắt đầu đọc',
    
    // Sections
    'section.featuredArticles': 'Bài Viết Nổi Bật',
    'section.topics': 'Chủ Đề Phổ Biến',
    'section.about': 'Về COdin',
    
    // Newsletter
    'newsletter.title': 'Cập Nhật với COdin',
    'newsletter.description': 'Tham gia bản tin của chúng tôi để nhận các nghiên cứu, phân tích và quan điểm chuyên gia mới nhất được gửi trực tiếp đến hộp thư của bạn.',
    'newsletter.placeholder': 'Địa chỉ email của bạn',
    'newsletter.button': 'Đăng ký',
    'newsletter.privacy': 'Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất kỳ lúc nào.',
    'newsletter.success': 'Cảm ơn bạn đã đăng ký!',
    'newsletter.success.description': 'Bạn sẽ sớm nhận được bản tổng hợp tiếp theo của chúng tôi.',
    
    // Footer
    'footer.rights': 'Đã đăng ký Bản quyền',
    
    // Theme
    'theme.light': 'Sáng',
    'theme.dark': 'Tối',
    
    // Language
    'language.en': 'Tiếng Anh',
    'language.vi': 'Tiếng Việt',
    
    // Login
    'login.title': 'Đăng nhập vào COdin',
    'login.email': 'Email',
    'login.password': 'Mật khẩu',
    'login.button': 'Đăng nhập',
    'login.register': 'Chưa có tài khoản?',
    'login.register.link': 'Đăng ký',
    'login.forgot': 'Quên mật khẩu?',
    
    // Sign In
    'signin.title': 'Đăng ký vào COdin',
    'signin.name': 'Họ và tên',
    'signin.email': 'Email',
    'signin.password': 'Mật khẩu',
    'signin.confirmPassword': 'Xác nhận mật khẩu',
    'signin.button': 'Đăng ký',
    'signin.login': 'Đã có tài khoản?',
    'signin.login.link': 'Đăng nhập',
    'signin.terms': 'Bằng cách đăng ký, bạn đồng ý với Điều khoản và Chính sách Bảo mật của chúng tôi',
    'signin.success': 'Đăng ký thành công',
    'signin.success.description': 'Chào mừng đến với COdin!',
    
    // Search
    'search.placeholder': 'Tìm kiếm bài viết...',
    'search.noResults': 'Không tìm thấy kết quả nào.',
    'search.articles': 'Bài viết',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Google client ID - replace with your actual client ID from Google Cloud Console
  const googleClientId = "YOUR_GOOGLE_CLIENT_ID";
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = user !== null;

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const loginWithGoogle = (credential: any) => {
    // Parse the JWT token to get user information
    const payload = JSON.parse(atob(credential.credential.split('.')[1]));
    
    // Create a user object from Google credentials
    const googleUser: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      provider: 'google'
    };
    
    // Set the user in state
    setUser(googleUser);
  };

  const logout = () => {
    setUser(null);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AppContext.Provider value={{ 
        language, 
        theme, 
        user, 
        isAuthenticated,
        setLanguage, 
        setTheme, 
        login,
        loginWithGoogle,
        logout,
        t 
      }}>
        {children}
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
