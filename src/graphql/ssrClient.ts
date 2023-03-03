import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const apolloSsrClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_STRAPI_URL + '/graphql',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_PUBLIC_TOKEN}`,
    },
  }),
})

export default apolloSsrClient
