import { useState, useRef, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Modal from '../components/Modal'
import FloralDivider from '../components/FloralDivider'
import SeatingIllustration from '../components/illustrations/SeatingIllustration'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80'

const CANVAS_W = 1600
const CANVAS_H = 900

const TABLE_COLORS = [
  { label: 'Blush',     value: '#D4829A' },
  { label: 'Gold',      value: '#C9A84C' },
  { label: 'Sage',      value: '#6B9E78' },
  { label: 'Navy',      value: '#1B2B5E' },
  { label: 'Rose Gold', value: '#B76E79' },
  { label: 'Lavender',  value: '#9B59B6' },
  { label: 'Sky',       value: '#7BAFC1' },
  { label: 'Charcoal',  value: '#555555' },
]

const COLOR_GROUP_LABELS = {
  '#D4829A': 'Family',
  '#C9A84C': 'Friends',
  '#6B9E78': 'Colleagues',
  '#1B2B5E': 'Bridal Party',
  '#B76E79': 'VIP',
  '#9B59B6': 'Kids Table',
  '#7BAFC1': 'Out-of-Town',
  '#555555': 'General',
}

const EMPTY_FORM = { name: '', shape: 'round', seats: 8, color: '#D4829A' }

// ─── SVG Table Icons ────────────────────────────────────────────────

function RoundTableSVG({ color = '#D4829A', seats = 8, size = 56 }) {
  const count = Math.min(seats, 14)
  const r = size * 0.38
  const cx = size / 2
  const cy = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill={color + '25'} stroke={color} strokeWidth="2.2" />
      {Array.from({ length: count }, (_, i) => {
        const angle = ((360 / count) * i - 90) * (Math.PI / 180)
        const sr = r + 5
        return (
          <circle
            key={i}
            cx={cx + sr * Math.cos(angle)}
            cy={cy + sr * Math.sin(angle)}
            r="3"
            fill={color}
            opacity="0.75"
          />
        )
      })}
    </svg>
  )
}

function RectTableSVG({ color = '#D4829A', seats = 8 }) {
  const perSide = Math.ceil(seats / 2)
  const tableW = Math.max(60, perSide * 16)
  const svgW = tableW + 12
  const svgH = 44
  const tableH = 22

  const topSeats = Math.ceil(seats / 2)
  const bottomSeats = Math.floor(seats / 2)

  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
      <rect x="6" y="11" width={tableW} height={tableH} rx="4"
        fill={color + '25'} stroke={color} strokeWidth="2.2" />
      {Array.from({ length: topSeats }, (_, i) => {
        const gap = tableW / topSeats
        return <rect key={`t${i}`} x={6 + gap * i + gap / 2 - 5} y="5" width="10" height="6" rx="2" fill={color} opacity="0.7" />
      })}
      {Array.from({ length: bottomSeats }, (_, i) => {
        const gap = tableW / bottomSeats
        return <rect key={`b${i}`} x={6 + gap * i + gap / 2 - 5} y="33" width="10" height="6" rx="2" fill={color} opacity="0.7" />
      })}
    </svg>
  )
}

// ─── Table Card (on canvas) ────────────────────────────────────────

function TableCard({ table, guests, selected, onSelect, onMouseDown, onEdit, onDelete, onUnassign }) {
  const assignedGuests = (table.guestIds || []).map(id => guests.find(g => g.id === id)).filter(Boolean)
  const over = assignedGuests.length > table.seats
  const remaining = table.seats - assignedGuests.length

  return (
    <div
      className="absolute select-none animate-scale-in"
      style={{ left: table.x, top: table.y, width: 190, zIndex: selected ? 20 : 10 }}
      onClick={(e) => { e.stopPropagation(); onSelect(table.id) }}
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-150"
        style={{
          background: 'var(--color-card-bg)',
          border: `2px solid ${selected ? table.color : over ? '#C0505A' : 'var(--color-border)'}`,
          boxShadow: selected
            ? `0 0 0 3px ${table.color}55, 0 8px 24px rgba(0,0,0,0.12)`
            : '0 4px 16px rgba(0,0,0,0.09)',
        }}
      >
        {/* Drag handle / header */}
        <div
          className="flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing"
          style={{ background: table.color + '18', borderBottom: `1px solid ${table.color}30` }}
          onMouseDown={(e) => onMouseDown(e, table.id)}
          onTouchStart={(e) => onMouseDown(e.touches[0], table.id)}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: table.color }} />
            <span className="font-display font-bold text-xs truncate" style={{ color: 'var(--color-text)' }}>
              {table.name}
            </span>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(table) }}
              className="text-xs w-5 h-5 rounded flex items-center justify-center"
              style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface)' }}
              title="Edit table"
            >✎</button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(table.id) }}
              className="text-xs w-5 h-5 rounded flex items-center justify-center"
              style={{ color: 'var(--color-danger)', background: 'var(--color-surface)' }}
              title="Delete table"
            >✕</button>
          </div>
        </div>

        {/* Table body */}
        <div className="p-3">
          {/* SVG icon + stats */}
          <div className="flex items-center gap-3 mb-2">
            <div className="shrink-0">
              {table.shape === 'round'
                ? <RoundTableSVG color={table.color} seats={table.seats} size={44} />
                : <RectTableSVG color={table.color} seats={table.seats} />
              }
            </div>
            <div>
              <div className="text-xs font-semibold capitalize" style={{ color: 'var(--color-text-muted)' }}>
                {table.shape} · {table.seats} seats
              </div>
              <div className={`text-xs font-bold ${over ? 'text-red-500' : ''}`}
                style={{ color: over ? 'var(--color-danger)' : 'var(--color-success)' }}>
                {assignedGuests.length}/{table.seats}
                {' '}
                <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>
                  ({over ? `+${-remaining} over` : `${remaining} free`})
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: table.color, fontWeight: 600 }}>
                {COLOR_GROUP_LABELS[table.color] || 'Group'}
              </div>
            </div>
          </div>

          {/* Guest chips */}
          {assignedGuests.length > 0 ? (
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
              {assignedGuests.map(guest => (
                <button
                  key={guest.id}
                  onClick={(e) => { e.stopPropagation(); onUnassign(table.id, guest.id) }}
                  className="text-xs px-2 py-0.5 rounded-full font-medium transition-all hover:opacity-70"
                  style={{ background: table.color + '22', color: 'var(--color-text)', border: `1px solid ${table.color}44` }}
                  title="Click to unassign"
                >
                  {guest.name.split(' ')[0]}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
              {selected ? 'Click guests to assign →' : 'Select to assign guests'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Canvas background grid ────────────────────────────────────────

function CanvasGrid() {
  return (
    <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" strokeWidth="0.6" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Room border */}
      <rect x="16" y="16" width="calc(100% - 32px)" height="calc(100% - 32px)"
        fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.25" rx="12" />
    </svg>
  )
}

// ─── Print Layout ─────────────────────────────────────────────────

function PrintLayout({ tables, guests, partners }) {
  const getGuestById = (id) => guests.find(g => g.id === id)
  const partnerTitle = partners?.partner1 && partners?.partner2
    ? `${partners.partner1} & ${partners.partner2}`
    : 'Wedding Seating Plan'

  return (
    <div className="print-only p-8">
      <div className="text-center mb-8">
        <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3rem', color: '#D4829A' }}>
          {partnerTitle}
        </h1>
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.2rem', color: '#666', marginTop: '0.25rem' }}>
          Seating Arrangement
        </h2>
        <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
          Printed {new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {tables.map(table => {
          const assigned = (table.guestIds || []).map(id => getGuestById(id)).filter(Boolean)
          return (
            <div key={table.id} style={{
              border: `2px solid ${table.color}`,
              borderRadius: '12px',
              padding: '1rem',
              breakInside: 'avoid',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '0.5rem', paddingBottom: '0.5rem',
                borderBottom: `1px solid ${table.color}44`,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: table.color }} />
                <strong style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: '#333' }}>
                  {table.name}
                </strong>
                <span style={{ fontSize: '0.7rem', color: '#999', marginLeft: 'auto' }}>
                  {table.shape} · {table.seats} seats
                </span>
              </div>
              {assigned.length === 0 ? (
                <p style={{ fontSize: '0.75rem', color: '#bbb', fontStyle: 'italic' }}>No guests assigned</p>
              ) : (
                <ol style={{ margin: 0, padding: '0 0 0 1.1rem', fontSize: '0.8rem', color: '#444', lineHeight: 1.7 }}>
                  {assigned.map((g, i) => (
                    <li key={g.id}>
                      {g.isCouple ? '💍 ' : ''}{g.name}
                      {g.dietary && g.dietary !== 'None' ? ` (${g.dietary})` : ''}
                      {g.isCouple ? ' — Couple' : ''}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────

export default function SeatingPlanner() {
  const { guests, partners } = useApp()
  const [tables, setTables] = useLocalStorage('hitchedsa_seating', [])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTable, setEditingTable] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [selectedTableId, setSelectedTableId] = useState(null)
  const canvasRef = useRef(null)
  const dragRef = useRef(null)

  // ── Derived ──────────────────────────────────────────────────────

  // Build couple guest entries — added to the top of the assignable pool.
  // Use stable IDs so assignment persists across refreshes in hitchedsa_seating.
  const coupleGuests = [
    partners.partner1?.trim() ? { id: 'couple_partner1', name: partners.partner1.trim(), isCouple: true } : null,
    partners.partner2?.trim() ? { id: 'couple_partner2', name: partners.partner2.trim(), isCouple: true } : null,
  ].filter(Boolean)

  // Combined pool: couple at the top so the bridal table can be filled first
  const allPeople = [...coupleGuests, ...guests]

  const allAssignedIds = new Set(tables.flatMap(t => t.guestIds || []))
  const unassignedPeople = allPeople.filter(p => !allAssignedIds.has(p.id))
  const totalSeats = tables.reduce((sum, t) => sum + (t.seats || 0), 0)
  const assignedCount = tables.reduce((sum, t) => sum + (t.guestIds?.length || 0), 0)
  const selectedTable = tables.find(t => t.id === selectedTableId)

  // Resolves any assignable ID — regular guest or one of the couple
  const getGuestById = (id) => allPeople.find(p => p.id === id)

  // ── Drag handlers ────────────────────────────────────────────────
  const onTableMouseDown = useCallback((e, tableId) => {
    e.preventDefault()
    e.stopPropagation()
    const table = tables.find(t => t.id === tableId)
    if (!table) return
    dragRef.current = {
      tableId,
      startMouseX: e.clientX ?? e.pageX,
      startMouseY: e.clientY ?? e.pageY,
      startX: table.x,
      startY: table.y,
    }
    setSelectedTableId(tableId)
  }, [tables])

  const onCanvasMouseMove = useCallback((e) => {
    if (!dragRef.current) return
    const { tableId, startMouseX, startMouseY, startX, startY } = dragRef.current
    const mx = e.clientX ?? e.pageX
    const my = e.clientY ?? e.pageY
    const dx = mx - startMouseX
    const dy = my - startMouseY
    setTables(prev => prev.map(t =>
      t.id === tableId
        ? { ...t, x: Math.max(0, Math.min(CANVAS_W - 200, startX + dx)), y: Math.max(0, Math.min(CANVAS_H - 220, startY + dy)) }
        : t
    ))
  }, [setTables])

  const onCanvasMouseUp = useCallback(() => { dragRef.current = null }, [])

  // ── Add / Edit table ─────────────────────────────────────────────
  const openAdd = () => {
    setForm(EMPTY_FORM)
    setEditingTable(null)
    setFormErrors({})
    setShowAddModal(true)
  }

  const openEdit = (table) => {
    setForm({ name: table.name, shape: table.shape, seats: table.seats, color: table.color })
    setEditingTable(table.id)
    setFormErrors({})
    setShowAddModal(true)
  }

  const saveTable = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Table name is required'
    if (!form.seats || Number(form.seats) < 1) errors.seats = 'Must have at least 1 seat'
    if (Object.keys(errors).length) { setFormErrors(errors); return }

    if (editingTable) {
      setTables(prev => prev.map(t => t.id === editingTable
        ? { ...t, name: form.name.trim(), shape: form.shape, seats: Number(form.seats), color: form.color }
        : t
      ))
    } else {
      // Scatter new tables across canvas so they don't all stack
      const placed = tables.length
      const cols = 4
      const col = placed % cols
      const row = Math.floor(placed / cols)
      setTables(prev => [...prev, {
        id: `table_${Date.now()}`,
        name: form.name.trim(),
        shape: form.shape,
        seats: Number(form.seats),
        color: form.color,
        guestIds: [],
        x: 40 + col * 210,
        y: 40 + row * 220,
      }])
    }
    setShowAddModal(false)
  }

  const deleteTable = (id) => {
    setTables(prev => prev.filter(t => t.id !== id))
    if (selectedTableId === id) setSelectedTableId(null)
  }

  // ── Guest assignment ─────────────────────────────────────────────
  const assignGuest = (guestId) => {
    if (!selectedTableId) return
    setTables(prev => prev.map(t => t.id === selectedTableId
      ? { ...t, guestIds: [...(t.guestIds || []), guestId] }
      : t
    ))
  }

  const unassignGuest = (tableId, guestId) => {
    setTables(prev => prev.map(t => t.id === tableId
      ? { ...t, guestIds: (t.guestIds || []).filter(id => id !== guestId) }
      : t
    ))
  }

  return (
    <div>
      {/* ── Hero Banner ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden no-print" style={{ minHeight: 260 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12">
          <div className="mb-3 opacity-90"><SeatingIllustration size={120} /></div>
          <p
            className="font-vibes text-6xl md:text-7xl text-white drop-shadow-lg mb-3"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          >
            Seating Planner
          </p>
          <p className="text-white/80 font-display italic text-base">
            Arrange your tables and assign your guests with ease
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8 animate-fade-in">

        {/* ── Summary bar ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2 no-print">
          {[
            { label: 'Total Tables', value: tables.length },
            { label: 'Total Seats', value: totalSeats },
            { label: 'Seats Assigned', value: assignedCount },
            { label: 'Seats Remaining', value: Math.max(0, totalSeats - assignedCount) },
          ].map(s => (
            <div key={s.label} className="stat-card text-center">
              <div className="font-display text-3xl font-bold" style={{ color: 'var(--color-heading)' }}>{s.value}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--color-heading)', opacity: 0.7 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <FloralDivider className="no-print" />

        {/* ── Toolbar ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-5 no-print items-center">
          <button className="btn-primary" onClick={openAdd}>
            + Add Table
          </button>
          {selectedTable && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: selectedTable.color + '22', color: selectedTable.color, border: `1.5px solid ${selectedTable.color}` }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: selectedTable.color }} />
              Selected: {selectedTable.name}
              <button onClick={() => setSelectedTableId(null)} className="ml-1 opacity-60 hover:opacity-100">✕</button>
            </div>
          )}
          {!selectedTable && tables.length > 0 && (
            <span className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
              Click a table to select it, then click guests to assign
            </span>
          )}
          <button className="btn-outline ml-auto" onClick={() => window.print()}>
            🖨️ Print Layout
          </button>
        </div>

        {/* ── Main Area: Canvas + Sidebar ───────────────────────── */}
        <div className="flex gap-5 no-print" style={{ minHeight: 560 }}>

          {/* Canvas */}
          <div
            className="flex-1 rounded-2xl overflow-auto relative"
            style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              minHeight: 540,
              cursor: dragRef.current ? 'grabbing' : 'default',
            }}
            ref={canvasRef}
            onMouseMove={onCanvasMouseMove}
            onMouseUp={onCanvasMouseUp}
            onMouseLeave={onCanvasMouseUp}
            onClick={() => setSelectedTableId(null)}
          >
            {/* Scrollable inner canvas */}
            <div style={{ width: CANVAS_W, height: CANVAS_H, position: 'relative' }}>
              <CanvasGrid />

              {/* "Room" label */}
              <div
                className="absolute bottom-5 right-6 font-display text-xs italic"
                style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
              >
                Reception Room
              </div>

              {tables.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <div className="text-6xl opacity-20">🪑</div>
                  <p className="text-base font-display font-semibold" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
                    Add tables to begin planning
                  </p>
                </div>
              )}

              {tables.map(table => (
                <TableCard
                  key={table.id}
                  table={table}
                  guests={allPeople}
                  selected={selectedTableId === table.id}
                  onSelect={(id) => { setSelectedTableId(prev => prev === id ? null : id) }}
                  onMouseDown={onTableMouseDown}
                  onEdit={openEdit}
                  onDelete={deleteTable}
                  onUnassign={unassignGuest}
                />
              ))}
            </div>
          </div>

          {/* Sidebar: Unassigned Guests */}
          <div
            className="rounded-2xl flex flex-col"
            style={{
              width: 220,
              minWidth: 200,
              background: 'var(--color-card-bg)',
              border: '1.5px solid var(--color-border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              maxHeight: 560,
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b font-display font-semibold text-sm flex items-center"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              Unassigned
              <span
                className="ml-2 text-xs font-normal px-2 py-0.5 rounded-full"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                {unassignedPeople.length}
              </span>
            </div>

            {allPeople.length === 0 ? (
              /* No one at all to assign */
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="text-3xl mb-2 opacity-40">👥</div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Add guests in the Guest List page, or set partner names in Settings.
                </p>
              </div>
            ) : unassignedPeople.length === 0 ? (
              /* Everyone seated */
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-success)' }}>
                  Everyone's seated!
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-2">
                {!selectedTableId && (
                  <p className="text-xs italic px-4 pb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Select a table first
                  </p>
                )}

                {/* ── Couple entries at the top ── */}
                {unassignedPeople.filter(p => p.isCouple).length > 0 && (
                  <>
                    <p
                      className="text-xs font-semibold px-4 pt-1 pb-1 uppercase tracking-wide"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      The Couple
                    </p>
                    {unassignedPeople.filter(p => p.isCouple).map(person => {
                      const canAssign = !!selectedTableId
                      return (
                        <button
                          key={person.id}
                          onClick={() => canAssign && assignGuest(person.id)}
                          disabled={!canAssign}
                          className="w-full text-left px-4 py-2 text-sm transition-all flex items-center gap-2"
                          style={{ cursor: canAssign ? 'pointer' : 'default', opacity: canAssign ? 1 : 0.55 }}
                          onMouseEnter={e => { if (canAssign) e.currentTarget.style.background = 'var(--color-surface)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                        >
                          {/* 💍 ring emoji avatar instead of letter initial */}
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                            style={{ background: 'var(--color-accent-light)' }}
                          >
                            💍
                          </div>
                          <div className="overflow-hidden">
                            <div className="font-semibold text-xs truncate" style={{ color: 'var(--color-text)' }}>
                              {person.name}
                            </div>
                            <div className="text-xs truncate" style={{ color: 'var(--color-accent)' }}>
                              Couple
                            </div>
                          </div>
                          {canAssign && (
                            <span className="ml-auto text-base" style={{ color: selectedTable?.color }}>+</span>
                          )}
                        </button>
                      )
                    })}
                    {/* Divider before regular guests */}
                    {unassignedPeople.filter(p => !p.isCouple).length > 0 && (
                      <div className="mx-4 my-1" style={{ borderTop: '1px solid var(--color-border)' }} />
                    )}
                  </>
                )}

                {/* ── Regular unassigned guests ── */}
                {unassignedPeople.filter(p => !p.isCouple).length > 0 && (
                  <>
                    <p
                      className="text-xs font-semibold px-4 pt-1 pb-1 uppercase tracking-wide"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Guests
                    </p>
                    {unassignedPeople.filter(p => !p.isCouple).map(guest => {
                      const canAssign = !!selectedTableId
                      return (
                        <button
                          key={guest.id}
                          onClick={() => canAssign && assignGuest(guest.id)}
                          disabled={!canAssign}
                          className="w-full text-left px-4 py-2 text-sm transition-all flex items-center gap-2"
                          style={{ cursor: canAssign ? 'pointer' : 'default', opacity: canAssign ? 1 : 0.55 }}
                          onMouseEnter={e => { if (canAssign) e.currentTarget.style.background = 'var(--color-surface)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{
                              background: selectedTable ? selectedTable.color + '33' : 'var(--color-surface)',
                              color: selectedTable ? selectedTable.color : 'var(--color-text-muted)',
                            }}
                          >
                            {guest.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="overflow-hidden">
                            <div className="font-medium text-xs truncate" style={{ color: 'var(--color-text)' }}>{guest.name}</div>
                            {guest.dietary && guest.dietary !== 'None' && (
                              <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                                {guest.dietary}
                              </div>
                            )}
                          </div>
                          {canAssign && (
                            <span className="ml-auto text-base" style={{ color: selectedTable?.color }}>+</span>
                          )}
                        </button>
                      )
                    })}
                  </>
                )}
              </div>
            )}

            {/* Progress bar — denominator is everyone (couple + guests) */}
            {allPeople.length > 0 && allAssignedIds.size > 0 && (
              <div
                className="border-t px-4 py-3"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Seated ({allAssignedIds.size}/{allPeople.length})
                </p>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.round((allAssignedIds.size / allPeople.length) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Assigned breakdown table (below canvas) ───────────── */}
        {tables.length > 0 && (
          <>
            <FloralDivider className="no-print" />
            <h2 className="font-display text-xl font-bold mb-4 no-print" style={{ color: 'var(--color-heading)' }}>
              Table Overview
            </h2>
            <div className="card overflow-x-auto p-0 no-print">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    {['Table', 'Shape', 'Seats', 'Assigned', 'Remaining', 'Guests'].map(h => (
                      <th key={h} className="py-3 px-4 text-left font-semibold" style={{ color: 'var(--color-text)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tables.map(table => {
                    const assigned = (table.guestIds || []).map(id => getGuestById(id)).filter(Boolean)
                    const over = assigned.length > table.seats
                    return (
                      <tr
                        key={table.id}
                        style={{ borderBottom: '1px solid var(--color-border)', background: over ? 'color-mix(in srgb, var(--color-danger) 5%, transparent)' : undefined }}
                      >
                        <td className="py-3 px-4 font-semibold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: table.color }} />
                            <span style={{ color: 'var(--color-text)' }}>{table.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize" style={{ color: 'var(--color-text-muted)' }}>{table.shape}</td>
                        <td className="py-3 px-4" style={{ color: 'var(--color-text)' }}>{table.seats}</td>
                        <td className="py-3 px-4 font-semibold" style={{ color: over ? 'var(--color-danger)' : 'var(--color-text)' }}>
                          {assigned.length}
                        </td>
                        <td className="py-3 px-4" style={{ color: over ? 'var(--color-danger)' : 'var(--color-success)' }}>
                          {over ? `Over by ${assigned.length - table.seats}` : table.seats - assigned.length}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {assigned.map(g => (
                              <span
                                key={g.id}
                                className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                                style={{ background: table.color + '22', color: 'var(--color-text)', border: `1px solid ${table.color}44` }}
                              >
                                {g.isCouple && <span>💍</span>}
                                {g.name}
                              </span>
                            ))}
                            {assigned.length === 0 && (
                              <span className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>Empty</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ── Print Layout (hidden on screen, visible on print) ──── */}
      <PrintLayout tables={tables} guests={allPeople} partners={partners} />

      {/* ── Add/Edit Table Modal ──────────────────────────────── */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingTable ? 'Edit Table' : 'Add Table'}
      >
        <div className="space-y-4">

          <div>
            <label className="label">Table Name *</label>
            <input
              className="input-field"
              placeholder="e.g. Bridal Table, Table 1, Kids Table"
              value={form.name}
              onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormErrors(err => ({ ...err, name: undefined })) }}
            />
            {formErrors.name && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{formErrors.name}</p>}
          </div>

          <div>
            <label className="label">Table Shape</label>
            <div className="grid grid-cols-2 gap-3">
              {['round', 'rectangular'].map(shape => (
                <button
                  key={shape}
                  onClick={() => setForm(f => ({ ...f, shape }))}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                  style={{
                    borderColor: form.shape === shape ? 'var(--color-primary)' : 'var(--color-border)',
                    background: form.shape === shape ? 'var(--color-surface)' : 'transparent',
                  }}
                >
                  {shape === 'round'
                    ? <RoundTableSVG color={form.shape === shape ? 'var(--color-primary)' : '#ccc'} seats={8} size={44} />
                    : <RectTableSVG color={form.shape === shape ? 'var(--color-primary)' : '#ccc'} seats={8} />
                  }
                  <span className="capitalize text-sm font-medium" style={{ color: 'var(--color-text)' }}>{shape}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Number of Seats *</label>
            <input
              type="number"
              className="input-field"
              min={1}
              max={30}
              value={form.seats}
              onChange={e => { setForm(f => ({ ...f, seats: e.target.value })); setFormErrors(err => ({ ...err, seats: undefined })) }}
            />
            {formErrors.seats && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{formErrors.seats}</p>}
          </div>

          <div>
            <label className="label">Group / Colour Label</label>
            <div className="grid grid-cols-4 gap-2">
              {TABLE_COLORS.map(c => (
                <button
                  key={c.value}
                  onClick={() => setForm(f => ({ ...f, color: c.value }))}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all"
                  style={{
                    borderColor: form.color === c.value ? c.value : 'var(--color-border)',
                    background: form.color === c.value ? c.value + '18' : 'transparent',
                  }}
                  title={c.label}
                >
                  <div className="w-6 h-6 rounded-full" style={{ background: c.value }} />
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{c.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
              Selected group: <strong>{COLOR_GROUP_LABELS[form.color]}</strong>
            </p>
          </div>

          {/* Live preview */}
          <div
            className="rounded-xl p-4 flex items-center gap-4"
            style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}
          >
            <div>
              {form.shape === 'round'
                ? <RoundTableSVG color={form.color} seats={Number(form.seats) || 8} size={56} />
                : <RectTableSVG color={form.color} seats={Number(form.seats) || 8} />
              }
            </div>
            <div>
              <div className="font-display font-bold text-base" style={{ color: 'var(--color-text)' }}>
                {form.name || 'Table Name'}
              </div>
              <div className="text-xs capitalize mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                {form.shape} · {form.seats || 0} seats
              </div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: form.color }}>
                {COLOR_GROUP_LABELS[form.color]}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button className="btn-outline flex-1" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn-primary flex-1" onClick={saveTable}>
              {editingTable ? 'Update Table' : 'Add Table'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
