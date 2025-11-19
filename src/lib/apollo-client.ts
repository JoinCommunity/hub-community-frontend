import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { isTokenExpired } from './jwt';

// Configuração da URL do BFF GraphQL
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Middleware para adicionar headers de autenticação
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  // Validate token before using it
  if (token && isTokenExpired(token)) {
    console.log('Token expired during request, clearing storage');
    // Clear expired token from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    // Don't include authorization header for expired tokens
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    };
  }

  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Criação do cliente Apollo
export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          communities: {
            merge(_existing = [], incoming) {
              return incoming;
            },
          },
          events: {
            merge(_existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'ignore',
    },
  },
});
