import React, { useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { giftCards } from '../data/mockData';
import { Star, Clock, Shield, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchItems } from '@/app/features/items/itemsSlice';

export function FeaturedCards() {
  const { navigate } = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { data: items, loading, error } = useSelector((state: RootState) => state.items);


  useEffect(() => {
    dispatch(fetchItems()); // Assuming fetchItems is an action to fetch gift cards
  },[dispatch])

console.log(items, "items from redux store");
  // Get featured cards (first 8)
  const featuredCards = giftCards.slice(0, 8);

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
    'from-orange-100 to-orange-200'
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
    'text-orange-700'
  ];

  const FeaturedCardItem = ({ card, index }: { card: any; index: number }) => {
    const gradientClass = pastelGradients[index % pastelGradients.length];
    const textColorClass = textColors[index % textColors.length];

    return (
      <div 
        key={card.id}
        className="group cursor-pointer animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => handleCardClick(card)}
      >
        {/* Card Container with 3:4 aspect ratio and pastel background */}
        <div className={`relative bg-gradient-to-br ${gradientClass} rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 aspect-[3/4] border border-white/50`}>
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
                    {getCurrencySymbol(card.currency)}{Math.floor(Math.min(...card.denominations) * (1+(card?.discount/100)))}
                  </p>
                  <p className="text-emerald-600 text-xs font-medium">Save {card?.discount}%</p>
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Featured Gift Cards
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most popular gift cards with instant delivery and no markup fees
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {items?.map((card, index) => (
            <FeaturedCardItem key={card.id} card={card} index={index} />
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('explore')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-custom hover:shadow-custom-lg"
          >
            View All Gift Cards
          </button>
        </div>
      </div>
    </section>
  );
}