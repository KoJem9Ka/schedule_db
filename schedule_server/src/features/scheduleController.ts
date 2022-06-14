import { Request, Response } from "express";
import scheduleService from "./scheduleService";
import { TDBLesson } from "../types";

const scheduleController = {
  loadAll: async (req: Request, res: Response) => {
    const page = req.query.page && +req.query.page || 1
    const limit = req.query.limit && +req.query.limit || 10

    const answer = await scheduleService.selectAllPaginated( page, limit )
    return res.send( answer )
  },


  loadOne: async (req: Request, res: Response) => {
    const id = +req.params.id
    const row = await scheduleService.selectOneLesson( id )
    return res.send( row )
  },


  addOne: async (req: Request, res: Response) => {
    let error
    const new_id = await scheduleService.insertOrUpdateOne( req.body, 'add' ).catch( e => void (error = e.message) )
    return res.json( {
      success: typeof new_id !== 'undefined',
      new_id,
      error,
    } )
  },


  rewriteOne: async (req: Request, res: Response) => {
    let error
    const updated_id = await scheduleService.insertOrUpdateOne( req.body, 'update' ).catch( (e) => void (error = e.message) )
    return res.json( {
      success: typeof updated_id !== 'undefined',
      updated_id,
      error,
    } )
  },


  removeSome: async (req: Request, res: Response) => {
    const ids = req.body as number[]
    let error
    const rows = await scheduleService.deleteSome( ids ).catch( e => void (error = e.message) )
    return res.json( {
      success   : (rows?.length ?? 0) > 0,
      deletedIds: rows?.map( row => row.id ),
      error,
    } )
  }
} /*as { [key: string]: RequestHandler }*/


export default scheduleController

export type TAddOrUpdateOneBody = {
  lesson: TDBLesson
  groupsIds: number[]
}
