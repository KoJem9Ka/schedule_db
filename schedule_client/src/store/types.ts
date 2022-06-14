export type TError = null | string
export type TStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected'

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

export type TLesson = Omit<TLessonRaw, 'groups' | 'groups_ids'> & {
  groups: {
    id: number
    name: string
  }[]
}


export type TDBLesson = {
  id: number
  type: 'lab' | 'practice' | 'lecture' | 'seminar'
  id_educator: number
  id_subject: number
  id_cabinet?: number
  datetime_start: string
  datetime_end: string
  distant_url?: string
  home_work?: string
  commentary?: string
}


export const caseType = {
  lab     : 'Лабораторная',
  lecture : 'Лекция',
  practice: 'Практика',
  seminar : 'Семинар',
} as Record<TLesson['type'], string>
