import React, { useRef, useState } from 'react'
import styles from './PaginationTool.module.scss'

type PaginationToolProps = {
  page: number
  limit: number
  itemsCount: number
  setPage: (p: number, l: number)=> void
}

const PaginationTool: React.FC<PaginationToolProps> = ({ page, limit, itemsCount, setPage }) => {
  const getLastPage = (l = limit, c = itemsCount) => Math.ceil( c / l )
  const lastPage = getLastPage()
  const perPage = Array.from( new Set( [ 5, 10, 20, 50, 100, itemsCount ] ) )
  const [ pageBuffer, setPageBuffer ] = useState( page )
  const timerRef = useRef<any>()

  const pageThrottled = (p: number, l: number, throttle = true) => {
    clearInterval( timerRef.current )
    setPageBuffer( p )
    if (throttle) timerRef.current = setTimeout( () => setPage( p, l ), 500 )
    else setPage( p, l )
  }

  const limitHandler = (l: number) => {
    const pageCheck = Math.min( page, getLastPage( l ) )
    pageThrottled( pageCheck, l, false )
  }

  return (
    <div className={styles.PaginationTool}>
      Страница&nbsp;
      <input
        max={lastPage}
        min={1}
        type='number'
        value={pageBuffer}
        onChange={e => pageThrottled( +e.currentTarget.value, limit )}
      />
      &nbsp;из&nbsp;
      {lastPage}
      &nbsp;На странице:&nbsp;
      <select
        defaultValue={10}
        value={limit}
        onChange={e => limitHandler( +e.currentTarget.value )}
      >
        {perPage.map( num => <option key={num} value={num}>{num}</option> )}
      </select>
    </div>
  )
}

export default PaginationTool
