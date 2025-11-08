import React, { useEffect, useState } from 'react'
import './style/TitleBar.css'

// 扩展 Window 类型以包含 electronAPI
declare global {
  interface Window {
    electronAPI: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}

interface TitleBarProps {
  isDark?: boolean
}

function TitleBar({ isDark = false }: TitleBarProps): React.JSX.Element {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isWindowFocused, setIsWindowFocused] = useState(true)

  // 监听窗口焦点状态
  useEffect(() => {
    const handleFocus = (): void => setIsWindowFocused(true)
    const handleBlur = (): void => setIsWindowFocused(false)

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])
  const handleMinimize = (): void => {
    window.electronAPI.minimize()
  }

  const handleMaximize = (): void => {
    window.electronAPI.maximize()
  }

  const handleClose = (): void => {
    window.electronAPI.close()
  }

  return (
    <div
      className={`title-bar ${isWindowFocused ? 'window-focused' : 'window-blurred'} ${isDark ? 'theme-dark' : 'theme-light'}`}
    >
      <div className="macos-traffic-lights">
        <button
          className="traffic-light traffic-light-close"
          onClick={handleClose}
          aria-label="关闭窗口"
        >
          <span className="traffic-light-icon">×</span>
        </button>
        <button
          className="traffic-light traffic-light-minimize"
          onClick={handleMinimize}
          aria-label="最小化窗口"
        >
          <span className="traffic-light-icon">−</span>
        </button>
        <button
          className="traffic-light traffic-light-maximize"
          onClick={handleMaximize}
          aria-label={isMaximized ? '恢复窗口' : '最大化窗口'}
        >
          <span className="traffic-light-icon">{isMaximized ? '⧉' : '□'}</span>
        </button>
      </div>
      <div className="title-bar-drag-region">
        <span>
          <b>麦投</b>
        </span>
      </div>
    </div>
  )
}

export default TitleBar
