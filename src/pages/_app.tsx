// Imports
import { useEffect, useMemo, useState } from 'react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

// Side effects
import 'styles/globals.scss'

// Local imports
import responsiveContext from 'context/responsiveConext'
import sideMenuContext, { SideMenuContextProps } from 'context/sideMenuContext'
import { apolloSsrClient } from 'utils/gql/client'

const App = ({ Component, pageProps }: AppProps) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false)

  const sideMenuContextValue = useMemo<SideMenuContextProps>(
    () => ({
      isOpen: isSideMenuOpen,
      open: () => setIsSideMenuOpen(true),
      close: () => setIsSideMenuOpen(false),
    }),
    [isSideMenuOpen],
  )

  useEffect(() => {
    const mediaQuery = matchMedia('(width < 768px)')

    setIsMobileView(mediaQuery.matches)
    mediaQuery.addEventListener('change', ({ matches }) =>
      setIsMobileView(matches),
    )
  }, [])

  return (
    <ApolloProvider client={apolloSsrClient}>
      <responsiveContext.Provider value={{ isMobileView }}>
        <sideMenuContext.Provider value={sideMenuContextValue}>
          <Component {...pageProps} />
        </sideMenuContext.Provider>
      </responsiveContext.Provider>
    </ApolloProvider>
  )
}

export default App
