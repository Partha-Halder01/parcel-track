'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Mail, Phone, ChevronDown, ChevronUp, Search, LogOut, ArrowLeft,
  Settings, ChevronLeft, ChevronRight, Trash2
} from 'lucide-react'
import Image from 'next/image'

const ITEMS_PER_PAGE = 10

export default function AdminContacts() {
  const router = useRouter()
  const [contacts, setContacts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [expandedContact, setExpandedContact] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
  }, [router])

  useEffect(() => {
    fetchContacts()
  }, [page, search])

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(search && { search }),
      })
      const res = await fetch(`/api/admin/contacts?${params}`)
      if (res.ok) {
        const data = await res.json()
        setContacts(data.contacts)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearch(searchInput)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this contact message?')) return
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) fetchContacts()
    } catch (e) { console.error(e) }
  }

  if (loading && contacts.length === 0) return (
    <div className="min-h-screen bg-[#F0F7F0] flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 bg-white border border-[#E8E8E8] rounded-2xl flex items-center justify-center">
        <Settings size={26} className="text-[#237227] anim-spin-slow" />
      </div>
      <p className="text-[13px] font-semibold text-[#aaaaaa] tracking-widest uppercase animate-pulse">Loading contacts…</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0F7F0] pb-20">

      {/* Navbar */}
      <nav className="bg-white border-b border-[#E8E8E8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')}>
            <Image src="/images/logo.png" alt="OneWorldCourier" width={140} height={40} className="h-[36px] w-auto object-contain" />
          </button>
          <button
            onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login') }}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#787878] hover:text-red-600 transition-colors"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">

        {/* Back + Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#787878] hover:text-[#0A0A0A] transition-colors mb-4"
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </button>
          <h1 className="text-[28px] font-black text-[#0A0A0A] tracking-tight flex items-center gap-3">
            <Mail size={26} className="text-[#237227]" /> Contact Messages
          </h1>
          <p className="text-[14px] text-[#787878] mt-1">View and manage all contact form submissions.</p>
        </motion.div>

        {/* Contacts Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden"
        >
          {/* Header with search */}
          <div className="px-6 py-5 border-b border-[#F0F0EE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-[17px] font-black text-[#0A0A0A] tracking-tight">All Messages</h2>
              <p className="text-[13px] text-[#aaaaaa] mt-0.5">{total} message{total !== 1 ? 's' : ''} total</p>
            </div>
            <form onSubmit={handleSearch} className="relative flex-1 sm:w-60 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={15} />
              <input
                type="text"
                placeholder="Search by name, phone, email, subject…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() => { if (searchInput !== search) { setPage(1); setSearch(searchInput) } }}
                className="input-clean pl-9 h-10 text-[13px] w-full"
              />
            </form>
          </div>

          {/* Contact list */}
          {contacts.length === 0 ? (
            <div className="py-14 flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#F0F7F0] border border-[#E8E8E8] rounded-2xl flex items-center justify-center">
                <Mail size={22} className="text-[#D0D0D0]" />
              </div>
              <p className="text-[14px] font-semibold text-[#aaaaaa]">
                {search ? 'No messages match your search.' : 'No contact messages yet.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#F0F0EE]">
              {contacts.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="px-6 py-4"
                >
                  <div
                    className="flex items-start justify-between gap-4 cursor-pointer"
                    onClick={() => setExpandedContact(expandedContact === c.id ? null : c.id)}
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-9 h-9 bg-[#F0F7F0] border border-[#D4ECD4] rounded-xl flex items-center justify-center shrink-0">
                        <Mail size={15} className="text-[#237227]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-[14px] text-[#0A0A0A]">{c.name}</span>
                          {c.phone && (
                            <a
                              href={`tel:${c.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[12px] text-[#237227] font-semibold hover:underline"
                            >
                              <Phone size={11} /> {c.phone}
                            </a>
                          )}
                          {c.email && (
                            <span className="text-[12px] text-[#aaaaaa] font-mono">{c.email}</span>
                          )}
                        </div>
                        <p className="text-[13px] font-semibold text-[#787878] mt-0.5 truncate">{c.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[12px] text-[#aaaaaa] whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {expandedContact === c.id
                        ? <ChevronUp size={15} className="text-[#aaaaaa]" />
                        : <ChevronDown size={15} className="text-[#aaaaaa]" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedContact === c.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pl-[52px]"
                      >
                        <div className="bg-[#F0F7F0] border border-[#D4ECD4] rounded-xl p-4">
                          <p className="text-[13px] text-[#0A0A0A] leading-relaxed whitespace-pre-wrap">{c.message}</p>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(c.id) }}
                            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#aaaaaa] hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-[#F0F0EE] flex items-center justify-between">
              <p className="text-[13px] text-[#aaaaaa]">
                Page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="w-9 h-9 bg-[#F0F7F0] hover:bg-[#E8E8E8] border border-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={15} className="text-[#787878]" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (page <= 3) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = page - 2 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-bold transition-colors ${
                        page === pageNum
                          ? 'bg-[#0A0A0A] text-white'
                          : 'bg-[#F0F7F0] hover:bg-[#E8E8E8] border border-[#E8E8E8] text-[#787878]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="w-9 h-9 bg-[#F0F7F0] hover:bg-[#E8E8E8] border border-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={15} className="text-[#787878]" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
