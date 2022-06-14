import React from 'react'
import { NavLink, NavLinkProps, useMatch } from 'react-router-dom'
import styles from './MyNavLink.module.scss'

const MyNavLink: React.FC<NavLinkProps> = props => {
  const match = useMatch( props.to as string )
  const classes = [ styles.MyNavLink, match && styles.active ].join( ' ' )

  return (
    <NavLink {...props} className={classes}>
      {props.children}
    </NavLink>
  )
}

export default MyNavLink
