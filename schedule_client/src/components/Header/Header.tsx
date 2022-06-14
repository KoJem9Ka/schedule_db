import React from 'react'
import styles from './Header.module.scss'
import MyNavLink from '../styled/MyNavLink'
import { Link } from 'react-router-dom'
import { ROUTE } from '../../routes'

const Header: React.FC = () => (
  <div className={styles.Header}>
    <Link className={styles.logo} to={ROUTE.home}>ScheduleBook</Link>
    <ul>
      <MyNavLink to={ROUTE.home}>Расписание</MyNavLink>
      <MyNavLink to={ROUTE.points}>Оценки</MyNavLink>
    </ul>
  </div>
)

export default Header
