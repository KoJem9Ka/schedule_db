import { Express } from "express";
import ScheduleRouter from "./features/scheduleRouter";
import oneLessonRouter from "./features/oneLessonRouter";
import pointsRouter from "./features/pointsRouter";

const routing = (app: Express) => {
  app.use( '/schedule', ScheduleRouter )
  app.use( '/lesson', oneLessonRouter )
  app.use( '/points', pointsRouter )
}

export default routing
