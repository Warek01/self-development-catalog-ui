import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client'

const apolloSsrClient = new ApolloClient({
  connectToDevTools: false,
  ssrMode: true,
  cache: new InMemoryCache(),
  assumeImmutableResults: false,
  ssrForceFetchDelay: 0,
  queryDeduplication: true,

  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_PUBLIC_TOKEN}`,
    },
    credentials: 'same-origin',
    includeExtensions: true,
    includeUnusedVariables: false,
    preserveHeaderCase: true
  }),

  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
})

export default apolloSsrClient
