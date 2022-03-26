import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  if (router.isFallback) {
    return <div>...laoding</div>
  }
  return (
    <div>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" key="viewport" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
 
export default MyApp
