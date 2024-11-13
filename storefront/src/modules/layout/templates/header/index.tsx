"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Search, ShoppingCart, User, Menu } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"

export default function Header() {
  const [isOpen, setIsOpen] = useState(true)
  const [prices, setPrices] = useState({
    gold: 4482.08,
    silver: 57.70,
    platinum: 1760.22,
    trends: {
      gold: 'up',
      silver: 'up',
      platinum: 'down'
    }
  })
  const [priceUpdateInterval] = useState(10)
  const [priceUpdateCountdown, setPriceUpdateCountdown] = useState(priceUpdateInterval)

  useEffect(() => {
    const timer = setInterval(() => {
      setPriceUpdateCountdown(prev => (prev > 0 ? prev - 1 : priceUpdateInterval))
    }, 1000)

    return () => clearInterval(timer)
  }, [priceUpdateInterval])

  return (
    <header>
      {/* Announcement Bar */}
      <div className="bg-[#172651] px-4 py-2 text-white text-center">
        <p>Due to unprecedented demand, our current delivery timeframe is extended to approximately 3 weeks.</p>
      </div>

      {/* Trading Status Bar */}
      <div className="bg-[#F5F5F5] px-4 py-2 border-b border-[#cfae45]">
        <div className="content-container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <span className="font-bold text-[#172651]">TRADING DESK IS {isOpen ? 'OPEN' : 'CLOSED'}</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {Object.entries(prices).map(([key, value]) => {
              if (key !== "trends") {
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="capitalize text-[#172651]">{key}:</span>
                    <span className="text-[#172651]">${typeof value === "number" ? value.toFixed(2) : value}</span>
                    {prices.trends[key] === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                )
              }
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-green-500 animate-pulse`} />
            <span className="text-[#172651] text-sm font-bold">
              Price update in: {priceUpdateCountdown}s
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="sticky top-0 inset-x-0 z-50 group">
        <nav className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
          <div className="content-container flex items-center justify-between h-full">
            <div className="flex items-center gap-x-6 h-full">
              <SideMenu />
              <LocalizedClientLink href="/" className="text-xl font-bold text-[#172651]">
                GOLD<span className="text-[#cfae45]">HOUSE</span>
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-x-6">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <Search className="w-5 h-5 text-[#172651]" />
              )}
              <User className="w-5 h-5 text-[#172651]" />
              <Suspense fallback={<ShoppingCart className="w-5 h-5 text-[#172651]" />}>
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
} 