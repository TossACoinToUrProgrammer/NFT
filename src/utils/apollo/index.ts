import { ApolloClient, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import fetch from 'isomorphic-unfetch'
import { useMemo } from 'react'
import { CONFIG } from '../config'
import createCache from './cache'

const GRAPHQL_URL = 'https://gapi.storyblok.com/v1/api'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null
let apolloPreviewClient: ApolloClient<NormalizedCacheObject> | null = null

const createLink = (preview: boolean) =>
  createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: false,
  }).concat(
    createHttpLink({
      fetch,
      uri: GRAPHQL_URL,
      credentials: 'same-origin',
      headers: {
        Token: CONFIG.previewToken,
        Version: 'draft',
        Accept: 'application/json',
      },
    })
  )

const isEmpty = (value: any) =>
  value == null ||
  (value.hasOwnProperty('length') && value.length === 0) ||
  (value.constructor === Object && Object.keys(value).length === 0)

const createApolloClient = (preview: boolean = false) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createLink(preview),
    cache: createCache(),
    connectToDevTools: false,
    defaultOptions: {
      query: {
        fetchPolicy: preview ? 'no-cache' : 'cache-first',
      },
    },
  })

export function initializeApolloPreview(initialState: NormalizedCacheObject = {}) {
  const _apolloPreviewClient = apolloPreviewClient ?? createApolloClient(true)

  if (!isEmpty(initialState)) {
    _apolloPreviewClient.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return _apolloPreviewClient
  apolloPreviewClient = apolloPreviewClient ?? _apolloPreviewClient

  return apolloPreviewClient
}

export function initializeApollo(initialState: NormalizedCacheObject = {}) {
  const _apolloClient = apolloClient ?? createApolloClient(false)

  if (!isEmpty(initialState)) {
    _apolloClient.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return _apolloClient
  apolloClient = apolloClient ?? _apolloClient

  return apolloClient
}

export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
