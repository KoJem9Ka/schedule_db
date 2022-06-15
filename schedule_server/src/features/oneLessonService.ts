import db_client from "../db";
import { TCabinet, TObjectForTuple, TSubject, tupleMiddleware, TupleNumStr } from "../types/types";


type TSelectSubjectAvailabilities = {
  groups: TupleNumStr[]
  educators: TupleNumStr[]
}

type TSubjectRequirements = {
  subjects: TSubject[]
  cabinets: TCabinet[]
}

const oneLessonService = {
  selectSubjectAvailabilities: async (id_subject: number): Promise<TSelectSubjectAvailabilities> => {
    const sqlGroups = `SELECT *
                       FROM subject_available_groups($1)`
    const sqlEducators = `select *
                          from subject_available_educators($1)`
    const values = [ id_subject ]

    const groups = (await db_client.query<TObjectForTuple>( sqlGroups, values )).rows
    const educators = (await db_client.query<TObjectForTuple>( sqlEducators, values )).rows

    return {
      groups   : tupleMiddleware( groups ),
      educators: tupleMiddleware( educators )
    }
  },


  selectSubjectsAndCabinets: async (): Promise<TSubjectRequirements> => {
    const sqlSubjects = `select sbj.id       as id,
                                sbj.name     as name,
                                sbj.course   as course,
                                sbj.semester as semester,
                                fac.name     as faculty,
                                spc.name     as specialization
                         from subject sbj
                                  join specialization spc on spc.id = sbj.id_specialization
                                  JOIN faculty fac on fac.id = spc.id_faculty`

    const sqlCabinets = `select cab.id     as id_cabinet,
                                bld.name   as building,
                                cab.floor  as floor,
                                cab.number as number,
                                cab.suffix as suffix
--                                 CONCAT(bld.name, '-', cab.floor, LPAD(cab.number::TEXT, 2, '0'::TEXT), cab.suffix) cabinet
                         from cabinet cab
                                  JOIN building bld on bld.id = cab.id_building
                         ORDER by id_cabinet`

    const subjects = (await db_client.query<TSubject>( sqlSubjects )).rows
    const cabinets = (await db_client.query<TCabinet>( sqlCabinets )).rows

    return { subjects, cabinets }
  }
}

export default oneLessonService
