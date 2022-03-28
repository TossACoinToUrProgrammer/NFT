import { GetStaticProps } from 'next'
import { AppPageProps } from '../../typings/app'
import getPageProps from './getPageProps'

const pagesGetStaticProps: GetStaticProps<AppPageProps> = async (props) => {
  const { params, preview } = props
  const slug = params?.index?.length ? (params.index !== 'index' ? params.index : 'home') : 'home'

  try {
    const { notFoundLocale, ...pageProps } = await getPageProps(slug, {
      insideStoryblok: !!preview,
      preview: !!preview,
    })

    if (!pageProps.page && notFoundLocale) {
      return {
        redirect: {
          destination: notFoundLocale,
          locale: false,
          permanent: true,
        },
      }
    }

    if (!(pageProps.page && pageProps.settings)) {
      return {
        notFound: true,
      }
    }

    return {
      props: pageProps,
      revalidate: 600,
    }
  } catch (error) {
    console.log('error', error)
    throw new Error('error occured')
  }
}

export default pagesGetStaticProps
