import React, { PropsWithChildren } from 'react'
import styles from './Container.module.scss'

type ContainerProps = {
  margin?: number

  elementOuter?: string
  classOuter?: string

  elemInner?: string
  classInner?: string
} & PropsWithChildren

const Container: React.FC<ContainerProps> = props => {

  const classOuter = [ styles.Outer, props.classOuter ].join( ' ' )

  const classInner = [ styles.Container, props.classInner ].join( ' ' )

  return (
    React.createElement( props.elementOuter || 'div', { className: classOuter },
      React.createElement( props.elemInner || 'div', { className: classInner },
        props.children
      )
    )
  )
}

export default Container
