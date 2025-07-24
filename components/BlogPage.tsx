import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { Search, Calendar, User, ArrowRight, Tag, TrendingUp, Clock, Eye } from 'lucide-react';

export function BlogPage() {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'guides', name: 'Guides', count: 8 },
    { id: 'news', name: 'News', count: 6 },
    { id: 'tips', name: 'Tips & Tricks', count: 5 },
    { id: 'reviews', name: 'Brand Reviews', count: 3 },
    { id: 'updates', name: 'Platform Updates', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Ultimate Guide to Digital Gift Cards in 2024',
      excerpt: 'Everything you need to know about buying, using, and maximizing the value of digital gift cards across different countries and platforms.',
      content: 'Full article content here...',
      author: 'Sarah Mitchell',
      date: '2024-01-18',
      readTime: '8 min read',
      category: 'guides',
      tags: ['gift cards', 'digital', 'guide'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      featured: true,
      views: 2400
    },
    {
      id: 2,
      title: 'How to Avoid Gift Card Scams: A Complete Safety Guide',
      excerpt: 'Learn how to protect yourself from common gift card scams and ensure your purchases are safe and legitimate.',
      content: 'Full article content here...',
      author: 'Michael Chen',
      date: '2024-01-15',
      readTime: '6 min read',
      category: 'guides',
      tags: ['security', 'scams', 'safety'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      featured: false,
      views: 1800
    },
    {
      id: 3,
      title: 'New Partnership: 50+ Gaming Gift Cards Now Available',
      excerpt: 'We\'re excited to announce our latest partnership bringing you an expanded selection of gaming gift cards from top publishers.',
      content: 'Full article content here...',
      author: 'Emma Rodriguez',
      date: '2024-01-12',
      readTime: '4 min read',
      category: 'news',
      tags: ['gaming', 'partnership', 'announcement'],
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop',
      featured: false,
      views: 1200
    },
    {
      id: 4,
      title: '5 Creative Ways to Use Amazon Gift Cards',
      excerpt: 'Discover innovative and practical ways to make the most of your Amazon gift cards beyond just shopping.',
      content: 'Full article content here...',
      author: 'David Park',
      date: '2024-01-10',
      readTime: '5 min read',
      category: 'tips',
      tags: ['amazon', 'tips', 'creative'],
      image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&h=400&fit=crop',
      featured: false,
      views: 980
    },
    {
      id: 5,
      title: 'Platform Update: Enhanced Mobile Experience',
      excerpt: 'Our latest mobile app update brings improved navigation, faster checkout, and better gift card management features.',
      content: 'Full article content here...',
      author: 'Lisa Wang',
      date: '2024-01-08',
      readTime: '3 min read',
      category: 'updates',
      tags: ['mobile', 'update', 'features'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      featured: false,
      views: 750
    },
    {
      id: 6,
      title: 'Netflix vs. Other Streaming Services: Gift Card Comparison',
      excerpt: 'A comprehensive comparison of streaming service gift cards to help you choose the best entertainment options.',
      content: 'Full article content here...',
      author: 'Alex Thompson',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'reviews',
      tags: ['streaming', 'comparison', 'netflix'],
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
      featured: false,
      views: 1350
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handlePostClick = (post: any) => {
    navigate('blog-post', { postId: post.id, post });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Insights & Updates</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              GiftCards Global Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Stay updated with the latest trends, tips, and news about digital gift cards, 
              platform updates, and industry insights.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-custom"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-custom'
                      : 'bg-card border border-border text-card-foreground hover:shadow-custom'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === 'all' && !searchTerm && (
            <div className="mb-16">
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-custom-lg group cursor-pointer" onClick={() => handlePostClick(featuredPost)}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-80 lg:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                          {featuredPost.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{featuredPost.author}</p>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{featuredPost.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{featuredPost.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article 
                key={post.id} 
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handlePostClick(post)}
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium capitalize">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium">{post.author.split(' ')[0]}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest gift card news, exclusive deals, and platform updates.
            </p>
            <div className="max-w-md mx-auto flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-foreground focus:ring-2 focus:ring-white/20"
              />
              <button className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}