"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/auth/image.png"
          alt="NOVEX Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-8">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-white">
            NOVEX
          </Link>
          <div className="flex gap-4">
            <Link
              href="/auth"
              className="px-6 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition"
            >
              Вход
            </Link>
            <Link
              href="/auth"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </header>

      {/* Auth Form - Dynamic positioning based on step */}
      <div className="relative z-10 min-h-[calc(100vh-100px)] px-8">
        <AuthForm />
      </div>
    </div>
  );
}
