import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import FloralDivider from '../components/FloralDivider'
import ChecklistIllustration from '../components/illustrations/ChecklistIllustration'
import AdBanner from '../components/AdBanner'

// Time-based groups (when date is set)
function getMonthsOut(weddingDate) {
  if (!weddingDate) return null
  const diff = new Date(weddingDate).getTime() - Date.now()
  return diff / (1000 * 60 * 60 * 24 * 30)
}

const PHASE_GROUPS = {
  early: { label: 'Early Planning', icon: '🌱', color: 'var(--color-success)' },
  serious: { label: 'Getting Serious', icon: '📋', color: 'var(--color-accent)' },
  final: { label: 'Final Stretch', icon: '🏃', color: 'var(--color-primary)' },
  week: { label: 'Wedding Week', icon: '💍', color: 'var(--color-danger)' },
}

const TIME_GROUPS = [
  { key: '12', label: '12 Months Out', icon: '📅', phases: ['early'], months: [9, Infinity] },
  { key: '6', label: '6 Months Out', icon: '📆', phases: ['serious'], months: [3, 9] },
  { key: '3', label: '3 Months Out', icon: '🗓️', phases: ['final'], months: [1, 3] },
  { key: '1', label: '1 Month Out', icon: '⏰', phases: ['week'], months: [0, 1] },
]

function ChecklistItem({ task, onToggle, onUpdateNotes, onUpdateDueDate, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-lg p-3 mb-2 transition-all"
      style={{
        background: task.done ? 'var(--color-surface)' : 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        opacity: task.done ? 0.7 : 1,
      }}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 cursor-pointer shrink-0"
          style={{ accentColor: 'var(--color-primary)' }}
        />
        <span
          className="flex-1 text-sm cursor-pointer"
          style={{
            color: 'var(--color-text)',
            textDecoration: task.done ? 'line-through' : 'none',
          }}
          onClick={() => setExpanded((e) => !e)}
        >
          {task.label}
        </span>
        {task.dueDate && (
          <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            📅 {new Date(task.dueDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
          </span>
        )}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-xs px-1.5 py-0.5 rounded"
          style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface)' }}
        >
          {expanded ? '▲' : '▼'}
        </button>
        {task.custom && (
          <button onClick={() => onDelete(task.id)} className="text-xs" style={{ color: 'var(--color-danger)' }}>✕</button>
        )}
      </div>

      {expanded && (
        <div className="mt-3 pl-8 space-y-2 animate-fade-in">
          <div>
            <label className="label text-xs">Notes</label>
            <textarea
              className="input-field text-xs"
              rows={2}
              placeholder="Add notes or details..."
              value={task.notes}
              onChange={(e) => onUpdateNotes(task.id, e.target.value)}
            />
          </div>
          <div>
            <label className="label text-xs">Due Date</label>
            <input
              type="date"
              className="input-field text-xs"
              value={task.dueDate}
              onChange={(e) => onUpdateDueDate(task.id, e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Checklist() {
  const { checklist, setChecklist, weddingDate, checklistProgress, checklistDone } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTaskLabel, setNewTaskLabel] = useState('')
  const [newTaskPhase, setNewTaskPhase] = useState('early')
  const [addError, setAddError] = useState('')

  const monthsOut = getMonthsOut(weddingDate)

  const toggleTask = (id) => setChecklist((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
  const updateNotes = (id, notes) => setChecklist((prev) => prev.map((t) => t.id === id ? { ...t, notes } : t))
  const updateDueDate = (id, dueDate) => setChecklist((prev) => prev.map((t) => t.id === id ? { ...t, dueDate } : t))
  const deleteTask = (id) => setChecklist((prev) => prev.filter((t) => t.id !== id))

  const addCustomTask = () => {
    if (!newTaskLabel.trim()) { setAddError('Task label is required'); return }
    setChecklist((prev) => [...prev, {
      id: `task_custom_${Date.now()}`,
      label: newTaskLabel.trim(),
      phase: newTaskPhase,
      done: false, notes: '', dueDate: '', custom: true,
    }])
    setNewTaskLabel('')
    setAddError('')
    setShowAddModal(false)
  }

  // Group tasks
  const groups = weddingDate
    ? TIME_GROUPS.map((g) => ({
        ...g,
        tasks: checklist.filter((t) => g.phases.includes(t.phase)),
      }))
    : Object.entries(PHASE_GROUPS).map(([key, meta]) => ({
        key,
        label: meta.label,
        icon: meta.icon,
        color: meta.color,
        tasks: checklist.filter((t) => t.phase === key),
      }))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-5">
          <ChecklistIllustration size={100} />
          <div>
            <h1 className="section-title mb-1">Wedding Checklist</h1>
            <p className="section-subtitle mb-0">
              {weddingDate ? 'Tasks grouped by how far out from your wedding day' : 'Tasks grouped by planning phase'}
            </p>
          </div>
        </div>
        <button className="btn-primary text-sm shrink-0 ml-4" onClick={() => setShowAddModal(true)}>
          + Custom Task
        </button>
      </div>

      {/* Progress */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--color-accent)' }}>
            Overall Progress
          </h2>
          <span className="font-display text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {checklistProgress}%
          </span>
        </div>
        <div className="progress-bar-track mb-2">
          <div className="progress-bar-fill" style={{ width: `${checklistProgress}%` }} />
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {checklistDone} of {checklist.length} tasks completed
        </p>
      </div>

      <AdBanner slot="checklist-mid" size="leaderboard" />

      <FloralDivider />

      {/* Groups */}
      <div className="space-y-6">
        {groups.map((group) => {
          const donePct = group.tasks.length > 0
            ? Math.round((group.tasks.filter((t) => t.done).length / group.tasks.length) * 100)
            : 0
          return (
            <div key={group.key}>
              <div className="flex items-center justify-between mb-3">
                <h2
                  className="font-display text-lg font-semibold flex items-center gap-2"
                  style={{ color: group.color || 'var(--color-text)' }}
                >
                  <span>{group.icon}</span>
                  <span>{group.label}</span>
                </h2>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  {group.tasks.filter((t) => t.done).length}/{group.tasks.length} done · {donePct}%
                </span>
              </div>

              {group.tasks.length === 0 ? (
                <div className="text-xs p-3 rounded-lg" style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
                  No tasks in this phase yet.
                </div>
              ) : (
                group.tasks.map((task) => (
                  <ChecklistItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onUpdateNotes={updateNotes}
                    onUpdateDueDate={updateDueDate}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          )
        })}
      </div>

      {/* Add Custom Task Modal */}
      <Modal open={showAddModal} onClose={() => { setShowAddModal(false); setAddError('') }} title="Add Custom Task">
        <div className="space-y-4">
          <div>
            <label className="label">Task Description *</label>
            <input
              className="input-field"
              placeholder="e.g. Taste test cake flavours"
              value={newTaskLabel}
              onChange={(e) => { setNewTaskLabel(e.target.value); setAddError('') }}
              onKeyDown={(e) => e.key === 'Enter' && addCustomTask()}
            />
            {addError && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{addError}</p>}
          </div>
          <div>
            <label className="label">Planning Phase</label>
            <select className="input-field" value={newTaskPhase} onChange={(e) => setNewTaskPhase(e.target.value)}>
              {Object.entries(PHASE_GROUPS).map(([key, meta]) => (
                <option key={key} value={key}>{meta.icon} {meta.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button className="btn-outline flex-1" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn-primary flex-1" onClick={addCustomTask}>Add Task</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
