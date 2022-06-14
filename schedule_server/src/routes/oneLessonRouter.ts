import { Router } from "express";
import oneLessonController from "../features/oneLesson/controller";

const router = Router()

router.get( '/subject_availabilities/:id', oneLessonController.loadSubjectAvailabilities )
// router.post( '/groups_subgroups', oneLessonController.loadGroupsAvailableSubgroups )
router.get( '/requirements', oneLessonController.loadSubjectsAndCabinets )

export default router
