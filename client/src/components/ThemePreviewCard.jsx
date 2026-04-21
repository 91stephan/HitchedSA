export default function ThemePreviewCard({ theme, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl p-4 border-2 transition-all duration-200 text-left w-full cursor-pointer ${
        selected ? 'ring-2 shadow-lg scale-[1.02]' : 'hover:scale-[1.01] hover:shadow-md'
      }`}
      style={{
        background: theme.preview.bg,
        borderColor: selected ? theme.preview.accent : '#e2e8f0',
        ...(selected ? { '--tw-ring-color': theme.preview.accent } : {}),
      }}
    >
      {/* Colour swatches */}
      <div className="flex gap-2 mb-3">
        <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: theme.preview.primary }} />
        <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: theme.preview.accent }} />
        <div className="w-8 h-8 rounded-full shadow-sm border" style={{ background: theme.preview.bg, borderColor: '#e2e8f0' }} />
      </div>

      {/* Fake UI preview */}
      <div className="rounded-lg p-2 mb-3" style={{ background: `${theme.preview.primary}22` }}>
        <div className="h-2 rounded-full mb-1.5 w-3/4" style={{ background: theme.preview.primary }} />
        <div className="h-1.5 rounded-full w-1/2" style={{ background: theme.preview.accent }} />
      </div>

      <div className="font-display font-semibold text-sm" style={{ color: theme.preview.primary }}>
        {theme.name}
      </div>
      <div className="text-xs mt-0.5" style={{ color: '#666' }}>
        {theme.description}
      </div>

      {selected && (
        <div
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ background: theme.preview.accent }}
        >
          ✓
        </div>
      )}
    </button>
  )
}
