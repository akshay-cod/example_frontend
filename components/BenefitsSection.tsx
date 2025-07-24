import React from 'react';
import { Shield, Zap, Globe, CreditCard, Clock, Users, CheckCircle, Award } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Zero Hidden Fees',
    description: 'What you see is what you pay. No markup fees, no hidden charges, no surprises at checkout.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-500/10 to-orange-500/10',
    iconColor: 'text-orange-600',
    stat: '0%',
    statLabel: 'Hidden fees'
  },
  {
    icon: Globe,
    title: 'No Forex Charges',
    description: 'Buy international gift cards without worrying about currency conversion fees.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-600',
    stat: '190+',
    statLabel: 'Countries'
  },
  {
    icon: Clock,
    title: 'Instant Delivery',
    description: 'Get your digital gift cards delivered to your email within seconds of purchase.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/10',
    iconColor: 'text-green-600',
    stat: '<30s',
    statLabel: 'Delivery time'
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your transactions are protected with enterprise-grade security and encryption.',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'from-purple-500/10 to-violet-500/10',
    iconColor: 'text-purple-600',
    stat: '256-bit',
    statLabel: 'Encryption'
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Pay with credit cards, debit cards, digital wallets, or bank transfers.',
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-500/10 to-pink-500/10',
    iconColor: 'text-pink-600',
    stat: '15+',
    statLabel: 'Payment methods'
  },
  {
    icon: Users,
    title: '24/7 Expert Support',
    description: 'Our customer support team is always ready to help you with any questions.',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'from-indigo-500/10 to-blue-500/10',
    iconColor: 'text-indigo-600',
    stat: '24/7',
    statLabel: 'Live support'
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-500/20">
            <Award className="w-4 h-4 mr-2 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Why We're Different</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Why Choose GiftCards Global?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how you buy digital gift cards with transparent pricing, 
            instant delivery, and unmatched customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden bg-card border border-border rounded-3xl shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 h-full">
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${benefit.bgColor} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon with background */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgColor} rounded-2xl blur-sm group-hover:blur-md transition-all duration-300`}></div>
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${benefit.bgColor} border border-border/50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-custom`}>
                        <IconComponent className={`w-8 h-8 ${benefit.iconColor} group-hover:text-primary-foreground transition-colors duration-300`} />
                      </div>
                      
                      {/* Stat badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-custom">
                        {benefit.stat}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {benefit.description}
                      </p>
                      
                      <div className="text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 inline mr-2 text-green-600" />
                        {benefit.statLabel}
                      </div>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-custom">
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Gift Cards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}