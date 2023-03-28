import { FC, PropsWithChildren, useEffect, useMemo } from 'react'

import { useLocalStorage } from '@/lib/hooks'
import type { ThemeContextProps } from './interface'
import themeContext from './context'

const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>('is-dark-theme', false)

  const contextValue = useMemo<ThemeContextProps>(
    () => ({
      isDark: isDarkTheme,
      toggle: () => {
        setIsDarkTheme((value) => !value)
      },
    }),
    [isDarkTheme, setIsDarkTheme],
  )

  useEffect(() => {
    isDarkTheme
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [isDarkTheme])

  return <themeContext.Provider value={contextValue}>{children}</themeContext.Provider>
}

export default ThemeContextProvider
