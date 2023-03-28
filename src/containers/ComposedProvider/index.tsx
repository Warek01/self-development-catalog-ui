import { FC, PropsWithChildren, ReactNode } from 'react'

import appContextProviders from '@/constants/appContextProviders'
import { isProviderObject } from '@/lib/guards'
import type { ComposedProvider } from './interface'

const ComposedProvider: FC<PropsWithChildren> = ({ children }) => {
  const composedProviders = (providers: ComposedProvider[]): ReactNode => {
    if (providers.length === 0) {
      return children
    } else if (providers.length === 1) {
      const { Component, props } = isProviderObject(providers[0])
        ? providers[0]
        : { Component: providers[0], props: {} }

      return <Component {...props}>{composedProviders([])}</Component>
    } else {
      const { Component, props } = isProviderObject(providers[0])
        ? providers[0]
        : { Component: providers[0], props: {} }

      return <Component {...props}>{composedProviders(providers.slice(1))}</Component>
    }
  }

  return <>{composedProviders(appContextProviders)}</>
}

export default ComposedProvider
