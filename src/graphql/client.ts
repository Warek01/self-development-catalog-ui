import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const apolloSsrClient = new ApolloClient({
  connectToDevTools: false,
  ssrMode: true,
  cache: new InMemoryCache(),
  assumeImmutableResults: true,
  ssrForceFetchDelay: 0,
  queryDeduplication: false,
  credentials: 'same-origin',

  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_TOKEN}`,
    },
    credentials: 'same-origin',
    includeExtensions: false,
    includeUnusedVariables: false,
    preserveHeaderCase: false,
  }),

  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: false,
      partialRefetch: false,
      returnPartialData: false,
    },
  },
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
  uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_TOKEN}`,
  },
  ssrMode: false,
  connectToDevTools: false,
  queryDeduplication: true,
  assumeImmutableResults: true,
  credentials: 'same-origin',
  defaultOptions: {
    query: {
      notifyOnNetworkStatusChange: false,
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
})
