import { Request, Response } from "express";
import pointsService from "./pointsService";

const pointsController = {
  loadSpecializations: async (req: Request, res: Response) => res.send( await pointsService.selectSpecializations() ),
  loadGroups         : async (req: Request, res: Response) => res.send( await pointsService.selectGroupsBySpecializationId( +req.params.specialization_id ) ),
  loadStudents       : async (req: Request, res: Response) => res.send( await pointsService.selectGroupStudents( +req.params.group_id ) ),
  loadPoints         : async (req: Request, res: Response) => res.send( await pointsService.selectPointsByStudentId( +req.params.student_id ) )
}

export default pointsController
