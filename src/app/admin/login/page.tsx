'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ShieldAlert, User, Lock, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('adminToken', data.token)
        router.push('/admin/dashboard')
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
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neon-green/10 via-background to-background pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-md p-8 relative z-10 border-neon-green/20 shadow-[0_0_50px_rgba(57,255,20,0.1)]"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mb-4 text-neon-green shadow-[0_0_20px_rgba(57,255,20,0.2)]">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white">SYSTEM ACCESS</h2>
          <p className="text-neon-green/60 text-xs mt-2 uppercase tracking-widest">Admin Authorization Required</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-neon-green transition-colors" size={18} />
            <input
              type="text"
              required
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input w-full pl-12 h-14 bg-white/5 border-white/10 focus:border-neon-green focus:ring-neon-green"
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-neon-green transition-colors" size={18} />
            <input
              type="password"
              required
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full pl-12 h-14 bg-white/5 border-white/10 focus:border-neon-green focus:ring-neon-green"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 flex items-center justify-center gap-2 mt-4 bg-neon-green/10 hover:bg-neon-green/20 text-neon-green border border-neon-green/50 font-bold tracking-wider rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'AUTHENTICATE'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
