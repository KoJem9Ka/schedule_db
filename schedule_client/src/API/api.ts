import axios from 'axios'
import { TDBLesson, TLesson } from '../store/types'
import { TCabinet, TSubject } from '../types'

const BASE_URL = 'http://localhost:3001'

//lessons
export type TAPI_RESPONSE_LoadAll = {
  count: number
  lessons: TLesson[]
}

type TAPI_RESPONSE_LoadOne = TLesson

type TAPI_RESPONSE_AddOne = {
  success: boolean
  error?: string
  newId?: number
}

export type TAPI_ARGS_RewriteOne = {
  lesson: TDBLesson
  groupsIds: number[]
}
type TAPI_RESPONSE_RewriteOne = {
  success: boolean
  error?: string
}

type TAPI_RESPONSE_RemoveSome = {
  success: boolean
  error?: string
  deletedIds?: number[]
}
//oneLesson
export type TAPI_RESPONSE_SubjectAvailabilities = {
  groups: [ number, string ][]
  educators: [ number, string ][]
}

export type TAPI_RESPONSE_Requirements = {
  subjects: TSubject[]
  cabinets: TCabinet[]
}
//points
export type TAPI_RESPONSE_TupleNumberString = [ number, string ][]
export type TAPI_RESPONSE_Points = {
  subject: string
  attendances: number
  points: string
  sum: number
  avg: number
}[]


export const api = {
  lessons  : {
    loadAll   : async (page: number, limit: number) => await axios.get<TAPI_RESPONSE_LoadAll>( `${BASE_URL}/schedule?page=${page}&limit=${limit}` ),
    loadOne   : async (id: number) => await axios.get<TAPI_RESPONSE_LoadOne>( `${BASE_URL}/schedule/${id}` ),
    addOne    : async (body: TAPI_ARGS_RewriteOne) => await axios.post<TAPI_RESPONSE_AddOne>( `${BASE_URL}/schedule`, body ),
    rewriteOne: async (body: TAPI_ARGS_RewriteOne) => await axios.put<TAPI_RESPONSE_RewriteOne>( `${BASE_URL}/schedule`, body ),
    removeSome: async (ids: number[]) => await axios.delete<TAPI_RESPONSE_RemoveSome>( `${BASE_URL}/schedule`, { data: ids } ),
  },
  oneLesson: {
    subjectAvailabilities: async (id_subject: number) => await axios.get<TAPI_RESPONSE_SubjectAvailabilities>( `${BASE_URL}/lesson/subject_availabilities/${id_subject}` ),
    requirements         : async () => await axios.get<TAPI_RESPONSE_Requirements>( `${BASE_URL}/lesson/requirements` ),
  },
  points   : {
    specializations: async () => (await axios.get<TAPI_RESPONSE_TupleNumberString>( `${BASE_URL}/points/specializations` )).data,
    groups         : async (specialization_id: number) => (await axios.get<TAPI_RESPONSE_TupleNumberString>( `${BASE_URL}/points/groups/${specialization_id}` )).data,
    students       : async (group_id: number) => (await axios.get<TAPI_RESPONSE_TupleNumberString>( `${BASE_URL}/points/students/${group_id}` )).data,
    points         : async (student_id: number) => (await axios.get<TAPI_RESPONSE_Points>( `${BASE_URL}/points/${student_id}` )).data,
  },
}

export type TApi = typeof api
//Promise<AxiosResponse<TAPI_RESPONSE_LoadAll>>
