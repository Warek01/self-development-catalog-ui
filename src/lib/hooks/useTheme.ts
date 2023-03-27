import { useContext } from 'react'

import type { ThemeContextProps } from '@/context/theme/interface'
import { themeContext } from '@/context'

const useTheme = (): ThemeContextProps => {
  return useContext(themeContext)
}

export default useTheme
