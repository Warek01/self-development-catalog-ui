import type { AppProps, AppType } from 'next/app'
import Head from 'next/head'
import { Component } from 'react'
import 'rc-tooltip/assets/bootstrap_white.css'

import '@/styles/globals.sass'
import { ComposedProvider } from '@/containers'

const App: AppType<AppProps<null>> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Self Dev</title>
      </Head>

      <ComposedProvider>
        <div id="modal-root" />
        <Component {...pageProps} />
      </ComposedProvider>
    </>
  )
}

export default App
