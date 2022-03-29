import Styles from './Typography.module.scss'

const elementsAllowed = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']

interface TypographyProps {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant?: 'h1' | 'h2' | 'body1' | 'body2' | 'small-label' | 'p' | 'subtitle1'| 'subtitle2'
  children: JSX.Element
  className?: string
}

const Typography = ({ element = 'p', variant = 'p', children, align = 'inherit', className = '' }: TypographyProps) => {
  const Component = element && elementsAllowed.includes(element) ? element : 'p'
  return (
    <Component style={{ textAlign: align }} className={`${Styles[variant]} ${className}`}>
      {children}
    </Component>
  )
}

export default Typography
