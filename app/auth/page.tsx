"use client";

import { useState } from "react";
import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex h-screen">
      {/* Left Panel - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/assets/auth/image.png"
          alt="NOVEX"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full md:w-1/2 bg-secondary flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
