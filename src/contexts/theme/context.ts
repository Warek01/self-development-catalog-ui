import { Context, createContext } from 'react'

import type { ThemeContextProps } from './interface'

const themeContext: Context<ThemeContextProps> =
  createContext<ThemeContextProps>({
    isDark: false,
    toggle: () => null,
  })

export default themeContext
