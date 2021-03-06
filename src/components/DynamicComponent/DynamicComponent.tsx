import SbEditable from 'storyblok-react'

const Components = {} as any

const DynamicComponent = ({ blok }: any) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    // wrap with SbEditable for visual editing
    return (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    )
  }

  // fallback if the component doesn't exist
  return (
    <p>
      The component
      <strong>{blok.component}</strong>
      has not been created yet.
    </p>
  )
}

export default DynamicComponent
