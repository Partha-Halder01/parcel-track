'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, Package, ShieldCheck, Zap } from 'lucide-react'

export default function Home() {
  const [trackingId, setTrackingId] = useState('')
  const router = useRouter()

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingId.trim()) {
      router.push(`/track`)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-blue/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neon-green/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10 glass rounded-b-3xl">
        <div className="text-2xl font-black text-gradient tracking-wider flex items-center gap-2">
          <Package className="text-neon-blue" />
          NEXUS
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push('/track')} className="text-white hover:text-neon-blue transition-colors font-medium">Track</button>
          <button onClick={() => router.push('/admin/login')} className="text-white/60 hover:text-white transition-colors text-sm">Admin</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Track your parcel <br />
            <span className="text-gradient">Instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10">
            Real-time tracking, seamless updates, and premium logistics experience built for modern businesses.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto relative group">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 group-focus-within:text-neon-blue transition-colors" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID (e.g., TRK12345678)"
                className="w-full glass-input pl-12 h-14 text-lg"
              />
            </div>
            <button type="submit" className="glass-button w-full md:w-auto h-14 px-8 flex items-center justify-center gap-2 whitespace-nowrap">
              Track Now <Zap size={18} />
            </button>
          </form>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full"
        >
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-neon-blue/10 flex items-center justify-center mb-6 text-neon-blue">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Updates</h3>
            <p className="text-white/60">Get instant notifications and real-time timeline updates on your shipments.</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center mb-6 text-neon-green">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure System</h3>
            <p className="text-white/60">Your data is encrypted. Track shipments securely with unique IDs and passwords.</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Logistics</h3>
            <p className="text-white/60">Built for scale. Manage thousands of shipments worldwide seamlessly.</p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full py-8 text-center text-white/40 text-sm z-10 border-t border-white/10 mt-auto">
        &copy; {new Date().getFullYear()} Nexus Tracking SaaS. All rights reserved.
      </footer>
    </div>
  )
}
