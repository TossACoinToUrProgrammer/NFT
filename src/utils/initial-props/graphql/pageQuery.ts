import { gql } from '@apollo/client'

export const PAGE_QUERY = gql`
  query PAGE_QUERY($index: ID!) {
    PageItem(id: $index) {
      name
      uuid
      full_slug
      content {
        _editable
        _uid
        component
        body
      }
    }
    GlobalItem(id: "settings") {
      uuid
      content {
        _uid
        header_nav
        footer_nav
        header_logo
        header_search_text
        footer_logo
        footer_text
        footer_nav
        footer_social
      }
    }
  }
`
