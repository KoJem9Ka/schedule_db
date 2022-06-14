import { Router } from "express";
import pointsController from "./pointsController";

const router = Router()

router.get( '/specializations', pointsController.loadSpecializations )
router.get( '/groups/:specialization_id', pointsController.loadGroups )
router.get( '/students/:group_id', pointsController.loadStudents )
router.get( '/:student_id', pointsController.loadPoints )

export default router
