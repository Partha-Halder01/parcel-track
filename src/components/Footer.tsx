'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const [year, setYear] = useState(2026)
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="bg-[#0A0A0A] text-white overflow-hidden">
      {/* Big CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-12 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <h2 className="heading-section text-white text-center md:text-left" style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}>
            Ready to <span className="text-[#237227]">track?</span>
          </h2>
          <Link href="/track" className="btn-accent py-4 px-10 text-[15px]">
            Track Your Parcel <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        <div className="py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="OneWorldCourier"
                width={160}
                height={45}
                className="h-[38px] w-auto object-contain brightness-110"
                loading="lazy"
              />
            </div>
            <p className="text-white/40 text-[14px] leading-relaxed max-w-[260px]">
              Real-time parcel tracking built for businesses that take delivery seriously.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/25 mb-4">Pages</p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer pages">
              {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }, { label: 'Track Parcel', href: '/track' }].map((l) => (
                <Link key={l.href} href={l.href} className="text-[14px] text-white/45 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/25 mb-4">Legal</p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer legal">
              {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }].map((l) => (
                <Link key={l.href} href={l.href} className="text-[14px] text-white/45 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-white/[0.08] py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-[13px]">&copy; {year} OneWorldCourier. All rights reserved.</p>
          <p className="text-white/25 text-[13px]">Developed by Partha</p>
        </div>
      </div>
    </footer>
  )
}
