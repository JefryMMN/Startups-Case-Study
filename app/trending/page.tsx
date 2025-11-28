"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import TrendingStartups from "@/components/trending-startups"

export default function TrendingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [caseStudies, setCaseStudies] = useState([])

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch("/api/case-studies")
        const data = await response.json()
        if (data.caseStudies) {
          setCaseStudies(data.caseStudies)
        }
      } catch (error) {
        console.log("[v0] Failed to fetch case studies")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(55,50,47,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#37322F] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">FS</span>
              </div>
              <span className="text-[#37322F] text-lg font-semibold font-sans">FailureStudy</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#605a57] text-sm font-medium hover:text-[#37322F] transition-colors">
                Home
              </Link>
              <Link
                href="/trending"
                className="text-[#37322F] text-sm font-medium hover:text-[#37322F] transition-colors"
              >
                Trending
              </Link>
              <Link href="/#about" className="text-[#605a57] text-sm hover:text-[#37322F] transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAFAF9] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#37322F] leading-tight mb-6 text-balance">
              Trending <span className="italic">Startups & Case Studies</span>
            </h1>
            <p className="text-[#605a57] text-lg leading-relaxed text-pretty">
              Discover the fastest-growing startups making waves in 2024-2025, and learn from case studies of companies
              that shaped the startup ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Startups Section */}
      <section className="py-12 bg-white border-b border-[rgba(55,50,47,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[#37322F]/20 border-t-[#37322F] rounded-full animate-spin"></div>
            </div>
          ) : (
            <TrendingStartups />
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#37322F] mb-2">Featured Case Studies</h2>
            <p className="text-[#605a57]">
              Learn from the successes and failures of influential companies that shaped the startup landscape.
            </p>
          </div>

          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.slice(0, 9).map((study) => (
                <Link
                  href={`/case-study/${study.id}`}
                  key={study.id}
                  className="group bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#f5f4f3] to-[#e8e7e5] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#37322F]/5" />
                    <img
                      src={
                        study.image ||
                        `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(study.name + " logo") || "/placeholder.svg"}`
                      }
                      alt={study.name}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(study.name + " logo")}`
                      }}
                    />
                  </div>

                  <div className="px-6 pt-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium break-words max-w-[40%]">
                      {study.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium break-words max-w-[40%] ${
                        study.currentStatus === "Shut down" || study.currentStatus === "Collapsed"
                          ? "bg-red-100 text-red-700"
                          : study.currentStatus === "Bankrupt" || study.currentStatus === "Liquidated"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {study.currentStatus}
                    </span>
                  </div>

                  <div className="p-6 pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-[#37322F] group-hover:text-[#49423d] transition-colors">
                        {study.name}
                      </h3>
                      <span className="w-5 h-5 text-[#9e9a97] group-hover:text-[#37322F] group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>

                    <p className="text-[#605a57] text-sm leading-relaxed mb-4 line-clamp-2">{study.summary}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(55,50,47,0.08)]">
                      <div>
                        <p className="text-xs text-[#9e9a97]">Peak Valuation</p>
                        <p className="text-sm font-semibold text-[#37322F]">{study.peakValuation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#9e9a97]">Founded</p>
                        <p className="text-sm font-semibold text-[#37322F]">{study.yearFounded}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#605a57]">Loading case studies...</p>
            </div>
          )}

          {/* View All Case Studies Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#49423d] transition-colors"
            >
              Explore All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-[rgba(55,50,47,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#37322F] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">FS</span>
              </div>
              <span className="text-[#37322F] text-sm font-semibold">FailureStudy</span>
            </div>
            <p className="text-[#9e9a97] text-sm">© 2025 FailureStudy. Educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
