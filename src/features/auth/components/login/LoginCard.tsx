"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { LoginLoadingOverlay } from "./LoginOverlayLoading";

export function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Validate form on input changes after first submission attempt
  useEffect(() => {
    if (formSubmitted) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, formSubmitted]);

  // Clear field-specific errors when fields change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
    setError(null);
    setSuccessMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
    setError(null);
    setSuccessMessage(null);
  };

  // Form validation function
  const validateForm = (): boolean => {
    let isValid = true;

    // Reset field errors
    setEmailError(null);
    setPasswordError(null);

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError(null);
    setSuccessMessage(null);

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Set success message
      setSuccessMessage("Login successful! Redirecting...");

      // Refresh the router to update server components with new cookies
      router.refresh();
      router.push("/admin-dashboard");
    } catch (error: any) {
      console.error("Login failed", error);

      // Handle specific Supabase auth errors
      if (error.message === "Invalid login credentials") {
        setError("Invalid email or password. Please try again.");
      } else if (error.code === "user_not_found") {
        setEmailError("No user found with this email.");
      } else if (error.code === "invalid_grant") {
        setError("Invalid email or password.");
      } else {
        setError(error.message || "An error occurred during sign in. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setEmailError("Please enter your email to reset your password.");
      setFormSubmitted(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      });
      if (error) throw error;
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      setError(error.message || "Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#bdd9f0] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Show loading overlay when authenticating */}
      {isLoading && <LoginLoadingOverlay />}

      {/* Decorative background circle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">        
        <div className="absolute top-2 -left-30 w-80 h-80 bg-[#9bc6e9]/30 dark:bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-0 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Side - Logo and Branding (Desktop) / Top (Mobile) */}
          <div className="flex flex-col items-center justify-center order-1">
            {/* Logo */}
            <div className="relative">
              <div className="relative flex justify-center items-center">
                <Image
                  src="/images/devcom-logo.png"
                  alt="BSDC Logo"
                  width={300}
                  height={300}
                  className="w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:h-80 object-contain drop-shadow-2xl shadow-[#207bbe]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto order-2">
            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#24418f] dark:text-blue-300 mb-2">
                Faculty Login
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg">
                Enter your credentials to access the DevCom admin interface.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Message Display */}
            {successMessage && (
              <Alert className="mb-6 border-green-500 text-green-700 dark:text-green-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-2xl shadow-[#afc5d5] p-8 space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`pl-10 h-10 ${
                        emailError
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                      disabled={isLoading}
                      placeholder="john@example.com"
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`pl-10 h-10 ${
                        passwordError
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                      disabled={isLoading}
                      placeholder="Enter your password"
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-sm text-[#3088c6] dark:text-blue-400 hover:underline cursor-pointer"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleSubmit}
                className="w-full h-10 bg-[#207bbe] hover:bg-[#3088c6] text-white font-medium text-base rounded-lg transition-all cursor-pointer"
                disabled={
                  isLoading ||
                  (formSubmitted &&
                    (!email || !password || !!emailError || !!passwordError))
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
