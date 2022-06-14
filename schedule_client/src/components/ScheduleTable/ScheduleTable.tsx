import React from 'react'
import styled from 'styled-components'
import { caseType, TLesson } from '../../store/types'
import { AStyled, Button, Checkbox, MyLink } from '../styled/MyStyledComponents'
import { useLessons } from '../../store/lesson/hooks'
import PaginationTool from '../TableTools/PaginationTool'
import { ROUTE } from '../../routes'

const TableWrapper = styled.div`
  display        : flex;
  flex-direction : column;

  height         : 100%;
  font-size      : 0.85rem;

  border         : 1px solid var(--header-stroke);
  border-radius  : 1rem;

  background     : var(--header-bg);
  overflow       : hidden;
`

const Tools = styled.div`
  display         : flex;
  padding         : 1rem 4rem;
  align-items     : center;
  justify-content : flex-end;
  background      : var(--header-search-bg);
  //height          : 3rem;

  & > * + * {
    margin-left : .5rem;
  }

`

type GridTableProps = {
  columnsCount: number
}
const Table = styled.div<GridTableProps>`
  display               : grid;
  grid-template-columns : repeat(${props => props.columnsCount}, auto);
  //grid-gap              : 1rem;
  width                 : 100%;
  overflow              : auto;
  flex                  : 0 1 auto;
`

const Th = styled.div`
  position        : sticky;
  top             : 0;
  padding         : .5rem;
  text-align      : center;
  border-top      : 2px solid var(--header-stroke);
  border-bottom   : 2px solid var(--header-stroke);
  border-left     : 2px dashed var(--header-stroke);
  display         : flex;
  align-items     : center;
  justify-content : center;
  background      : var(--header-bg);
`

type TdProps = {
  s?: object
}

const Td = styled.div.attrs<TdProps>( props => ({ style: props.s }) )<TdProps>`
  padding         : .5rem;
  display         : flex;
  align-items     : center;
  justify-content : center;
  border-bottom   : 1px dashed var(--header-stroke);
  border-left     : 1px dashed var(--header-stroke);
`

type ScheduleTableProps = {
  list: TLesson[]
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ list }) => {
  const {
    setLessonChecked,
    checkedLessons,
    removeLessons,
    page,
    limit,
    loadLessons,
    serverItemsCount,
    clearLessonsChecked,
  } = useLessons()

  const regex = /(?<=\/\/).*?(?=\/)/
  const extractDomain = (url = '') => {
    const rez = regex.exec( url )
    return rez ? rez[0] : 'Ссылка'
  }

  return (
    <TableWrapper>
      <Tools>
        <MyLink to={ROUTE.newLesson}>Добавить</MyLink>
        <PaginationTool
          itemsCount={serverItemsCount}
          limit={limit}
          page={page}
          setPage={loadLessons}
        />
        {checkedLessons.length !== 0 && <>
          <Button onClick={removeLessons}>Удалить</Button>
          <Button onClick={clearLessonsChecked}>Отмена</Button>
        </>}
      </Tools>
      <Table columnsCount={colsKeys.length}>
        {colsKeys.map( key => <Th key={cols[key].title}>{cols[key].title}</Th> )}
        {list.map( (row, i) => (
          <React.Fragment key={row.id}>
            <Td s={cols['number'].s}>
              {/*№:&nbsp;*/}
              {((page - 1) * limit) + i + 1}
              {/*<br/>*/}
              {/*id:&nbsp;*/}
              {/*{row.id}*/}
              <Checkbox
                checked={checkedLessons.findIndex( id => id === row.id ) !== -1}
                onChange={e => setLessonChecked( row.id, e.currentTarget.checked )}
                onClick={e => e.stopPropagation()}
              />
              <MyLink to={`/lesson/${row.id}`}>Ред.</MyLink>
            </Td>
            <Td s={cols['type'].s}>{caseType[row.type]}</Td>
            <Td s={cols['group'].s}>{row.groups.map( group => group.name ).join( ', ' )}</Td>
            <Td s={cols['educator'].s}>{row.educator}</Td>
            <Td s={cols['subject'].s}>{row.subject}</Td>
            <Td s={cols['place'].s}>{row.cabinet || <AStyled href={row.url} target='_blank'>{extractDomain( row.url )}</AStyled>}</Td>
            <Td s={cols['date'].s}>{row.date}</Td>
            <Td s={cols['time'].s}>{`${row.time_start.slice( 0, 5 )}-${row.time_end.slice( 0, 5 )}`}</Td>
            <Td s={cols['homework'].s}>{row.home_work}</Td>
            <Td s={cols['commentary'].s}>{row.commentary}</Td>
          </React.Fragment>
        ) )}
      </Table>
    </TableWrapper>
  )
}

export default ScheduleTable

const cols = {
  // check: {
  //   title: '',
  // },
  number    : {
    title: '№', s: { textAlign: 'center', gap: '.5rem' },
  },
  type      : {
    title: 'Тип', s: { textAlign: 'center' },
  },
  group     : {
    title: 'Группа', s: { maxWidth: '15rem', width: 'min-content' },
  },
  educator  : {
    title: 'Преподаватель', s: {},
  },
  subject   : {
    title: 'Предмет', s: {},
  },
  place     : {
    title: 'Место', s: { textAlign: 'center' },
  },
  date      : {
    title: 'День', s: { textAlign: 'center' },
  },
  time      : {
    title: 'Время', s: { textAlign: 'center' },
  },
  homework  : {
    title: 'ДЗ', s: { textIndent: '1.5rem' },
  },
  commentary: {
    title: 'Комментарий', s: { textIndent: '1.5rem' },
  },
}

const colsKeys = Object.keys( cols ) as (keyof typeof cols & string)[]
