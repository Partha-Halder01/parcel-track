'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap, Heart, Globe, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d } })

const values = [
  {
    icon: Zap,
    title: 'Speed without compromise',
    body: 'Status updates reach your customers within seconds of being logged. Not minutes. Not hours. Seconds.',
    gradient: 'from-[#237227] to-[#1A5C1E]',
    tag: 'Performance',
    tagColor: 'text-[#237227] bg-[#F0F7F0] border-[#D4ECD4]',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy by design',
    body: 'Every shipment is locked behind unique credentials. No guessing, no snooping — only the right person sees the right data.',
    gradient: 'from-[#237227] to-[#519A66]',
    tag: 'Security',
    tagColor: 'text-[#237227] bg-[#F0F7F0] border-[#D4ECD4]',
  },
  {
    icon: Heart,
    title: 'Built for real people',
    body: 'We designed every screen with the customer in mind. If your grandmother can\'t use it, we\'re not done building it.',
    gradient: 'from-[#FFAA00] to-[#E69900]',
    tag: 'Usability',
    tagColor: 'text-[#E69900] bg-[#FFF8E7] border-[#FFE0A0]',
  },
  {
    icon: Globe,
    title: 'Reliability above all',
    body: '99.9% uptime. Because when someone\'s waiting for a package, the tracking platform failing is never acceptable.',
    gradient: 'from-[#237227] to-[#1A5C1E]',
    tag: 'Uptime',
    tagColor: 'text-[#237227] bg-[#F0F7F0] border-[#D4ECD4]',
  },
]

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ─── Hero Header with Image ─── */}
      <section className="pt-32 pb-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="label-tag mb-5">Who we are</p>
              <h1 className="heading-hero mb-6" style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
                We built the tracking
                <br />experience we <span className="accent-gold">always wanted.</span>
              </h1>
              <p className="body-lead max-w-md">
                A team of engineers and logistics enthusiasts tired of &ldquo;your package is on its way&rdquo; with zero detail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/about-team.svg"
                alt="OneWorldCourier team working at their desks with tracking dashboards"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Story with Network Image ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Network illustration */}
            <motion.div {...fadeUp(0.1)}>
              <Image
                src="/images/logistics-network.svg"
                alt="OneWorldCourier logistics network connecting cities"
                width={600}
                height={450}
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            {/* Right: Story text */}
            <motion.div {...fadeUp(0.2)} className="space-y-6">
              <p className="label-tag mb-2">Our story</p>
              <h2 className="heading-section mb-4">
                Started from<br />
                <span className="text-[#787878]" style={{ fontWeight: 400 }}>frustration.</span>
              </h2>

              <p className="body-lead">
                OneWorldCourier started in 2023 when our team got frustrated with the state of parcel tracking &mdash;
                not just as customers, but as developers who had tried building on top of existing carrier APIs.
              </p>
              <p className="body-lg">
                The data was there. But the experience delivered to end-customers was consistently terrible.
                Vague statuses. Zero timestamps. Helpdesk tickets that went unanswered.
              </p>
              <p className="body-lg">
                The answer became OneWorldCourier — a clean, secure tracking platform that prioritises the recipient&rsquo;s
                experience as much as the logistics operator&rsquo;s efficiency.
              </p>

              {/* Timeline chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[
                  { year: '2023', event: 'Founded' },
                  { year: 'Jan \'24', event: '10K parcels' },
                  { year: 'Jun \'24', event: '100+ clients' },
                  { year: '2025', event: '50K+ deliveries' },
                ].map((milestone, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#F0F7F0] border border-[#D4ECD4] rounded-full px-3.5 py-1.5">
                    <span className="text-[#237227] font-black text-[11px]">{milestone.year}</span>
                    <span className="text-[11px] text-[#787878] font-semibold">{milestone.event}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div {...fadeUp()}>
              <p className="label-tag mb-4">What we stand for</p>
              <h2 className="heading-section max-w-lg mb-4">
                Four principles.<br />
                <span className="text-[#787878]" style={{ fontWeight: 400 }}>Non-negotiable.</span>
              </h2>
              <p className="body-lg max-w-md">
                Every decision we make at OneWorldCourier is filtered through these core values.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.15)}>
              <Image
                src="/images/tracking-map.svg"
                alt="Live tracking map showing parcel route across cities"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((val, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#E8E8E8] hover:border-[#237227]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 group"
              >
                {/* Tag */}
                <div className={`inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border mb-5 ${val.tagColor}`}>
                  {val.tag}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${val.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <val.icon size={22} className="text-white" />
                </div>

                <h3 className="text-[17px] sm:text-[18px] font-black tracking-tight text-[#0A0A0A] mb-2">{val.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-[#787878] leading-relaxed">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="heading-section text-white mb-5" style={{ fontSize: 'clamp(22px, 4vw, 44px)' }}>
              Want to work with us?
            </h2>
            <p className="body-lg text-white/40 mb-8 max-w-lg mx-auto">
              Whether you&rsquo;re a business looking to integrate OneWorldCourier or just want to say hello — we&rsquo;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-gold py-3.5 px-9 text-[14px]">
                Get in touch <ArrowRight size={15} />
              </Link>
              <Link href="/track" className="btn-outline py-3.5 px-9 text-[14px] border-white/20 text-white hover:border-[#FFAA00] hover:text-[#FFAA00]">
                Track a parcel
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
