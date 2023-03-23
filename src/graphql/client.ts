import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const apolloSsrClient = new ApolloClient({
  connectToDevTools: false,
  ssrMode: true,
  cache: new InMemoryCache({
    resultCaching: false,
    canonizeResults: false,
    addTypename: false,
    resultCacheMaxSize: 0,
  }),
  assumeImmutableResults: false,
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
    useGETForQueries: false,
  }),

  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: false,
      partialRefetch: false,
      returnPartialData: false,
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
      optimisticResponse: false,
    },
  },
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
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
      fetchPolicy: 'network-only',
    },
  },
})
