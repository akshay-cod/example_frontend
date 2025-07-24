import React, { useState, useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { Mail, Smartphone, Eye, EyeOff, Shield, ArrowLeft, Check, User, Calendar, KeyRound, MessageSquare, ArrowRight } from 'lucide-react';

type SignUpStep = 'method' | 'details' | 'otp' | 'password' | 'complete';

export function SignUpPage() {
  const { navigate, goBack } = useRouter();
  const [currentStep, setCurrentStep] = useState<SignUpStep>('method');
  const [signupMethod, setSignupMethod] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    agreeTerms: false,
    subscribeNewsletter: false
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // OTP Timer
  useEffect(() => {
    if (currentStep === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
    }
  }, [currentStep, otpTimer]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`[data-otp-index="${index + 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`[data-otp-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('details');
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setCurrentStep('otp');
    setOtpTimer(30);
    setCanResendOtp(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setCurrentStep('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setCurrentStep('complete');
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    
    // Simulate resend OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setOtpTimer(30);
    setCanResendOtp(false);
    setOtp(['', '', '', '', '', '']);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    navigate('dashboard');
  };

  const renderProgressBar = () => {
    const steps = ['method', 'details', 'otp', 'password', 'complete'];
    const currentIndex = steps.indexOf(currentStep);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    return (
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Step {currentIndex + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  const renderMethodSelection = () => (
    <form onSubmit={handleMethodSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Sign Up Method</h2>
        <p className="text-muted-foreground">How would you like to create your account?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          type="button"
          onClick={() => setSignupMethod('email')}
          className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
            signupMethod === 'email'
              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              signupMethod === 'email'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Email Address</h3>
              <p className="text-sm text-muted-foreground">Sign up using your email address</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              signupMethod === 'email'
                ? 'border-primary bg-primary'
                : 'border-muted-foreground'
            }`}>
              {signupMethod === 'email' && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSignupMethod('mobile')}
          className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
            signupMethod === 'mobile'
              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              signupMethod === 'mobile'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Mobile Number</h3>
              <p className="text-sm text-muted-foreground">Sign up using your mobile number</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              signupMethod === 'mobile'
                ? 'border-primary bg-primary'
                : 'border-muted-foreground'
            }`}>
              {signupMethod === 'mobile' && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>Continue</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );

  const renderDetailsForm = () => (
    <form onSubmit={handleDetailsSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="John"
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Doe"
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
            required
          />
        </div>
      </div>

      {/* Email/Mobile Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {signupMethod === 'email' ? 'Email Address' : 'Mobile Number'}
        </label>
        {signupMethod === 'email' ? (
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
            required
          />
        ) : (
          <div className="flex">
            <div className="flex items-center px-4 py-3 border-2 border-border border-r-0 rounded-l-xl bg-muted/50">
              <span className="text-sm font-medium">+91</span>
            </div>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="9876543210"
              className="flex-1 px-4 py-3 border-2 border-border rounded-r-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
              required
            />
          </div>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium mb-2">Date of Birth</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
          required
        />
      </div>

      {/* Terms Agreement */}
      <div className="space-y-3">
        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
            className="w-4 h-4 text-primary rounded border-border focus:ring-2 focus:ring-primary/20 mt-1"
            required
          />
          <span className="text-sm text-muted-foreground">
            I agree to the{' '}
            <button
              type="button"
              onClick={() => navigate('terms')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => navigate('privacy')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Privacy Policy
            </button>
          </span>
        </label>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentStep('method')}
          className="flex-1 py-4 border-2 border-border text-foreground rounded-xl font-bold hover:bg-accent/50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.agreeTerms}
          className="flex-1 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              <span>Send OTP</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderOtpVerification = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verify Your {signupMethod === 'email' ? 'Email' : 'Mobile'}</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-foreground">
            {signupMethod === 'email' ? formData.email : `+91 ${formData.mobile}`}
          </span>
        </p>
      </div>

      {/* OTP Input */}
      <div>
        <label className="block text-sm font-medium mb-4 text-center">Enter Verification Code</label>
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              data-otp-index={index}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
              maxLength={1}
              required
            />
          ))}
        </div>
      </div>

      {/* Timer and Resend */}
      <div className="text-center">
        {!canResendOtp ? (
          <p className="text-sm text-muted-foreground">
            Resend code in <span className="font-medium text-primary">{otpTimer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Resend Code'}
          </button>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentStep('details')}
          className="flex-1 py-4 border-2 border-border text-foreground rounded-xl font-bold hover:bg-accent/50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          type="submit"
          disabled={isLoading || otp.join('').length !== 6}
          className="flex-1 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Verify</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderPasswordForm = () => (
    <form onSubmit={handlePasswordSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Create Password</h2>
        <p className="text-muted-foreground">Set a secure password for your account</p>
      </div>

      {/* Password Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 pr-12 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 pr-12 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Password Strength Indicator */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Password strength:</div>
        <div className="flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                formData.password.length > i * 2
                  ? i < 2
                    ? 'bg-red-500'
                    : i < 3
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Opt-in */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.subscribeNewsletter}
          onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
          className="w-4 h-4 text-primary rounded border-border focus:ring-2 focus:ring-primary/20"
        />
        <span className="text-sm text-muted-foreground">
          Subscribe to our newsletter for exclusive deals
        </span>
      </label>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentStep('otp')}
          className="flex-1 py-4 border-2 border-border text-foreground rounded-xl font-bold hover:bg-accent/50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <User className="w-5 h-5" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto animate-scale-in">
        <Check className="w-10 h-10 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Created Successfully!</h2>
        <p className="text-muted-foreground">
          Welcome to GiftCards India! Your account has been verified and is ready to use.
        </p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium">{formData.firstName} {formData.lastName}</h3>
            <p className="text-sm text-muted-foreground">
              {signupMethod === 'email' ? formData.email : `+91 ${formData.mobile}`}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate('dashboard')}
        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>Get Started</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={goBack}
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold gradient-text mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join thousands of happy customers</p>
        </div>

        {/* Signup Form Card */}
        <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-custom-xl">
          {currentStep !== 'complete' && renderProgressBar()}
          
          {currentStep === 'method' && renderMethodSelection()}
          {currentStep === 'details' && renderDetailsForm()}
          {currentStep === 'otp' && renderOtpVerification()}
          {currentStep === 'password' && renderPasswordForm()}
          {currentStep === 'complete' && renderComplete()}

          {currentStep === 'method' && (
            <>
              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-4 text-sm text-muted-foreground bg-card">OR</span>
                <div className="flex-1 border-t border-border"></div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => handleSocialSignup('google')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-border rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  onClick={() => handleSocialSignup('facebook')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-border rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('signin')}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}