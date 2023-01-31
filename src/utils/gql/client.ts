import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloSsrClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new HttpLink({
    uri: 'http://localhost:1337/graphql',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_PUBLIC_TOKEN}`
    }
  })
})