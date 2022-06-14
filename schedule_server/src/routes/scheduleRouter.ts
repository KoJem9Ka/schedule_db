import { Router } from "express";
import scheduleController from "../features/schedule/controller";

const router = Router()

router.get( '', scheduleController.loadAll )
router.get( '/:id', scheduleController.loadOne )
router.post( '', scheduleController.addOne )
router.delete( '', scheduleController.removeSome )
router.put( '', scheduleController.rewriteOne )

export default router
