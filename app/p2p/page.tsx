"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";

type TradeType = "buy" | "sell";

interface Trader {
  id: string;
  name: string;
  verified: boolean;
  completionRate: number;
  totalOrders: number;
  price: string;
  available: string;
  limits: string;
  paymentMethods: string[];
}

const mockTraders: Trader[] = [
  {
    id: "1",
    name: "AlphaTrader",
    verified: true,
    completionRate: 99.3,
    totalOrders: 1243,
    price: "91.24",
    available: "12,435.21 USDT",
    limits: "10,000 - 200,000 RUB",
    paymentMethods: ["Тинькофф", "СБП"],
  },
  {
    id: "2",
    name: "BitMaster",
    verified: true,
    completionRate: 98.7,
    totalOrders: 856,
    price: "91.25",
    available: "8,763.50 USDT",
    limits: "5,000 - 150,000 RUB",
    paymentMethods: ["Сбербанк", "Тинькофф"],
  },
  {
    id: "3",
    name: "CryptoMax",
    verified: true,
    completionRate: 98.1,
    totalOrders: 2321,
    price: "91.26",
    available: "15,236.10 USDT",
    limits: "10,000 - 300,000 RUB",
    paymentMethods: ["СБП", "ВТБ", "Альфа-Банк"],
  },
  {
    id: "4",
    name: "DreamMoney",
    verified: true,
    completionRate: 98.4,
    totalOrders: 532,
    price: "91.27",
    available: "8,450.00 USDT",
    limits: "5,000 - 130,000 RUB",
    paymentMethods: ["СБП"],
  },
  {
    id: "5",
    name: "EasyCrypto",
    verified: true,
    completionRate: 99.0,
    totalOrders: 765,
    price: "91.28",
    available: "20,312.45 USDT",
    limits: "20,000 - 500,000 RUB",
    paymentMethods: ["Сбербанк", "Тинькофф", "СБП"],
  },
];

export default function P2PPage() {
  const [activeTab, setActiveTab] = useState<TradeType>("buy");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const [selectedCurrency, setSelectedCurrency] = useState("RUB");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />

      {/* Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-800 text-white py-6 px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/p2p/Banner.png"
            alt="P2P Banner"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Нулевая комиссия на P2P</h2>
            <p className="text-blue-100">Покупайте и продавайте криптовалюту без комиссий</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Подробнее
          </button>
          <button className="absolute top-4 right-4 text-white hover:text-gray-200">
            ✕
          </button>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {/* P2P Header */}
        <div className="flex gap-8 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("buy")}
            className={`pb-4 text-lg font-semibold transition relative ${
              activeTab === "buy" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Купить
            {activeTab === "buy" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`pb-4 text-lg font-semibold transition relative ${
              activeTab === "sell" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Продать
            {activeTab === "sell" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
            )}
          </button>
          <button className="pb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
            Мои объявления
          </button>
          <button className="pb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
            Мои сделки
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 items-center">
          {/* Crypto Selector */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-2xl">₮</span>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="bg-transparent font-semibold text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>

          {/* Amount Input */}
          <input
            type="text"
            placeholder="Введите сумму"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Currency Selector */}
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          {/* Search Button */}
          <button className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Поиск
          </button>

          {/* Payment Methods */}
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Все способы оплаты
          </button>

          {/* Banks */}
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Все банки
          </button>

          {/* Filter */}
          <button className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>

          {/* Refresh */}
          <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
            <svg className="w-5 h-5 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <span className="text-sm text-gray-500 dark:text-gray-400">Обновить</span>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-t-lg text-sm font-semibold text-gray-600 dark:text-gray-300">
          <div className="col-span-3">Мейкер (процент завершенных сделок)</div>
          <div className="col-span-2">Цена ↑</div>
          <div className="col-span-2">Доступно / Лимиты</div>
          <div className="col-span-3">Способы оплаты</div>
          <div className="col-span-2 text-right">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              Без комиссий
            </span>
          </div>
        </div>

        {/* Traders List */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-b-lg dark:bg-gray-800">
          {mockTraders.map((trader, index) => (
            <div
              key={trader.id}
              className={`grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                index !== mockTraders.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""
              }`}
            >
              {/* Trader Info */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {trader.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{trader.name}</span>
                    {trader.verified && (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {trader.completionRate}% · {trader.totalOrders} ордеров
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{trader.price} RUB</div>
              </div>

              {/* Available & Limits */}
              <div className="col-span-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">Доступно</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{trader.available}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Лимиты</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{trader.limits}</div>
              </div>

              {/* Payment Methods */}
              <div className="col-span-3 flex flex-wrap gap-2">
                {trader.paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {method === "Сбербанк" && "🟢"}
                    {method === "Тинькофф" && "🟡"}
                    {method === "СБП" && "💳"}
                    {method === "ВТБ" && "🔵"}
                    {method === "Альфа-Банк" && "🔴"}
                    {method}
                  </span>
                ))}
              </div>

              {/* Buy Button */}
              <div className="col-span-2 text-right">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Показать на странице:</span>
            <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              ‹
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              4
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              5
            </button>
            <span className="px-2 dark:text-gray-400">...</span>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              100
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              ›
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
