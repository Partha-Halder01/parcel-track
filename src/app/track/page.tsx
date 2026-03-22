'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, Lock, Loader2, ArrowRight, Package, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TrackLogin() {
  const [trackingId, setTrackingId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('userToken', data.token)
        router.push(`/track/${data.token}`)
      } else {
        setError(data.error || 'Invalid credentials. Check your Tracking ID and password.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white border border-[#E8E8E8] rounded-3xl p-7 sm:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#237227] to-[#1A5C1E] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#237227]/20">
                <Package size={28} className="text-white" />
              </div>
              <h1 className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#0A0A0A] mb-2">Track Your Shipment</h1>
              <p className="text-[14px] text-[#787878]">
                Enter credentials provided by your sender
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-[13px] font-semibold"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-2">
                  Tracking ID
                </label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D0D0D0] group-focus-within:text-[#237227] transition-colors" size={17} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. TRK12345678"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="input-clean pl-11 h-13 text-[15px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D0D0D0] group-focus-within:text-[#237227] transition-colors" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Your shipment password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-clean pl-11 pr-12 h-13 text-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D0D0D0] hover:text-[#787878] transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 justify-center text-[15px] mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-[#237227] to-[#1A5C1E] text-white font-semibold rounded-full border-0 cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(35,114,39,0.35)] hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={18} /> Verifying...</>
                ) : (
                  <>View Tracking Details <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <div className="mt-7 pt-6 border-t border-[#F0F0EE]">
              <p className="text-[13px] text-[#aaaaaa] text-center">
                Don&rsquo;t have credentials?{' '}
                <Link
                  href="/contact"
                  className="text-[#237227] font-semibold hover:text-[#1A5C1E] transition-colors"
                >
                  Contact us &rarr;
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
