'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2, CircleDashed, LogOut, MapPin, Package, Clock, Truck, ShieldCheck, Zap } from 'lucide-react'

export default function TrackDashboard() {
  const params = useParams()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem('userToken')
    if (token !== params.id) {
      router.push('/track')
      return
    }

    const fetchShipment = async () => {
      try {
        const res = await fetch(`/api/user/shipments/${params.id}`)
        if (res.ok) {
          setData(await res.json())
        } else {
          router.push('/track')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchShipment()
  }, [params.id, router])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-neon-blue"><Zap className="animate-pulse" size={48} /></div>

  const statusMap = {
    'Order Placed': 25,
    'Dispatched': 50,
    'In Transit': 75,
    'Delivered': 100
  }
  const progress = data?.status ? statusMap[data.status as keyof typeof statusMap] || 0 : 0

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center glass rounded-b-3xl z-50 relative">
        <div className="text-xl font-bold text-gradient flex items-center gap-2" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <Package className="text-neon-blue" />
          NEXUS
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('userToken')
            router.push('/track')
          }}
          className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Tracking ID</h1>
              <p className="text-neon-green font-mono text-2xl tracking-widest bg-white/5 px-4 py-2 rounded-lg inline-block border border-neon-green/30">{data.trackingId}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${data.status === 'Delivered' ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-blue/20 text-neon-blue'}`}>
                {data.status === 'Delivered' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                {data.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="text-neon-blue" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">Destination</p>
                  <p className="text-white font-medium">{data.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Package className="text-neon-blue" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">Parcel Type</p>
                  <p className="text-white font-medium">{data.parcelType}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <ShieldCheck className="text-neon-blue" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">Receiver</p>
                  <p className="text-white font-medium">{data.receiverName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Truck className="text-neon-blue" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">Estimated Delivery</p>
                  <p className="text-white font-medium">{data.estimatedDelivery ? new Date(data.estimatedDelivery).toLocaleDateString() : 'Pending'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-bold mb-8">Shipment History</h2>

          <div className="relative mb-12">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
              />
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {data.timeline?.map((event: any, idx: number) => (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-neon-blue text-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {idx === 0 && progress === 100 ? <CheckCircle2 size={20} className="text-white" /> : <CircleDashed size={20} className="animate-spin-slow text-white" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-xl border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-white">{event.status}</div>
                    <time className="font-mono text-xs text-neon-blue">{new Date(event.timestamp).toLocaleString()}</time>
                  </div>
                  <div className="text-white/60 text-sm">{event.description}</div>
                  {event.location && (
                    <div className="text-white/40 text-xs mt-2 flex items-center gap-1">
                      <MapPin size={12} /> {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
