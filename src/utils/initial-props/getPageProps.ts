import { AppPageProps, PagePropsOptions } from '../../typings/app'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { initializeApollo, initializeApolloPreview } from '../apollo'
import { PAGE_QUERY } from './graphql/pageQuery'
import { prepareForStoryblok } from './prepareStoryblokRequest'
import { SSR_CONFIG } from './ssrConfig'

const getPageProps = async (slug: string | string[], options: PagePropsOptions): Promise<AppPageProps> => {
  const insideStoryblok = !!options.insideStoryblok
  const preview = !!options.preview

  const { pageSlug } = prepareForStoryblok(slug, options)
  const apolloClient = preview ? initializeApolloPreview() : initializeApollo()

  const respPageQuery = await apolloClient.query({
    query: PAGE_QUERY,
    variables: {
      index: pageSlug,
    },
  })

  const page = respPageQuery?.data?.PageItem
  const settings = respPageQuery?.data?.GlobalItem

  const pageProps = page?.content as PageStoryblok | undefined
  const settingsProps = settings?.content as GlobalStoryblok | undefined

  if (!pageProps) {
    console.log('page missing', slug, pageSlug)
  }
  if (!settingsProps) {
    console.log('settings is missing!', slug, pageSlug)
  } 

  const pageSettingsProps = {
    page: pageProps ? { ...pageProps, uuid: page.uuid, name: page.name, full_slug: page.full_slug } : null,
    settings: settingsProps ? { ...settingsProps, uuid: settings?.uuid } : null,
  }

  const props = {
    ...pageSettingsProps,
    initialApolloState: apolloClient.cache.extract(),
    insideStoryblok,
    preview,
    key: page?.uuid || Number(new Date()),
  } as AppPageProps

  await Promise.all(SSR_CONFIG.ssrHooks.pageProps.map((func) => func(props)))

  return props
}

export default getPageProps
