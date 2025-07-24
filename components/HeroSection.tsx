import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { Search, Zap, Shield, Globe2, Sparkles, TrendingUp, Clock } from 'lucide-react';

export function HeroSection() {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('search-results', { search: searchQuery.trim() });
    } else {
      navigate('explore');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-primary/10 to-purple-600/10 backdrop-blur-sm rounded-full border border-primary/20 shadow-custom-md animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              No Hidden Fees • Zero Forex Charges • Instant Delivery
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Buy Global Gift Cards
            </span>
            <br />
            <span className="text-foreground">
              Without Markup
            </span>
            <br />
            <span className="text-muted-foreground text-4xl md:text-5xl">
              or Forex Fees
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Access thousands of digital gift cards worldwide with 
            <span className="text-primary font-semibold"> instant delivery</span>, 
            <span className="text-purple-600 font-semibold"> transparent pricing</span>, and 
            <span className="text-green-600 font-semibold"> secure payments</span>. 
            No surprises, just savings.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 transition-all duration-200 ${isSearchFocused ? 'text-primary scale-110' : 'text-muted-foreground'}`} />
                <input
                  type="text"
                  placeholder="Search by brand, category, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="w-full pl-16 pr-40 py-6 text-lg bg-background/80 backdrop-blur-sm border-2 border-border rounded-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-custom-lg placeholder:text-muted-foreground"
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-custom-md hover:shadow-custom-lg hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="group">
              <div className="glass rounded-2xl p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center justify-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">100%</div>
                    <div className="text-sm text-muted-foreground">Secure & Instant</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="glass rounded-2xl p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center justify-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-xl">
                    <Globe2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">190+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="glass rounded-2xl p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center justify-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">0%</div>
                    <div className="text-sm text-muted-foreground">Hidden Fees</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>1M+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Bank-Level Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}