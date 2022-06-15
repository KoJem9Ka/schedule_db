import db_client from "../db";
import { TObjectForTuple, tupleMiddleware } from "../types/types";

const pointsService = {
  selectSpecializations: async () => {
    const specializations = (await db_client.query<TObjectForTuple>( `select spc.id as id, concat(spc.short_name, ': ', spc.name) as name
                                                                      from specialization spc
                                                                      order by spc.short_name` )).rows
    return tupleMiddleware( specializations )
  },


  selectGroupsBySpecializationId: async (id: number) => {
    const groups = (await db_client.query<TObjectForTuple>( `select gr.id as id, concat(spc.short_name, '-', gr.cource, gr.number) as name
                                                             from "group" gr
                                                                      join specialization spc on spc.id = gr.id_specialization
                                                             where gr.id_specialization = $1
                                                             order by spc.short_name, gr.cource, gr.number`, [ id ] )).rows
    return tupleMiddleware( groups )
  },


  selectGroupStudents: async (id: number) => {
    const students = (await db_client.query<TObjectForTuple>( `select st.id as id, concat_ws(' ', st.last_name, st.first_name, st.patronymic) as name
                                                               from student st
                                                                        left join students_to_subgroups sts on st.id = sts.id_student
                                                                        join subgroup subgr on subgr.id = sts.id_subgroup and subgr.name = 'FULL'
                                                               where subgr.id_group = $1`, [ id ] )).rows
    return tupleMiddleware( students )
  },


  selectPointsByStudentId: async (id: number) => (await db_client.query<{
    subject: string
    attendances: number
    points: string
    sum: number
    avg: number
  }>( `select sbj.name                           as subject,
              count(*)::integer                  as attendances,
              string_agg(att.points::text, ', ') as points,
              sum(att.points)::float             as sum,
              avg(att.points)::float             as avg
       from attendance att
                join lesson ls on ls.id = att.id_lesson
                join subject sbj on sbj.id = ls.id_subject
       WHERE att.id_student = $1
         and att.points is not null
       group by sbj.name
       order by sbj.name`, [ id ] )).rows
}

export default pointsService





