'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ShieldCheck, User, Lock, ArrowLeft, Package, Truck, BarChart3, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
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
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('adminToken', data.token)
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#237227]/12 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-[#237227]/8 rounded-full blur-[100px] pointer-events-none -translate-x-1/4" />
      <div className="absolute top-0 left-1/2 w-[200px] h-[200px] bg-[#FFAA00]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/2" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">

          {/* Left: Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#111111] to-[#0A0A0A] rounded-l-3xl border border-white/[0.06] p-10 xl:p-12 relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#237227]/15 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              {/* Logo */}
              <button onClick={() => router.push('/')} className="mb-16 group">
                <Image src="/images/logo.png" alt="OneWorldCourier" width={140} height={40} className="h-[36px] w-auto object-contain brightness-110" />
              </button>

              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2 mb-8">
                <ShieldCheck size={13} className="text-[#237227]" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/40">Admin access</span>
              </div>

              <h1 className="text-[42px] xl:text-[52px] font-black text-white leading-[1.05] tracking-tight mb-6">
                Command<br />
                <span className="bg-gradient-to-r from-[#237227] to-[#519A66] bg-clip-text text-transparent">Center.</span>
              </h1>
              <p className="text-white/35 text-[15px] leading-relaxed max-w-xs">
                Manage shipments, push live updates, and keep your customers informed — all from one place.
              </p>
            </div>

            <div className="space-y-2.5 relative z-10 mt-10">
              {[
                { icon: BarChart3, label: 'Real-time shipment analytics' },
                { icon: Truck,     label: 'Create & manage deliveries' },
                { icon: Package,   label: 'Full shipment lifecycle control' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4 border border-white/[0.06] rounded-xl px-5 py-3.5 bg-white/[0.02] backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-[#237227]/20 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-[#519A66]" />
                  </div>
                  <span className="text-[13px] font-semibold text-white/50">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-3xl lg:rounded-l-none lg:rounded-r-3xl overflow-hidden"
          >
            <div className="p-7 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center min-h-[580px]">
              {/* Mobile logo */}
              <button onClick={() => router.push('/')} className="mb-8 lg:hidden">
                <Image src="/images/logo.png" alt="OneWorldCourier" width={140} height={40} className="h-[36px] w-auto object-contain" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-[#237227] to-[#1A5C1E] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#237227]/20">
                  <ShieldCheck size={26} className="text-white" />
                </div>
                <h2 className="text-[26px] sm:text-[28px] font-black tracking-tight text-[#0A0A0A] mb-2">Welcome back</h2>
                <p className="text-[14px] text-[#787878]">Sign in to your admin dashboard</p>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-[13px] font-semibold"
                >
                  {error}
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[12px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-2">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D0D0D0] group-focus-within:text-[#237227] transition-colors" size={17} />
                    <input
                      type="text"
                      required
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-clean pl-11 h-13 text-[15px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-2">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D0D0D0] group-focus-within:text-[#237227] transition-colors" size={17} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
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
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating…</>
                    : <><ShieldCheck size={16} /> Sign In to Dashboard</>}
                </button>
              </form>

              {/* Footer links */}
              <div className="mt-8 pt-6 border-t border-[#F0F0EE] flex items-center justify-between">
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 text-[13px] font-semibold text-[#aaaaaa] hover:text-[#0A0A0A] transition-colors"
                >
                  <ArrowLeft size={15} /> Back to site
                </button>
                <button
                  onClick={() => router.push('/track')}
                  className="text-[13px] font-semibold text-[#237227] hover:text-[#1A5C1E] transition-colors"
                >
                  Track a parcel &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
