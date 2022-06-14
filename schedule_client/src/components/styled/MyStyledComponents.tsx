import styled from 'styled-components'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import btn1Styles from './btn1.module.scss'

export const AStyled = styled.a`
  color : var(--button2-stroke);

  &:hover {
    color : var(--text-accent);
  }

  &:active {
    color : var(--text-heads);
  }

  &:visited {
    color : var(--button2-stroke);
  }
`

export const Checkbox = styled.input.attrs( { type: 'checkbox' } )`
  cursor : pointer;
`

export const Button: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = props => <button {...props} className={btn1Styles.btn1}>{props.children}</button>

export const MyLink: React.FC<LinkProps> = props => <Link {...props} className={btn1Styles.btn1}>{props.children}</Link>

export const TextArea = styled.textarea`
  justify-self : stretch;
  height       : fit-content;
  font-size    : 1rem;
`
