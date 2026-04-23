import { useState } from 'react'
import { useApp } from '../context/AppContext'
import GuestIllustration from '../components/illustrations/GuestIllustration'
import AdBanner from '../components/AdBanner'

const RSVP_OPTIONS = ['pending', 'confirmed', 'declined']
const RSVP_STYLES = {
  pending:   { bg: 'var(--color-warning)', text: '#fff' },
  confirmed: { bg: 'var(--color-success)', text: '#fff' },
  declined:  { bg: 'var(--color-danger)', text: '#fff' },
}
const RSVP_LABELS = { pending: '⏳ Pending', confirmed: '✅ Confirmed', declined: '❌ Declined' }

const DIETARY_OPTIONS = ['None', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Other']

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'rsvp', label: 'RSVP Status' },
  { value: 'table', label: 'Table Number' },
]

const EMPTY_FORM = { name: '', email: '', phone: '', rsvp: 'pending', dietary: 'None', table: '' }

function exportCSV(guests) {
  const headers = ['Name', 'Email', 'Phone', 'RSVP', 'Dietary', 'Table']
  const rows = guests.map((g) => [g.name, g.email, g.phone, g.rsvp, g.dietary, g.table])
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hitchedsa_guests.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function GuestList() {
  const { guests, setGuests, guestCount, confirmedCount, pendingCount, declinedCount } = useApp()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [editId, setEditId] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [filterRsvp, setFilterRsvp] = useState('all')
  const [selectedIds, setSelectedIds] = useState([])
  const [showForm, setShowForm] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    if (editId) {
      setGuests((prev) => prev.map((g) => g.id === editId ? { ...form, id: editId } : g))
      setEditId(null)
    } else {
      setGuests((prev) => [...prev, { ...form, id: `guest_${Date.now()}` }])
    }
    setForm(EMPTY_FORM)
    setErrors({})
    setShowForm(false)
  }

  const startEdit = (guest) => {
    setForm({ name: guest.name, email: guest.email, phone: guest.phone, rsvp: guest.rsvp, dietary: guest.dietary, table: guest.table })
    setEditId(guest.id)
    setShowForm(true)
  }

  const deleteGuest = (id) => setGuests((prev) => prev.filter((g) => g.id !== id))

  const toggleSelect = (id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  const selectAll = () => setSelectedIds(sortedFiltered.map((g) => g.id))
  const clearSelection = () => setSelectedIds([])
  const deleteSelected = () => {
    setGuests((prev) => prev.filter((g) => !selectedIds.includes(g.id)))
    setSelectedIds([])
  }

  const sortedFiltered = [...guests]
    .filter((g) => filterRsvp === 'all' || g.rsvp === filterRsvp)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'rsvp') return a.rsvp.localeCompare(b.rsvp)
      if (sortBy === 'table') return (Number(a.table) || 0) - (Number(b.table) || 0)
      return 0
    })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="section-title">Guest List</h1>
          <p className="section-subtitle">Manage your wedding guests and RSVPs</p>
        </div>
        <button className="btn-primary text-sm shrink-0" onClick={() => { setShowForm((s) => !s); setEditId(null); setForm(EMPTY_FORM) }}>
          {showForm ? '✕ Close' : '+ Add Guest'}
        </button>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Guests', value: guestCount, color: 'var(--color-primary)' },
          { label: 'Confirmed', value: confirmedCount, color: 'var(--color-success)' },
          { label: 'Pending', value: pendingCount, color: 'var(--color-warning)' },
          { label: 'Declined', value: declinedCount, color: 'var(--color-danger)' },
        ].map((s) => (
          <div key={s.label} className="card py-3 px-4 text-center">
            <div className="text-2xl font-bold font-display" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <AdBanner slot="guests-mid" size="leaderboard" />

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card mb-6 animate-fade-in">
          <h2 className="font-display font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
            {editId ? 'Edit Guest' : 'Add New Guest'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label">Full Name *</label>
              <input className="input-field" placeholder="e.g. Nandi Dlamini" value={form.name}
                onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((err) => ({ ...err, name: undefined })) }} />
              {errors.name && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{errors.name}</p>}
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input-field" type="email" placeholder="email@example.com" value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input-field" placeholder="+27 ..." value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="label">RSVP Status</label>
              <select className="input-field" value={form.rsvp}
                onChange={(e) => setForm((f) => ({ ...f, rsvp: e.target.value }))}>
                {RSVP_OPTIONS.map((o) => <option key={o} value={o}>{RSVP_LABELS[o]}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Dietary Requirements</label>
              <select className="input-field" value={form.dietary}
                onChange={(e) => setForm((f) => ({ ...f, dietary: e.target.value }))}>
                {DIETARY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Table Number</label>
              <input className="input-field" type="number" placeholder="e.g. 5" value={form.table}
                onChange={(e) => setForm((f) => ({ ...f, table: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="btn-outline" onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM) }}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit}>{editId ? 'Update Guest' : 'Add Guest'}</button>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="flex gap-2">
          {['all', ...RSVP_OPTIONS].map((r) => (
            <button key={r} onClick={() => setFilterRsvp(r)}
              className={`tab-btn text-xs ${filterRsvp === r ? 'active' : ''}`}>
              {r === 'all' ? 'All' : RSVP_LABELS[r]}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <select
            className="input-field text-xs py-1.5 w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            className="btn-outline text-xs px-3 py-1.5"
            onClick={() => exportCSV(guests)}
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && (
        <div
          className="flex items-center gap-3 p-3 rounded-lg mb-4 text-sm"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <span style={{ color: 'var(--color-text)' }}>{selectedIds.length} selected</span>
          <button className="btn-ghost text-xs px-3 py-1" onClick={clearSelection}>Clear</button>
          <button className="btn-ghost text-xs px-3 py-1" onClick={selectAll}>Select All</button>
          {/* EVITE SERVICE - wire up later */}
          <button className="btn-outline text-xs px-3 py-1.5" onClick={() => alert('Evite sending — coming soon!')}>
            📧 Send Evite
          </button>
          <button className="btn-danger text-xs px-3 py-1.5 ml-auto" onClick={deleteSelected}>
            🗑️ Delete Selected
          </button>
        </div>
      )}

      {/* Table */}
      {guests.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4"><GuestIllustration size={160} /></div>
          <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>No guests added yet</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Start building your guest list!</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add First Guest</button>
        </div>
      ) : sortedFiltered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No guests match this filter.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th className="py-3 px-4 text-left w-8">
                  <input type="checkbox" checked={selectedIds.length === sortedFiltered.length && sortedFiltered.length > 0}
                    onChange={(e) => e.target.checked ? selectAll() : clearSelection()}
                    style={{ accentColor: 'var(--color-primary)' }} />
                </th>
                <th className="py-3 px-4 text-left font-semibold" style={{ color: 'var(--color-text)' }}>Name</th>
                <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell" style={{ color: 'var(--color-text)' }}>Contact</th>
                <th className="py-3 px-4 text-left font-semibold" style={{ color: 'var(--color-text)' }}>RSVP</th>
                <th className="py-3 px-4 text-left font-semibold hidden md:table-cell" style={{ color: 'var(--color-text)' }}>Dietary</th>
                <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell" style={{ color: 'var(--color-text)' }}>Table</th>
                <th className="py-3 px-4 text-right font-semibold" style={{ color: 'var(--color-text)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedFiltered.map((guest) => (
                <tr
                  key={guest.id}
                  style={{ borderBottom: '1px solid var(--color-border)', background: selectedIds.includes(guest.id) ? 'var(--color-surface)' : undefined }}
                >
                  <td className="py-2.5 px-4">
                    <input type="checkbox" checked={selectedIds.includes(guest.id)}
                      onChange={() => toggleSelect(guest.id)} style={{ accentColor: 'var(--color-primary)' }} />
                  </td>
                  <td className="py-2.5 px-4 font-medium" style={{ color: 'var(--color-text)' }}>{guest.name}</td>
                  <td className="py-2.5 px-4 hidden sm:table-cell">
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{guest.email}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{guest.phone}</div>
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className="badge text-xs px-2 py-0.5"
                      style={{ background: RSVP_STYLES[guest.rsvp]?.bg, color: RSVP_STYLES[guest.rsvp]?.text }}
                    >
                      {guest.rsvp}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 hidden md:table-cell">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{guest.dietary || 'None'}</span>
                  </td>
                  <td className="py-2.5 px-4 hidden lg:table-cell">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{guest.table || '—'}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button onClick={() => startEdit(guest)} className="btn-ghost text-xs px-2 py-1 mr-1">Edit</button>
                    <button onClick={() => deleteGuest(guest.id)} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--color-danger)' }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
