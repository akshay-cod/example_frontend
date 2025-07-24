import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { giftCards, categories } from '../data/mockData';
import { Search, Filter, ArrowLeft, Grid, List, SlidersHorizontal, Star, Clock, Shield, ChevronDown, MapPin, Zap } from 'lucide-react';
import { fetchAllItems } from '@/app/features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';

export function ExplorePage() {
  const { navigate, goBack, router } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState(router.params?.query || '');
  const [selectedCategory, setSelectedCategory] = useState(router.params?.category || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [instantDelivery, setInstantDelivery] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const { allItems: items, allItemsLoading, error } = useSelector((state: RootState) => state.items);

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: '0-500', label: 'Under ₹500' },
    { id: '500-1000', label: '₹500 - ₹1,000' },
    { id: '1000-2500', label: '₹1,000 - ₹2,500' },
    { id: '2500+', label: '₹2,500+' }
  ];

  useEffect(()=>{
    dispatch(fetchAllItems({ skip: 0, limit: 10, searchKey: 'shoes' }));
  },[dispatch])


  const filteredCards = useMemo(() => {
    let filtered = giftCards.filter(card => {
      const matchesSearch = !searchQuery || 
        card.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      const matchesInstantDelivery = !instantDelivery || card.instantDelivery;

      let matchesPrice = true;
      if (priceRange !== 'all') {
        const minPrice = Math.min(...card.denominations);
        switch (priceRange) {
          case '0-500':
            matchesPrice = minPrice < 500;
            break;
          case '500-1000':
            matchesPrice = minPrice >= 500 && minPrice <= 1000;
            break;
          case '1000-2500':
            matchesPrice = minPrice >= 1000 && minPrice <= 2500;
            break;
          case '2500+':
            matchesPrice = minPrice > 2500;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice && matchesInstantDelivery;
    });

    // Sort logic
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => Math.min(...a.denominations) - Math.min(...b.denominations));
        break;
      case 'price-high':
        filtered.sort((a, b) => Math.min(...b.denominations) - Math.min(...a.denominations));
        break;
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default:
        // Popular - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, instantDelivery, sortBy]);

  const handleCardClick = (card: any) => {
    navigate('gift-card-detail', { card });
  };

  const getCurrencySymbol = (currency: string) => {
    return '₹'; // Always INR for India
  };

  // Pastel color gradients for different card types
  const pastelGradients = [
    'from-pink-100 to-pink-200',
    'from-blue-100 to-blue-200', 
    'from-purple-100 to-purple-200',
    'from-green-100 to-green-200',
    'from-yellow-100 to-yellow-200',
    'from-indigo-100 to-indigo-200',
    'from-teal-100 to-teal-200',
    'from-orange-100 to-orange-200',
    'from-rose-100 to-rose-200',
    'from-cyan-100 to-cyan-200',
    'from-violet-100 to-violet-200',
    'from-emerald-100 to-emerald-200'
  ];

  // Text colors that pair with pastel backgrounds
  const textColors = [
    'text-pink-700',
    'text-blue-700',
    'text-purple-700', 
    'text-green-700',
    'text-yellow-700',
    'text-indigo-700',
    'text-teal-700',
    'text-orange-700',
    'text-rose-700',
    'text-cyan-700',
    'text-violet-700',
    'text-emerald-700'
  ];

  const GiftCardItem = ({ card, index }: { card: any; index: number }) => {
    const gradientClass = pastelGradients[index % pastelGradients.length];
    const textColorClass = textColors[index % textColors.length];
    // dispatch(fetchAllItems({ skip: 0, limit: 10, searchKey: 'shoes' }));

    if (viewMode === 'list') {
      return (
        <div 
          key={card.id}
          className="group cursor-pointer animate-fade-in-up bg-card border border-border rounded-xl p-6 shadow-custom hover:shadow-custom-lg transition-all duration-300"
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => handleCardClick(card)}
        >
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
              <img
                src={card.logo}
                alt={card.brand}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=48&h=48&fit=crop`;
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{card.brand}</h3>
                  <p className="text-muted-foreground text-sm mb-2">Gift Card</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                    {card.instantDelivery && (
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span>Instant Delivery</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="text-2xl font-bold">
                    {getCurrencySymbol(card.currency)}{Math.min(...card.denominations)}
                  </p>
                  <p className="text-xs text-muted-foreground line-through">
                    {getCurrencySymbol(card.currency)}{Math.floor(Math.min(...card.denominations) * 1.1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        key={card._id}
        className="group cursor-pointer animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => handleCardClick(card)}
      >
        {/* Card Container with 3:4 aspect ratio and pastel background */}
        <div className={`relative bg-gradient-to-br ${gradientClass} rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 min-h-[350px] h-auto" border border-white/50`}>
          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-white/10 group-hover:from-white/30 group-hover:to-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          <div className="relative h-full flex flex-col p-6">
            {/* Top Section - Badges */}
            <div className="flex items-start justify-between mb-6">
              {/* India Badge - Simple and elegant */}
              <div className="bg-white/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                🇮🇳 India
              </div>

              {/* Instant Delivery Badge */}
              {card.instantDelivery && (
                <div className="bg-emerald-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  ⚡ Instant
                </div>
              )}
            </div>

            {/* Brand Logo - Center */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="relative w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-custom flex items-center justify-center">
                <img
                  src={card.logo}
                  alt={card.brand}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=56&h=56&fit=crop`;
                  }}
                />
              </div>
            </div>

            {/* Brand Name */}
            <div className="text-center mb-3">
              <h3 className={`${textColorClass} font-bold text-xl leading-tight`}>
                {card.brand}
              </h3>
            </div>

            {/* Gift Card Label */}
            <div className="text-center mb-6">
              <span className={`${textColorClass} opacity-70 text-sm font-medium tracking-wider`}>
                GIFT CARD
              </span>
            </div>

            {/* Price Section */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs mb-1">From</p>
                  <p className={`${textColorClass} font-bold text-xl`}>
                    {getCurrencySymbol(card.currency)}{Math.min(...card.denominations)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs line-through">
                    {getCurrencySymbol(card.currency)}{Math.floor(Math.min(...card.denominations) * 1.1)}
                  </p>
                  <p className="text-emerald-600 text-xs font-medium">Save 10%</p>
                </div>
              </div>
            </div>

            {/* Features Bar */}
            <div className={`flex items-center justify-between ${textColorClass} opacity-70 text-xs`}>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
              </div>
              {card.instantDelivery && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Instant</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <span>4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  console.log(items, "items from redux store");

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <div className="sticky top-24 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={goBack}
                className="p-2 hover:bg-accent rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">
                  {router.params?.categoryName || 'Explore Gift Cards'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredCards.length} cards available in India
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors duration-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:block">Filters</span>
              </button>

              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom sticky top-32">
              <h3 className="font-semibold mb-6">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search gift cards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instant Delivery */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={instantDelivery}
                    onChange={(e) => setInstantDelivery(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm font-medium">Instant Delivery Only</span>
                </label>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="brand">Brand A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {filteredCards.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No gift cards found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms to find more cards.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setInstantDelivery(false);
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-6'
              }>
                {items.map((card, index) => (
                  <GiftCardItem key={card._id} card={card} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}