"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

// Extended case study data
const caseStudiesData: Record<string, any> = {
  byjus: {
    id: "byjus",
    name: "BYJU'S",
    category: "EdTech",
    peakValuation: "$22 Billion",
    currentValuation: "<$1 Billion",
    currentStatus: "Restructuring",
    yearFounded: 2011,
    yearOfDecline: 2023,
    country: "India",
    founder: "Byju Raveendran",
    employees: "50,000+ (at peak)",
    summary:
      "BYJU'S was once India's most valuable startup and the world's most valuable edtech company. Its spectacular fall from a $22 billion valuation to near worthlessness represents one of the biggest corporate collapses in Indian startup history.",
    image: "/byju-s-edtech-company-office.jpg",
    timeline: [
      { year: 2011, event: "Founded by Byju Raveendran in Bangalore" },
      { year: 2015, event: "Launched BYJU'S learning app" },
      { year: 2019, event: "Became India's most valuable edtech startup" },
      { year: 2021, event: "Acquired Aakash Educational Services for $1B" },
      { year: 2022, event: "Peak valuation of $22 billion reached" },
      { year: 2023, event: "Mass layoffs, auditor resignations, investor lawsuits" },
      { year: 2024, event: "NCLT orders insolvency proceedings" },
    ],
    keyFailures: [
      {
        title: "Aggressive Acquisitions",
        description:
          "BYJU'S spent over $2.5 billion on acquisitions including Aakash, WhiteHat Jr, and Great Learning without proper integration or synergies.",
      },
      {
        title: "Accounting Irregularities",
        description:
          "Delayed financial filings, auditor resignations, and questions about revenue recognition led to loss of investor confidence.",
      },
      {
        title: "Unsustainable Growth Model",
        description:
          "Relied heavily on aggressive sales tactics and expensive customer acquisition that couldn't be sustained.",
      },
      {
        title: "Poor Corporate Governance",
        description:
          "Centralized decision-making, family involvement, and lack of independent oversight contributed to mismanagement.",
      },
    ],
    lessons: [
      "Growth at all costs is not sustainable without profitability path",
      "Acquisitions need integration planning, not just deal-making",
      "Corporate governance matters especially as companies scale",
      "Sales pressure tactics damage brand trust long-term",
    ],
    sources: [
      { name: "Reuters", url: "#" },
      { name: "Economic Times", url: "#" },
      { name: "TechCrunch", url: "#" },
    ],
    detailedAnalysis: [
      "BYJU'S aggressive acquisition strategy, which included spending over $2.5 billion on companies like Aakash, WhiteHat Jr, and Great Learning, led to significant financial strain. Without proper integration or synergies, these acquisitions became liabilities rather than assets.",
      "The company faced severe accounting irregularities, including delayed financial filings and auditor resignations. Questions also arose about revenue recognition, which further eroded investor confidence.",
      "BYJU'S growth model was unsustainable, relying heavily on aggressive sales tactics and expensive customer acquisition. As the market conditions changed, the company struggled to maintain profitability, leading to its downfall.",
      "Poor corporate governance played a crucial role in the company's failure. Centralized decision-making, family involvement, and a lack of independent oversight contributed to mismanagement and a lack of accountability.",
    ],
  },
  ftx: {
    id: "ftx",
    name: "FTX",
    category: "Cryptocurrency",
    peakValuation: "$32 Billion",
    currentValuation: "$0",
    currentStatus: "Bankrupt",
    yearFounded: 2019,
    yearOfDecline: 2022,
    country: "Bahamas",
    founder: "Sam Bankman-Fried",
    employees: "300+",
    summary:
      "FTX collapsed in November 2022 in one of the most spectacular corporate frauds in history. Customer funds were misappropriated, and founder Sam Bankman-Fried was convicted of fraud and sentenced to 25 years in prison.",
    image: "/ftx-cryptocurrency-exchange-trading-floor.jpg",
    timeline: [
      { year: 2019, event: "FTX founded by Sam Bankman-Fried" },
      { year: 2021, event: "Raised $900M at $18B valuation" },
      { year: 2022, event: "January: Raised at $32B valuation" },
      { year: 2022, event: "November: CoinDesk exposes Alameda's balance sheet" },
      { year: 2022, event: "November 11: FTX files for bankruptcy" },
      { year: 2023, event: "SBF arrested and charged with fraud" },
      { year: 2024, event: "SBF sentenced to 25 years in prison" },
    ],
    keyFailures: [
      {
        title: "Fraud & Misappropriation",
        description:
          "Customer deposits were secretly transferred to Alameda Research for risky trading and personal expenses.",
      },
      {
        title: "No Corporate Controls",
        description:
          "No board oversight, no CFO, accounting done on QuickBooks, and commingling of funds was standard practice.",
      },
      {
        title: "False Marketing",
        description:
          "Portrayed as a safe, regulated exchange while operating with virtually no risk management or controls.",
      },
      {
        title: "Regulatory Arbitrage",
        description: "Headquartered in Bahamas specifically to avoid US regulations while still serving US customers.",
      },
    ],
    lessons: [
      "Due diligence on corporate governance is essential",
      "Regulatory compliance exists for customer protection",
      "Charismatic founders don't guarantee ethical operations",
      "If returns seem too good to be true, they probably are",
    ],
    sources: [
      { name: "Wall Street Journal", url: "#" },
      { name: "New York Times", url: "#" },
      { name: "CoinDesk", url: "#" },
    ],
    detailedAnalysis: [
      "FTX's collapse was primarily due to its founder Sam Bankman-Fried's fraudulent activities. Customer funds were misappropriated and secretly transferred to Alameda Research for risky trading and personal expenses.",
      "The company lacked basic corporate controls, such as board oversight, a CFO, and proper accounting practices. Using QuickBooks for accounting and commingling funds was standard practice, which led to significant operational risks.",
      "FTX falsely marketed itself as a safe and regulated exchange, despite operating with virtually no risk management or controls. This deception led to a loss of trust among investors and customers.",
      "Headquartered in the Bahamas to avoid US regulations while still serving US customers was a critical failure. This regulatory arbitrage strategy ultimately caught up with the company, leading to its bankruptcy.",
    ],
  },
  wework: {
    id: "wework",
    name: "WeWork",
    category: "Real Estate",
    peakValuation: "$47 Billion",
    currentValuation: "$0",
    currentStatus: "Bankrupt",
    yearFounded: 2010,
    yearOfDecline: 2019,
    country: "USA",
    founder: "Adam Neumann",
    employees: "15,000+ (at peak)",
    summary:
      "WeWork's failed 2019 IPO exposed a company with massive losses, questionable governance, and a founder whose behavior raised serious concerns. The company eventually went bankrupt in 2023.",
    image: "/wework-modern-coworking-office-space.jpg",
    timeline: [
      { year: 2010, event: "WeWork founded in New York" },
      { year: 2017, event: "SoftBank invests $4.4B" },
      { year: 2019, event: "January: Valued at $47B" },
      { year: 2019, event: "August: IPO filing reveals massive losses" },
      { year: 2019, event: "September: Adam Neumann ousted as CEO" },
      { year: 2019, event: "October: IPO cancelled" },
      { year: 2023, event: "November: WeWork files for bankruptcy" },
    ],
    keyFailures: [
      {
        title: "Unsustainable Unit Economics",
        description: "Long-term lease obligations with short-term member agreements created massive financial risk.",
      },
      {
        title: "Founder Misconduct",
        description:
          "Adam Neumann's self-dealing, including trademarking 'We' and selling it back to the company for $5.9M.",
      },
      {
        title: "Overvaluation",
        description:
          "Marketed as a tech company to justify tech multiples when it was fundamentally a real estate business.",
      },
      {
        title: "Governance Failures",
        description: "Dual-class shares gave Neumann outsized control despite minority ownership.",
      },
    ],
    lessons: [
      "Business model must be sustainable, not just growing",
      "Corporate governance protections exist for a reason",
      "Valuation should reflect fundamentals, not narrative",
      "Board independence is crucial for accountability",
    ],
    sources: [
      { name: "Bloomberg", url: "#" },
      { name: "WSJ", url: "#" },
      { name: "The Information", url: "#" },
    ],
    detailedAnalysis: [
      "WeWork's business model was unsustainable due to its long-term lease obligations with short-term member agreements, creating massive financial risk.",
      "Adam Neumann's self-dealing activities, such as trademarking 'We' and selling it back to the company for $5.9M, raised serious concerns about the company's governance and integrity.",
      "The company was overvalued, marketed as a tech company to justify tech multiples when it was fundamentally a real estate business. This misrepresentation led to a loss of trust among investors.",
      "Dual-class shares gave Neumann outsized control despite minority ownership, undermining the effectiveness of corporate governance and accountability.",
    ],
  },
  theranos: {
    id: "theranos",
    name: "Theranos",
    category: "Healthcare",
    peakValuation: "$9 Billion",
    currentValuation: "$0",
    currentStatus: "Dissolved",
    yearFounded: 2003,
    yearOfDecline: 2018,
    country: "USA",
    founder: "Elizabeth Holmes",
    employees: "800+",
    summary:
      "Theranos claimed to revolutionize blood testing with finger-prick technology. The technology never worked, and founder Elizabeth Holmes was convicted of fraud and sentenced to over 11 years in prison.",
    image: "/theranos-blood-testing-laboratory-equipment.jpg",
    timeline: [
      { year: 2003, event: "Elizabeth Holmes founds Theranos at 19" },
      { year: 2013, event: "Walgreens partnership announced" },
      { year: 2014, event: "Valued at $9 billion" },
      { year: 2015, event: "WSJ investigation exposes problems" },
      { year: 2016, event: "CMS bans Holmes from lab operations" },
      { year: 2018, event: "SEC charges Holmes with fraud" },
      { year: 2022, event: "Holmes convicted on 4 fraud counts" },
    ],
    keyFailures: [
      {
        title: "Technology That Didn't Work",
        description:
          "The core blood testing technology never actually functioned as claimed, with most tests run on standard machines.",
      },
      {
        title: "Deception of Partners",
        description: "Deliberately misled Walgreens, Safeway, and investors about the technology's capabilities.",
      },
      {
        title: "Culture of Secrecy",
        description: "Extreme secrecy, NDAs, and intimidation prevented internal concerns from being raised.",
      },
      {
        title: "Prestige Over Substance",
        description: "High-profile board members with no medical expertise provided credibility without oversight.",
      },
    ],
    lessons: [
      "Verify technology claims with independent experts",
      "Celebrity board members don't replace domain expertise",
      "Extreme secrecy is a red flag, not a feature",
      "Healthcare claims require rigorous validation",
    ],
    sources: [
      { name: "Wall Street Journal", url: "#" },
      { name: "Bad Blood (Book)", url: "#" },
      { name: "SEC", url: "#" },
    ],
    detailedAnalysis: [
      "Theranos' core blood testing technology never actually functioned as claimed. Most tests were run on standard machines, undermining the company's credibility and reputation.",
      "Elizabeth Holmes deliberately misled Walgreens, Safeway, and investors about the technology's capabilities, creating a false narrative that attracted significant funding and partnerships.",
      "The company's culture of secrecy, including extreme NDAs and intimidation tactics, prevented internal concerns from being raised and addressed, contributing to its downfall.",
      "High-profile board members with no medical expertise provided credibility without oversight, allowing Holmes to operate with impunity and make decisions that were detrimental to the company.",
    ],
  },
  "zillow-offers": {
    id: "zillow-offers",
    name: "Zillow Offers",
    category: "Real Estate",
    peakValuation: "$2.8 Billion Program",
    currentValuation: "$0",
    currentStatus: "Shut Down",
    yearFounded: 2018,
    yearOfDecline: 2021,
    country: "USA",
    founder: "Zillow Group",
    employees: "2,000+ (in iBuying)",
    summary:
      "Zillow's home-flipping business lost over $880 million in a single quarter due to algorithmic pricing errors and market misjudgment, leading to the program's shutdown and 2,000 layoffs.",
    image: "/zillow-real-estate-home-buying.jpg",
    timeline: [
      { year: 2018, event: "Zillow Offers iBuying program launched" },
      { year: 2019, event: "Rapid expansion to new markets" },
      { year: 2021, event: "Q2: Purchased $1.1B in homes" },
      { year: 2021, event: "October: Pauses purchases due to backlog" },
      { year: 2021, event: "November: Announces shutdown, 2,000 layoffs" },
      { year: 2022, event: "Sells remaining 7,000 homes at loss" },
    ],
    keyFailures: [
      {
        title: "Algorithm Overconfidence",
        description:
          "Zillow's pricing algorithm consistently overpaid for homes, unable to accurately predict market values.",
      },
      {
        title: "Market Timing",
        description: "Scaled aggressively just as housing market conditions shifted, amplifying losses.",
      },
      {
        title: "Operational Complexity",
        description: "Underestimated the difficulty of renovating and selling homes at scale.",
      },
      {
        title: "Competition Pressure",
        description: "Rushed to compete with Opendoor and Offerpad without perfecting the model.",
      },
    ],
    lessons: [
      "Algorithms have limitations in complex markets",
      "Scaling should follow operational excellence",
      "Real estate requires local market expertise",
      "Competition pressure shouldn't override risk management",
    ],
    sources: [
      { name: "Bloomberg", url: "#" },
      { name: "The Verge", url: "#" },
      { name: "Zillow Investor Relations", url: "#" },
    ],
    detailedAnalysis: [
      "Zillow's pricing algorithm consistently overpaid for homes, unable to accurately predict market values. This overconfidence led to significant financial losses.",
      "The company scaled aggressively just as housing market conditions shifted, amplifying its losses. Misjudging market timing was a critical failure.",
      "Zillow underestimated the difficulty of renovating and selling homes at scale, leading to operational complexities and increased costs.",
      "Rushing to compete with Opendoor and Offerpad without perfecting the model was a shortsighted decision that ultimately contributed to the program's shutdown.",
    ],
  },
  quibi: {
    id: "quibi",
    name: "Quibi",
    category: "Social Media",
    peakValuation: "$1.75 Billion",
    currentValuation: "$0",
    currentStatus: "Shut Down",
    yearFounded: 2018,
    yearOfDecline: 2020,
    country: "USA",
    founder: "Jeffrey Katzenberg & Meg Whitman",
    employees: "200+",
    summary:
      "Quibi raised $1.75 billion for short-form mobile video but shut down just 6 months after launch, unable to find product-market fit despite high-profile content and experienced leadership.",
    image: "/quibi-streaming-app-mobile-phone.jpg",
    timeline: [
      { year: 2018, event: "Quibi founded by Katzenberg & Whitman" },
      { year: 2019, event: "Raises $1B from major studios" },
      { year: 2020, event: "April: Launches during COVID pandemic" },
      { year: 2020, event: "Downloads fall 90% after first week" },
      { year: 2020, event: "October: Announces shutdown" },
      { year: 2021, event: "Content sold to Roku" },
    ],
    keyFailures: [
      {
        title: "Wrong Product Assumptions",
        description: "Built for 'on-the-go' viewing, but COVID kept everyone home with access to big screens.",
      },
      {
        title: "No Sharing Features",
        description: "Couldn't screenshot or share content, eliminating viral growth potential.",
      },
      {
        title: "Premium Pricing",
        description: "Charged $5-8/month when TikTok and YouTube offered free short content.",
      },
      {
        title: "Ignored User Behavior",
        description: "Assumed people wanted Hollywood-quality short content instead of authentic creator content.",
      },
    ],
    lessons: [
      "User research trumps industry experience",
      "Viral features are essential for content platforms",
      "Timing and market conditions matter enormously",
      "Big budgets can't force product-market fit",
    ],
    sources: [
      { name: "Variety", url: "#" },
      { name: "The Verge", url: "#" },
      { name: "WSJ", url: "#" },
    ],
    detailedAnalysis: [
      "Quibi's product assumptions were wrong. Built for 'on-the-go' viewing, but the COVID pandemic kept everyone home with access to big screens, reducing its appeal.",
      "The lack of sharing features, such as the ability to screenshot or share content, eliminated viral growth potential and limited user engagement.",
      "Quibi charged premium prices of $5-8/month for its service, which was not competitive with free options like TikTok and YouTube.",
      "Ignoring user behavior and assuming people wanted Hollywood-quality short content instead of authentic creator content was a critical mistake that led to its failure.",
    ],
  },
}

export default function CaseStudyPage() {
  const params = useParams()
  const [caseStudy, setCaseStudy] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!params.id) return

    const fetchCaseStudy = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/case-studies?id=${params.id}`)

        if (!response.ok) {
          console.log("[v0] Response status:", response.status)
          throw new Error("Case study not found")
        }

        const data = await response.json()

        const caseStudyData = data.caseStudy || data.caseStudies?.[0]

        if (!caseStudyData) {
          console.log("[v0] No case study data in response:", data)
          throw new Error("No case study data received")
        }

        console.log("[v0] Case study loaded successfully:", caseStudyData.name)
        setCaseStudy(caseStudyData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load case study"
        setError(errorMessage)
        console.log("[v0] Case study fetch error:", errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudy()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading case study...</p>
        </div>
      </div>
    )
  }

  if (error || !caseStudy) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-red-600 mb-4">{error || "Case study not found"}</p>
        <a href="/" className="text-blue-600 hover:underline">
          Back to Case Studies
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Professional Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← All Case Studies
          </a>
          <h1 className="text-4xl font-serif text-foreground mb-3">{caseStudy.name}</h1>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{caseStudy.category}</span>
            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">{caseStudy.country}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Executive Summary */}
        <section className="mb-12 bg-muted/50 p-6 rounded-lg border border-border">
          <h2 className="text-lg font-serif text-foreground mb-3">Executive Summary</h2>
          <p className="text-foreground/80 leading-relaxed text-base">{caseStudy.summary}</p>
        </section>

        {/* Why They Failed */}
        {caseStudy.detailedAnalysis && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-6">
              {caseStudy.currentStatus === "Shut down" ||
              caseStudy.currentStatus === "Shut Down" ||
              caseStudy.currentStatus?.includes("Bankrupt") ||
              caseStudy.currentStatus?.includes("Wound down") ||
              caseStudy.currentStatus?.includes("Dissolved") ||
              caseStudy.currentStatus?.includes("Merged/Shut") ||
              caseStudy.currentStatus?.includes("Pivoted/Shut")
                ? `Why ${caseStudy.name} Failed`
                : `What Is Happening With ${caseStudy.name}`}
            </h2>
            <div className="space-y-5">
              {caseStudy.detailedAnalysis.map((paragraph, idx) => (
                <p key={idx} className="text-foreground/85 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Key Metrics */}
        <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-border p-4 rounded">
            <p className="text-xs text-muted-foreground mb-1">PEAK VALUATION</p>
            <p className="text-xl font-serif text-foreground">{caseStudy.peakValuation}</p>
          </div>
          <div className="border border-border p-4 rounded">
            <p className="text-xs text-muted-foreground mb-1">FOUNDED</p>
            <p className="text-xl font-serif text-foreground">{caseStudy.yearFounded}</p>
          </div>
          <div className="border border-border p-4 rounded">
            <p className="text-xs text-muted-foreground mb-1">YEAR OF DECLINE</p>
            <p className="text-xl font-serif text-foreground">{caseStudy.yearOfDecline}</p>
          </div>
          <div className="border border-border p-4 rounded">
            <p className="text-xs text-muted-foreground mb-1">CURRENT STATUS</p>
            <p className="text-xl font-serif text-foreground">{caseStudy.currentStatus}</p>
          </div>
        </section>

        {/* Founder & Operations */}
        {(caseStudy.founder || caseStudy.employees) && (
          <section className="mb-12 bg-muted/50 p-6 rounded-lg border border-border">
            <h2 className="text-lg font-serif text-foreground mb-4">Company Background</h2>
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.founder && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">FOUNDER(S)</p>
                  <p className="text-foreground">{caseStudy.founder}</p>
                </div>
              )}
              {caseStudy.employees && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">EMPLOYEES (AT PEAK)</p>
                  <p className="text-foreground">{caseStudy.employees}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Timeline */}
        {caseStudy.timeline && caseStudy.timeline.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-serif text-foreground mb-6">Timeline</h2>
            <div className="relative">
              {caseStudy.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    {idx !== caseStudy.timeline.length - 1 && <div className="w-0.5 h-12 bg-border mt-2"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="font-mono text-sm text-muted-foreground">{item.year}</p>
                    <p className="text-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What Went Wrong */}
        {caseStudy.keyFailures && caseStudy.keyFailures.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-serif text-foreground mb-6 flex items-center gap-2">
              <span className="text-red-500">⚠</span> Key Failure Points
            </h2>
            <div className="space-y-4">
              {caseStudy.keyFailures.map((failure, idx) => (
                <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="font-mono text-sm text-muted-foreground mb-1">FAILURE {idx + 1}</p>
                  <p className="text-foreground text-sm">{failure.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Lessons */}
        {caseStudy.lessons && caseStudy.lessons.length > 0 && (
          <section className="mb-12 bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h2 className="text-lg font-serif text-foreground mb-4">Key Lessons for Entrepreneurs</h2>
            <ul className="space-y-3">
              {caseStudy.lessons.map((lesson, idx) => (
                <li key={idx} className="flex gap-3 text-foreground text-sm">
                  <span className="text-green-600 dark:text-green-400 font-bold">{idx + 1}.</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {caseStudy.sources && caseStudy.sources.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-serif text-foreground mb-4">Further Reading</h2>
            <ul className="space-y-2">
              {caseStudy.sources.map((source, idx) => (
                <li key={idx}>
                  <a href={source.url} className="text-primary hover:underline">
                    {source.name} →
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
