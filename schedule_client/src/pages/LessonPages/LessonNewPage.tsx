import React, { useEffect, useState } from 'react'
import { caseType, TLesson } from '../../store/types'
import { api, TAPI_ARGS_RewriteOne, TAPI_RESPONSE_Requirements, TAPI_RESPONSE_SubjectAvailabilities } from '../../API/api'
import { LessonPageGroupsContainer, LessonPageHeader, LessonPageTable, LessonPageTableRight, LessonPageWrapper } from './LessonEditPage'
import { Button, Checkbox, TextArea } from '../../components/styled/MyStyledComponents'
import LessonTimeSelect, { lessonTimes } from '../../components/LessonTimeSelect/LessonTimeSelect'
import CabinetSelector from './CabinetSelector'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ToastAddLesson, ToastAvailabilities, ToastAvRq } from './subQueries'

const LessonNewPage: React.FC = () => {
  const navigate = useNavigate()

  const [ lesson, setLesson ] = useState<TLesson>()
  const [ requirements, setRequirements ] = useState<TAPI_RESPONSE_Requirements>( { subjects: [], cabinets: [] } )
  const [ availabilities, setAvailabilities ] = useState<TAPI_RESPONSE_SubjectAvailabilities>( { groups: [], educators: [] } )
  const [ isOffline, setIsOffline ] = useState<boolean>( true )

  useEffect( () => {
    const p12 = Promise.all( [
      api.oneLesson.requirements(),
      api.oneLesson.subjectAvailabilities( 1 )
    ] ).then( ([ _requirements, _availabilities ]) => {
      setRequirements( _requirements.data )
      setAvailabilities( _availabilities.data )
      setLesson( {
        id         : 0,
        type       : 'lab',
        subject    : _requirements.data.subjects[0].name,
        id_subject : _requirements.data.subjects[0].id,
        educator   : _availabilities.data.educators[0][1],
        id_educator: _availabilities.data.educators[0][0],
        groups     : [],
        cabinet    : '',
        id_cabinet : _requirements.data.cabinets[0].id_cabinet,
        date       : '2022-01-01',
        time_start : '08:30',
        time_end   : '10:00',
      } )
    } )
    toast.promise( p12, ToastAvRq )
  }, [] )
  useEffect( () => {
    if (!lesson) return
    const prom = api.oneLesson.subjectAvailabilities( lesson.id_subject ).then( ({ data }) => setAvailabilities( data ) )
    toast.promise( prom, ToastAvailabilities )
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

    toast.promise( api.lessons.rewriteOne( reqBody ), ToastAddLesson )
  }

  return (
    <LessonPageWrapper>
      <LessonPageHeader>
        <h1>Добавление занятия</h1>
        <Button onClick={commitChanges}>Добавить</Button>
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
                >
                  {group.name}
                </Button>
              ) ) : <p style={{ color: 'red' }}>Пусто</p>}
            </LessonPageGroupsContainer>
          </LessonPageTableRight>

          <p>Место проведения:</p>
          <LessonPageTableRight>
            <label>
              Очно
              <Checkbox checked={isOffline} onChange={e => setIsOffline( e.currentTarget.checked )}/>
            </label>
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

export default LessonNewPage
