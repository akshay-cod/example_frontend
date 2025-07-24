import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { Search, MapPin, TrendingUp, Star, ArrowRight, Grid, List } from 'lucide-react';

export function CountriesPage() {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const countries = [
    {
      name: 'United States',
      code: 'US',
      flag: '🇺🇸',
      totalCards: 250,
      popularCategories: ['Shopping', 'Gaming', 'Streaming'],
      topBrands: ['Amazon', 'Apple', 'Google Play'],
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop'
    },
    {
      name: 'United Kingdom',
      code: 'UK',
      flag: '🇬🇧',
      totalCards: 180,
      popularCategories: ['Retail', 'Entertainment', 'Gaming'],
      topBrands: ['Amazon UK', 'Tesco', 'GAME'],
      currency: 'GBP',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop'
    },
    {
      name: 'Canada',
      code: 'CA',
      flag: '🇨🇦',
      totalCards: 150,
      popularCategories: ['Shopping', 'Food', 'Gaming'],
      topBrands: ['Amazon CA', 'Canadian Tire', 'Steam'],
      currency: 'CAD',
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=300&fit=crop'
    },
    {
      name: 'Australia',
      code: 'AU',
      flag: '🇦🇺',
      totalCards: 120,
      popularCategories: ['Retail', 'Dining', 'Entertainment'],
      topBrands: ['Woolworths', 'JB Hi-Fi', 'Coles'],
      currency: 'AUD',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      name: 'Germany',
      code: 'DE',
      flag: '🇩🇪',
      totalCards: 140,
      popularCategories: ['Shopping', 'Tech', 'Gaming'],
      topBrands: ['Amazon DE', 'Saturn', 'MediaMarkt'],
      currency: 'EUR',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop'
    },
    {
      name: 'France',
      code: 'FR',
      flag: '🇫🇷',
      totalCards: 130,
      popularCategories: ['Fashion', 'Dining', 'Entertainment'],
      topBrands: ['Fnac', 'Carrefour', 'Galeries Lafayette'],
      currency: 'EUR',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop'
    },
    {
      name: 'Japan',
      code: 'JP',
      flag: '🇯🇵',
      totalCards: 200,
      popularCategories: ['Gaming', 'Electronics', 'Anime'],
      topBrands: ['Nintendo', 'PlayStation', 'Amazon JP'],
      currency: 'JPY',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop'
    },
    {
      name: 'South Korea',
      code: 'KR',
      flag: '🇰🇷',
      totalCards: 90,
      popularCategories: ['Gaming', 'Beauty', 'Tech'],
      topBrands: ['Steam', 'Olive Young', 'Gmarket'],
      currency: 'KRW',
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop'
    },
    {
      name: 'India',
      code: 'IN',
      flag: '🇮🇳',
      totalCards: 160,
      popularCategories: ['Shopping', 'Food', 'Entertainment'],
      topBrands: ['Amazon IN', 'Flipkart', 'Swiggy'],
      currency: 'INR',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop'
    },
    {
      name: 'Singapore',
      code: 'SG',
      flag: '🇸🇬',
      totalCards: 85,
      popularCategories: ['Dining', 'Shopping', 'Entertainment'],
      topBrands: ['GrabFood', 'Shopee', 'Lazada'],
      currency: 'SGD',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop'
    },
    {
      name: 'Brazil',
      code: 'BR',
      flag: '🇧🇷',
      totalCards: 110,
      popularCategories: ['Gaming', 'Shopping', 'Streaming'],
      topBrands: ['Magazine Luiza', 'Casas Bahia', 'Steam'],
      currency: 'BRL',
      image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=400&h=300&fit=crop'
    },
    {
      name: 'Mexico',
      code: 'MX',
      flag: '🇲🇽',
      totalCards: 95,
      popularCategories: ['Shopping', 'Food', 'Entertainment'],
      topBrands: ['Amazon MX', 'Liverpool', 'Soriana'],
      currency: 'MXN',
      image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=300&fit=crop'
    }
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: any) => {
    navigate('explore', { country: country.code, countryName: country.name });
  };

  const CountryCard = ({ country, index }: { country: any; index: number }) => (
    <div 
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => handleCountrySelect(country)}
    >
      <div className="relative overflow-hidden bg-card border border-border rounded-3xl shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/20 group-hover:to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        <div className="relative">
          {/* Country Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={country.image} 
              alt={country.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Flag and Stats */}
            <div className="absolute top-4 left-4">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-custom">
                {country.flag}
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {country.totalCards} Cards
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-bold mb-1">{country.name}</h3>
              <p className="text-white/80 text-sm">Currency: {country.currency}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Popular Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Popular Categories</h4>
              <div className="flex flex-wrap gap-2">
                {country.popularCategories.map((category: string, catIndex: number) => (
                  <span 
                    key={catIndex}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Brands</h4>
              <div className="space-y-1">
                {country.topBrands.slice(0, 3).map((brand: string, brandIndex: number) => (
                  <div key={brandIndex} className="flex items-center space-x-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-semibold shadow-custom hover:shadow-custom-lg transition-all duration-300 group-hover:scale-105">
              <span>Browse {country.name}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CountryListItem = ({ country, index }: { country: any; index: number }) => (
    <div 
      className="group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => handleCountrySelect(country)}
    >
      <div className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:shadow-custom-lg transition-all duration-300 group-hover:scale-105">
        <div className="flex items-center space-x-6">
          {/* Flag and Image */}
          <div className="relative">
            <img 
              src={country.image} 
              alt={country.name}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-card rounded-lg flex items-center justify-center text-lg shadow-custom">
              {country.flag}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{country.name}</h3>
              <div className="bg-accent px-3 py-1 rounded-full text-sm font-medium">
                {country.totalCards} Cards
              </div>
            </div>
            
            <p className="text-muted-foreground mb-3">Currency: {country.currency}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {country.popularCategories.map((category: string, catIndex: number) => (
                <span 
                  key={catIndex}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Top brands: {country.topBrands.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Global Coverage</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Browse by Country
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Discover gift cards from around the world. Each country offers unique brands and experiences 
              tailored to local preferences and culture.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-custom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              {filteredCountries.length} Countries Available
            </h2>
            <p className="text-muted-foreground">
              Choose your preferred country to browse local gift cards
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Countries Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCountries.map((country, index) => (
              <CountryCard key={country.code} country={country} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCountries.map((country, index) => (
              <CountryListItem key={country.code} country={country} index={index} />
            ))}
          </div>
        )}

        {filteredCountries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No countries found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all available countries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}