import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary to-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-custom-lg">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-xl blur"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  GiftCards Global
                </span>
                <div className="text-xs text-gray-400">The transparent gift card platform</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              The world's most transparent digital gift card platform. 
              No hidden fees, no forex charges, just great savings and instant delivery.
            </p>
            
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button 
                  key={index}
                  className="group p-3 bg-gradient-to-br from-white/5 to-white/10 rounded-xl hover:from-primary/20 hover:to-purple-600/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {['Browse Cards', 'Categories', 'Countries', 'New Arrivals', 'Popular Cards', 'How it Works'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'FAQ', 'Contact Us', 'Refund Policy', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-bold mb-6 text-lg">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest deals and updates delivered to your inbox.
            </p>
            
            <div className="relative mb-6">
              <input 
                type="email"
                placeholder="Enter your email" 
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500 backdrop-blur-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 text-white p-2 rounded-lg hover:scale-105 transition-transform duration-200">
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@giftcardsglobal.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Available Globally</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 GiftCards Global. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Trusted by over 1 million customers worldwide • 256-bit SSL encryption • 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}