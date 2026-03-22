'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [path])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAFDF8]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="OneWorldCourier Home">
            <Image
              src="/images/logo.png"
              alt="OneWorldCourier"
              width={160}
              height={45}
              className="h-[38px] sm:h-[42px] w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13px] font-semibold tracking-wide transition-colors relative ${
                  path === l.href ? 'text-[#237227]' : 'text-[#787878] hover:text-[#0A0A0A]'
                }`}
              >
                {l.label}
                {path === l.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#237227] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/track" className="btn-accent py-2.5 px-6 text-[13px]">
              Track Parcel <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[#E8E8E8] hover:bg-[#F0F7F0] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-5 pb-8 flex flex-col"
          >
            <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-left px-4 py-4 text-lg font-semibold rounded-xl transition-colors ${
                    path === l.href ? 'text-[#237227] bg-[#F0F7F0]' : 'text-[#0A0A0A] hover:bg-[#F0F7F0]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-3 pt-6 border-t border-[#E8E8E8]">
              <Link href="/track" className="btn-accent w-full justify-center py-4 text-base">
                Track Parcel <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
