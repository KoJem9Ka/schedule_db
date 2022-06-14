import db_client from "../../db";
import { lessonsMiddleware, TLessonRaw } from "./types";
import { TAddOrUpdateOneBody } from "./controller";
import { QueryConfig } from "pg";
import format from "pg-format";

const scheduleService = {
  selectAllPaginated: async (page: number, limit: number) => {
    const selectAll = `SELECT *
                       from loadlessons
                       offset ${(page - 1) * limit} limit ${limit}
    `

    const selectCount = `select count(*)
                         from lesson`

    const lessons = lessonsMiddleware( (await db_client.query<TLessonRaw>( selectAll )).rows )
    const count = +(await db_client.query<{ count: number }>( selectCount )).rows[0].count

    return {
      count,
      lessons
    }
  },


  selectOneLesson: async (id: number) => {
    const selectOne = `select *
                       from loadlessons
                       where id = ${id}`

    return lessonsMiddleware( (await db_client.query<TLessonRaw>( selectOne )).rows )[0]
  },


  deleteSome: async (ids: number[]) => {
    const deleteRow = `DELETE
                       FROM lesson
                       WHERE id in (${ids.join( ',' )})
                       returning id`
    return (await db_client.query<{ id: number }>( deleteRow )).rows
  },


  insertOrUpdateOne: async ({ groupsIds, lesson: { commentary, datetime_end, datetime_start, distant_url, home_work, id, id_cabinet, id_educator, id_subject, type } }: TAddOrUpdateOneBody, whatToDo: 'add' | 'update') => {
    let rezId: number

    if (whatToDo === 'update') {
      const QueryUpdateLesson: QueryConfig = {
        text  : `update lesson
                 set type           = $2,
                     id_educator    = $3,
                     id_subject     = $4,
                     id_cabinet     = $5,
                     datetime_start = $6,
                     datetime_end   = $7,
                     distant_url    = $8,
                     home_work      = $9,
                     commentary     = $10
                 WHERE id = $1
                 returning id`,
        values: [ id, type, id_educator, id_subject, id_cabinet, datetime_start, datetime_end, distant_url, home_work, commentary ]
      }
      const QueryDelSubgroups: QueryConfig = {
        text  : `delete
                 from subgroups_to_lessons
                 where id_lesson = $1;`,
        values: [ id ]
      }

      rezId = (await Promise.all( [
        db_client.query<{ id: number }>( QueryUpdateLesson ),
        db_client.query( QueryDelSubgroups ),
      ] ))[0].rows[0].id
    } else {
      const QueryInsertLesson: QueryConfig = {
        text  : `INSERT INTO lesson (type, id_educator, id_subject, id_cabinet, datetime_start, datetime_end, distant_url, home_work, commentary)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id`,
        values: [ type, id_educator, id_subject, id_cabinet, datetime_start, datetime_end, distant_url, home_work, commentary ]
      }
      rezId = (await db_client.query<{ id: number }>( QueryInsertLesson )).rows[0].id
    }

    const QuerySubgroupsIds: QueryConfig = {
      text  : `select sub.id as id
               from "group" gr
                        JOIN subgroup sub on sub.id_group = gr.id
               where gr.id = ANY ($1::int[])
                 and sub.name = 'FULL'`,
      values: [ groupsIds ]
    }
    const subgroupsIds = (await db_client.query<{ id: number }>( QuerySubgroupsIds )).rows.map( row => row.id )

    const groupsIdsValues = subgroupsIds.map( subgroupId => ([ rezId, subgroupId ] as const) )
    const QueryAddSubgroups: QueryConfig = {
      text: format( 'insert into subgroups_to_lessons (id_lesson, id_subgroup) VALUES %s', groupsIdsValues ),
    }
    await db_client.query( QueryAddSubgroups )

    return rezId
  }
}

export default scheduleService
