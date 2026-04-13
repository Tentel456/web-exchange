"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type AuthMode = "signup" | "login";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        // Magic Link для регистрации
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              referral_code: referralCode || null,
            },
          },
        });

        if (error) throw error;

        setMessage({
          type: "success",
          text: "Check your email for the confirmation link!",
        });
        setEmail("");
        setReferralCode("");
      } else {
        // Вход с паролем
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage({ type: "success", text: "Login successful!" });
        
        // Redirect to home
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="text-center mb-12">
        <Image
          src="/assets/logo/novex_logo.png"
          alt="NOVEX"
          width={200}
          height={60}
          className="mx-auto"
        />
      </div>

      {/* Form Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black font-clash">
          {mode === "signup" ? "Create Account" : "Log In"}
        </h2>
        <button
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="text-black hover:text-primary transition"
        >
          {mode === "signup" ? "Log in" : "Create Account"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleEmailAuth} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email/Mobile Number*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email/Mobile (Without country code)"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-black focus:outline-none focus:border-primary transition"
          />
        </div>

        {/* Password Input (only for login) */}
        {mode === "login" && (
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Password*
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-black focus:outline-none focus:border-primary transition"
            />
          </div>
        )}

        {/* Referral Code (only for signup) */}
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-black focus:outline-none focus:border-primary transition"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Loading..."
            : mode === "signup"
            ? "Create Account"
            : "Log In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-600 text-sm">
          OR {mode === "signup" ? "SIGN UP" : "LOG IN"} WITH
        </span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google Button */}
      <button
        onClick={handleGoogleAuth}
        className="w-full py-3 border border-gray-300 rounded-lg hover:border-primary hover:shadow-lg transition flex items-center justify-center gap-3"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-black font-medium">Continue with Google</span>
      </button>
    </div>
  );
}
