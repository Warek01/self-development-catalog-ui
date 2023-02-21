import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const apolloSsrClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_PUBLIC_TOKEN}`,
    },
  }),
})
