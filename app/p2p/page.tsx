"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import P2PHeader from "@/components/p2p/P2PHeader";
import P2PFilters from "@/components/p2p/P2PFilters";
import P2PTradeList from "@/components/p2p/P2PTradeList";

export default function P2PPage() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-4">
        <P2PHeader />
        
        <section className="py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 max-w-[630px] mx-auto leading-tight">
            Торгуйте через P2P без комиссий
          </h1>

          {/* Buy/Sell Tabs */}
          <div className="flex gap-8 mb-8">
            <button
              onClick={() => setActiveTab("buy")}
              className={`text-xl font-bold relative pb-2 transition ${
                activeTab === "buy" ? "text-white" : "text-gray-400"
              }`}
            >
              Купить
              {activeTab === "buy" && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`text-xl font-bold relative pb-2 transition ${
                activeTab === "sell" ? "text-white" : "text-gray-400"
              }`}
            >
              Продать
              {activeTab === "sell" && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />
              )}
            </button>
          </div>

          <P2PFilters />
          
          <P2PTradeList activeTab={activeTab} />
        </section>
      </main>

      {/* Chat Bot Button */}
      <button className="fixed right-11 bottom-5 w-12 h-12 rounded-full bg-gradient-to-r from-[#3fc2e3] to-[#245aa6] flex items-center justify-center hover:opacity-90 transition">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  );
}
