import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { 
  User, CreditCard, History, Settings, Gift, Heart, 
  Star, Download, Eye, RefreshCw, LogOut, Bell, 
  Globe, Shield, HelpCircle, ChevronRight, Wallet,
  TrendingUp, Package, Calendar
} from 'lucide-react';

export function DashboardPage() {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    walletBalance: 125.50,
    totalSpent: 2850.00,
    ordersCount: 28,
    favoriteCount: 12
  };

  const recentOrders = [
    {
      id: 'GCG-2024001',
      brand: 'Amazon US',
      amount: '$50.00',
      status: 'delivered',
      date: '2024-01-15',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop'
    },
    {
      id: 'GCG-2024002',
      brand: 'Netflix',
      amount: '$25.00',
      status: 'delivered',
      date: '2024-01-12',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop'
    },
    {
      id: 'GCG-2024003',
      brand: 'Steam',
      amount: '$100.00',
      status: 'processing',
      date: '2024-01-10',
      logo: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100&h=100&fit=crop'
    }
  ];

  const favoriteCards = [
    { brand: 'Amazon US', category: 'Shopping', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop' },
    { brand: 'Netflix', category: 'Streaming', logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop' },
    { brand: 'Spotify', category: 'Music', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop' }
  ];

  const walletTransactions = [
    { type: 'purchase', amount: -50.00, description: 'Amazon US Gift Card', date: '2024-01-15' },
    { type: 'refund', amount: 25.00, description: 'Order #GCG-2024000 Refund', date: '2024-01-10' },
    { type: 'purchase', amount: -100.00, description: 'Steam Gift Card', date: '2024-01-08' }
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wallet Balance</p>
                    <p className="text-xl font-bold">${user.walletBalance}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-xl font-bold">${user.totalSpent}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-xl font-bold">{user.ordersCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                    <p className="text-xl font-bold">{user.favoriteCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Orders</h3>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center space-x-4 p-4 hover:bg-accent rounded-xl transition-colors duration-200">
                    <img 
                      src={order.logo} 
                      alt={order.brand}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{order.brand}</h4>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Cards */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Favorite Gift Cards</h3>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favoriteCards.map((card, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-accent border border-border rounded-xl p-4 hover:shadow-custom transition-all duration-200 group-hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={card.logo} 
                          alt={card.brand}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{card.brand}</h4>
                          <p className="text-sm text-muted-foreground">{card.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-card border border-border rounded-2xl shadow-custom">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-semibold">Order History</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-4 p-4 border border-border rounded-xl">
                    <img 
                      src={order.logo} 
                      alt={order.brand}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{order.brand}</h4>
                      <p className="text-sm text-muted-foreground mb-2">Order ID: {order.id}</p>
                      <p className="text-sm text-muted-foreground">Purchased on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{order.amount}</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-2xl p-8 shadow-custom-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg opacity-90 mb-2">Wallet Balance</h3>
                  <p className="text-4xl font-bold">${user.walletBalance}</p>
                </div>
                <div className="text-right">
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                    Add Funds
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-custom">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-semibold">Transaction History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {walletTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          transaction.type === 'purchase' 
                            ? 'bg-red-100 dark:bg-red-900/20'
                            : 'bg-green-100 dark:bg-green-900/20'
                        }`}>
                          {transaction.type === 'purchase' ? (
                            <Gift className="w-5 h-5 text-red-600 dark:text-red-400" />
                          ) : (
                            <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="bg-card border border-border rounded-2xl shadow-custom">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-semibold">Favorite Gift Cards</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCards.map((card, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-accent border border-border rounded-xl p-6 hover:shadow-custom transition-all duration-200 group-hover:scale-105">
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={card.logo} 
                          alt={card.brand}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{card.brand}</h4>
                          <p className="text-sm text-muted-foreground">{card.category}</p>
                        </div>
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                      </div>
                      <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
              <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value="Sarah"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value="Johnson"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <select className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
              <h3 className="text-xl font-semibold mb-6">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive order updates and promotions</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get instant order confirmations</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-muted-foreground">Special offers and product updates</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-custom">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Manage your account and gift card purchases</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom sticky top-24">
                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: TrendingUp },
                    { id: 'orders', label: 'Order History', icon: History },
                    { id: 'wallet', label: 'Wallet', icon: Wallet },
                    { id: 'favorites', label: 'Favorites', icon: Heart },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-primary text-primary-foreground shadow-custom'
                            : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={() => navigate('home')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <TabContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}