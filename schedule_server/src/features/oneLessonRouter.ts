import { Router } from "express";
import oneLessonController from "./oneLessonController";

const router = Router()

router.get( '/subject_availabilities/:id', oneLessonController.loadSubjectAvailabilities )
// router.post( '/groups_subgroups', oneLessonController.loadGroupsAvailableSubgroups )
router.get( '/requirements', oneLessonController.loadSubjectsAndCabinets )

export default router
