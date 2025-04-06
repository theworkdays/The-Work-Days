"use client"

import { useState } from "react"

import AboutUs from "./(sections)/about"
import AffiliateProgram from "./(sections)/affiliate"
import ContactPage from "./(sections)/contact"
import CTASection from "./(sections)/cta-section"
import FAQSection from "./(sections)/faq-section"
import HeroSection from "./(sections)/hero-section"
import HowItWorksSection from "./(sections)/how-it-works-section"
import ServicesSection from "./(sections)/services-section"
import StatsSection from "./(sections)/stats-section"
import TestimonialsSection from "./(sections)/testimonials-section"
import Footer from "./footer"
import Header from "./header"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("home")

  return (
    <div className="min-h-screen bg-[#1d1d1d] text-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <AboutUs/>
        <ContactPage/>
        <FAQSection />
        <CTASection />
        <AffiliateProgram/>
      </main>
      <Footer />
    </div>
  )
}

