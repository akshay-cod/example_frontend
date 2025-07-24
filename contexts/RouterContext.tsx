import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ViewType = 
  | 'home' 
  | 'explore' 
  | 'category' 
  | 'search-results'
  | 'gift-card-detail' 
  | 'checkout' 
  | 'auth' 
  | 'signin' 
  | 'signup'
  | 'dashboard' 
  | 'profile' 
  | 'orders' 
  | 'wallet' 
  | 'favorites' 
  | 'settings'
  | 'blog' 
  | 'blog-post' 
  | 'partners' 
  | 'about' 
  | 'support' 
  | 'faq';

interface RouterState {
  currentView: ViewType;
  params?: any;
  previousView?: ViewType;
}

interface RouterContextType {
  router: RouterState;
  navigate: (view: ViewType, params?: any) => void;
  navigateTo: (view: ViewType, params?: any) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// 🌐 URL ↔ View mapping
const viewToPath: Record<ViewType, string> = {
  home: '/',
  explore: '/explore',
  category: '/category',
  'search-results': '/search-results',
  'gift-card-detail': '/gift-card-detail',
  checkout: '/checkout',
  auth: '/auth',
  signin: '/signin',
  signup: '/signup',
  dashboard: '/dashboard',
  profile: '/profile',
  orders: '/orders',
  wallet: '/wallet',
  favorites: '/favorites',
  settings: '/settings',
  blog: '/blog',
  'blog-post': '/blog-post',
  partners: '/partners',
  about: '/about',
  support: '/support',
  faq: '/faq',
};

// 🛣️ Path ↔ View mapping
const pathToView = Object.fromEntries(
  Object.entries(viewToPath).map(([view, path]) => [path, view])
) as Record<string, ViewType>;

function getViewFromPath(pathname: string): ViewType {
  return pathToView[pathname] || 'home';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [router, setRouter] = useState<RouterState>(() => {
    const view = getViewFromPath(window.location.pathname);
    return {
      currentView: view,
      params: null,
      previousView: undefined,
    };
  });

  const navigate = (view: ViewType, params?: any) => {
    const path = viewToPath[view] || '/';
    window.history.pushState({}, '', path);
    setRouter(prev => ({
      currentView: view,
      params,
      previousView: prev.currentView,
    }));
  };

  const goBack = () => {
    window.history.back(); // triggers popstate
  };

  // Sync with browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const view = getViewFromPath(window.location.pathname);
      setRouter(prev => ({
        currentView: view,
        params: null,
        previousView: prev.currentView,
      }));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <RouterContext.Provider value={{ router, navigate, navigateTo: navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
