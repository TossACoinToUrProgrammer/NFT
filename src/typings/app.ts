import { GetStaticPropsContext } from 'next'
import { Story } from 'storyblok-js-client'
import { GlobalStoryblok, PageStoryblok } from './generated/components-schema'

export type ErrorProps = {
    type: 'not_supported' | 'page_not_found' | 'settings_not_found' | 'server_error'
    status: number
    url: string
}

export type AppApiRequestPayload = {
  page: Story
  setting: Story
  notFoundLocale?: string | null
}

export type AppPageProps = Pick<AppApiRequestPayload, 'notFoundLocale'> &
  PagePropsOptions & {
    page?: PageStoryblok | null
    settings?: GlobalStoryblok
    query?: any
    error?: ErrorProps
    pageNotFound?: boolean
    slug?: string
    preview?: boolean 
}

export type PagePropsOptions = Pick<GetStaticPropsContext, 'defaultLocale' | 'locale' | 'locales'> & {
  insideStoryblok?: boolean
  preview?: boolean
}
