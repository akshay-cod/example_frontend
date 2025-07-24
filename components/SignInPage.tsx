import React, { useState, useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { Mail, Smartphone, Eye, EyeOff, Shield, ArrowLeft, Check, MessageSquare, KeyRound, ArrowRight } from 'lucide-react';

type LoginMethod = 'email' | 'mobile';
type AuthMethod = 'password' | 'otp';
type LoginStep = 'method' | 'auth-choice' | 'password' | 'otp' | 'complete';

export function SignInPage() {
  const { navigate, goBack } = useRouter();
  const [currentStep, setCurrentStep] = useState<LoginStep>('method');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('password');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    rememberMe: false
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setCurrentStep('auth-choice');
  };

  const handleAuthChoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'password') {
      setCurrentStep('password');
    } else {
      handleSendOtp();
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setCurrentStep('otp');
    setOtpTimer(30);
    setCanResendOtp(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    navigate('dashboard');
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
    navigate('dashboard');
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

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    navigate('dashboard');
  };

  const renderProgressBar = () => {
    const steps = ['method', 'auth-choice', authMethod, 'complete'];
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
        <h2 className="text-2xl font-bold mb-2">Choose Login Method</h2>
        <p className="text-muted-foreground">How would you like to sign in?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          type="button"
          onClick={() => setLoginMethod('email')}
          className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
            loginMethod === 'email'
              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              loginMethod === 'email'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Email Address</h3>
              <p className="text-sm text-muted-foreground">Sign in using your email address</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              loginMethod === 'email'
                ? 'border-primary bg-primary'
                : 'border-muted-foreground'
            }`}>
              {loginMethod === 'email' && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setLoginMethod('mobile')}
          className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
            loginMethod === 'mobile'
              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              loginMethod === 'mobile'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Mobile Number</h3>
              <p className="text-sm text-muted-foreground">Sign in using your mobile number</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              loginMethod === 'mobile'
                ? 'border-primary bg-primary'
                : 'border-muted-foreground'
            }`}>
              {loginMethod === 'mobile' && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>
      </div>

      {/* Contact Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {loginMethod === 'email' ? 'Email Address' : 'Mobile Number'}
        </label>
        {loginMethod === 'email' ? (
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
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
              placeholder="Enter mobile number"
              className="flex-1 px-4 py-3 border-2 border-border rounded-r-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50"
              required
            />
          </div>
        )}
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

  const renderAuthChoice = () => (
    <form onSubmit={handleAuthChoiceSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Authentication Method</h2>
        <p className="text-muted-foreground">How would you like to authenticate?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          type="button"
          onClick={() => setAuthMethod('password')}
          className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
            authMethod === 'password'
              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              authMethod === 'password'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Password</h3>
              <p className="text-sm text-muted-foreground">Sign in using your password</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              authMethod === 'password'
                ? 'border-primary bg-primary'
                : 'border-muted-foreground'
            }`}>
              {authMethod === 'password' && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setAuthMethod('otp')}
          className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
            authMethod === 'otp'
              ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 shadow-custom-lg'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              authMethod === 'otp'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">OTP Verification</h3>
              <p className="text-sm text-muted-foreground">
                Sign in using OTP sent to your {loginMethod}
              </p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              authMethod === 'otp'
                ? 'border-primary bg-primary'
                : 'border-muted-foreground'
            }`}>
              {authMethod === 'otp' && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>
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
          disabled={isLoading}
          className="flex-1 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-xl font-bold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
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
        <h2 className="text-2xl font-bold mb-2">Enter Password</h2>
        <p className="text-muted-foreground">
          Enter your password for{' '}
          <span className="font-medium text-foreground">
            {loginMethod === 'email' ? formData.email : `+91 ${formData.mobile}`}
          </span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter your password"
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

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            className="w-4 h-4 text-primary rounded border-border focus:ring-2 focus:ring-primary/20"
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => navigate('forgot-password')}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentStep('auth-choice')}
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
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <Check className="w-5 h-5" />
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
        <h2 className="text-2xl font-bold mb-2">Verify Your {loginMethod === 'email' ? 'Email' : 'Mobile'}</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to{' '}
          <span className="font-medium text-foreground">
            {loginMethod === 'email' ? formData.email : `+91 ${formData.mobile}`}
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
          onClick={() => setCurrentStep('auth-choice')}
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
              <span>Verify & Sign In</span>
            </>
          )}
        </button>
      </div>
    </form>
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
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-custom-xl">
          {renderProgressBar()}
          
          {currentStep === 'method' && renderMethodSelection()}
          {currentStep === 'auth-choice' && renderAuthChoice()}
          {currentStep === 'password' && renderPasswordForm()}
          {currentStep === 'otp' && renderOtpVerification()}

          {currentStep === 'method' && (
            <>
              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-4 text-sm text-muted-foreground bg-card">OR</span>
                <div className="flex-1 border-t border-border"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-border rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-border rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>

              {/* Additional Social Options */}
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => handleSocialLogin('twitter')}
                  className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-all duration-300 hover:scale-110"
                >
                  <span className="text-white text-sm font-bold">T</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('paypal')}
                  className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-all duration-300 hover:scale-110"
                >
                  <span className="text-white text-sm font-bold">P</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('apple')}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                >
                  <span className="text-white text-sm font-bold">A</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  Not a member yet?{' '}
                  <button
                    onClick={() => navigate('signup')}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign Up
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