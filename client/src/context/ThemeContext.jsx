import { createContext, useContext, useEffect, useState } from 'react'
import { THEMES, DEFAULT_THEME } from '../themes/themes'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('hitchedsa_theme') || DEFAULT_THEME
  })

  const theme = THEMES[themeId] || THEMES[DEFAULT_THEME]

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    localStorage.setItem('hitchedsa_theme', themeId)
  }, [themeId, theme])

  const applyTheme = (id) => {
    if (THEMES[id]) setThemeId(id)
  }

  return (
    <ThemeContext.Provider value={{ themeId, theme, applyTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
