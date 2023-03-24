// Imports
import type { AppProps, AppType } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'rc-tooltip/assets/bootstrap_white.css'

// Side effects
import '@/styles/globals.sass'

// Local imports
import { apolloClient } from '@/graphql/client'
import ThemeContextProvider from '@/contexts/theme/Provider'
import SideMenuContextProvider from '@/contexts/sideMenu/Provider'
import MobileViewContextProvider from '@/contexts/mobileView/Provider'
import Head from 'next/head'
import ModalContextProvider from '@/contexts/modal/Provider'

const App: AppType<AppProps<null>> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Self Dev</title>
      </Head>

      <ApolloProvider client={apolloClient}>
        <ThemeContextProvider>
          <MobileViewContextProvider>
            <SideMenuContextProvider>
              <ModalContextProvider>
                <div id="modal-root" />
                <Component {...pageProps} />
              </ModalContextProvider>
            </SideMenuContextProvider>
          </MobileViewContextProvider>
        </ThemeContextProvider>
      </ApolloProvider>
    </>
  )
}

export default App
