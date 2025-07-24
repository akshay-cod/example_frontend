import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { categories, giftCards } from '../data/mockData';
import { ChevronDown, Gift, Gamepad2, Music, ShoppingBag, Car, Heart, Laptop, Plane, Monitor, Smartphone, Headphones, Coffee, Utensils, Shirt, CreditCard, MapPin, Plane as PlaneIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';

const categoryIcons = {
  GAMING: Gamepad2,
  STREAMING: Music,
  retail: ShoppingBag,
  FOOD: Heart,
  tech: Laptop,
  fashion: Shirt,
  TRAVEL: Plane,
  music: Music,
};

// Define subcategories for each main category
const subcategories = {
  all: [
    { id: 'popular', name: 'Popular Gift Cards', icon: Gift },
    { id: 'shopping', name: 'Shopping Gift Cards', icon: ShoppingBag },
    { id: 'entertainment', name: 'Entertainment Gift Cards', icon: Monitor },
    { id: 'fashion-beauty', name: 'Fashion & Beauty Gift Cards', icon: Shirt },
    { id: 'food-grocery', name: 'Food & Grocery Gift Cards', icon: Utensils },
    { id: 'travel-experience', name: 'Travel & Experience Gift Cards', icon: MapPin },
    { id: 'crypto-voucher', name: 'Crypto Voucher Gift Cards', icon: CreditCard },
  ],
  gaming: [
    { id: 'console-games', name: 'PlayStation Gift Cards', icon: Monitor },
    { id: 'pc-games', name: 'Steam Gift Cards', icon: Laptop },
    { id: 'mobile-games', name: 'Razer Gold Gift Cards', icon: Smartphone },
    { id: 'gaming-subscriptions', name: 'PlayStation Gift Cards', icon: CreditCard },
    { id: 'gaming-hardware', name: 'Xbox Live Gift Cards', icon: Headphones },
    { id: 'esports', name: 'Nintendo eShop Cards', icon: Gamepad2 },
  ],
  streaming: [
    { id: 'video-streaming', name: 'Netflix Gift Cards', icon: Monitor },
    { id: 'music-streaming', name: 'Spotify Gift Cards', icon: Music },
    { id: 'live-streaming', name: 'Disney+ Hotstar', icon: Monitor },
    { id: 'entertainment-platforms', name: 'YouTube Premium', icon: Heart },
    { id: 'educational-content', name: 'ZEE5 Gift Cards', icon: Laptop },
    { id: 'regional-content', name: 'SonyLIV Gift Cards', icon: Monitor },
  ],
  retail: [
    { id: 'online-shopping', name: 'Amazon Gift Cards', icon: ShoppingBag },
    { id: 'department-stores', name: 'Flipkart Gift Cards', icon: ShoppingBag },
    { id: 'electronics', name: 'Reliance Digital', icon: Smartphone },
    { id: 'beauty-personal-care', name: 'Nykaa Gift Cards', icon: Heart },
    { id: 'home-garden', name: 'BigBasket Gift Cards', icon: Gift },
    { id: 'fashion-retail', name: 'Myntra Gift Cards', icon: Shirt },
  ],
  tech: [
    { id: 'software-apps', name: 'Apple App Store', icon: Laptop },
    { id: 'cloud-services', name: 'Microsoft Store', icon: Monitor },
    { id: 'development-tools', name: 'Adobe Creative Cloud', icon: Laptop },
    { id: 'education-platforms', name: 'Coursera Gift Cards', icon: Monitor },
    { id: 'productivity-tools', name: 'Udemy Gift Cards', icon: Laptop },
    { id: 'indian-education', name: "BYJU'S Gift Cards", icon: Monitor },
  ],
  food: [
    { id: 'food-delivery', name: 'Zomato Gift Cards', icon: Utensils },
    { id: 'restaurant-chains', name: 'Swiggy Gift Cards', icon: Utensils },
    { id: 'coffee-beverages', name: 'Starbucks Gift Cards', icon: Coffee },
    { id: 'grocery-stores', name: 'BigBasket Vouchers', icon: ShoppingBag },
    { id: 'quick-service', name: "McDonald's Gift Cards", icon: Utensils },
    { id: 'pizza-chains', name: "Domino's Gift Cards", icon: Utensils },
  ],
  fashion: [
    { id: 'clothing-brands', name: 'H&M Gift Cards', icon: Shirt },
    { id: 'indian-fashion', name: 'Myntra Gift Cards', icon: Shirt },
    { id: 'accessories', name: 'Lifestyle Gift Cards', icon: Heart },
    { id: 'beauty-products', name: 'Nykaa Gift Cards', icon: Heart },
    { id: 'luxury-fashion', name: 'Shoppers Stop', icon: Shirt },
    { id: 'ethnic-wear', name: 'FabIndia Gift Cards', icon: Shirt },
  ],
  travel: [
    { id: 'hotels-accommodation', name: 'MakeMyTrip Gift Cards', icon: MapPin },
    { id: 'airlines', name: 'Goibibo Gift Cards', icon: PlaneIcon },
    { id: 'transportation', name: 'Ola Cabs Gift Cards', icon: Car },
    { id: 'travel-booking', name: 'Cleartrip Gift Cards', icon: MapPin },
    { id: 'hotels', name: 'OYO Gift Cards', icon: MapPin },
    { id: 'trains', name: 'IRCTC Gift Cards', icon: Car },
  ],
  music: [
    { id: 'music-streaming-services', name: 'Spotify Gift Cards', icon: Music },
    { id: 'indian-music', name: 'Gaana Plus Gift Cards', icon: Music },
    { id: 'regional-music', name: 'JioSaavn Gift Cards', icon: Music },
    { id: 'international-music', name: 'Apple Music Gift Cards', icon: Music },
    { id: 'youtube-music', name: 'YouTube Music Premium', icon: Music },
  ],
};

export function Ticker() {
  const { navigate } = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: categories, loading, error } = useSelector((state: RootState) => state.category);
// categories

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    navigate('category', { category: categoryId, categoryName });
    setActiveDropdown(null);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string, subcategoryName: string) => {
    navigate('category', { category: categoryId, categoryName: subcategoryName, subcategory: subcategoryId });
    setActiveDropdown(null);
  };

  const getCategoryCards = (categoryId: string) => {
    return giftCards.filter(card => card.category === categoryId).slice(0, 6);
  };

  // const tickerItems = [
  //   {
  //     id: 'all',
  //     label: 'Gift Cards',
  //     icon: Gift,
  //     // hasDropdown: true,
  //   },
  //   {
  //     id: 'gaming',
  //     label: 'Gaming e-Card',
  //     icon: Gamepad2,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'streaming',
  //     label: 'Streaming',
  //     icon: Music,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'retail',
  //     label: 'Shopping',
  //     icon: ShoppingBag,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'tech',
  //     label: 'Technology',
  //     icon: Laptop,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'food',
  //     label: 'Food & Dining',
  //     icon: Heart,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'travel',
  //     label: 'Travel',
  //     icon: Plane,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'music',
  //     label: 'Music',
  //     icon: Music,
  //     hasDropdown: true,
  //   },
  //   {
  //     id: 'fashion',
  //     label: 'Fashion',
  //     icon: Shirt,
  //     hasDropdown: true,
  //   }
  // ];

  // Calculate dropdown position to prevent overflow
  
  let tickerItems = categories?.map((category) => ({
    id: category.slug,
    label: category.name,
    icon: categoryIcons[category.slug as keyof typeof categoryIcons] || Gift,
    // hasDropdown: true,
  }));

  const getDropdownPosition = (index: number, totalItems: number) => {
    const itemsFromRight = totalItems - index;
    if (itemsFromRight <= 2) {
      return 'right-0'; // Position from right edge
    }
    return 'left-0'; // Position from left edge
  };

  return (
    <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-custom">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start overflow-x-auto scrollbar-hide">
          {tickerItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeDropdown === item.id;
            const dropdownPosition = getDropdownPosition(index, tickerItems.length);
            
            return (
              <div
                key={item.id}
                className="relative flex-shrink-0"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    if (item.id === 'all') {
                      navigate('explore');
                    } else {
                      handleCategoryClick(item.id, item.label);
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-accent hover:text-accent-foreground border-b-2 border-transparent hover:border-primary/50 ${
                    isActive ? 'bg-accent text-accent-foreground border-primary/50' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </button>

                {/* Enhanced Dropdown Menu */}
                {item.hasDropdown && isActive && (
                  <div 
                    className={`absolute top-full ${dropdownPosition} mt-1 bg-card border border-border rounded-2xl shadow-custom-xl py-3 z-50 animate-scale-in min-w-[320px] max-w-[380px]`}
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Subcategories Section */}
                    <div className="px-1">
                      <div className="space-y-1">
                        {subcategories[item.id as keyof typeof subcategories]?.map((subcategory) => {
                          const SubIcon = subcategory.icon;
                          return (
                            <button
                              key={subcategory.id}
                              onClick={() => handleSubcategoryClick(item.id, subcategory.id, subcategory.name)}
                              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-accent transition-colors duration-200 text-left group"
                            >
                              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                                <SubIcon className="w-3 h-3 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground group-hover:text-accent-foreground truncate">
                                  {subcategory.name}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Popular Brands Section (for non-all categories) */}
                    {item.id !== 'all' && getCategoryCards(item.id).length > 0 && (
                      <>
                        <div className="mx-3 my-3 border-t border-border"></div>
                        <div className="px-3">
                          <div className="mb-2">
                            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                              Popular Brands
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {getCategoryCards(item.id).map((card) => (
                              <button
                                key={card.id}
                                onClick={() => navigate('gift-card-detail', { card })}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors duration-200 text-left"
                              >
                                <img
                                  src={card.logo}
                                  alt={card.brand}
                                  className="w-6 h-6 object-contain rounded-md bg-white/50 dark:bg-white/90 flex-shrink-0"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=24&h=24&fit=crop`;
                                  }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-xs truncate">{card.brand}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* View All Footer */}
                    <div className="mx-3 mt-3 pt-3 border-t border-border">
                      <button
                        onClick={() => {
                          if (item.id === 'all') {
                            navigate('explore');
                          } else {
                            handleCategoryClick(item.id, item.label);
                          }
                        }}
                        className="w-full py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors text-center"
                      >
                        View All {item.label} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}