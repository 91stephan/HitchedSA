import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BudgetIllustration from '../components/illustrations/BudgetIllustration'
import AdBanner from '../components/AdBanner'

const CATEGORY_ICONS = {
  'Venue': '🏛️', 'Catering': '🍽️', 'Photography & Video': '📸',
  'DJ & Entertainment': '🎵', 'Flowers & Floral': '💐', 'Wedding Cake': '🎂',
  'Dress & Attire': '👗', 'Décor & Styling': '✨', 'Transport': '🚗', 'Other': '📦',
}

export default function Budget() {
  const { budget, setBudget, budgetTotal, setBudgetTotal, totalSpent, budgetProgress } = useApp()
  const [totalInput, setTotalInput] = useState(String(budgetTotal))
  const [editingTotal, setEditingTotal] = useState(false)

  const remaining = budgetTotal - totalSpent
  const remainingPct = budgetTotal > 0 ? Math.max(0, (remaining / budgetTotal) * 100) : 100

  const updateCategory = (id, field, value) => {
    setBudget((prev) => prev.map((cat) => cat.id === id ? { ...cat, [field]: field === 'depositPaid' ? value : Number(value) || 0 } : cat))
  }

  const saveTotal = () => {
    const parsed = Number(totalInput.replace(/[^0-9.]/g, ''))
    if (!isNaN(parsed) && parsed > 0) setBudgetTotal(parsed)
    setEditingTotal(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-6 mb-6">
        <BudgetIllustration size={100} />
        <div>
          <h1 className="section-title mb-1">Budget Tracker</h1>
          <p className="section-subtitle mb-0">Plan and track every rand of your wedding spend</p>
        </div>
      </div>

      {/* Total Budget */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--color-accent)' }}>Total Wedding Budget</h2>
          {editingTotal ? (
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>R</span>
              <input
                className="input-field w-40 text-right"
                value={totalInput}
                onChange={(e) => setTotalInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveTotal()}
                autoFocus
              />
              <button className="btn-primary text-sm" onClick={saveTotal}>Save</button>
              <button className="btn-ghost text-sm" onClick={() => { setEditingTotal(false); setTotalInput(String(budgetTotal)) }}>Cancel</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                R{budgetTotal.toLocaleString('en-ZA')}
              </span>
              <button className="btn-outline text-sm" onClick={() => setEditingTotal(true)}>Edit</button>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track mb-3">
          <div className="progress-bar-fill" style={{ width: `${budgetProgress}%` }} />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-display text-xl font-bold" style={{ color: 'var(--color-danger)' }}>
              R{totalSpent.toLocaleString('en-ZA')}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Spent</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold" style={{ color: remaining < 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
              R{Math.abs(remaining).toLocaleString('en-ZA')}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{remaining < 0 ? 'Over budget' : 'Remaining'}</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
              {Math.round(budgetProgress)}%
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Used</div>
          </div>
        </div>
      </div>

      <AdBanner slot="budget-mid" size="leaderboard" />

      {/* Category Breakdown */}
      <div className="space-y-3">
        {budget.map((cat) => {
          const catProgress = cat.allocated > 0 ? Math.min((cat.spent / cat.allocated) * 100, 100) : 0
          const catRemaining = cat.allocated - cat.spent
          const isOver = catRemaining < 0

          return (
            <div key={cat.id} className="card">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{CATEGORY_ICONS[cat.category] || '📦'}</span>
                <h3 className="font-display font-semibold flex-1" style={{ color: 'var(--color-accent)' }}>{cat.category}</h3>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
                  <input
                    type="checkbox"
                    checked={cat.depositPaid}
                    onChange={(e) => updateCategory(cat.id, 'depositPaid', e.target.checked)}
                    style={{ accentColor: 'var(--color-success)' }}
                  />
                  Deposit paid
                </label>
                {isOver && (
                  <span className="badge text-xs px-2 py-0.5" style={{ background: 'var(--color-danger)', color: '#fff' }}>
                    Over budget
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="label text-xs">Allocated (R)</label>
                  <input
                    type="number"
                    className="input-field text-sm"
                    value={cat.allocated || ''}
                    placeholder="0"
                    onChange={(e) => updateCategory(cat.id, 'allocated', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label text-xs">Spent (R)</label>
                  <input
                    type="number"
                    className="input-field text-sm"
                    value={cat.spent || ''}
                    placeholder="0"
                    onChange={(e) => updateCategory(cat.id, 'spent', e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="label text-xs">Remaining</label>
                  <div
                    className="input-field text-sm flex items-center font-semibold"
                    style={{ color: isOver ? 'var(--color-danger)' : 'var(--color-success)', background: 'var(--color-surface)' }}
                  >
                    {isOver ? '-' : ''}R{Math.abs(catRemaining).toLocaleString('en-ZA')}
                  </div>
                </div>
              </div>

              <div className="progress-bar-track">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${catProgress}%`,
                    background: isOver ? 'var(--color-danger)' : 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Payment Reminders Placeholder */}
      <div
        className="card mt-6 p-5 text-center"
        style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}
      >
        <div className="text-3xl mb-2" style={{ color: 'var(--color-accent)', opacity: 0.5 }}>◎</div>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {/* PAYMENT REMINDERS - wire up later */}
          Payment reminders will appear here. Connect your calendar to get notified before deposits are due.
        </p>
      </div>
    </div>
  )
}
