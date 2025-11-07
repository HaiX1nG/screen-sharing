import { useEffect, useState } from 'react'
import '../src/assets/css/base.css'
import { ConfigProvider, theme, App as AntdApp, Switch } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'

type ThemeMode = 'system' | 'light' | 'dark'

function useSystemTheme(): boolean {
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

function App(): React.JSX.Element {
  const systemIsDark = useSystemTheme()
  const [themeMode, setThemeMode] = useState<ThemeMode>('system')

  // 计算实际使用的主题
  const actualIsDark = themeMode === 'system' ? systemIsDark : themeMode === 'dark'

  const handleSwitchChange = (checked: boolean): void => {
    setThemeMode(checked ? 'dark' : 'light')
  }

  // 计算开关的初始状态
  const switchChecked = themeMode === 'system' ? systemIsDark : themeMode === 'dark'

  return (
    <>
      <ConfigProvider
        theme={{ algorithm: actualIsDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
      >
        <AntdApp
          style={{
            minHeight: '100vh',
            background: actualIsDark ? '#1e1e1e' : '#ffffff',
            color: actualIsDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
            transition: 'all 0.3s'
          }}
        >
          <div>
            <div>
              <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                checked={switchChecked}
                onChange={handleSwitchChange}
                defaultChecked
              />
            </div>
            <div>
              <code>Hello Electron!</code>
            </div>
            <div>
              <p>
                当前主题模式:
                {themeMode === 'system' ? `系统 (${systemIsDark ? '暗色' : '亮色'})` : themeMode}
              </p>
            </div>
          </div>
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
