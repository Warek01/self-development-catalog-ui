import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/graphql/client'

import type { ComposedProviderType } from '@/containers/ComposedProvider/interface'
import ThemeContextProvider from '@/context/theme/Provider'
import ModalContextProvider from '@/context/modal/Provider'
import SideMenuContextProvider from '@/context/sideMenu/Provider'
import AuthContextProvider from '@/context/auth/Provider'
import MobileViewContextProvider from '@/context/mobileView/Provider'

const appContextProviders: ComposedProviderType[] = [
  {
    Component: ApolloProvider,
    props: {
      client: apolloClient,
    },
  },
  MobileViewContextProvider,
  ThemeContextProvider,
  SideMenuContextProvider,
  ModalContextProvider,
  AuthContextProvider,
]

export default appContextProviders
