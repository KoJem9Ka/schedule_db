/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react'
import styles from './SchedulePage.module.scss'
import { useLessons } from '../../store/lesson/hooks'
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable'

//TODO: доделать пагинацию
const SchedulePage: React.FC = () => {
  const { list, loadLessons } = useLessons()

  useEffect( () => {
    loadLessons()
  }, [] )

  return (
    <div className={styles.SchedulePage}>
      <ScheduleTable list={list}/>
    </div>
  )
}

export default SchedulePage


//      <p>list: {list.length}</p>
//       <p>error: {error}</p>
//       <p>status: {status}</p>
//       <textarea
//         value={JSON.stringify( json )}
//         style={{
//           width : '100%',
//           height: '10rem',
//         }}
//         onChange={e => setJson( JSON.parse( e.currentTarget.value ) )}
//       />
//       <button onClick={addHandler}>Добавить</button>
//       <button onClick={putHandler}>Обновить</button>
