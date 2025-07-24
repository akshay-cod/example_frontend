import React, { useState, useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { giftCards } from '../data/mockData';
import { ArrowLeft, Star, Clock, Shield, Globe, Check, Minus, Plus, CreditCard, Zap, Heart, Share2, Users, Award, Verified, Gift, Sparkles, TrendingUp, Eye, Copy, Calendar, User, Mail } from 'lucide-react';

export function GiftCardDetailPage() {
  const { navigate, goBack, router } = useRouter();
  
  // Handle both direct card object and cardId navigation
  let card;
  if (router.params?.card) {
    // Card object passed directly (from FeaturedCards, ExplorePage, etc.)
    card = router.params.card;
  } else if (router.params?.cardId) {
    // CardId passed, find the card
    card = giftCards.find(c => c.id === router.params.cardId);
  }
  
  const [selectedDenomination, setSelectedDenomination] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 500) + 100);

  // Set first denomination as default
  useEffect(() => {
    if (card && card.denominations && card.denominations?.length > 0) {
      setSelectedDenomination(Math.min(...card.denominations));
    }
  }, [card]);

  // Increment view count on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewCount(prev => prev + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum date (1 year from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split('T')[0];
  };

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/20 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full animate-pulse"></div>
            <Gift className="w-12 h-12 text-primary relative z-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Gift Card Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">The gift card you're looking for doesn't exist or has been removed from our catalog.</p>
          <button
            onClick={goBack}
            className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-2xl hover:scale-105 transition-all duration-300 shadow-custom-lg hover:shadow-custom-xl"
          >
            Go Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const total = selectedDenomination ? selectedDenomination * quantity : 0;

  const handleProceedToCheckout = () => {
    if (!selectedDenomination) return;
    
    navigate('checkout', {
      card,
      selectedDenomination,
      quantity,
      total,
      email,
      isGift,
      deliveryDate: isGift ? deliveryDate : null,
      recipientName: isGift ? recipientName : null,
      recipientEmail: isGift ? recipientEmail : null,
      giftMessage: isGift ? giftMessage : null
    });
  };

  const getCurrencySymbol = (currency: string) => {
    return '₹'; // Always INR for India
  };

  // Enhanced pastel gradients for the main card
  const cardGradients = [
    'from-rose-400 via-pink-300 to-purple-400',
    'from-blue-400 via-cyan-300 to-teal-400',
    'from-purple-400 via-violet-300 to-indigo-400',
    'from-green-400 via-emerald-300 to-teal-400',
    'from-yellow-400 via-orange-300 to-red-400',
    'from-indigo-400 via-purple-300 to-pink-400',
    'from-teal-400 via-cyan-300 to-blue-400',
    'from-orange-400 via-red-300 to-pink-400'
  ];

  const gradientClass = cardGradients[Math.abs(card?.slug?.length) % cardGradients?.length];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card?.slug} Gift Card`,
          text: `Check out this ${card?.slug} gift card with no markup fees!`,
          url: window.location?.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location?.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Floating Header */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-custom">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={goBack}
                className="group p-3 hover:bg-accent/80 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              <div>
                <h1 className="font-bold text-lg">{card?.slug} Gift Card</h1>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <span className="mr-2">🇮🇳</span>
                    {"India"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {viewCount} views
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`group p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  isLiked ? 'bg-red-500/10 text-red-500' : 'hover:bg-accent/80'
                }`}
              >
                <Heart className={`w-5 h-5 transition-all duration-300 ${
                  isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'
                }`} />
              </button>
              <button 
                onClick={handleShare}
                className="group p-3 hover:bg-accent/80 rounded-2xl transition-all duration-300 hover:scale-110"
              >
                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-36 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Main Content - Spans 2 columns */}
            <div className="xl:col-span-2 space-y-10">
              {/* Enhanced Hero Gift Card Section */}
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl blur-3xl animate-pulse"></div>
                <div className="relative">
                  {/* Trending Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1 shadow-custom-lg animate-bounce">
                      <TrendingUp className="w-3 h-3" />
                      <span>TRENDING</span>
                      <Sparkles className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Gift Card Display */}
                  <div className="relative max-w-2xl mx-auto mt-8">
                    <div className={`relative bg-gradient-to-br ${gradientClass} rounded-3xl p-12 shadow-custom-xl overflow-hidden aspect-[16/10] group hover:scale-105 transition-all duration-700`}>
                      {/* Enhanced Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full blur-xl animate-pulse delay-500"></div>
                        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full blur-lg animate-pulse delay-1000"></div>
                        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-white rounded-full blur-xl animate-pulse delay-700"></div>
                      </div>

                      {/* Floating particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${10 + i * 12}%`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: `${2 + i * 0.3}s`
                            }}
                          />
                        ))}
                      </div>

                      {/* Card Content */}
                      <div className="relative h-full flex flex-col justify-between text-white z-10">
                        {/* Top Section */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-custom">
                              <img
                                src={card?.logo}
                                alt={card?.brand}
                                className="w-14 h-14 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=56&h=56&fit=crop`;
                                }}
                              />
                            </div>
                            <div>
                              <h2 className="font-bold text-3xl mb-1 group-hover:scale-105 transition-transform duration-300">{card.brand}</h2>
                              <p className="text-white/90 text-lg">Gift Card</p>
                            </div>
                          </div>

                          {card.instantDelivery && (
                            <div className="bg-emerald-500/90 backdrop-blur-sm px-5 py-3 rounded-full flex items-center space-x-2 hover:scale-110 transition-transform duration-300 shadow-custom">
                              <Zap className="w-5 h-5 animate-pulse" />
                              <span className="font-bold">Instant</span>
                            </div>
                          )}
                        </div>

                        {/* Middle Section */}
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-lg px-8 py-4 rounded-full hover:scale-110 transition-all duration-300 shadow-custom">
                            <Gift className="w-6 h-6" />
                            <span className="font-bold text-lg">Digital Gift Card</span>
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex items-end justify-between">
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            <p className="text-white/90 text-sm mb-1">Starting from</p>
                            <p className="font-bold text-4xl">
                              {getCurrencySymbol(card?.currency)}{Math.min(...card.denominations)}
                            </p>
                            <p className="text-white/80 text-sm mt-1">No markup fees</p>
                          </div>
                          <div className="text-right group-hover:scale-110 transition-transform duration-300">
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                              ))}
                              <span className="text-sm ml-1">4.9</span>
                            </div>
                            <p className="text-white/90 text-sm">Trusted by millions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                {[
                  {
                    icon: Shield,
                    title: "Bank-Level Security",
                    description: "256-bit SSL encryption protects your transactions",
                    color: "from-green-500/20 to-emerald-600/20",
                    iconColor: "text-green-600",
                    stat: "100%",
                    statLabel: "Secure"
                  },
                  {
                    icon: Clock,
                    title: "Instant Delivery",
                    description: "Receive your gift card within seconds",
                    color: "from-blue-500/20 to-primary/20",
                    iconColor: "text-primary",
                    stat: "<30s",
                    statLabel: "Delivery"
                  },
                  {
                    icon: Globe,
                    title: "Zero Forex Fees",
                    description: "No hidden charges or markup fees",
                    color: "from-purple-500/20 to-pink-600/20",
                    iconColor: "text-purple-600",
                    stat: "0%",
                    statLabel: "Extra fees"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-8 text-center hover:shadow-custom-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-custom`}>
                        <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
                        {feature.stat}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 inline mr-1 text-green-600" />
                      {feature.statLabel}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Product Details */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-10 shadow-custom-lg animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">About {card.brand} Gift Card</h3>
                </div>
                <div dangerouslySetInnerHTML={{__html: card?.description}} className="text-muted-foreground leading-relaxed text-lg mb-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-bold text-lg flex items-center">
                      <Gift className="w-5 h-5 mr-2 text-primary" />
                      What You Get
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Digital gift card code",
                        "Instant email delivery",
                        "Valid for 12 months",
                        "No expiry on balance"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="group-hover:text-primary transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold text-lg flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      How to Use
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Complete your purchase",
                        "Check your email inbox",
                        "Copy the gift card code",
                        "Redeem on brand website"
                      ].map((step, index) => (
                        <div key={index} className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 font-bold text-primary">
                            {index + 1}
                          </div>
                          <span className="group-hover:text-primary transition-colors duration-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Customer Reviews */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-10 shadow-custom-lg animate-fade-in-up">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold gradient-text">Customer Reviews</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-xl">4.9</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">2,341 reviews</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">97%</div>
                    <div className="text-sm text-muted-foreground">Recommend</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      name: "Sarah M.", 
                      rating: 5, 
                      comment: "Lightning fast delivery! Got my gift card code within 30 seconds of payment. The whole process was seamless and professional.", 
                      time: "2 days ago",
                      verified: true
                    },
                    { 
                      name: "Raj P.", 
                      rating: 5, 
                      comment: "Best platform for buying gift cards in India. Transparent pricing with no hidden fees. Genuine codes every single time!", 
                      time: "1 week ago",
                      verified: true
                    },
                    { 
                      name: "Emma K.", 
                      rating: 4, 
                      comment: "Great selection of brands and reliable service. Customer support is also very helpful and responsive.", 
                      time: "2 weeks ago",
                      verified: false
                    },
                    { 
                      name: "Arjun S.", 
                      rating: 5, 
                      comment: "Transparent pricing and instant delivery. Exactly what they promise with zero complications. Highly recommended!", 
                      time: "3 weeks ago",
                      verified: true
                    }
                  ].map((review, index) => (
                    <div key={index} className="group bg-background/70 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:shadow-custom-lg transition-all duration-300 hover:scale-105">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center shadow-custom">
                            <span className="font-bold">{review.name[0]}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{review.name}</span>
                              {review.verified && (
                                <Verified className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded-full">{review.time}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Sticky Purchase Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-36">
                <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 shadow-custom-xl animate-scale-in">
                  {/* Enhanced Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-custom">
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 gradient-text">Purchase Gift Card</h2>
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">1M+ happy customers</span>
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Enhanced Denomination Selection */}
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                      <span>Choose Amount</span>
                      <Award className="w-5 h-5 ml-2 text-primary" />
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {card.denominations.map((amount, index) => (
                        <button
                          key={amount}
                          onClick={() => setSelectedDenomination(amount)}
                          className={`group relative p-5 border-2 rounded-2xl transition-all duration-300 text-left overflow-hidden ${
                            selectedDenomination === amount
                              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg scale-105'
                              : 'border-border hover:border-primary/50 hover:bg-accent hover:scale-102'
                          }`}
                        >
                          {/* Animated background */}
                          {selectedDenomination === amount && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5 animate-pulse"></div>
                          )}
                          
                          <div className="relative flex items-center justify-between">
                            <div>
                              <div className="font-bold text-xl mb-1">{getCurrencySymbol(card.currency)}{amount}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Sparkles className="w-3 h-3 mr-1" />
                                {index === 0 ? 'Most Popular' : 'Best Value'}
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                              selectedDenomination === amount
                                ? 'border-primary bg-primary shadow-custom'
                                : 'border-muted-foreground group-hover:border-primary'
                            }`}>
                              {selectedDenomination === amount && (
                                <Check className="w-4 h-4 text-primary-foreground animate-scale-in" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Quantity */}
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Quantity</h3>
                    <div className="flex items-center justify-center space-x-6 bg-gradient-to-r from-accent/50 to-muted/50 rounded-2xl p-6 shadow-custom">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 border-2 border-border rounded-2xl hover:bg-background hover:border-primary transition-all duration-300 flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="text-center">
                        <div className="text-3xl font-bold w-16 text-center">{quantity}</div>
                        <div className="text-xs text-muted-foreground">Cards</div>
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 border-2 border-border rounded-2xl hover:bg-background hover:border-primary transition-all duration-300 flex items-center justify-center hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Email Input */}
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-3">Delivery Email</h3>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 border-2 border-border rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/70 backdrop-blur-sm text-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Your email is secure and will only be used for delivery
                    </p>
                  </div>

                  {/* Gift Options */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <input
                        type="checkbox"
                        id="isGift"
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                        className="w-5 h-5 text-primary rounded border-2 border-border focus:ring-2 focus:ring-primary/20"
                      />
                      <label htmlFor="isGift" className="font-bold text-lg flex items-center cursor-pointer">
                        <Gift className="w-5 h-5 mr-2 text-primary" />
                        This is a gift
                      </label>
                    </div>
                    
                    {isGift && (
                      <div className="space-y-6 p-6 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl border border-primary/20 animate-scale-in">
                        {/* Recipient Name */}
                        <div>
                          <label className="block font-semibold mb-2 flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary" />
                            Recipient Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter recipient's name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/70"
                          />
                        </div>

                        {/* Recipient Email */}
                        <div>
                          <label className="block font-semibold mb-2 flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-primary" />
                            Recipient Email
                          </label>
                          <input
                            type="email"
                            placeholder="recipient@email.com"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/70"
                          />
                          <p className="text-xs text-muted-foreground mt-2 flex items-center">
                            <Shield className="w-3 h-3 mr-1" />
                            Gift card will be sent to this email address
                          </p>
                        </div>

                        {/* Delivery Date */}
                        <div>
                          <label className="block font-semibold mb-2 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            Delivery Date
                          </label>
                          <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            min={getMinDate()}
                            max={getMaxDate()}
                            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/70"
                          />
                          <p className="text-xs text-muted-foreground mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Gift will be delivered on this date at 9:00 AM
                          </p>
                        </div>

                        {/* Gift Message */}
                        <div>
                          <label className="block font-semibold mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-primary" />
                            Personal Message (Optional)
                          </label>
                          <textarea
                            placeholder="Write a personal message for your gift..."
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            rows={3}
                            maxLength={200}
                            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/70 resize-none"
                          />
                          <p className="text-xs text-muted-foreground mt-1 text-right">
                            {giftMessage?.length}/200 characters
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Total */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 via-purple-600/10 to-primary/10 rounded-2xl border-2 border-primary/20 shadow-custom">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="text-3xl font-bold gradient-text">
                        {total > 0 ? `${getCurrencySymbol(card.currency)}${total}` : 'Select amount'}
                      </span>
                    </div>
                    {selectedDenomination && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{quantity} × {getCurrencySymbol(card.currency)}{selectedDenomination}</span>
                        <span className="text-green-600 font-bold flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          No extra fees!
                        </span>
                      </div>
                    )}
                    {isGift && deliveryDate && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Scheduled for {new Date(deliveryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Buy Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={!selectedDenomination || !email || (isGift && (!deliveryDate || !recipientName || !recipientEmail))}
                    className="w-full py-5 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-2xl font-bold shadow-custom-xl hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-4 text-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CreditCard className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">
                      {isGift ? 'Schedule Gift' : 'Buy Now'}
                    </span>
                    {isGift ? (
                      <Calendar className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                    ) : (
                      <Zap className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center justify-center space-x-1">
                        <Shield className="w-4 h-4" />
                        <span>Secure payment</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Check className="w-4 h-4" />
                        <span>30-day guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}