import { GetStaticPropsContext } from "next"
import { Story } from "storyblok-js-client"

export type AppApiRequestPayload = {
    page: Story
    setting: Story
    notFoundLocale?: string | null
}

export type AppPageProps = Pick<AppApiRequestPayload, 'notFoundLocale'> & PagePropsOptions & {
    page?: PageStoryblok
}

export type PagePropsOptions = Pick<GetStaticPropsContext, 'defaultLocale' | 'locale' | 'locales'> & {
    insideStoryblok?: boolean
    preview?: boolean
}