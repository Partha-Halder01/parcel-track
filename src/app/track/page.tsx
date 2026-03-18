'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Package, Search, Lock, Loader2 } from 'lucide-react'

export default function TrackLogin() {
  const [trackingId, setTrackingId] = useState('')
  const [password, setPassword] = useState('')
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
        body: JSON.stringify({ trackingId, password })
      })
      const data = await res.json()

      if (res.ok) {
        // Simple auth for now using local storage
        localStorage.setItem('userToken', data.token)
        router.push(`/track/${data.token}`)
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-blue/20 via-background to-background pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-neon-blue">
            <Package size={32} />
          </div>
          <h2 className="text-2xl font-bold text-center">Track Shipment</h2>
          <p className="text-white/60 text-sm mt-2 text-center">Enter your unique Tracking ID and Password provided by the sender.</p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              required
              placeholder="Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="glass-input w-full pl-12 h-12"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full pl-12 h-12"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="glass-button w-full h-12 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'View Tracking Details'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => router.push('/')} className="text-white/40 hover:text-white transition-colors text-sm">
            &larr; Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}
