"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Instagram } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { track } from "@vercel/analytics"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ctaClicked, setCtaClicked] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <GrainOverlay />

      {/* Original blue/orange shader background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Nav - logo only */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center px-6 py-5 transition-opacity duration-700 md:px-12 lg:px-16 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md">
            <span className="font-sans text-sm font-bold text-foreground">MM</span>
          </div>
          <span className="font-sans text-lg font-semibold tracking-tight text-foreground">MoreMatches</span>
        </div>
      </nav>

      {/* Single locked screen - other sections in DOM but unreachable */}
      <div
        className={`relative z-10 h-screen overflow-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <section className="flex min-h-screen w-full flex-col justify-end px-6 pb-20 pt-24 md:items-center md:justify-center md:px-12 md:pb-12 lg:px-16">
          <div className="max-w-3xl md:text-center">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs tracking-widest text-foreground/90 uppercase">Launching soon</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              Same you.
              <br />
              More matches.
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:mx-auto md:text-xl">
              Get real tips on your dating profile so you can stop second-guessing and start matching.
            </p>
            {/* CTA area: fixed height so nothing shifts on transition */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 relative h-12 md:flex md:justify-center">
              <button
                onClick={() => {
                  track("cta_click", { label: "get_early_access" })
                  setCtaClicked(true)
                }}
                aria-hidden={ctaClicked}
                className={`absolute inset-0 w-fit rounded-full bg-foreground px-8 py-3 font-sans text-sm font-medium text-background transition-all duration-500 hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] md:relative md:inset-auto md:px-10 md:py-3 md:text-base ${
                  ctaClicked ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
                }`}
              >
                Get early access
              </button>
              <p
                aria-live="polite"
                className={`absolute inset-0 flex items-center font-sans text-lg text-foreground transition-all duration-700 ease-out md:justify-center ${
                  ctaClicked
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
              >
                You're in. We'll be in touch when we launch.
              </p>
            </div>
          </div>
        </section>

        {/* Hidden sections - kept in DOM for future use */}
        <div className="hidden">
          <WorkSection />
          <ServicesSection />
          <AboutSection scrollToSection={() => {}} />
          <ContactSection />
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-opacity duration-700 md:px-12 lg:px-16 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="https://instagram.com/more_matches"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("cta_click", { label: "instagram_link" })}
          className="flex items-center gap-1.5 font-mono text-xs text-foreground/50 transition-colors duration-200 hover:text-foreground/80"
        >
          <Instagram size={12} strokeWidth={1.5} />
          @more_matches
        </a>
      </footer>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
