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
    GlobalItem(id: "globalsettings") {
      uuid
      content {
        _uid
        header_nav
        footer_nav
        header_logo {
          filename
          alt
        }
        header_search_text
        footer_logo {
          filename
          alt
        }
        footer_text
        footer_nav
        footer_social
      }
    }
  }
`
