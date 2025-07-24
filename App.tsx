import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { RouterProvider, useRouter } from './contexts/RouterContext';
import { Header } from './components/Header';
import { Ticker } from './components/Ticker';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedCards } from './components/FeaturedCards';
import { BenefitsSection } from './components/BenefitsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ExplorePage } from './components/ExplorePage';
import { GiftCardDetailPage } from './components/GiftCardDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AuthPage } from './components/AuthPage';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';
import { DashboardPage } from './components/DashboardPage';
import { BlogPage } from './components/BlogPage';
import { PartnersPage } from './components/PartnersPage';
import { ProtectedRoute } from './components/hoc/ProtectedRoute';
import { store } from './app/store';
import { Provider } from 'react-redux';

function AppContent() {
  const { router } = useRouter();

  const renderContent = () => {
    switch (router.currentView) {
      case 'explore':
      case 'category':
      case 'search-results':
        return <ExplorePage />;
      
      case 'gift-card-detail':
        return <GiftCardDetailPage />;
      
      case 'checkout':
        return <CheckoutPage />;

      case 'auth':
        return <AuthPage />;
      
      case 'signin':
        return <SignInPage />;
      
      case 'signup':
        return <SignUpPage />;

      case 'dashboard':
      case 'profile':
      case 'orders':
      case 'wallet':
      case 'favorites':
      case 'settings':
        return(<ProtectedRoute> <DashboardPage /> </ProtectedRoute>);

      case 'blog':
        return <BlogPage />;

      case 'blog-post':
        return (
          <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto">
                {router.params?.post ? (
                  <>
                    <img 
                      src={router.params.post.image} 
                      alt={router.params.post.title}
                      className="w-full h-96 object-cover rounded-3xl mb-8"
                    />
                    <h1 className="text-4xl font-bold mb-6">{router.params.post.title}</h1>
                    <div className="flex items-center space-x-4 mb-8 text-muted-foreground">
                      <span>By {router.params.post.author}</span>
                      <span>•</span>
                      <span>{new Date(router.params.post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{router.params.post.readTime}</span>
                    </div>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <p>{router.params.post.excerpt}</p>
                      <p>This is where the full article content would be displayed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <button 
                      onClick={() => window.history.back()}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
                    >
                      Go Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'partners':
        return <PartnersPage />;
      
      case 'about':
        return (
          <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">About GiftCards India</h1>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-xl text-muted-foreground mb-8 text-center">
                    We're revolutionizing the digital gift card industry in India with transparent pricing and instant delivery.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-custom">
                      <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                      <p className="text-muted-foreground">
                        To provide transparent, fee-free access to digital gift cards from India's favorite brands, 
                        making online shopping accessible to everyone.
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-custom">
                      <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                      <p className="text-muted-foreground">
                        Transparency, security, and customer satisfaction are at the core of everything we do. 
                        No hidden fees, ever.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">Why No Markup Fees?</h3>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      We believe that accessing your favorite digital content shouldn't come with hidden costs. 
                      Our platform operates on volume partnerships with Indian and international brands, allowing us to offer 
                      gift cards at face value while still maintaining a sustainable business model.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'support':
        return (
          <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Support Center</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                    { title: "FAQ", description: "Find answers to common questions", icon: "❓" },
                    { title: "Contact Us", description: "Get in touch with our team", icon: "📧" },
                    { title: "Live Chat", description: "Chat with support agents", icon: "💬" },
                    { title: "Order Help", description: "Issues with your orders", icon: "📦" },
                    { title: "Account Help", description: "Manage your account", icon: "👤" },
                    { title: "Payment Issues", description: "Payment and billing support", icon: "💳" }
                  ].map((item, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:shadow-custom-lg transition-all duration-300 cursor-pointer">
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
                  <p className="text-muted-foreground mb-6">
                    Our support team is available 24/7 to assist you with any questions or issues.
                  </p>
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
                
                <div className="space-y-6">
                  {[
                    {
                      question: "How do I purchase a gift card?",
                      answer: "Simply browse our selection, choose your desired gift card, select the denomination, and complete the checkout process. Your gift card will be delivered instantly to your email."
                    },
                    {
                      question: "Are there really no hidden fees?",
                      answer: "Absolutely! We pride ourselves on transparent pricing. The price you see is exactly what you pay - no markup, no forex fees, no hidden charges."
                    },
                    {
                      question: "How quickly will I receive my gift card?",
                      answer: "Digital gift cards are delivered instantly upon successful payment. Check your email inbox (and spam folder) for your gift card details."
                    },
                    {
                      question: "Can I get a refund on my gift card?",
                      answer: "Refund policies vary by brand. Most digital gift cards are non-refundable once delivered, but we offer a 30-day money-back guarantee for certain circumstances."
                    },
                    {
                      question: "Do you offer customer support?",
                      answer: "Yes! Our customer support team is available 24/7 via live chat, email, or phone to assist with any questions or issues."
                    },
                    {
                      question: "Which payment methods do you accept?",
                      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                      <h3 className="font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <main className="pt-12">
            <HeroSection />
            <CategoriesSection />
            <FeaturedCards />
            <BenefitsSection />
            <TestimonialsSection />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Ticker />
      {renderContent()}
      {['home', 'about', 'support', 'faq', 'blog', 'partners'].includes(router.currentView) && <Footer />}
    </div>
  );
}

console.log("App component loaded",store.getState());
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </ThemeProvider>
    </Provider>
  );
}