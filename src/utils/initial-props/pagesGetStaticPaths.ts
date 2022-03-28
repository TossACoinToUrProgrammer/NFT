import { gql } from '@apollo/client'
import { GetStaticPaths } from 'next'

import { PageItem } from '../../typings/generated/schema'
import { initializeApollo } from '../apollo'

const PAGES_QUERY = gql`
  {
    PageItems {
      items {
        full_slug
      }
    }
  }
`

const internalLinkHandler = (url: string) => {
  const processedUrl = url
  return processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`
}

const pagesGetStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const resp = await apolloClient.query({
    query: PAGES_QUERY,
  })

  const pages: PageItem[] = resp.data.PageItems.items
  let paths = pages.map((pageItem) => {
    return {
      params: {
        index: internalLinkHandler(pageItem.full_slug as string)
          .split('/')
          .filter((i) => i),
      },
    }
  })

  paths.push({ params: { index: [] } }) //landing page as empty

  return {
    paths,
    fallback: 'blocking',
  }
}

export default pagesGetStaticPaths
