'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Plus, Settings, Package, Truck, CheckCircle2, Clock, MapPin, X, Loader2, RefreshCw } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({ total: 0, delivered: 0, pending: 0, inTransit: 0 })
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<any>(null)

  // Create form
  const [formData, setFormData] = useState({
    senderName: '', receiverName: '', address: '', parcelType: '', estimatedDelivery: ''
  })

  // Update form
  const [updateData, setUpdateData] = useState({
    status: '', description: '', location: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const statsRes = await fetch('/api/admin/stats')
      if (statsRes.ok) setStats(await statsRes.json())

      const shipmentsRes = await fetch('/api/admin/shipments')
      if (shipmentsRes.ok) setShipments(await shipmentsRes.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setShowCreateModal(false)
        setFormData({ senderName: '', receiverName: '', address: '', parcelType: '', estimatedDelivery: '' })
        fetchData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedShipment) return

    try {
      const res = await fetch(`/api/admin/shipments/${selectedShipment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      if (res.ok) {
        setSelectedShipment(null)
        setUpdateData({ status: '', description: '', location: '' })
        fetchData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this shipment?')) return
    try {
      const res = await fetch(`/api/admin/shipments/${id}`, { method: 'DELETE' })
      if (res.ok) fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-neon-green"><Settings className="animate-spin" size={48} /></div>

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center glass rounded-b-3xl z-50 sticky top-0 mb-8">
        <div className="text-xl font-black text-gradient flex items-center gap-2">
          <Settings className="text-neon-green" />
          NEXUS ADMIN
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('adminToken')
            router.push('/admin/login')
          }}
          className="text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
        >
          Disconnect
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Package size={24} />
            </div>
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Total</p>
              <h3 className="text-3xl font-black">{stats.total}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center text-neon-green">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Delivered</p>
              <h3 className="text-3xl font-black">{stats.delivered}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center text-neon-blue">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">In Transit</p>
              <h3 className="text-3xl font-black">{stats.inTransit}</h3>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Pending</p>
              <h3 className="text-3xl font-black">{stats.pending}</h3>
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Manage Shipments</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/50 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)]"
          >
            <Plus size={18} /> New Shipment
          </button>
        </div>

        {/* Shipments Table */}
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-widest">
                <th className="p-4">Tracking ID</th>
                <th className="p-4">Sender / Receiver</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created At</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-mono text-neon-green font-bold">{shipment.trackingId}</div>
                    <div className="text-xs text-white/40 mt-1 font-mono">Pwd: {shipment.password}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{shipment.senderName} &rarr; {shipment.receiverName}</div>
                    <div className="text-xs text-white/40 mt-1">{shipment.address}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      shipment.status === 'Delivered' ? 'bg-neon-green/20 text-neon-green' :
                      shipment.status === 'In Transit' ? 'bg-neon-blue/20 text-neon-blue' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/60 text-sm">
                    {new Date(shipment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedShipment(shipment)
                        setUpdateData({ status: shipment.status, description: '', location: '' })
                      }}
                      className="text-neon-blue hover:text-white mr-4 transition-colors p-2 bg-neon-blue/10 rounded-lg"
                      title="Update Timeline"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(shipment.id)}
                      className="text-red-400 hover:text-white transition-colors p-2 bg-red-400/10 rounded-lg"
                      title="Delete"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {shipments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">No shipments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-lg p-6 bg-dark-900/90"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Create New Shipment</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Sender Name</label>
                    <input type="text" required value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} className="glass-input w-full" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Receiver Name</label>
                    <input type="text" required value={formData.receiverName} onChange={e => setFormData({...formData, receiverName: e.target.value})} className="glass-input w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Destination Address</label>
                  <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="glass-input w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Parcel Type</label>
                    <input type="text" required value={formData.parcelType} placeholder="e.g. Electronics, Document" onChange={e => setFormData({...formData, parcelType: e.target.value})} className="glass-input w-full" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Est. Delivery Date</label>
                    <input type="date" value={formData.estimatedDelivery} onChange={e => setFormData({...formData, estimatedDelivery: e.target.value})} className="glass-input w-full" />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-neon-green text-black font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all">
                  Generate Shipment & Credentials
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Modal */}
      <AnimatePresence>
        {selectedShipment && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-lg p-6 bg-dark-900/90"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">Update Timeline <span className="text-neon-blue text-sm font-mono border border-neon-blue/30 px-2 py-1 rounded bg-neon-blue/10">{selectedShipment.trackingId}</span></h3>
                <button onClick={() => setSelectedShipment(null)} className="text-white/50 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Status Phase</label>
                  <select
                    required
                    value={updateData.status}
                    onChange={e => setUpdateData({...updateData, status: e.target.value})}
                    className="glass-input w-full bg-dark-800 text-white [&>option]:text-black"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Update Description</label>
                  <textarea
                    required
                    placeholder="e.g. Arrived at sort facility"
                    value={updateData.description}
                    onChange={e => setUpdateData({...updateData, description: e.target.value})}
                    className="glass-input w-full h-24 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Current Location (Optional)</label>
                  <input type="text" value={updateData.location} onChange={e => setUpdateData({...updateData, location: e.target.value})} className="glass-input w-full" placeholder="e.g. New York, NY" />
                </div>

                <button type="submit" className="w-full mt-6 bg-neon-blue text-black font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                  Push Update
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
