import React, { useState, useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Search, Moon, Sun, Menu, X, User, ShoppingBag, 
  Heart, Settings, LogOut, Gift, Zap,
  Home, Compass, BookOpen, LucideHeartHandshake, HelpCircle
} from 'lucide-react';

export function Header() {
  const { navigate, router } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Mock user authentication state - in real app this would come from auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: null
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [router.currentView]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('search-results', { query: searchQuery });
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate('auth');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    navigate('home');
  };

  const navigationItems = [
    { label: 'Home', href: 'home', icon: Home },
    { label: 'Explore', href: 'explore', icon: Compass },
    { label: 'Blog', href: 'blog', icon: BookOpen },
    // { label: 'Partners', href: 'partners', icon: LucideHeartHandshake },
    { label: 'Support', href: 'support', icon: HelpCircle }
  ];

  const userMenuItems = [
    { label: 'Dashboard', href: 'dashboard', icon: User },
    { label: 'Order History', href: 'dashboard', icon: ShoppingBag },
    { label: 'Favorites', href: 'dashboard', icon: Heart },
    { label: 'Wallet', href: 'dashboard', icon: Gift },
    { label: 'Settings', href: 'dashboard', icon: Settings }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-custom' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => navigate('home')}
              className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-custom group-hover:shadow-custom-lg transition-all duration-300 group-hover:scale-110">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">GiftCards India</h1>
                <p className="text-xs text-muted-foreground -mt-1">No fees. Instant delivery.</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = router.currentView === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search gift cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-accent border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search Button */}
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                  isMobileSearchOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-accent rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {/* User Menu */}
              <div className="relative user-menu-container hidden">
                <button
                  onClick={handleAuthClick}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
                    isAuthenticated 
                      ? 'hover:bg-accent' 
                      : 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground hover:shadow-custom'
                  }`}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="hidden sm:block font-medium">{user.name.split(' ')[0]}</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span className="hidden sm:block font-medium">Sign In</span>
                    </>
                  )}
                </button>

                {/* User Dropdown */}
                {isAuthenticated && isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-2xl shadow-custom-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    
                    <div className="py-2">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.href}
                            onClick={() => {
                              navigate(item.href);
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-accent transition-colors duration-200"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="border-t border-border pt-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search gift cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-accent border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="flex flex-col h-full pt-20">
            <nav className="flex-1 px-4 py-8">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = router.currentView === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        navigate(item.href);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-custom'
                          : 'hover:bg-accent'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-lg">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Mobile User Section */}
            <div className="px-4 py-6 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate('auth');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-2xl font-semibold"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}