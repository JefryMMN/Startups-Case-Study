"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import TrendingStartups from "@/components/trending-startups"

// Categories for filtering
const categories = [
  "All",
  "EdTech",
  "FinTech",
  "E-Commerce",
  "Social Media",
  "Cryptocurrency",
  "Real Estate",
  "Transportation",
  "Healthcare",
  "Technology",
  "Retail",
  "Hardware",
  "Entertainment",
  "Energy",
  "Automotive",
  "Construction",
  "Food Tech",
]

// Sample case studies data (will be replaced by API)
const initialCaseStudies = [
  {
    id: "gomechanic",
    name: "GoMechanic",
    category: "Automotive",
    peakValuation: "$285 Million",
    currentStatus: "Collapsed",
    yearFounded: 2015,
    yearOfDecline: 2023,
    country: "India",
    summary:
      "A promising Indian car servicing aggregator that collapsed after founders admitted to inflating revenues, fabricating garages, and financial fraud while pursuing unicorn status.",
    keyFailures: ["Financial fraud", "Revenue inflation", "Weak governance", "Poor unit economics"],
    image: "/images/gomechanic-logo.jpg", // Updated to use the green GoMechanic logo
  },
  {
    id: "byjus",
    name: "BYJU'S",
    category: "EdTech",
    peakValuation: "$22 Billion",
    currentStatus: "Restructuring",
    yearFounded: 2011,
    yearOfDecline: 2023,
    country: "India",
    summary:
      "Once India's most valuable startup, BYJU'S collapsed due to aggressive expansion, accounting irregularities, and failed acquisitions.",
    keyFailures: ["Aggressive acquisitions", "Accounting issues", "Layoffs"],
    image: "https://logo.clearbit.com/byjus.com",
  },
]

export default function BusinessFailuresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies)
  const [allCategories, setAllCategories] = useState(categories)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filter case studies based on search and category
  const filteredStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Fetch real-time data from API
  const fetchCaseStudies = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/case-studies?search=${searchQuery}&category=${selectedCategory}`)
      if (response.ok) {
        const data = await response.json()
        if (data.caseStudies && data.caseStudies.length > 0) {
          setCaseStudies(data.caseStudies)
        }
        if (data.categories) {
          setAllCategories(data.categories)
        }
      }
    } catch (error) {
      console.log("[v0] API fetch failed, using local data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudies()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(55,50,47,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#37322F] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">FS</span>
              </div>
              <span className="text-[#37322F] text-lg font-semibold font-sans">FailureStudy</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#37322F] text-sm font-medium hover:text-[#605a57] transition-colors">
                Home
              </Link>
              <Link href="/trending" className="text-[#605a57] text-sm hover:text-[#37322F] transition-colors">
                Trending
              </Link>
              <Link href="#categories" className="text-[#605a57] text-sm hover:text-[#37322F] transition-colors">
                Categories
              </Link>
              <Link href="#about" className="text-[#605a57] text-sm hover:text-[#37322F] transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAFAF9] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[rgba(55,50,47,0.08)] shadow-sm mb-6">
              <span className="text-[#37322F] text-xs font-medium">Learn from business failures</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#37322F] leading-tight mb-6 text-balance">
              When Giants <span className="italic">Fall</span>
            </h1>
            <p className="text-[#605a57] text-lg leading-relaxed mb-8 text-pretty">
              Explore detailed case studies of major business failures. Learn what went wrong, why companies collapsed,
              and the lessons every entrepreneur should know.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-2xl border border-[rgba(55,50,47,0.12)] shadow-lg overflow-hidden">
                <div className="flex items-center pl-5 text-[#9e9a97]"></div>
                <input
                  type="text"
                  placeholder="Search companies (e.g., BYJU'S, FTX, WeWork...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 text-[#37322F] placeholder:text-[#9e9a97] focus:outline-none font-sans text-base"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-4 hover:bg-[#FAFAF9] transition-colors md:hidden text-[#37322F]"
                >
                  Filter
                </button>
                <button
                  onClick={fetchCaseStudies}
                  className="bg-[#37322F] text-white px-6 py-4 font-medium hover:bg-[#49423d] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="categories" className="py-6 border-b border-[rgba(55,50,47,0.08)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-wrap gap-2 ${showFilters ? "flex" : "hidden md:flex"}`}>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#37322F] text-white"
                    : "bg-[#FAFAF9] text-[#605a57] hover:bg-[#f0efee] border border-[rgba(55,50,47,0.08)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudies.map((study) => (
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
                        study.currentStatus === "Bankrupt"
                          ? "bg-red-100 text-red-700"
                          : study.currentStatus === "Dissolved"
                            ? "bg-gray-100 text-gray-700"
                            : study.currentStatus === "Shut Down"
                              ? "bg-orange-100 text-orange-700"
                              : study.currentStatus === "Collapsed"
                                ? "bg-red-100 text-red-700"
                                : study.currentStatus === "Liquidated"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {study.currentStatus}
                    </span>
                  </div>

                  {/* Card Content */}
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

                    <div className="flex items-center gap-4 text-xs text-[#9e9a97] mb-4">
                      <div className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 text-[#9e9a97]"></span>
                        <span>{study.yearOfDecline}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-[#9e9a97]" />
                      <span>{study.country}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(55,50,47,0.08)]">
                      <div>
                        <p className="text-xs text-[#9e9a97]">Peak Valuation</p>
                        <p className="text-sm font-semibold text-[#37322F]">{study.peakValuation}</p>
                      </div>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {study.keyFailures.slice(0, 2).map((failure, idx) => {
                          const failureText = typeof failure === "string" ? failure : failure?.title
                          return (
                            <span key={idx} className="px-2 py-1 bg-[#FAFAF9] rounded text-xs text-[#605a57]">
                              {failureText}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[#FAFAF9] rounded-full flex items-center justify-center mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-[#37322F] mb-2">No results found</h3>
              <p className="text-[#605a57]">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="mt-4 px-4 py-2 bg-[#37322F] text-white rounded-lg text-sm font-medium hover:bg-[#49423d] transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trending Startups Component */}
      <TrendingStartups />

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-[rgba(55,50,47,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-serif text-[#37322F] mb-2">38+</p>
              <p className="text-[#605a57] text-sm">Case Studies</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-serif text-[#37322F] mb-2">$500B+</p>
              <p className="text-[#605a57] text-sm">Value Lost</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-serif text-[#37322F] mb-2">17</p>
              <p className="text-[#605a57] text-sm">Industries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-serif text-[#37322F] mb-2">12+</p>
              <p className="text-[#605a57] text-sm">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-[#FAFAF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#37322F] mb-4">Why Study Failures?</h2>
          <p className="text-[#605a57] leading-relaxed mb-6">
            Success leaves clues, but failure leaves lessons. By understanding what caused billion-dollar companies to
            collapse, entrepreneurs and business leaders can avoid making the same mistakes. Our detailed case studies
            analyze the warning signs, decision points, and systemic issues that led to these spectacular failures.
          </p>
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
