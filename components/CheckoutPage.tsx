import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { ArrowLeft, Lock, CreditCard, Smartphone, Calendar, User, Mail, MapPin, Check, AlertCircle, Shield } from 'lucide-react';

export function CheckoutPage() {
  const { navigate, goBack, router } = useRouter();
  const { card, selectedDenomination, quantity, total, email, isGift, deliveryDate, recipientName, recipientEmail, giftMessage } = router.params;
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [formData, setFormData] = useState({
    email: email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!card) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Invalid Checkout Session</h2>
          <button
            onClick={() => navigate('home')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-scale-in">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Order Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Your {card.brand} gift card has been sent to {formData.email}
          </p>
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <div className="text-sm text-muted-foreground mb-1">Order #</div>
            <div className="font-mono text-sm">GCG-{Date.now()}</div>
          </div>
          <button
            onClick={() => navigate('home')}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={goBack}
              className="p-2 hover:bg-accent rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Secure Checkout</h1>
              <p className="text-sm text-muted-foreground">Complete your purchase</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Payment Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Checkout or Sign In */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <h3 className="font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Account Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
                    <div>
                      <p className="font-medium">Continue as Guest</p>
                      <p className="text-sm text-muted-foreground">Quick checkout without account creation</p>
                    </div>
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">Or sign in for faster checkout</p>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => navigate('signin')}
                        className="flex-1 py-3 px-4 border-2 border-primary text-primary rounded-xl hover:bg-primary/10 transition-all duration-200 font-medium"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('signup')}
                        className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>
                  {isGift && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl border border-primary/20">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Gift Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recipient:</span>
                          <span className="font-medium">{recipientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Email:</span>
                          <span className="font-medium">{recipientEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Date:</span>
                          <span className="font-medium">{new Date(deliveryDate).toLocaleDateString()}</span>
                        </div>
                        {giftMessage && (
                          <div className="mt-3 p-3 bg-background/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Personal Message:</p>
                            <p className="text-sm italic">"{giftMessage}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Billing Address
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  Payment Method
                </h3>
                
                {/* Payment Method Selection */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Card</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      paymentMethod === 'paypal' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">PayPal</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      paymentMethod === 'bank' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Bank</div>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={formData.nameOnCard}
                      onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* PayPal */}
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-muted-foreground">You'll be redirected to PayPal to complete your payment</p>
                  </div>
                )}

                {/* Bank Transfer */}
                {paymentMethod === 'bank' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-muted-foreground">Bank transfer details will be provided after order confirmation</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-semibold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Complete Purchase</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-8">
            <div className="sticky top-32">
              {/* Order Summary */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-custom-lg">
                <h3 className="font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={card.logo}
                      alt={card.brand}
                      className="w-16 h-16 object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop`;
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{card.brand} Gift Card</h4>
                      <p className="text-sm text-muted-foreground">{card.country}</p>
                    </div>
                  </div>
                  
                  <div className="bg-accent rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Amount</span>
                      <span className="font-medium">{selectedDenomination} {card.currency}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Quantity</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Delivery</span>
                      <span>Instant</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>{total} {card.currency}</span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">Secure Payment</h4>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>30-day money back guarantee</span>
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