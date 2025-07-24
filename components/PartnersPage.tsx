import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { 
  Handshake, TrendingUp, Globe, Shield, Users, DollarSign, 
  CheckCircle, ArrowRight, Mail, Phone, Building, User,
  Star, Zap, Target, BarChart3
} from 'lucide-react';

export function PartnersPage() {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    message: '',
    volume: '',
    countries: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Partner application submitted:', formData);
  };

  const partnershipTypes = [
    {
      title: 'Brand Partnership',
      description: 'Join our marketplace as a gift card provider',
      icon: Handshake,
      benefits: ['Revenue sharing model', 'Global distribution', 'Marketing support', 'Technical integration'],
      ideal: 'Established brands with digital gift card programs'
    },
    {
      title: 'Reseller Program',
      description: 'Sell our gift cards through your platform',
      icon: TrendingUp,
      benefits: ['Competitive margins', 'White-label options', 'API integration', 'Dedicated support'],
      ideal: 'E-commerce platforms, financial services, loyalty programs'
    },
    {
      title: 'Technology Integration',
      description: 'Integrate our gift card solutions into your services',
      icon: Zap,
      benefits: ['API access', 'Custom solutions', 'Technical support', 'Co-marketing opportunities'],
      ideal: 'Payment processors, banking platforms, fintech companies'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to customers in 50+ countries worldwide'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security and fraud protection'
    },
    {
      icon: Users,
      title: 'Large Customer Base',
      description: 'Over 1 million active users and growing'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive reporting and business intelligence'
    },
    {
      icon: DollarSign,
      title: 'Competitive Rates',
      description: 'Attractive commission structures and pricing'
    },
    {
      icon: Target,
      title: 'Marketing Support',
      description: 'Co-marketing opportunities and promotional campaigns'
    }
  ];

  const existingPartners = [
    { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop', category: 'E-commerce' },
    { name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop', category: 'Technology' },
    { name: 'Netflix', logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop', category: 'Streaming' },
    { name: 'Spotify', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop', category: 'Music' },
    { name: 'Steam', logo: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100&h=100&fit=crop', category: 'Gaming' },
    { name: 'Apple', logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100&h=100&fit=crop', category: 'Technology' }
  ];

  const stats = [
    { value: '1M+', label: 'Active Users' },
    { value: '50+', label: 'Countries' },
    { value: '500+', label: 'Brand Partners' },
    { value: '$100M+', label: 'Volume Processed' }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-b border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full border border-green-500/20">
                  <Handshake className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Partnership Opportunities</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                  Partner with Us
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Join the world's leading digital gift card platform. Expand your reach, 
                  increase revenue, and deliver value to customers across the globe.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-2xl font-semibold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105"
                  >
                    Apply Now
                  </button>
                  <button 
                    onClick={() => document.getElementById('partnership-types')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-custom-xl">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="font-semibold mb-4">Trusted by leading brands</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {existingPartners.slice(0, 6).map((partner, index) => (
                        <div key={index} className="w-12 h-12 bg-accent rounded-xl overflow-hidden">
                          <img 
                            src={partner.logo} 
                            alt={partner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-custom-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-custom">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Partnership Programs</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the partnership model that best fits your business goals and objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnershipTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="bg-card border border-border rounded-3xl p-8 shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 h-full">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                        <p className="text-muted-foreground">{type.description}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6 p-4 bg-accent rounded-2xl">
                        <p className="text-sm">
                          <span className="font-medium">Ideal for:</span> {type.ideal}
                        </p>
                      </div>

                      <button className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-semibold hover:shadow-custom transition-all duration-300 group-hover:scale-105">
                        Get Started
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Partner with Us?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join a platform that's revolutionizing the digital gift card industry with innovation and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:shadow-custom-lg transition-all duration-300 group-hover:-translate-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Existing Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Partners</h2>
              <p className="text-xl text-muted-foreground">
                Trusted by leading brands and companies worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {existingPartners.map((partner, index) => (
                <div key={index} className="group text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-20 h-20 mx-auto mb-3 bg-card border border-border rounded-2xl overflow-hidden shadow-custom group-hover:shadow-custom-lg transition-all duration-300 group-hover:scale-110">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold">{partner.name}</h4>
                  <p className="text-sm text-muted-foreground">{partner.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="partnership-form" className="py-20 bg-gradient-to-br from-primary/5 to-purple-600/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Apply for Partnership</h2>
              <p className="text-xl text-muted-foreground">
                Ready to join our network? Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-custom-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Business Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Globe className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
                  <input
                    type="url"
                    placeholder="Company Website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select
                    value={formData.partnershipType}
                    onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                    className="w-full px-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  >
                    <option value="">Select Partnership Type</option>
                    <option value="brand">Brand Partnership</option>
                    <option value="reseller">Reseller Program</option>
                    <option value="technology">Technology Integration</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    value={formData.volume}
                    onChange={(e) => handleInputChange('volume', e.target.value)}
                    className="w-full px-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  >
                    <option value="">Expected Monthly Volume</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="over-500k">Over $500,000</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Target Countries/Regions"
                  value={formData.countries}
                  onChange={(e) => handleInputChange('countries', e.target.value)}
                  className="w-full px-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />

                <textarea
                  placeholder="Tell us about your business and partnership goals..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-semibold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Our partnership team will review your application and respond within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}