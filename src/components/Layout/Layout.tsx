import React from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

interface LayoutProps {
    children: JSX.Element,
    settings: GlobalStoryblok
}

export const Layout = ({children, settings}) => {
  return (
    <div>Layout</div>
  )
}
