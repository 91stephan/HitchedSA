import { useState, useRef, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import IdeasIllustration from '../components/illustrations/IdeasIllustration'
import Modal from '../components/Modal'
import AdBanner from '../components/AdBanner'

// ─── Constants ────────────────────────────────────────────────────────────────

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY

const SEARCH_CHIPS = [
  'All', 'Venues', 'Dresses', 'Flowers', 'Decor', 'Cakes',
  'Hairstyles', 'Table Settings', 'Bouquets', 'Suits', 'Lighting', 'Honeymoon',
]

const SAVE_CATEGORIES = [
  'Venues', 'Dresses', 'Flowers', 'Decor', 'Cakes',
  'Hairstyles', 'Table Settings', 'Bouquets', 'Suits', 'Lighting', 'Honeymoon', 'General',
]

const SKELETON_HEIGHTS = [210, 165, 245, 185, 225, 195, 170, 215, 255, 180, 160, 225, 200, 175, 235, 190, 178, 218, 188, 208]

// ─── Pexels fetch ─────────────────────────────────────────────────────────────

async function pexelsSearch(term) {
  const query = `${term} wedding`
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20`,
    { headers: { Authorization: PEXELS_KEY } },
  )
  if (!res.ok) throw new Error('Pexels API error')
  const data = await res.json()
  return data.photos || []
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ visible, message }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-full shadow-2xl text-sm font-semibold transition-all duration-400"
      style={{
        background: 'var(--color-accent)',
        color: '#fff',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(80px) scale(0.92)',
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      {message}
    </div>
  )
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard({ height }) {
  return (
    <div className="break-inside-avoid mb-4 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      <div className="shimmer-card" style={{ height }} />
      <div className="p-3 space-y-2">
        <div className="shimmer-bar rounded-full" style={{ height: 12, width: '70%' }} />
        <div className="shimmer-bar rounded-full" style={{ height: 10, width: '45%' }} />
      </div>
    </div>
  )
}

// ─── Pexels result card ───────────────────────────────────────────────────────

function PexelsCard({ photo, onSave }) {
  return (
    <div className="break-inside-avoid mb-4 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300">
      <img
        src={photo.src.large}
        alt={photo.alt || 'Wedding inspiration'}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105 block"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.62) 100%)' }}
      >
        <div className="flex justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); onSave(photo) }}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 text-lg"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
            title="Save to my board"
          >
            ♡
          </button>
        </div>
        <p className="text-xs text-white/80 drop-shadow-sm">
          Photo by {photo.photographer}
        </p>
      </div>
    </div>
  )
}

// ─── Pinterest icon ───────────────────────────────────────────────────────────

function PinterestIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

// ─── Board card (saved ideas) ─────────────────────────────────────────────────

function BoardCard({ idea, onDelete, onEdit }) {
  const [imgError, setImgError] = useState(false)
  const pinterestUrl = `https://pinterest.com/search/pins/?q=${encodeURIComponent(idea.title)}`

  return (
    <div
      className="break-inside-avoid mb-4 rounded-2xl overflow-hidden relative group animate-fade-in"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}
    >
      {/* Image */}
      {idea.imageUrl && !imgError ? (
        <div className="relative overflow-hidden">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.44)' }}
          >
            <button
              onClick={() => onEdit(idea)}
              className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform text-sm"
              style={{ color: 'var(--color-text)' }}
              title="Edit"
            >✏</button>
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform"
              style={{ color: '#E60023' }}
              title="Find on Pinterest"
            >
              <PinterestIcon size={15} />
            </a>
            <button
              onClick={() => onDelete(idea.id)}
              className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform text-sm"
              style={{ color: 'var(--color-danger)' }}
              title="Delete"
            >✕</button>
          </div>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center relative" style={{ background: 'var(--color-surface)' }}>
          <IdeasIllustration size={72} />
          <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <button onClick={() => onEdit(idea)} className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-xs hover:scale-110 transition-transform" style={{ color: 'var(--color-text)' }}>✏</button>
            <a href={pinterestUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform" style={{ color: '#E60023' }}><PinterestIcon size={13} /></a>
            <button onClick={() => onDelete(idea.id)} className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-xs hover:scale-110 transition-transform" style={{ color: 'var(--color-danger)' }}>✕</button>
          </div>
        </div>
      )}

      {/* Card body */}
      <div className="p-3">
        <span
          className="inline-block text-xs px-2.5 py-0.5 rounded-full font-medium mb-2"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
        >
          {idea.category}
        </span>
        <h3 className="font-display font-semibold text-sm leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
          {idea.title}
        </h3>
        {(idea.notes || idea.description) && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
            {idea.notes || idea.description}
          </p>
        )}
        {idea.photographerName && (
          <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
            Photo by {idea.photographerName}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Save modal (Pexels heart click) ─────────────────────────────────────────

function SaveModal({ photo, onClose, onConfirm }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (photo) {
      setTitle(photo.alt || 'Wedding inspiration')
      setCategory('General')
      setNotes('')
    }
  }, [photo])

  useEffect(() => {
    if (!photo) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [photo, onClose])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl animate-scale-in overflow-hidden"
        style={{ background: 'var(--color-card-bg)' }}
      >
        <img src={photo.src.medium} alt={photo.alt || ''} className="w-full h-44 object-cover" />
        <div className="p-5 space-y-4">
          <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--color-heading)' }}>
            Save to My Board
          </h3>
          <div>
            <label className="label">Title</label>
            <input
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Garden arch with roses"
              autoFocus
            />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {SAVE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Notes (optional)</label>
            <textarea
              className="input-field"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your thoughts..."
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button className="btn-outline flex-1" onClick={onClose}>Cancel</button>
            <button
              className="btn-primary flex-1"
              onClick={() => onConfirm({ title: title.trim() || 'Wedding inspiration', category, notes })}
            >
              Save to Board
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Add from URL modal ───────────────────────────────────────────────────────

function UrlModal({ open, onClose, onSave }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [notes, setNotes] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setUrl(''); setTitle(''); setCategory('General'); setNotes('')
    setShowPreview(false); setImgError(false); setError('')
  }
  const handleClose = () => { reset(); onClose() }

  const handlePreview = () => {
    if (!url.trim()) { setError('Please paste an image URL first'); return }
    setError(''); setShowPreview(true); setImgError(false)
  }

  const handleSave = () => {
    if (!url.trim()) { setError('Please paste an image URL'); return }
    if (!title.trim()) { setError('Please enter a title'); return }
    onSave({ imageUrl: url.trim(), title: title.trim(), category, notes })
    reset(); onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add from URL">
      <div className="space-y-4">
        <div>
          <label className="label">Image URL</label>
          <div className="flex gap-2">
            <input
              className="input-field flex-1"
              placeholder="Paste an image URL from Pinterest, Google…"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setShowPreview(false); setImgError(false) }}
            />
            <button className="btn-outline text-sm px-4 shrink-0" type="button" onClick={handlePreview}>
              Preview
            </button>
          </div>
          {error && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{error}</p>}
        </div>

        {showPreview && (
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
            {imgError ? (
              <div className="h-32 flex items-center justify-center text-sm" style={{ background: 'var(--color-surface)', color: 'var(--color-danger)' }}>
                Could not load image — check the URL
              </div>
            ) : (
              <img src={url} alt="preview" className="w-full h-44 object-cover" onError={() => setImgError(true)} />
            )}
          </div>
        )}

        <div>
          <label className="label">Title *</label>
          <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Romantic table setting" />
        </div>
        <div>
          <label className="label">Category</label>
          <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {SAVE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Notes (optional)</label>
          <textarea className="input-field" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add details..." />
        </div>
        <div className="flex gap-3 pt-1">
          <button className="btn-outline flex-1" type="button" onClick={handleClose}>Cancel</button>
          <button className="btn-primary flex-1" type="button" onClick={handleSave}>Save to Board</button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Upload modal ─────────────────────────────────────────────────────────────

function UploadModal({ open, onClose, onSave }) {
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const reset = () => { setImageUrl(''); setTitle(''); setCategory('General'); setNotes(''); setError('') }
  const handleClose = () => { reset(); onClose() }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImageUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!imageUrl) { setError('Please upload an image'); return }
    if (!title.trim()) { setError('Please enter a title'); return }
    onSave({ imageUrl, title: title.trim(), category, notes })
    reset(); onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Upload a Photo">
      <div className="space-y-4">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {imageUrl ? (
          <div className="relative rounded-xl overflow-hidden">
            <img src={imageUrl} alt="upload preview" className="w-full h-44 object-cover" />
            <button
              onClick={() => setImageUrl('')}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white text-xs flex items-center justify-center"
            >✕</button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full py-8 rounded-xl border-2 border-dashed text-sm transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            Click to upload an image
          </button>
        )}
        {error && <p className="text-xs" style={{ color: 'var(--color-danger)' }}>{error}</p>}
        <div>
          <label className="label">Title *</label>
          <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My dress inspiration" />
        </div>
        <div>
          <label className="label">Category</label>
          <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {SAVE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Notes (optional)</label>
          <textarea className="input-field" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add details..." />
        </div>
        <div className="flex gap-3 pt-1">
          <button className="btn-outline flex-1" type="button" onClick={handleClose}>Cancel</button>
          <button className="btn-primary flex-1" type="button" onClick={handleSave}>Save to Board</button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Edit modal ───────────────────────────────────────────────────────────────

function EditModal({ idea, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (idea) {
      setTitle(idea.title || '')
      setCategory(idea.category || 'General')
      setNotes(idea.notes || idea.description || '')
    }
  }, [idea])

  return (
    <Modal open={!!idea} onClose={onClose} title="Edit Idea">
      <div className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="label">Category</label>
          <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {SAVE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea className="input-field" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="flex gap-3">
          <button className="btn-outline flex-1" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary flex-1"
            onClick={() => onSave(idea.id, { title: title.trim() || idea.title, category, notes })}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function IdeasBoard() {
  const { ideas, setIdeas } = useApp()

  // Search & results
  const [searchInput, setSearchInput] = useState('')
  const [activeChip, setActiveChip] = useState('All')
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')

  // Modals
  const [saveTarget, setSaveTarget] = useState(null)
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)

  // Main tab
  const [mainTab, setMainTab] = useState('discover') // 'discover' | 'board'

  // Board filter
  const [boardFilter, setBoardFilter] = useState('All')

  // Toast
  const [toast, setToast] = useState({ visible: false, message: '' })

  const showToast = useCallback((message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000)
  }, [])

  // ── Pexels fetch ────────────────────────────────────────────────────────────

  const doSearch = useCallback(async (term) => {
    setLoading(true)
    setFetchError('')
    try {
      const results = await pexelsSearch(term)
      setPhotos(results)
    } catch {
      setFetchError('Could not load photos. Check your internet connection and try again.')
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load — "wedding inspiration"
  useEffect(() => {
    doSearch('wedding inspiration')
  }, [doSearch])

  const handleChipClick = (chip) => {
    setActiveChip(chip)
    setSearchInput('')
    doSearch(chip === 'All' ? 'wedding inspiration' : chip)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchInput.trim()
    if (!q) return
    doSearch(q)
  }

  // ── Save handlers ───────────────────────────────────────────────────────────

  const handlePexelsSave = (photo, { title, category, notes }) => {
    setIdeas((prev) => [{
      id: `idea_${Date.now()}`,
      title,
      category,
      notes,
      imageUrl: photo.src.large,
      photographerName: photo.photographer,
      pexelsUrl: photo.url,
      savedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }, ...prev])
    setSaveTarget(null)
    showToast('Saved to your board 💍')
  }

  const handleUrlSave = ({ imageUrl, title, category, notes }) => {
    setIdeas((prev) => [{
      id: `idea_${Date.now()}`,
      title, category, notes, imageUrl,
      savedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }, ...prev])
    setMainTab('board')
    showToast('Saved to your board 💍')
  }

  const handleUploadSave = ({ imageUrl, title, category, notes }) => {
    setIdeas((prev) => [{
      id: `idea_${Date.now()}`,
      title, category, notes, imageUrl,
      savedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }, ...prev])
    setMainTab('board')
    showToast('Saved to your board 💍')
  }

  const handleDelete = (id) => setIdeas((prev) => prev.filter((i) => i.id !== id))

  const handleEditSave = (id, updates) => {
    setIdeas((prev) => prev.map((i) => i.id === id ? { ...i, ...updates } : i))
    setEditTarget(null)
  }

  // ── Derived ─────────────────────────────────────────────────────────────────

  const usedCategories = [...new Set(ideas.map((i) => i.category))].sort()
  const boardFilterOptions = ['All', ...usedCategories]
  const filteredIdeas = boardFilter === 'All' ? ideas : ideas.filter((i) => i.category === boardFilter)

  // Split results for ad injection between row 2 and row 3 (after first 6 cards)
  const photosFirst = photos.slice(0, 6)
  const photosRest = photos.slice(6)

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <Toast visible={toast.visible} message={toast.message} />

      {/* ── Page header + tab switcher ───────────────────────────── */}
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="section-title mb-1">Ideas Board</h1>
          <p className="section-subtitle mb-0">Discover and save your wedding inspiration</p>
        </div>
        {/* Main tabs */}
        <div
          className="flex rounded-full p-1 shrink-0"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {[
            { key: 'discover', label: 'Discover' },
            { key: 'board',    label: `My Board${ideas.length ? ` (${ideas.length})` : ''}` },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setMainTab(t.key)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150"
              style={
                mainTab === t.key
                  ? { background: 'var(--color-primary)', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }
                  : { background: 'transparent', color: 'var(--color-text-muted)' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          DISCOVER TAB
      ════════════════════════════════════════════════════════════ */}
      {mainTab === 'discover' && (
        <>
          {/* Search bar + action buttons */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-5">
            <div className="relative flex-1">
              <input
                className="input-field rounded-full pl-5 pr-12 py-3.5 text-base shadow-sm w-full"
                placeholder="Search wedding inspiration..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
                title="Search"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="6" cy="6" r="4.5" />
                  <line x1="9.5" y1="9.5" x2="13" y2="13" />
                </svg>
              </button>
            </div>
            <button type="button" className="btn-outline text-sm px-4 shrink-0" onClick={() => setShowUrlModal(true)}>
              + URL
            </button>
            <button
              type="button"
              className="text-sm px-4 shrink-0 rounded-full border font-medium transition-all duration-150"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', background: 'transparent' }}
              onClick={() => setShowUploadModal(true)}
            >
              Upload
            </button>
          </form>

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-1">
            {SEARCH_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="text-xs px-4 py-2 rounded-full font-medium transition-all duration-150 whitespace-nowrap border"
                style={
                  activeChip === chip
                    ? { background: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }
                    : { background: 'transparent', color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }
                }
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Error */}
          {fetchError && (
            <div className="text-center py-6 text-sm mb-6 rounded-xl" style={{ background: 'var(--color-surface)', color: 'var(--color-danger)' }}>
              {fetchError}
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-4">
              {SKELETON_HEIGHTS.map((h, i) => <SkeletonCard key={i} height={h} />)}
            </div>
          ) : (
            <>
              {photosFirst.length > 0 && (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                  {photosFirst.map((photo) => (
                    <PexelsCard key={photo.id} photo={photo} onSave={setSaveTarget} />
                  ))}
                </div>
              )}

              {/* AD SLOT - ADSENSE (between row 2 and row 3) */}
              {photos.length > 0 && (
                <div className="my-6">
                  <AdBanner slot="ideas-mid-results" size="leaderboard" />
                </div>
              )}

              {photosRest.length > 0 && (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                  {photosRest.map((photo) => (
                    <PexelsCard key={photo.id} photo={photo} onSave={setSaveTarget} />
                  ))}
                </div>
              )}

              {/* Pexels attribution — required by Pexels API terms */}
              {photos.length > 0 && (
                <p className="text-xs text-center mt-4 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Photos provided by{' '}
                  <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer"
                    className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
                    Pexels
                  </a>
                </p>
              )}
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════════
          MY BOARD TAB
      ════════════════════════════════════════════════════════════ */}
      {mainTab === 'board' && (
        <>
          {/* Add buttons row */}
          <div className="flex gap-2 mb-6">
            <button type="button" className="btn-outline text-sm" onClick={() => setMainTab('discover')}>
              + Discover more
            </button>
            <button type="button" className="btn-ghost text-sm" onClick={() => setShowUrlModal(true)}>
              + URL
            </button>
            <button type="button" className="btn-ghost text-sm" onClick={() => setShowUploadModal(true)}>
              Upload
            </button>
          </div>

          {/* Category filter tabs */}
          {ideas.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
              {boardFilterOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBoardFilter(cat)}
                  className={`tab-btn text-xs ${boardFilter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid or empty state */}
          {filteredIdeas.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4"><IdeasIllustration size={160} /></div>
              <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-heading)' }}>
                {ideas.length === 0 ? 'Your board is empty' : 'No ideas in this category'}
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                {ideas.length === 0
                  ? 'Search for inspiration or paste a URL to start building your board'
                  : 'Switch to All to see all your saved ideas'}
              </p>
              {ideas.length === 0 && (
                <button type="button" className="btn-primary" onClick={() => setMainTab('discover')}>
                  Discover Inspiration
                </button>
              )}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {filteredIdeas.map((idea) => (
                <BoardCard key={idea.id} idea={idea} onDelete={handleDelete} onEdit={setEditTarget} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Modals ───────────────────────────────────────────────── */}
      <SaveModal
        photo={saveTarget}
        onClose={() => setSaveTarget(null)}
        onConfirm={(meta) => handlePexelsSave(saveTarget, meta)}
      />
      <UrlModal
        open={showUrlModal}
        onClose={() => setShowUrlModal(false)}
        onSave={handleUrlSave}
      />
      <UploadModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSave={handleUploadSave}
      />
      <EditModal
        idea={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEditSave}
      />
    </div>
  )
}
