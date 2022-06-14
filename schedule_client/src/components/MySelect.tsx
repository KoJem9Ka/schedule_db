import React from 'react'

type MySelectProps = {
  value?: number
  onChange: (num: number) => void
  values: any[]
}

const MySelect: React.FC<MySelectProps> = ({ value, onChange, values }) => (
  <select value={value || 0} onChange={e => onChange( +e.currentTarget.value )}>
    {values.length > 0
      ? <option value={0}>Выбор:</option>
      : <option value={0}>Пусто</option>}
    {values.map( ([ id, name ]) => <option key={id} value={id}>{name}</option> )}
  </select>
)

export default MySelect
