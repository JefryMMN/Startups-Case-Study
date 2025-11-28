"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface TrendingStartup {
  id: string
  name: string
  category: string
  description: string
  currentStatus: string
  valuation: string
  trend: "up" | "down" | "sideways"
  reason: string
}

export default function TrendingStartups() {
  const [startups, setStartups] = useState<TrendingStartup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingStartups = async () => {
      try {
        const response = await fetch("/api/trending-startups")
        const data = await response.json()
        setStartups(data.trendingStartups || [])
      } catch (err) {
        setError("Failed to fetch trending startups")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingStartups()
  }, [])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getTrendArrow = (trend: string) => {
    switch (trend) {
      case "up":
        return "↑"
      case "down":
        return "↓"
      default:
        return "→"
    }
  }

  if (loading) {
    return (
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-instrument-serif mb-8 text-center text-[#37322F]">Trending Startups in 2024</h2>
          <div className="text-center text-[#605a57]">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-instrument-serif text-[#37322F] mb-2">Trending Startups in 2024</h2>
          <p className="text-[#605a57]">
            The most promising startups gaining momentum right now. Learn from their successes and challenges.
          </p>
        </div>

        {error && <div className="text-center text-red-600 mb-8">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups.slice(0, 12).map((startup) => (
            <Link
              key={startup.id}
              href={`/trending/${startup.id}`}
              className="group bg-[#FAFAF9] rounded-lg shadow hover:shadow-lg transition-all duration-200 p-6 border border-[rgba(55,50,47,0.08)]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#37322F] group-hover:text-[#49423d] transition-colors">
                    {startup.name}
                  </h3>
                  <p className="text-sm text-[#999890]">{startup.category}</p>
                </div>
                <span className={`text-2xl font-bold ${getTrendColor(startup.trend)}`}>
                  {getTrendArrow(startup.trend)}
                </span>
              </div>

              <p className="text-sm text-[#605a57] mb-3 line-clamp-2">{startup.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#999890]">Status:</span>
                  <span className="font-medium text-[#37322F]">{startup.currentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#999890]">Valuation:</span>
                  <span className="font-medium text-[#37322F]">{startup.valuation}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-[rgba(55,50,47,0.08)]">
                  <p className="text-[#999890] text-xs">{startup.reason}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
