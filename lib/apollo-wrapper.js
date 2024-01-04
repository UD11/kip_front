"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from 'apollo-link-context';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
  
    uri: "http://localhost:8000/graphql",
  });

  const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('authToken'); 

    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            authLink,
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : ApolloLink.from([
            authLink,
            httpLink,
          ]),
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
