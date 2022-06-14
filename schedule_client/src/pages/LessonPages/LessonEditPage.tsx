/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { caseType, TLesson } from '../../store/types'
import { toast } from 'react-toastify'
import { api, TAPI_ARGS_RewriteOne, TAPI_RESPONSE_Requirements, TAPI_RESPONSE_SubjectAvailabilities } from '../../API/api'
import { Button, Checkbox, TextArea } from '../../components/styled/MyStyledComponents'
import styled from 'styled-components'
import CabinetSelector from './CabinetSelector'
import LessonTimeSelect, { lessonTimes } from '../../components/LessonTimeSelect/LessonTimeSelect'
import { ROUTE } from '../../routes'
import { ToastAvailabilities, ToastLoadLesson, ToastRemoveOneLesson, ToastRequirements, ToastUpdateLesson } from './subQueries'

const LessonEditPage: React.FC = () => {
  const navigate = useNavigate()
  const lessonId = +(useParams<{ id: string }>().id ?? 0)

  const [ lesson, setLesson ] = useState<TLesson>()
  const [ requirements, setRequirements ] = useState<TAPI_RESPONSE_Requirements>( { subjects: [], cabinets: [] } )
  const [ availabilities, setAvailabilities ] = useState<TAPI_RESPONSE_SubjectAvailabilities>( { groups: [], educators: [] } )
  const [ isOffline, setIsOffline ] = useState<boolean>( false )
  const [ dateTime, setDateTime ] = useState<Date>()
  const [ lessonOriginal, setLessonOriginal ] = useState<TLesson>()

  useEffect( () => {
    if (!lesson) {
      const p1 = api.lessons.loadOne( lessonId ).then( ({ data }) => {
        setLessonOriginal( data )
        setLesson( data )
        setIsOffline( !!data.id_cabinet )
      } )
      const p2 = api.oneLesson.requirements().then( ({ data }) => setRequirements( data ) )

      toast.promise( p1, ToastLoadLesson )
      toast.promise( p2, ToastRequirements )
    }
  }, [] )
  useEffect( () => {
    if (!lesson) return
    const p1 = api.oneLesson.subjectAvailabilities( lesson.id_subject ).then( ({ data }) => setAvailabilities( data ) )
    toast.promise( p1, ToastAvailabilities )
  }, [ lesson?.subject ] )


  const addGroup = (id: number) => {
    if (!lesson) return
    if (lesson.groups.findIndex( group => group.id === id ) !== -1) return

    const [ , name ] = availabilities.groups.find( ([ id_group ]) => id_group === id )!

    setLesson( {
      ...lesson,
      groups: [ ...lesson.groups, { id, name } ]
          .sort( (a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1) ),
    } )
  }
  const delGroup = (idGroup: number) => {
    if (!lesson) return

    setLesson( {
      ...lesson,
      groups: lesson.groups.filter( group => group.id !== idGroup ),
    } )
  }
  const setSubject = (idSubject: number) => {
    if (!lesson) return
    setLesson( {
      ...lesson,
      id_subject: idSubject,
      subject   : requirements.subjects.find( sbj => sbj.id === idSubject )!.name,
    } )
  }
  const setEducator = (id_educator: number) => {
    if (!lesson) return
    const [ , educator ] = availabilities.educators.find( ([ id ]) => id === id_educator )!
    setLesson( { ...lesson, id_educator, educator } )
  }
  const setUrl = (url: string) => void (lesson && setLesson( { ...lesson, url } ))
  const setCabinet = (id_cabinet: number) => void (lesson && setLesson( { ...lesson, id_cabinet } ))
  const setDate = (date: string) => void (lesson && setLesson( { ...lesson, date: date } ))
  const setTime = (index: number) => {
    const [ start, end ] = lessonTimes[index]
    lesson && setLesson( {
      ...lesson,
      time_start: start,
      time_end  : end,
    } )
  }

  const commitChanges = () => {
    if (!lesson) return

    const reqBody: TAPI_ARGS_RewriteOne = {
      lesson   : {
        id            : lesson.id,
        type          : lesson.type,
        id_subject    : lesson.id_subject,
        id_educator   : lesson.id_educator,
        id_cabinet    : isOffline ? lesson.id_cabinet : undefined,
        datetime_start: `${lesson.date} ${lesson.time_start}.000000`,
        datetime_end  : `${lesson.date} ${lesson.time_end}.000000`,
        distant_url   : isOffline ? undefined : lesson.url,
        home_work     : lesson.home_work,
        commentary    : lesson.commentary,
      },
      groupsIds: lesson.groups.map( gr => gr.id ),
    }

    toast.promise( api.lessons.rewriteOne( reqBody ), ToastUpdateLesson )
    setLessonOriginal( lesson )
  }
  const deleteHandler = () => {
    if (!lesson) return
    const ans = confirm( 'Вы действительно хотите удалить занятие?' )
    if (ans) {
      const prom = api.lessons.removeSome( [ lesson.id ] ).then( () => void navigate( ROUTE.home ) )
      toast.promise( prom, ToastRemoveOneLesson )
    }
  }


  return (
    <LessonPageWrapper>
      <LessonPageHeader>
        <h1>Редактирование занятия</h1>
        <Button disabled={JSON.stringify( lesson ) === JSON.stringify( lessonOriginal )} onClick={commitChanges}>Сохранить</Button>
        <Button onClick={deleteHandler}>Удалить</Button>
        <Button onClick={() => navigate( -1 )}>Назад</Button>
      </LessonPageHeader>
      {lesson
        ? <LessonPageTable>
          <p>Предмет:</p>
          <select
            defaultValue={lesson.id_subject}
            value={lesson.id_subject}
            onChange={e => setSubject( +e.currentTarget.value )}
          >
            {requirements.subjects.map( sbj => <option key={sbj.id} value={sbj.id}>{`${sbj.faculty}: ${sbj.name}, ${sbj.course} курс, ${sbj.semester} сем.`}</option> )}
          </select>


          <p>Тип:</p>
          <select value={lesson.type} onChange={e => setLesson( { ...lesson, type: e.currentTarget.value as TLesson['type'] } )}>
            {Object.entries( caseType ).map( ([ key, name ]) => <option key={key} value={key}>{name}</option> )}
          </select>


          <p>Преподаватель:</p>
          <select value={lesson.id_educator} onChange={e => setEducator( +e.currentTarget.value )}>
            {availabilities.educators.map( ([ id_educator, educator ]) => <option key={id_educator} value={id_educator}>{educator}</option> )}
          </select>


          <p>Группы:</p>
          <LessonPageTableRight>
            <select value='add' onChange={e => addGroup( +e.currentTarget.value )}>
              <option value='add'>Добавить группу</option>
              {availabilities.groups.filter( ([ id ]) => lesson.groups.findIndex( gr => gr.id === id ) === -1 ).map( ([ id, group ]) => <option key={id} value={id}>{group}</option>
              )}
            </select>
            <LessonPageGroupsContainer>
              {lesson.groups.length ? lesson.groups.map( group => (
                <Button
                  key={group.id}
                  onClick={() => delGroup( group.id )}
                >{group.name}</Button>
              ) ) : <p style={{ color: 'red' }}>Пусто</p>}
            </LessonPageGroupsContainer>
          </LessonPageTableRight>

          <p>Место проведения:</p>
          <LessonPageTableRight>
            <label>Очно <Checkbox checked={isOffline} onChange={e => setIsOffline( e.currentTarget.checked )}/></label>
            {isOffline
              ? <CabinetSelector cabinets={requirements.cabinets} id_picked={lesson.id_cabinet} pickId={setCabinet}/>
              : <input
                style={{ width: '40rem' }}
                type='text'
                value={lesson.url}
                onChange={e => setUrl( e.currentTarget.value )}
              />}
          </LessonPageTableRight>


          <p>Дата и время:</p>
          <LessonPageTableRight>
            <p>Дата</p>
            <input type='date' value={lesson.date} onChange={e => setDate( e.currentTarget.value )}/>
            <p>Время</p>
            <LessonTimeSelect pickedTimeStart={lesson.time_start} setTime={setTime}/>
          </LessonPageTableRight>


          <p>Домашнее задание:</p>
          <TextArea value={lesson.home_work} onChange={e => setLesson( { ...lesson, home_work: e.currentTarget.value } )}/>


          <p>Комментарий:</p>
          <TextArea value={lesson.commentary} onChange={e => setLesson( { ...lesson, commentary: e.currentTarget.value } )}/>


        </LessonPageTable>
        : <h2>Загрузка</h2>}
    </LessonPageWrapper>
  )
}

export default LessonEditPage


export const LessonPageWrapper = styled.div`
  display        : flex;
  //align-items    : center;
  flex-direction : column;
  gap            : 1rem;

  label {
    cursor      : pointer;
    user-select : none;
    color       : var(--text-heads);
  }

  select {
    cursor : pointer;
  }
`

export const LessonPageTable = styled.div`
  display               : grid;
  grid-template-columns : min-content auto;
  grid-gap              : 1rem;
  align-items           : center;

  & > *:nth-child(2n+1) {
    text-align  : right;
    white-space : nowrap;
  }

  & > *:nth-child(2n+2):not(textarea) {
    justify-self : start;
  }
`

export const LessonPageTableRight = styled.div`
  display     : flex;
  align-items : center;
  gap         : 1rem;
`

export const LessonPageGroupsContainer = styled.div`
  display       : flex;
  padding       : .5rem;
  border        : 1px solid var(--bg-0-stroke);
  border-radius : .5rem;
  gap           : .5rem;
  flex-wrap     : wrap;
`

export const LessonPageHeader = styled.div`
  display     : flex;
  align-items : center;
  gap         : 1rem;
`
