import React, { useState } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone, Globe, Check } from 'lucide-react';

export function AuthPage() {
  const { navigate, goBack, router } = useRouter();
  const [isSignUp, setIsSignUp] = useState(router.params?.mode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    agreeToTerms: false,
    newsletter: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    // Redirect to dashboard or back to previous page
    navigate('dashboard');
  };

  const socialLogin = async (provider: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={goBack}
              className="p-2 hover:bg-accent rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{isSignUp ? 'Create Account' : 'Sign In'}</h1>
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Join the global gift card community' : 'Welcome back to GiftCards Global'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-card border border-border rounded-3xl shadow-custom-lg p-8">
          {/* Toggle Sign In/Sign Up */}
          <div className="grid grid-cols-2 gap-2 mb-8 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setIsSignUp(false)}
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isSignUp 
                  ? 'bg-background text-foreground shadow-custom' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isSignUp 
                  ? 'bg-background text-foreground shadow-custom' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => socialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-border rounded-xl hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => socialLogin('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-border rounded-xl hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-5 h-5 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                <span className="text-white dark:text-black text-xs font-bold">🍎</span>
              </div>
              <span>Continue with Apple</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                required
              />
            </div>

            {isSignUp && (
              <>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IN">India</option>
                    <option value="SG">Singapore</option>
                  </select>
                </div>
              </>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isSignUp && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="sr-only"
                      required
                    />
                    <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                      formData.agreeToTerms 
                        ? 'bg-primary border-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}>
                      {formData.agreeToTerms && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    I agree to the <button type="button" className="text-primary hover:underline">Terms of Service</button> and <button type="button" className="text-primary hover:underline">Privacy Policy</button>
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                      formData.newsletter 
                        ? 'bg-primary border-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}>
                      {formData.newsletter && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for exclusive deals and updates
                  </span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || (isSignUp && !formData.agreeToTerms)}
              className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-semibold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            🔒 Your data is encrypted and secure. We never share your information with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}