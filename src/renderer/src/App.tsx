import '../src/assets/css/base.css'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { useTheme } from './hook/useTheme'
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch'
import TitleBar from './components/TitleBar/TitleBar'

function App(): React.JSX.Element {
  const { themeMode, actualIsDark, switchChecked, toggleTheme, setSystemTheme, systemIsDark } =
    useTheme()

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
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <div>
            <div>
              <TitleBar isDark={actualIsDark} />
            </div>
            <div>
              <ThemeSwitch
                themeMode={themeMode}
                switchChecked={switchChecked}
                onToggle={toggleTheme}
                onSetSystem={setSystemTheme}
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
