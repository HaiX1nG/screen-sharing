import { ThemeMode } from '@renderer/hook/useTheme'
import { Switch, Tooltip } from 'antd'
import { SunOutlined, MoonOutlined, SettingOutlined } from '@ant-design/icons'
import React from 'react'

interface ThemeSwitchProps {
  themeMode: ThemeMode
  switchChecked: boolean
  onToggle: (checked: boolean) => void
  onSetSystem: () => void
  showTooltip?: boolean
  size?: 'default' | 'small'
}

function ThemeSwitch({
  themeMode,
  switchChecked,
  onToggle,
  onSetSystem,
  showTooltip = true,
  size = 'default'
}: ThemeSwitchProps): React.JSX.Element {
  const handleSystemClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    onSetSystem?.()
  }

  const switchElement = (
    <Switch
      size={size}
      checkedChildren={
        <span>
          <MoonOutlined /> 暗色
        </span>
      }
      unCheckedChildren={
        <span>
          <SunOutlined /> 亮色
        </span>
      }
      checked={switchChecked}
      onChange={onToggle}
    />
  )

  if (!showTooltip) {
    return switchElement
  }

  const getTooltipTitle = (): string => {
    if (themeMode === 'system') {
      return '当前使用系统主题，点击切换到亮色主题或暗色主题'
    }
    return `当前使用${themeMode === 'dark' ? '暗色' : '亮色'}主题，点击切换到系统主题`
  }

  return (
    <Tooltip title={getTooltipTitle()}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {switchElement}
        <SettingOutlined
          onClick={handleSystemClick}
          style={{
            cursor: 'pointer',
            fontSize: size === 'small' ? 14 : 16
          }}
        />
      </div>
    </Tooltip>
  )
}

export default ThemeSwitch
