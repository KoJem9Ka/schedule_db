import React from 'react'
import styles from './LayoutMain.module.scss'
import Header from '../components/header/Header'
import { Outlet } from 'react-router'
import Container from '../HOC/Container'

const LayoutMain: React.FC = () => (
  <div className={styles.LayoutMain}>
    <Header/>
    <Container>
      <Outlet/>
    </Container>
  </div>
)

export default LayoutMain
