import React from 'react'
import styles from './Header.module.scss'
import MyNavLink from '../styled/MyNavLink'
import { Link } from 'react-router-dom'

const Header: React.FC = () => (
  <div className={styles.Header}>
    <Link className={styles.logo} to='/'>ScheduleBook</Link>
    <ul>
      <MyNavLink to='/schedule'>Расписание</MyNavLink>
      <MyNavLink to='/educators'>Преподаватели</MyNavLink>
      <MyNavLink to='/students'>Ученики</MyNavLink>
    </ul>
  </div>
)

export default Header
