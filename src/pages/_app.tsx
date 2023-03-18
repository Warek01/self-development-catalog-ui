// Imports
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'rc-tooltip/assets/bootstrap_white.css'

// Side effects
import '@/styles/globals.sass'

// Local imports
import { apolloClient } from '@/graphql/client'
import ThemeContextProvider from '@/contexts/theme/Provider'
import SideMenuContextProvider from '@/contexts/sideMenu/Provider'
import MobileViewContextProvider from '@/contexts/mobileViewContext/Provider'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContextProvider>
        <MobileViewContextProvider>
          <SideMenuContextProvider>
            <div id="modal-root" />
            <Component {...pageProps} />
          </SideMenuContextProvider>
        </MobileViewContextProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  )
}

export default App
