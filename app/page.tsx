'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { HeroMockUI } from '@/components/HeroMockUI'
import { PricingCards } from '@/components/PricingCards'
import { ROICalculator } from '@/components/ROICalculator'
import { FAQ } from '@/components/FAQ'
import { ContactForm } from '@/components/ContactForm'
import {
  Calendar,
  ArrowRight,
  Package,
  Users,
  TrendingUp,
  Workflow,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [stockAnimated, setStockAnimated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setStockAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-base/80 backdrop-blur-lg border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">JC</span>
              </div>
              <span className="text-lg font-semibold text-white">Joinery Core</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#contact"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="#features"
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="#contact"
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex gap-3 pt-3 border-t border-border">
                  <Link href="/login" className="flex-1">
                    <Button variant="secondary" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="badge-pulse mb-6 inline-flex">
                Ready for 2026 & Beyond
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                The intelligent OS for modern joinery workshops.
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Stop relying on spreadsheets and whiteboards. Unify production, stock, team, and finances in one platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Explore Features
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-zinc-500">
                <span className="text-accent-green">✓</span> No credit card required for trial.
              </p>
            </div>

            {/* Right Mock UI */}
            <div className="relative">
              <HeroMockUI />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to run your workshop
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Purpose-built tools for joinery businesses, from quote to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Visual Production Scheduling */}
            <Card className="glass-card hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Visual Production Scheduling
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Drag-and-drop Gantt charts for production planning. See your workshop capacity at a glance.
                </p>
                {/* Mini Gantt Visual */}
                <div className="bg-base/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-[10px] text-zinc-500">Mon</div>
                    <div className="flex-1 h-4 bg-card rounded relative">
                      <div className="absolute left-[5%] w-[40%] h-full bg-primary rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-[10px] text-zinc-500">Tue</div>
                    <div className="flex-1 h-4 bg-card rounded relative">
                      <div className="absolute left-[20%] w-[50%] h-full bg-accent-green rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 text-[10px] text-zinc-500">Wed</div>
                    <div className="flex-1 h-4 bg-card rounded relative">
                      <div className="absolute left-[10%] w-[30%] h-full bg-accent-orange rounded" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales to Production Pipeline - Tall Card */}
            <Card className="glass-card hover:-translate-y-1 transition-all duration-300 md:row-span-2">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-accent-green" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Sales to Production Pipeline
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Track every project from initial quote through design, production, and delivery.
                </p>
                {/* 3-Step Pipeline Visual */}
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center text-accent-green font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">Quote Accepted</div>
                      <div className="text-xs text-zinc-500">Kitchen refit — £8,500</div>
                    </div>
                    <Badge variant="success" className="text-[10px]">Done</Badge>
                  </div>
                  <div className="ml-5 h-8 w-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">In Production</div>
                      <div className="text-xs text-zinc-500">Week 2 of 3</div>
                    </div>
                    <Badge className="text-[10px]">Active</Badge>
                  </div>
                  <div className="ml-5 h-8 w-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-500">Ready for Delivery</div>
                      <div className="text-xs text-zinc-600">Scheduled: 15 Jan</div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Inventory */}
            <Card className="glass-card hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-accent-orange" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Smart Inventory
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Track materials and get low-stock alerts before you run out.
                </p>
                {/* Animated Stock Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Oak Panels</span>
                      <span className="text-accent-green">85%</span>
                    </div>
                    <div className="h-2 bg-base rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-green rounded-full transition-all duration-1000"
                        style={{ width: stockAnimated ? '85%' : '0%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">MDF Sheets</span>
                      <span className="text-primary">60%</span>
                    </div>
                    <div className="h-2 bg-base rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 delay-100"
                        style={{ width: stockAnimated ? '60%' : '0%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Hardware Kits</span>
                      <span className="text-accent-orange">25%</span>
                    </div>
                    <div className="h-2 bg-base rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-orange rounded-full transition-all duration-1000 delay-200"
                        style={{ width: stockAnimated ? '25%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team & Capacity */}
            <Card className="glass-card hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Team & Capacity
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Manage your team workload and allocate resources efficiently.
                </p>
                <div className="flex -space-x-2 mb-3">
                  {['bg-primary', 'bg-accent-green', 'bg-accent-orange', 'bg-zinc-600'].map(
                    (bg, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${bg} border-2 border-card flex items-center justify-center text-[10px] text-white font-medium`}
                      >
                        {['JD', 'MK', 'TB', '+3'][i]}
                      </div>
                    )
                  )}
                </div>
                <div className="text-xs text-zinc-500">6 team members • 87% utilization</div>
              </CardContent>
            </Card>

            {/* Project Profitability - Wide Card */}
            <Card className="glass-card hover:-translate-y-1 transition-all duration-300 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-accent-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Project Profitability Tracking
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Know exactly what each job costs and earns. Track materials, labor, and overheads in real-time.
                    </p>
                  </div>
                  <div className="flex-1 bg-base/50 rounded-lg p-4 border border-border">
                    <div className="text-xs text-zinc-500 mb-3">Kitchen Refit Project</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">£8,500</div>
                        <div className="text-[10px] text-zinc-500">Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-zinc-400">£5,200</div>
                        <div className="text-[10px] text-zinc-500">Costs</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent-green">39%</div>
                        <div className="text-[10px] text-zinc-500">Margin</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-base/50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Choose the plan that fits your workshop. All plans include a free trial.
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See your potential savings
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Calculate how much time and money Joinery Core could save your workshop.
            </p>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-base/50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your workshop?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Book a demo and see how Joinery Core works for your business.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">JC</span>
              </div>
              <span className="text-sm text-zinc-500">
                © 2026 Skylon Development LTD
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              Joinery Core is ready for the future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
