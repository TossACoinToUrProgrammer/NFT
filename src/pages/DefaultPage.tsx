import React from 'react'

import { AppPageProps } from '../typings/app'

export type PagesIndexProps = AppPageProps & Record<string, unknown>

export default function DefaultPage(props: PagesIndexProps): JSX.Element {
  console.log('props', props)
  return (
    <div>DefaultPage</div>
  )
}
