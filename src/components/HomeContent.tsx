'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Search, Package, ShieldCheck, Truck,
  Globe, CheckCircle, Zap, MapPin, Star, Box, Users
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ── Counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const vis = useInView(ref, { once: true })
  useEffect(() => {
    if (!vis) return
    let cur = 0
    const inc = to / 50
    const t = setInterval(() => { cur += inc; if (cur >= to) { setN(to); clearInterval(t) } else setN(Math.floor(cur)) }, 40)
    return () => clearInterval(t)
  }, [vis, to])
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

/* ── Parallax Image ── */
function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image src={src} alt={alt} width={800} height={600} className="w-full h-full object-contain" loading="lazy" />
      </motion.div>
    </div>
  )
}

const TICKER = ['REAL-TIME TRACKING', 'SECURE DELIVERY', '50,000+ PARCELS', 'LIVE LOCATION', '98% ON-TIME RATE', 'PASSWORD PROTECTED', 'WORLDWIDE COURIER', '200+ CITIES']

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d } })
const fadeIn = (d = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: d } })

export default function HomeContent() {
  const [trackId, setTrackId] = useState('')

  /* Parallax for hero */
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], [0, 120])
  const heroImgY = useTransform(heroScroll, [0, 1], [0, 60])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden lg:min-h-[85vh] lg:flex lg:items-center">
        {/* Decorative background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-0 w-[50vw] h-[50vh] bg-gradient-to-bl from-[#FFD786]/20 via-[#FFAA00]/8 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[35vw] h-[40vh] bg-gradient-to-tr from-[#237227]/10 via-[#519A66]/6 to-transparent rounded-full blur-[80px]" />
          <div className="absolute top-1/3 left-1/2 w-[25vw] h-[25vh] bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-[60px]" />
        </motion.div>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #237227 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <motion.div style={{ opacity: heroOpacity }} className="max-w-7xl mx-auto px-5 w-full relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center">

            {/* Left */}
            <div>
              <motion.div {...fadeIn(0.1)} className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#F0F7F0] to-[#E8F5E9] border border-[#A5D6A7] rounded-full px-4 py-2 mb-5 sm:mb-6 shadow-sm">
                <span className="w-2 h-2 bg-[#237227] rounded-full animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#237227]">Live Tracking Platform</span>
                <span className="text-[10px] bg-[#237227] text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
              </motion.div>

              <motion.h1 {...fadeIn(0.15)} className="heading-hero mb-4 sm:mb-5" style={{ fontSize: 'clamp(32px, 5.5vw, 68px)' }}>
                Your Package
                <br />
                Our <span className="accent-gold relative">
                  Promise
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C40 2 100 2 198 8" stroke="#FFAA00" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p {...fadeIn(0.25)} className="text-[#555] max-w-md mb-6 sm:mb-7 text-[15px] sm:text-[16px] leading-relaxed">
                Real updates. Real locations. No vague &ldquo;in transit&rdquo; for days.
                Give your customers the <strong className="text-[#0A0A0A]">clarity they deserve</strong>.
              </motion.p>

              {/* Search bar */}
              <motion.div {...fadeIn(0.3)} className="max-w-lg mb-6">
                <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-white border-2 border-[#E0E0E0] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-[#A5D6A7] focus-within:border-[#237227] focus-within:shadow-[0_4px_24px_rgba(35,114,39,0.12)] transition-all">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" size={18} />
                    <input
                      type="text"
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      placeholder="Enter your Tracking ID"
                      className="w-full bg-transparent pl-10 pr-3 py-3 text-[15px] font-medium text-[#0A0A0A] outline-none placeholder:text-[#b0b0b0]"
                      aria-label="Tracking ID"
                    />
                  </div>
                  <Link href="/track" className="bg-gradient-to-r from-[#FFAA00] to-[#E69900] text-[#0A0A0A] font-bold text-[14px] px-7 py-3 rounded-xl hover:shadow-[0_4px_16px_rgba(255,170,0,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                    Track Now <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>

              {/* Trust badges */}
              <motion.div {...fadeIn(0.4)} className="flex flex-wrap gap-4 sm:gap-5">
                {[
                  { icon: ShieldCheck, t: 'Secure & Private' },
                  { icon: Zap,         t: 'Instant Updates' },
                  { icon: Globe,       t: '200+ Cities' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold text-[#555]">
                    <div className="w-7 h-7 bg-[#F0F7F0] border border-[#D4ECD4] rounded-lg flex items-center justify-center">
                      <b.icon size={14} className="text-[#237227]" />
                    </div>
                    {b.t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Delivery illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div style={{ y: heroImgY }} className="lg:-mr-6 relative">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#237227]/10 via-transparent to-[#FFAA00]/10 rounded-3xl blur-[40px]" />
                <Image
                  src="/images/hero-delivery.svg"
                  alt="Delivery truck illustration with parcels and route map"
                  width={700}
                  height={525}
                  className="w-full h-auto relative z-10 rounded-2xl sm:rounded-3xl"
                  priority
                />

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white rounded-2xl shadow-xl border border-[#E8E8E8] px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 z-20"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[11px] font-bold text-[#aaa] uppercase tracking-wider">Status</p>
                    <p className="text-[12px] sm:text-[14px] font-black text-emerald-600">Delivered</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-6 left-2 sm:bottom-12 sm:left-4 bg-white rounded-2xl shadow-xl border border-[#E8E8E8] px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 z-20"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Truck size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[11px] font-bold text-[#aaa] uppercase tracking-wider">Live</p>
                    <p className="text-[12px] sm:text-[14px] font-black text-[#0A0A0A]">In Transit</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-[#0A0A0A] py-4 marquee-wrap relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 pointer-events-none" />
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="flex items-center gap-8 px-8">
              <span className="font-display text-[12px] tracking-wider text-white/60 whitespace-nowrap">{item}</span>
              <span className="text-[#FFAA00] text-sm">&#9670;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-12 sm:mb-16">
            <p className="label-tag mb-3">By the numbers</p>
            <h2 className="heading-section">
              Trusted by <span className="accent-gold">thousands</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { v: 50000, s: '+', l: 'Parcels Delivered', icon: Package, color: 'text-[#237227]', bg: 'bg-[#F0F7F0]', ring: 'ring-[#D4ECD4]' },
              { v: 98,    s: '%', l: 'On-Time Rate',      icon: Star,    color: 'text-[#FFAA00]', bg: 'bg-[#FFF8E7]', ring: 'ring-[#FFE0A0]' },
              { v: 200,   s: '+', l: 'Cities Covered',    icon: Globe,   color: 'text-[#237227]', bg: 'bg-[#F0F7F0]', ring: 'ring-[#D4ECD4]' },
              { v: 12000, s: '+', l: 'Happy Customers',   icon: Users,   color: 'text-[#FFAA00]', bg: 'bg-[#FFF8E7]', ring: 'ring-[#FFE0A0]' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="relative bg-white border-2 border-[#E8E8E8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center group hover:border-[#237227]/30 hover:shadow-[0_12px_40px_rgba(35,114,39,0.08)] transition-all duration-300"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${stat.bg} ring-1 ${stat.ring} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={22} className={`${stat.color} sm:hidden`} />
                  <stat.icon size={26} className={`${stat.color} hidden sm:block`} />
                </div>
                <div className="font-display text-[clamp(28px,5vw,44px)] text-[#0A0A0A] mb-1 leading-none">
                  <Counter to={stat.v} suffix={stat.s} />
                </div>
                <p className="text-[10px] sm:text-[12px] font-bold text-[#aaaaaa] tracking-widest uppercase">{stat.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 sm:py-28 bg-[#F0F7F0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp()} className="text-center mb-12 sm:mb-16">
            <p className="label-tag mb-4">The Process</p>
            <h2 className="heading-section">
              Three steps. <span className="accent-gold">Done.</span>
            </h2>
            <p className="body-lead mt-4 max-w-lg mx-auto">From creation to tracking — it&rsquo;s fast, secure, and effortless.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Desktop: horizontal layout with connecting line */}
            <div className="hidden md:block">
              {/* Connector line */}
              <div className="absolute top-[52px] left-[calc(16.67%)] right-[calc(16.67%)] h-[2px] z-0">
                <div className="w-full h-full bg-gradient-to-r from-[#237227] via-[#519A66] to-[#FFAA00] rounded-full opacity-30" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {[
                  { n: '01', h: 'Shipment Created', b: 'Admin generates a unique tracking ID and secure password for the parcel.', icon: Box, iconBg: 'from-[#237227] to-[#1A5C1E]', numColor: 'text-[#237227]' },
                  { n: '02', h: 'Credentials Shared', b: 'The recipient receives their unique login credentials from the sender.', icon: ShieldCheck, iconBg: 'from-[#237227] to-[#519A66]', numColor: 'text-[#519A66]' },
                  { n: '03', h: 'Track Anytime', b: 'Enter credentials and see real-time status, location, and full timeline.', icon: MapPin, iconBg: 'from-[#FFAA00] to-[#E69900]', numColor: 'text-[#FFAA00]' },
                ].map((step, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.15)} className="group">
                    {/* Step number + Icon row */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <span className={`font-display text-[32px] ${step.numColor} opacity-30`}>{step.n}</span>
                      <div className={`w-[72px] h-[72px] bg-gradient-to-br ${step.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                        <step.icon size={30} className="text-white" />
                      </div>
                    </div>
                    {/* Card */}
                    <div className="bg-white border-2 border-[#E8E8E8] rounded-2xl p-7 text-center group-hover:border-[#237227]/30 group-hover:shadow-[0_12px_40px_rgba(35,114,39,0.08)] transition-all duration-300">
                      <h3 className="text-[18px] font-black text-[#0A0A0A] tracking-tight mb-2">{step.h}</h3>
                      <p className="text-[14px] text-[#787878] leading-relaxed max-w-[260px] mx-auto">{step.b}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden space-y-0">
              {[
                { n: '1', h: 'Shipment Created', b: 'Admin generates a unique tracking ID and secure password for the parcel.', icon: Box, iconBg: 'from-[#237227] to-[#1A5C1E]' },
                { n: '2', h: 'Credentials Shared', b: 'The recipient receives their unique login credentials from the sender.', icon: ShieldCheck, iconBg: 'from-[#237227] to-[#519A66]' },
                { n: '3', h: 'Track Anytime', b: 'Enter credentials and see real-time status, location, and full timeline.', icon: MapPin, iconBg: 'from-[#FFAA00] to-[#E69900]' },
              ].map((step, i) => (
                <motion.div key={i} {...fadeUp(i * 0.12)} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 bg-gradient-to-br ${step.iconBg} rounded-xl flex items-center justify-center shadow-md shrink-0`}>
                      <step.icon size={20} className="text-white" />
                    </div>
                    {i < 2 && <div className="w-[2px] flex-1 bg-gradient-to-b from-[#D4ECD4] to-[#E8E8E8] my-2" />}
                  </div>
                  <div className={`flex-1 ${i < 2 ? 'pb-6' : ''}`}>
                    <span className="text-[11px] font-bold text-[#237227] tracking-widest uppercase">Step {step.n}</span>
                    <h3 className="text-[17px] font-black text-[#0A0A0A] tracking-tight mt-1 mb-1">{step.h}</h3>
                    <p className="text-[13px] text-[#787878] leading-relaxed">{step.b}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...fadeUp(0.4)} className="text-center mt-12 sm:mt-14">
            <Link href="/track" className="btn-accent py-4 px-10 text-[15px]">
              Start Tracking <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Parcels illustration */}
            <ParallaxImage
              src="/images/parcels-stack.svg"
              alt="Stack of delivery parcels with OneWorldCourier branding"
              className="rounded-3xl order-2 lg:order-1"
            />

            {/* Right: Text */}
            <motion.div {...fadeUp(0.1)} className="order-1 lg:order-2">
              <p className="label-tag mb-5">About OneWorldCourier</p>
              <h2 className="heading-section mb-5 sm:mb-6">
                Built by people
                <br />who <span className="accent-gold">get it</span>
              </h2>
              <p className="body-lead mb-5 sm:mb-6">
                We started OneWorldCourier after one too many &ldquo;your package is on its way&rdquo;
                emails with zero detail. Customers deserve better.
              </p>
              <p className="body-lg mb-8 sm:mb-10">
                Today, OneWorldCourier powers shipment visibility for hundreds of businesses — from small sellers
                to enterprise logistics teams across 200+ cities.
              </p>

              {/* Mini stats row */}
              <div className="flex gap-3 sm:gap-4 mb-8">
                {[
                  { val: '50K+', label: 'Shipments', gradient: 'from-emerald-500 to-emerald-600' },
                  { val: '98%', label: 'On-time', gradient: 'from-amber-500 to-orange-500' },
                  { val: '200+', label: 'Cities', gradient: 'from-blue-500 to-blue-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-[#F0F7F0] border border-[#D4ECD4] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-center flex-1">
                    <div className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A]">{s.val}</div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-[#787878] uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-outline">
                Our Story <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
