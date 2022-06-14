import React, { useEffect, useState } from 'react'
import { TCabinet } from '../../types'
import styled from 'styled-components'

type CabinetSelectorProps = {
  cabinets?: TCabinet[]
  id_picked?: number
  pickId: (id: number)=> void
}

type TCabStruct = Record<string, Record<number, [ number, string ][]>>

type TSelection = {
  building: string
  floor: number
}

const CabinetSelector: React.FC<CabinetSelectorProps> = ({ cabinets, id_picked, pickId }) => {
  const [ struct, setStruct ] = useState<TCabStruct>( {} )
  const [ selection, setSelection ] = useState<TSelection>()

  useEffect( () => {
    if (!cabinets) return
    const newStruct: TCabStruct = {}
    cabinets.forEach( cab => {
      !newStruct[cab.building] && (newStruct[cab.building] = {})
      !newStruct[cab.building][cab.floor] && (newStruct[cab.building][cab.floor] = [])
      newStruct[cab.building][cab.floor].push( [
        cab.id_cabinet,
        `${cab.floor}${String( cab.number ).padStart( 2, '0' )}${cab.suffix || ''}`
      ] )
    } )
    setStruct( newStruct )
  }, [ cabinets ] )

  useEffect( () => {
    if (!id_picked || !cabinets || !cabinets.length) return
    const { building, floor } = cabinets.find( cb => cb.id_cabinet === id_picked )!
    setSelection( { building, floor } )
  }, [ cabinets, id_picked ] )

  const preSetSelection = ({ building, floor }: Partial<TSelection>) => {
    if (!selection) return
    building ??= selection.building
    floor ??= 1
    setSelection( { building, floor } )
    const [ id ] = struct[selection.building][floor][0]
    pickId( id )
  }

  return (
    <>
      {selection &&
        <OneLine>
          Корпус:&nbsp;
          <select value={selection.building} onChange={e => preSetSelection( { building: e.currentTarget.value } )}>
            {Object.keys( struct ).map( bld => <option key={bld} value={bld}>{bld}</option> )}
          </select>
          &nbsp;Этаж:&nbsp;
          <select value={selection.floor} onChange={e => preSetSelection( { floor: +e.currentTarget.value } )}>
            {Object.keys( struct[selection.building] ).map( flr => <option key={flr} value={flr}>{flr}</option> )}
          </select>
          &nbsp;Кабинет:&nbsp;
          <select value={id_picked} onChange={e => pickId( +e.currentTarget.value )}>
            {struct[selection.building][selection.floor].map( ([ id, cab ]) => <option key={id} value={id}>{cab}</option> )}
          </select>
        </OneLine>
      }
    </>
  )
}

export default CabinetSelector

const OneLine = styled.div`
  display : flex;
  gap     : 0;
`
