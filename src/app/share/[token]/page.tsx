'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2, CircleDashed, MapPin, Package, Clock, Truck, ShieldCheck, AlertCircle } from 'lucide-react'
import Image from 'next/image'

const STATUS_STEPS = ['Order Placed', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered']

const statusStyle: Record<string, { badge: string; dot: string; card: string }> = {
  'Order Placed':     { badge: 'badge badge-gray',   dot: 'bg-gray-400',    card: 'bg-[#F0F7F0] border-[#E8E8E8]' },
  'Dispatched':       { badge: 'badge badge-blue',   dot: 'bg-blue-500',    card: 'bg-blue-50 border-blue-200' },
  'In Transit':       { badge: 'badge badge-orange', dot: 'bg-orange-500',  card: 'bg-orange-50 border-orange-200' },
  'Out for Delivery': { badge: 'badge badge-purple', dot: 'bg-purple-500',  card: 'bg-purple-50 border-purple-200' },
  'Delivered':        { badge: 'badge badge-green',  dot: 'bg-emerald-500', card: 'bg-emerald-50 border-emerald-200' },
}

export default function ShareTracking() {
  const params = useParams()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/share/${params.token}`)
        if (res.ok) setData(await res.json())
        else setError(true)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.token])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 bg-[#F0F7F0] rounded-2xl flex items-center justify-center">
          <Truck size={28} className="text-[#237227] anim-spin-slow" />
        </div>
        <p className="text-[13px] font-semibold text-[#aaaaaa] tracking-wider uppercase animate-pulse">Loading shipment…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-5">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        <h1 className="text-[22px] font-black text-[#0A0A0A] tracking-tight">Invalid Share Link</h1>
        <p className="text-[14px] text-[#787878] text-center max-w-xs">This tracking link is invalid or has expired. Please request a new link from the sender.</p>
        <button onClick={() => router.push('/')} className="btn-accent mt-4 text-[14px] px-6 py-3">
          Go to Homepage
        </button>
      </div>
    )
  }

  const stepIdx = STATUS_STEPS.indexOf(data?.status)
  const progress = Math.round(((stepIdx + 1) / STATUS_STEPS.length) * 100)
  const sStyle = statusStyle[data?.status] || statusStyle['Order Placed']

  return (
    <div className="bg-[#F0F7F0] min-h-screen">
      {/* Minimal nav */}
      <nav className="bg-white border-b border-[#E8E8E8] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')}>
            <Image src="/images/logo.png" alt="OneWorldCourier" width={140} height={40} className="h-[36px] w-auto object-contain" />
          </button>
          <div className="flex items-center gap-2 bg-[#F0F7F0] border border-[#D4ECD4] rounded-full px-3 py-1.5">
            <ShieldCheck size={13} className="text-[#237227]" />
            <span className="text-[11px] font-bold text-[#237227] tracking-wider uppercase">Secure Share</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-5">

        {/* Status banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${sStyle.card} border rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
        >
          <div className="flex items-center gap-4">
            <span className={`w-3 h-3 rounded-full ${sStyle.dot} ${data?.status !== 'Delivered' ? 'animate-pulse' : ''}`} />
            <div>
              <p className="label-tag mb-0.5">Current Status</p>
              <p className="text-[20px] font-black text-[#0A0A0A] tracking-tight">{data?.status}</p>
            </div>
          </div>
          {data?.estimatedDelivery && (
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-[#787878]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#aaaaaa]">Est. Delivery</p>
                <p className="text-[14px] font-bold text-[#0A0A0A]">
                  {new Date(data.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Shipment info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden"
        >
          <div className="px-7 py-5 border-b border-[#F0F0EE] flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="label-tag mb-1">Tracking ID</p>
              <p className="font-mono font-black text-[24px] text-[#0A0A0A] tracking-tight">{data?.trackingId}</p>
            </div>
            <span className={sStyle.badge}>{data?.status}</span>
          </div>
          <div className="px-7 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, label: 'Receiver',      value: data?.receiverName },
              { icon: Package,     label: 'Parcel Type',   value: data?.parcelType },
              { icon: MapPin,      label: 'Destination',   value: data?.address },
              { icon: Clock,       label: 'Est. Delivery', value: data?.estimatedDelivery ? new Date(data.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Pending' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-[#F0F7F0] border border-[#E8E8E8] rounded-xl flex items-center justify-center shrink-0">
                  <item.icon size={17} className="text-[#237227]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-0.5">{item.label}</p>
                  <p className="text-[15px] font-semibold text-[#0A0A0A]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress tracker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="bg-white border border-[#E8E8E8] rounded-2xl p-7"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-black text-[#0A0A0A] tracking-tight flex items-center gap-2">
              <Truck size={18} className="text-[#237227]" /> Delivery Progress
            </h2>
            <span className="text-[13px] font-bold text-[#237227]">{progress}% complete</span>
          </div>
          <div className="h-2 bg-[#F0F0EE] rounded-full overflow-hidden mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
              className="h-full bg-[#237227] rounded-full"
            />
          </div>
          <div className="flex items-start justify-between gap-1 relative">
            <div className="absolute top-4 left-0 right-0 h-px bg-[#F0F0EE] z-0" />
            {STATUS_STEPS.map((step, i) => {
              const done   = i <= stepIdx
              const active = i === stepIdx
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex flex-col items-center gap-2 flex-1 relative z-10"
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    done ? 'bg-[#237227] border-[#237227]' : 'bg-white border-[#E8E8E8]'
                  }`}>
                    {done ? <CheckCircle2 size={15} className="text-white" /> : <CircleDashed size={15} className="text-[#D0D0D0]" />}
                  </div>
                  {active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#237227]/40 rounded-full animate-ping" />}
                  <p className={`text-[10px] text-center font-semibold max-w-[56px] leading-tight ${
                    done ? (active ? 'text-[#237227]' : 'text-[#0A0A0A]') : 'text-[#D0D0D0]'
                  }`}>{step}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#E8E8E8] rounded-2xl p-7"
        >
          <h2 className="text-[17px] font-black text-[#0A0A0A] tracking-tight flex items-center gap-2 mb-8">
            <Clock size={18} className="text-[#237227]" /> Shipment History
          </h2>
          <div className="relative space-y-5">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-[#F0F0EE] z-0" />
            {data?.timeline?.map((ev: any, idx: number) => {
              const evStyle = statusStyle[ev.status] || statusStyle['Order Placed']
              const isFirst = idx === 0
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.07 }}
                  className="flex gap-5 relative z-10"
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isFirst ? 'bg-[#237227] border-[#237227]' : 'bg-white border-[#E8E8E8]'
                  }`}>
                    {isFirst ? <CheckCircle2 size={14} className="text-white" /> : <CircleDashed size={14} className="text-[#D0D0D0]" />}
                  </div>
                  <div className={`flex-1 border rounded-xl p-4 ${evStyle.card}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <p className="text-[14px] font-black text-[#0A0A0A] tracking-tight">{ev.status}</p>
                      <time className="font-mono text-[11px] text-[#aaaaaa]">
                        {new Date(ev.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </time>
                    </div>
                    {ev.description && <p className="text-[13px] text-[#787878]">{ev.description}</p>}
                    {ev.location && (
                      <div className="flex items-center gap-1.5 mt-2 text-[12px] font-semibold text-[#237227]">
                        <MapPin size={11} /> {ev.location}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
