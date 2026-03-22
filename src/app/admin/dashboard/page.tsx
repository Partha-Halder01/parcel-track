'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Plus, Settings, Package, Truck, CheckCircle2, Clock,
  MapPin, X, Loader2, RefreshCw, LogOut, Search,
  ArrowUpRight, Mail, ChevronLeft, ChevronRight,
  Share2, Copy, Check
} from 'lucide-react'
import Image from 'next/image'

const statusBadge: Record<string, string> = {
  'Delivered':        'badge badge-green',
  'In Transit':       'badge badge-orange',
  'Out for Delivery': 'badge badge-purple',
  'Dispatched':       'badge badge-blue',
  'Order Placed':     'badge badge-gray',
}

export default function AdminDashboard() {
  const router = useRouter()
  const ITEMS_PER_PAGE = 10
  const [stats, setStats] = useState({ total: 0, delivered: 0, pending: 0, inTransit: 0 })
  const [shipments, setShipments] = useState<any[]>([])
  const [totalShipments, setTotalShipments] = useState(0)
  const [shipmentPage, setShipmentPage] = useState(1)
  const [shipmentTotalPages, setShipmentTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [contactCount, setContactCount] = useState(0)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [formData, setFormData] = useState({ senderName: '', receiverName: '', address: '', parcelType: '', estimatedDelivery: '' })
  const [createLoading, setCreateLoading] = useState(false)
  const [newShipment, setNewShipment] = useState<any>(null)
  const [updateData, setUpdateData] = useState({ status: '', description: '', location: '', timestamp: '' })
  const [updateLoading, setUpdateLoading] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [shareCopied, setShareCopied] = useState(false)
  const [shareLoading, setShareLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchData()
  }, [router])

  useEffect(() => {
    fetchShipments()
  }, [shipmentPage, search])

  const fetchData = async () => {
    try {
      const [sRes, cRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/contacts?limit=1'),
      ])
      if (sRes.ok) setStats(await sRes.json())
      if (cRes.ok) { const d = await cRes.json(); setContactCount(d.total) }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
    fetchShipments()
  }

  const fetchShipments = async () => {
    try {
      const params = new URLSearchParams({
        page: shipmentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(search && { search }),
      })
      const res = await fetch(`/api/admin/shipments?${params}`)
      if (res.ok) {
        const data = await res.json()
        setShipments(data.shipments)
        setTotalShipments(data.total)
        setShipmentTotalPages(data.totalPages)
      }
    } catch (e) { console.error(e) }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShipmentPage(1)
    setSearch(searchInput)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreateLoading(true)
    try {
      const res = await fetch('/api/admin/shipments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      })
      if (res.ok) {
        const data = await res.json()
        setNewShipment(data.shipment)
        setFormData({ senderName: '', receiverName: '', address: '', parcelType: '', estimatedDelivery: '' })
        fetchData()
        fetchShipments()
      }
    } catch (e) { console.error(e) } finally { setCreateLoading(false) }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedShipment) return
    setUpdateLoading(true)
    try {
      const res = await fetch(`/api/admin/shipments/${selectedShipment.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updateData),
      })
      if (res.ok) { setSelectedShipment(null); setUpdateData({ status: '', description: '', location: '', timestamp: '' }); fetchData(); fetchShipments() }
    } catch (e) { console.error(e) } finally { setUpdateLoading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this shipment? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/admin/shipments/${id}`, { method: 'DELETE' })
      if (res.ok) { fetchData(); fetchShipments() }
    } catch (e) { console.error(e) }
  }

  const handleShare = async (id: string) => {
    setShareLoading(true)
    setShareLink('')
    setShareCopied(false)
    try {
      const res = await fetch(`/api/admin/shipments/${id}/share`, { method: 'POST' })
      if (res.ok) {
        const { shareToken } = await res.json()
        const link = `${window.location.origin}/share/${shareToken}`
        setShareLink(link)
      }
    } catch (e) { console.error(e) }
    finally { setShareLoading(false) }
  }

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    } catch { }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F0F7F0] flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 bg-white border border-[#E8E8E8] rounded-2xl flex items-center justify-center">
        <Settings size={26} className="text-[#237227] anim-spin-slow" />
      </div>
      <p className="text-[13px] font-semibold text-[#aaaaaa] tracking-widest uppercase animate-pulse">Loading dashboard…</p>
    </div>
  )

  const statCards = [
    { label: 'Total Shipments', value: stats.total,     icon: Package,      accent: 'text-[#0A0A0A]', bg: 'bg-[#F0F7F0]', iconC: 'text-[#0A0A0A]' },
    { label: 'Delivered',       value: stats.delivered, icon: CheckCircle2, accent: 'text-emerald-600', bg: 'bg-emerald-50', iconC: 'text-emerald-600' },
    { label: 'In Transit',      value: stats.inTransit, icon: Truck,        accent: 'text-[#237227]',  bg: 'bg-orange-50',  iconC: 'text-[#237227]' },
    { label: 'Pending',         value: stats.pending,   icon: Clock,        accent: 'text-blue-600',   bg: 'bg-blue-50',    iconC: 'text-blue-600' },
  ]

  return (
    <div className="min-h-screen bg-[#F0F7F0] pb-20">

      {/* Navbar */}
      <nav className="bg-white border-b border-[#E8E8E8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')}>
            <Image src="/images/logo.png" alt="OneWorldCourier" width={140} height={40} className="h-[36px] w-auto object-contain" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/contacts')}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#787878] hover:text-[#237227] transition-colors relative"
            >
              <Mail size={15} /> Contacts
              {contactCount > 0 && (
                <span className="absolute -top-1.5 -right-3 w-5 h-5 bg-[#237227] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {contactCount > 99 ? '99+' : contactCount}
                </span>
              )}
            </button>
            <div className="w-px h-5 bg-[#E8E8E8]" />
            <button
              onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login') }}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#787878] hover:text-red-600 transition-colors"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-[28px] font-black text-[#0A0A0A] tracking-tight">Dashboard</h1>
          <p className="text-[14px] text-[#787878] mt-1">Manage and monitor all shipments in real-time.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center`}>
                  <s.icon size={22} className={s.iconC} />
                </div>
                <ArrowUpRight size={15} className="text-[#D0D0D0]" />
              </div>
              <div className={`text-[36px] font-black leading-none mb-1 ${s.accent}`}>{s.value}</div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#aaaaaa]">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Shipments table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden"
        >
          {/* Table header */}
          <div className="px-6 py-5 border-b border-[#F0F0EE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-[17px] font-black text-[#0A0A0A] tracking-tight">All Shipments</h2>
              <p className="text-[13px] text-[#aaaaaa] mt-0.5">{totalShipments} records</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={15} />
                <input
                  type="text"
                  placeholder="Search shipments…"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onBlur={() => { if (searchInput !== search) { setShipmentPage(1); setSearch(searchInput) } }}
                  className="input-clean pl-9 h-10 text-[13px]"
                />
              </form>
              <button
                onClick={() => { setNewShipment(null); setShowCreateModal(true) }}
                className="btn-accent h-10 px-5 text-[13px] flex items-center gap-2 whitespace-nowrap"
              >
                <Plus size={15} /> New Shipment
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full nx-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Sender → Receiver</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.025 }}
                  >
                    <td>
                      <div className="font-mono font-black text-[14px] text-[#0A0A0A]">{s.trackingId}</div>
                      <div className="font-mono text-[11px] text-[#aaaaaa] mt-1 bg-[#F0F7F0] border border-[#E8E8E8] px-2 py-0.5 rounded inline-block">
                        pwd: {s.password}
                      </div>
                    </td>
                    <td>
                      <div className="text-[14px] font-semibold text-[#0A0A0A]">
                        {s.senderName} <span className="text-[#aaaaaa] mx-1">→</span> {s.receiverName}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-[13px] text-[#787878] max-w-[160px]">
                        <MapPin size={12} className="text-[#D0D0D0] shrink-0" />
                        <span className="truncate">{s.address}</span>
                      </div>
                    </td>
                    <td>
                      <span className={statusBadge[s.status] || 'badge badge-gray'}>{s.status}</span>
                    </td>
                    <td className="text-[13px] text-[#aaaaaa]">
                      {new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedShipment(s); setUpdateData({ status: s.status, description: '', location: '', timestamp: new Date().toISOString().slice(0, 16) }) }}
                          className="w-8 h-8 bg-[#F0F7F0] hover:bg-blue-50 border border-[#E8E8E8] hover:border-blue-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Update Status"
                        >
                          <RefreshCw size={13} className="text-[#787878]" />
                        </button>
                        <button
                          onClick={() => handleShare(s.id)}
                          className="w-8 h-8 bg-[#F0F7F0] hover:bg-emerald-50 border border-[#E8E8E8] hover:border-emerald-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Share Tracking Link"
                        >
                          <Share2 size={13} className="text-[#787878]" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="w-8 h-8 bg-[#F0F7F0] hover:bg-red-50 border border-[#E8E8E8] hover:border-red-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <X size={13} className="text-[#787878]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {shipments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-[#F0F7F0] border border-[#E8E8E8] rounded-2xl flex items-center justify-center">
                          <Package size={22} className="text-[#D0D0D0]" />
                        </div>
                        <p className="text-[14px] font-semibold text-[#aaaaaa]">
                          {search ? 'No shipments match your search.' : 'No shipments yet.'}
                        </p>
                        {!search && (
                          <button onClick={() => setShowCreateModal(true)} className="btn-accent text-[13px] px-5 py-2.5">
                            Create first shipment
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Shipment Pagination */}
          {shipmentTotalPages > 1 && (
            <div className="px-6 py-4 border-t border-[#F0F0EE] flex items-center justify-between">
              <p className="text-[13px] text-[#aaaaaa]">
                Page {shipmentPage} of {shipmentTotalPages} ({totalShipments} total)
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShipmentPage(p => Math.max(1, p - 1))}
                  disabled={shipmentPage <= 1}
                  className="w-9 h-9 bg-[#F0F7F0] hover:bg-[#E8E8E8] border border-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={15} className="text-[#787878]" />
                </button>
                {Array.from({ length: Math.min(5, shipmentTotalPages) }, (_, i) => {
                  let pageNum: number
                  if (shipmentTotalPages <= 5) {
                    pageNum = i + 1
                  } else if (shipmentPage <= 3) {
                    pageNum = i + 1
                  } else if (shipmentPage >= shipmentTotalPages - 2) {
                    pageNum = shipmentTotalPages - 4 + i
                  } else {
                    pageNum = shipmentPage - 2 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setShipmentPage(pageNum)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-bold transition-colors ${
                        shipmentPage === pageNum
                          ? 'bg-[#0A0A0A] text-white'
                          : 'bg-[#F0F7F0] hover:bg-[#E8E8E8] border border-[#E8E8E8] text-[#787878]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                <button
                  onClick={() => setShipmentPage(p => Math.min(shipmentTotalPages, p + 1))}
                  disabled={shipmentPage >= shipmentTotalPages}
                  className="w-9 h-9 bg-[#F0F7F0] hover:bg-[#E8E8E8] border border-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={15} className="text-[#787878]" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

      </main>

      {/* ─── Create Modal ─── */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget && !newShipment) setShowCreateModal(false) }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="px-7 py-5 border-b border-[#F0F0EE] flex justify-between items-start">
                <div>
                  <h3 className="text-[18px] font-black text-[#0A0A0A] tracking-tight">
                    {newShipment ? 'Shipment created!' : 'New Shipment'}
                  </h3>
                  <p className="text-[13px] text-[#aaaaaa] mt-0.5">
                    {newShipment ? 'Share these credentials with the customer.' : 'Fill in the shipment details below.'}
                  </p>
                </div>
                <button
                  onClick={() => { setShowCreateModal(false); setNewShipment(null) }}
                  className="w-8 h-8 bg-[#F0F7F0] hover:bg-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-[#787878]" />
                </button>
              </div>

              <div className="px-7 py-6">
                {newShipment ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-[13px] text-[#787878] mb-5">Tracking credentials for the customer:</p>
                    <div className="space-y-3 mb-6">
                      <div className="bg-[#F0F7F0] border border-[#E8E8E8] rounded-xl p-4">
                        <p className="label-tag mb-1">Tracking ID</p>
                        <p className="font-mono font-black text-[22px] text-[#237227]">{newShipment.trackingId}</p>
                      </div>
                      <div className="bg-[#F0F7F0] border border-[#E8E8E8] rounded-xl p-4">
                        <p className="label-tag mb-1">Password</p>
                        <p className="font-mono font-bold text-[18px] text-[#0A0A0A]">{newShipment.password}</p>
                      </div>
                    </div>
                    <button onClick={() => { setShowCreateModal(false); setNewShipment(null) }} className="btn-primary w-full h-12 justify-center">
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Sender Name</label>
                        <input type="text" required value={formData.senderName} onChange={e => setFormData({ ...formData, senderName: e.target.value })} className="input-clean text-[14px]" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Receiver Name</label>
                        <input type="text" required value={formData.receiverName} onChange={e => setFormData({ ...formData, receiverName: e.target.value })} className="input-clean text-[14px]" placeholder="Jane Smith" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Destination Address</label>
                      <input type="text" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="input-clean text-[14px]" placeholder="123 Main St, Mumbai, India" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Parcel Type</label>
                        <input type="text" required value={formData.parcelType} onChange={e => setFormData({ ...formData, parcelType: e.target.value })} className="input-clean text-[14px]" placeholder="Electronics, Documents…" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Est. Delivery</label>
                        <input type="date" value={formData.estimatedDelivery} onChange={e => setFormData({ ...formData, estimatedDelivery: e.target.value })} className="input-clean text-[14px]" />
                      </div>
                    </div>
                    <button type="submit" disabled={createLoading} className="btn-accent w-full h-12 justify-center mt-2">
                      {createLoading ? <><Loader2 size={16} className="animate-spin" /> Creating…</> : 'Generate Shipment & Credentials'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Update Modal ─── */}
      <AnimatePresence>
        {selectedShipment && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedShipment(null) }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="px-7 py-5 border-b border-[#F0F0EE] flex justify-between items-start">
                <div>
                  <h3 className="text-[18px] font-black text-[#0A0A0A] tracking-tight">Update Timeline</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[13px] text-[#aaaaaa]">Shipment:</span>
                    <span className="font-mono text-[13px] font-black text-[#237227] bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-lg">
                      {selectedShipment.trackingId}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedShipment(null)} className="w-8 h-8 bg-[#F0F7F0] hover:bg-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors">
                  <X size={16} className="text-[#787878]" />
                </button>
              </div>
              <div className="px-7 py-6">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Status Phase</label>
                    <select required value={updateData.status} onChange={e => setUpdateData({ ...updateData, status: e.target.value })} className="input-clean text-[14px]">
                      {['Order Placed', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">
                      Date & Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={15} />
                      <input
                        type="datetime-local"
                        value={updateData.timestamp}
                        onChange={e => setUpdateData({ ...updateData, timestamp: e.target.value })}
                        className="input-clean pl-10 text-[14px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">Update Description</label>
                    <textarea required placeholder="e.g. Arrived at Mumbai sorting hub" value={updateData.description} onChange={e => setUpdateData({ ...updateData, description: e.target.value })} className="input-clean text-[14px] h-24 resize-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#787878] mb-1.5">
                      Location <span className="normal-case font-normal text-[#aaaaaa]">(optional)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={15} />
                      <input type="text" value={updateData.location} onChange={e => setUpdateData({ ...updateData, location: e.target.value })} className="input-clean pl-10 text-[14px]" placeholder="e.g. Mumbai, Maharashtra" />
                    </div>
                  </div>
                  <button type="submit" disabled={updateLoading} className="btn-primary w-full h-12 justify-center mt-2">
                    {updateLoading ? <><Loader2 size={16} className="animate-spin" /> Updating…</> : <><RefreshCw size={15} /> Push Update</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Share Link Modal ─── */}
      <AnimatePresence>
        {(shareLink || shareLoading) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget && !shareLoading) { setShareLink(''); setShareCopied(false) } }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="px-7 py-5 border-b border-[#F0F0EE] flex justify-between items-start">
                <div>
                  <h3 className="text-[18px] font-black text-[#0A0A0A] tracking-tight flex items-center gap-2">
                    <Share2 size={18} className="text-[#237227]" /> Share Tracking
                  </h3>
                  <p className="text-[13px] text-[#aaaaaa] mt-0.5">Anyone with this link can view shipment details without a password.</p>
                </div>
                <button
                  onClick={() => { setShareLink(''); setShareCopied(false) }}
                  className="w-8 h-8 bg-[#F0F7F0] hover:bg-[#E8E8E8] rounded-lg flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-[#787878]" />
                </button>
              </div>
              <div className="px-7 py-6">
                {shareLoading ? (
                  <div className="flex flex-col items-center gap-3 py-6">
                    <Loader2 size={24} className="text-[#237227] animate-spin" />
                    <p className="text-[13px] text-[#aaaaaa]">Generating secure link…</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-[#F0F7F0] border border-[#E8E8E8] rounded-xl p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#aaaaaa] mb-2">Secure Share Link</p>
                      <p className="font-mono text-[13px] text-[#0A0A0A] break-all leading-relaxed">{shareLink}</p>
                    </div>
                    <button
                      onClick={copyShareLink}
                      className={`w-full h-12 rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 transition-all ${
                        shareCopied
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#0A0A0A] text-white hover:bg-[#1a1a1a]'
                      }`}
                    >
                      {shareCopied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Link</>}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
