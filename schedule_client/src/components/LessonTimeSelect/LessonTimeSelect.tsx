import React from 'react'

// 2020-12-17 15:20:00.000000
// 2020-12-17 16:50:00.000000

export const lessonTimes = [
  [ '08:30:00', '10:00:00' ],
  [ '10:10:00', '11:40:00' ],
  [ '11:50:00', '13:20:00' ],
  [ '13:40:00', '15:10:00' ],
  [ '15:20:00', '16:50:00' ],
  [ '17:00:00', '18:30:00' ]
] as const

type LessonTimeSelectProps = {
  pickedTimeStart: string
  setTime: (index: number)=> void
}

const LessonTimeSelect: React.FC<LessonTimeSelectProps> = ({ pickedTimeStart, setTime }) => {
  const pickedIndex = lessonTimes.findIndex( ([ start ]) => start === pickedTimeStart )
  return (
    <select value={pickedIndex} onChange={e => setTime( +e.currentTarget.value )}>
      {lessonTimes.map( ([ start, end ], i) => <option key={i} value={i}>{`${start.slice( 0, 5 )}-${end.slice( 0, 5 )}`}</option> )}
    </select>
  )
}

export default LessonTimeSelect
