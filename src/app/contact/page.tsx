'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Send, Sparkles, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: 'How do I get my Tracking ID?', a: 'Your Tracking ID and password are provided by the sender when your shipment is created. If you haven\'t received them, please contact the sender directly or reach out to us through this form.' },
    { q: 'Can I track multiple parcels?', a: 'Yes! Each parcel has its own unique Tracking ID and password. You can track them one at a time by logging in with the respective credentials on our tracking page.' },
    { q: 'What does "In Transit" mean?', a: '"In Transit" means your parcel has been picked up and is currently on its way to the destination. You\'ll see live location updates and estimated delivery time on the tracking timeline.' },
    { q: 'How long does delivery take?', a: 'Delivery times vary based on the origin, destination, and shipping method chosen. You can view the estimated delivery date on your tracking page once your shipment is in transit.' },
    { q: 'Is my tracking data secure?', a: 'Absolutely. Every shipment is protected with unique credentials. Only the person with the correct Tracking ID and password can view the shipment details. We use encrypted connections across our platform.' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSending(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to send message. Please try again.')
        return
      }

      setSending(false)
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const info = [
    { icon: Mail,    label: 'Email us',       value: 'support@oneworldcourier.com', sub: 'We reply within 24 hours', href: 'mailto:support@oneworldcourier.com' },
    { icon: Phone,   label: 'Call us',         value: '+91 98765 43210',             sub: 'Mon–Sat, 9am to 6pm IST', href: 'tel:+919876543210' },
    { icon: MapPin,  label: 'Head office',     value: 'Mumbai, Maharashtra',         sub: 'India — 400001', href: null },
  ]

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ─── Main Content — Form visible in first viewport ─── */}
      <section className="pt-28 sm:pt-32 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">

            {/* Left: Header + Form */}
            <div>
              {/* Compact header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 sm:mb-8">
                <p className="label-tag mb-3">Get in touch</p>
                <h1 className="heading-hero mb-3" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
                  Let&rsquo;s <span className="accent-word">talk.</span>
                </h1>
                <p className="text-[15px] text-[#787878] max-w-md">
                  Questions, partnership enquiries, or just curious how OneWorldCourier works — we&rsquo;re here.
                </p>
              </motion.div>

              {/* Contact info — horizontal on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
              >
                {info.map((item, i) => (
                  <a
                    key={i}
                    href={item.href || undefined}
                    className={`flex items-center gap-3 p-4 border border-[#E8E8E8] rounded-xl hover:border-[#237227]/30 hover:shadow-md transition-all duration-300 group flex-1 ${item.href ? 'cursor-pointer' : ''}`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#237227] to-[#1A5C1E] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-[#0A0A0A] truncate">{item.value}</p>
                      <p className="text-[11px] text-[#aaaaaa]">{item.sub}</p>
                    </div>
                  </a>
                ))}
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 border-2 border-emerald-300 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-[24px] sm:text-[28px] font-black text-[#0A0A0A] tracking-tight mb-3">Message Sent!</h2>
                    <p className="text-[15px] text-[#787878] mb-2 leading-relaxed max-w-sm">
                      Thanks for reaching out, <strong className="text-[#0A0A0A]">{form.name}</strong>.
                      We&rsquo;ll get back to you shortly.
                    </p>
                    {form.phone && (
                      <p className="text-[14px] text-[#787878]">
                        Contact number: <a href={`tel:${form.phone}`} className="font-bold text-[#237227] hover:underline">{form.phone}</a>
                      </p>
                    )}
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }) }}
                      className="btn-outline mt-8"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <div className="bg-white border-2 border-[#E8E8E8] rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#237227] to-[#1A5C1E] rounded-xl flex items-center justify-center">
                        <Send size={18} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-[18px] sm:text-[20px] font-black text-[#0A0A0A] tracking-tight">Send a Message</h2>
                        <p className="text-[12px] text-[#aaaaaa]">Fill in the details below</p>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] font-semibold mb-5"
                      >
                        {error}
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="John Doe"
                            className="input-clean h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-1.5">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={15} />
                            <input
                              type="tel"
                              required
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="input-clean h-12 pl-11"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-1.5">
                            Email <span className="text-[#aaaaaa] normal-case font-normal">(optional)</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={15} />
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="john@company.com"
                              className="input-clean h-12 pl-11"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-1.5">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            placeholder="What's this about?"
                            className="input-clean h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#0A0A0A] mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us what's on your mind..."
                          className="input-clean resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full h-[52px] justify-center text-[14px] inline-flex items-center gap-2 bg-gradient-to-r from-[#237227] to-[#1A5C1E] text-white font-semibold rounded-full border-0 cursor-pointer transition-all hover:shadow-[0_8px_24px_rgba(35,114,39,0.35)] hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {sending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>Send Message <Send size={15} /></>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-5 lg:pt-[136px]"
            >
              {/* Dark quick track box */}
              <div className="bg-[#0A0A0A] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#237227]/20 rounded-full blur-[50px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-[#FFAA00]" />
                    <p className="text-[11px] font-bold tracking-widest uppercase text-white/40">Quick access</p>
                  </div>
                  <h3 className="text-[20px] font-black text-white mb-2 tracking-tight">
                    Already have a Tracking ID?
                  </h3>
                  <p className="text-[13px] text-white/45 mb-5 leading-relaxed">
                    Go straight to the tracking page and see your shipment status in seconds.
                  </p>
                  <Link href="/track" className="btn-accent w-full justify-center text-[14px]">
                    Track Now <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* FAQ accordion */}
              <div className="border-2 border-[#E8E8E8] rounded-2xl p-5 sm:p-6">
                <p className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-widest mb-4">Common questions</p>
                <div className="space-y-0">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-[#F0F0EE] last:border-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex items-center justify-between py-3 w-full text-left group"
                      >
                        <p className={`text-[13px] transition-colors pr-2 ${openFaq === i ? 'text-[#0A0A0A] font-semibold' : 'text-[#787878] group-hover:text-[#0A0A0A]'}`}>{faq.q}</p>
                        <ChevronDown size={15} className={`shrink-0 transition-all duration-300 ${openFaq === i ? 'text-[#237227] rotate-180' : 'text-[#D0D0D0] group-hover:text-[#237227]'}`} />
                      </button>
                      {openFaq === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.2 }}
                          className="pb-3"
                        >
                          <p className="text-[12px] text-[#787878] leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
