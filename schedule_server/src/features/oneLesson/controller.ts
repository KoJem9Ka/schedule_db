import { Request, Response } from "express";
import oneLessonService from "./service";

const oneLessonController = {
  loadSubjectAvailabilities: async (req: Request, res: Response) => {
    const id_subject: number = +req.params.id
    const answer = await oneLessonService.selectSubjectAvailabilities( id_subject )
    res.send( answer )
  },


  // loadGroupsAvailableSubgroups: async (req: Request, res: Response) => {
  //   const ids_groups = req.body as number[]
  //   try {
  //     const answer = await oneLessonService.selectGroupsAvailableSubgroups( ids_groups )
  //     res.send( answer )
  //   } catch (e) {
  //     console.error( e )
  //     res.sendStatus( 400 )
  //   }
  // },


  loadSubjectsAndCabinets: async (req: Request, res: Response) => {
    const answer = await oneLessonService.selectSubjectsAndCabinets()
    res.send( answer )
  },
}

export default oneLessonController
