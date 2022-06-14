export type TLessonRaw = {
  id: number
  type: 'lab' | 'practice' | 'lecture' | 'seminar'
  groups?: string
  groups_ids?: string
  educator: string
  id_educator: number
  subject: string
  id_subject: number
  cabinet?: string
  id_cabinet?: number
  date: string
  time_start: string
  time_end: string
  url?: string
  home_work?: string
  commentary?: string
}

export type TLessonFinal = Omit<TLessonRaw, 'groups' | 'groups_ids'> & {
  groups: {
    id: number
    name: string
  }[]
}

export const lessonsMiddleware = (lessons: TLessonRaw[]): TLessonFinal[] => lessons.map( lesson => {
  const ids = Array.from( new Set( lesson.groups_ids?.split( ',' ).map( id => +id ) ) )
  const names = Array.from( new Set( lesson.groups?.split( ', ' ) ) )

  const groups: TLessonFinal['groups'] = []
  for (let i = 0; i < ids.length; ++i) groups.push( { id: ids[i], name: names[i] } )

  return {
    ...lesson,
    groups_ids: undefined,
    groups    : groups,
  }
} )

export type TDBLesson = {
  id: number
  type: 'lab' | 'practice' | 'lecture' | 'seminar'
  id_educator: number
  id_subject: number
  id_cabinet?: number
  datetime_start: Date
  datetime_end: Date
  distant_url?: string
  home_work?: string
  commentary?: string
}
