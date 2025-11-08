import { useState, useEffect, useCallback } from 'react'

export type ThemeMode = 'system' | 'light' | 'dark'

export interface UseThemeReturn {
  themeMode: ThemeMode
  actualIsDark: boolean
  switchChecked: boolean
  toggleTheme: (checked: boolean) => void
  setSystemTheme: () => void
  systemIsDark: boolean
}

export function useSystemTheme(): boolean {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent): void => {
      setIsDark(e.matches)
    }
    setIsDark(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])
  return isDark
}

export function useTheme(): UseThemeReturn {
  const systemIsDark = useSystemTheme()
  const [themeMode, setThemeMode] = useState<ThemeMode>('system')
  // 计算实际使用的主题
  const actualIsDark = themeMode === 'system' ? systemIsDark : themeMode === 'dark'

  // 计算开关状态
  const switchChecked = themeMode === 'system' ? systemIsDark : themeMode === 'dark'

  const toggleTheme = useCallback((checked: boolean): void => {
    setThemeMode(checked ? 'dark' : 'light')
  }, [])

  const setSystemTheme = useCallback((): void => {
    setThemeMode('system')
  }, [])

  return {
    themeMode,
    actualIsDark,
    switchChecked,
    toggleTheme,
    setSystemTheme,
    systemIsDark
  }
}
