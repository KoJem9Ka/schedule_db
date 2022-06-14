/* eslint-disable implicit-arrow-linebreak */
import React, { Fragment, useEffect, useState } from 'react'
import { api, TAPI_RESPONSE_Points, TAPI_RESPONSE_TupleNumberString } from '../../API/api'
import { Table, TableWrapper, Td, Th } from '../../components/ScheduleTable/ScheduleTable'
import styled from 'styled-components'
import MySelect from '../../components/MySelect'
import { toast } from 'react-toastify'
import { TOASTXT } from '../../toastMessages'

type TState = {
  specializations: TAPI_RESPONSE_TupleNumberString
  groups: TAPI_RESPONSE_TupleNumberString
  students: TAPI_RESPONSE_TupleNumberString
  points: TAPI_RESPONSE_Points
}

type TSelected = {
  specialization?: number
  group?: number
  student?: number
}

const PointsPage: React.FC = () => {
  const [ data, setData ] = useState<TState>( { specializations: [], groups: [], students: [], points: [] } )
  const [ selected, setSelected ] = useState<TSelected>()


  useEffect( () => {
    toast.dismiss()
    toast.promise( api.points.specializations(), TOASTXT.Specializations ).then( specializations => setData( { ...data, specializations } ) )
  }, [] )


  useEffect( () => {
    if (selected?.specialization)
      toast.promise( api.points.groups( selected.specialization ), TOASTXT.Groups ).then( groups => setData( state => ({ ...state, groups }) ) )
    else
      setData( state => ({ ...state, groups: [] }) )
    setSelected( state => ({ ...state, group: undefined }) )
  }, [ selected?.specialization ] )


  useEffect( () => {
    if (selected?.group)
      toast.promise( api.points.students( selected.group ), TOASTXT.Students ).then( students => setData( state => ({ ...state, students }) ) )
    else
      setData( state => ({ ...state, students: [] }) )
    setSelected( state => ({ ...state, student: undefined }) )
  }, [ selected?.group ] )


  useEffect( () => {
    if (selected?.student)
      toast.promise( api.points.points( selected.student ), TOASTXT.Points ).then( points => setData( state => ({ ...state, points }) ) )
    else
      setData( state => ({ ...state, points: [] }) )
  }, [ selected?.student ] )


  return (
    <Wrapper>
      <h1 style={{ textAlign: 'center' }}>Оценки студента</h1>
      <SelectorsDiv>
        <p>Специализация:</p>
        <MySelect value={selected?.specialization} values={data.specializations} onChange={specialization => setSelected( { ...selected, specialization } )}/>
        <p>Группа:</p>
        <MySelect value={selected?.group} values={data.groups} onChange={group => setSelected( { ...selected, group } )}/>
        <p>Студент:</p>
        <MySelect value={selected?.student} values={data.students} onChange={student => setSelected( { ...selected, student } )}/>
      </SelectorsDiv>
      <TableWrapper>
        <Table columnsCount={5}>
          {[ 'Предмет', 'Кол-во присутствий', 'Оценки', 'Сумма', 'Средний балл' ].map( head => <Th key={head}>{head}</Th> )}
          {data.points.map( row => (
            <Fragment key={row.subject}>
              <Td s={{ justifyContent: 'flex-start' }}>{row.subject}</Td>
              <Td>{row.attendances}</Td>
              <Td>{row.points}</Td>
              <Td>{row.sum}</Td>
              <Td>{row.avg}</Td>
            </Fragment>
          ) )}
        </Table>
      </TableWrapper>
    </Wrapper>
  )
}

export default PointsPage

const Wrapper = styled.div`
  display        : flex;
  flex-direction : column;
  align-items    : center;
  justify-items  : center;
  gap            : 3rem;
  flex-grow      : 1;
`

const SelectorsDiv = styled.div`
  display               : grid;
  grid-template-columns : max-content max-content;
  grid-gap              : 1rem 1rem;

  & > p {
    text-align : right;
  }
`
