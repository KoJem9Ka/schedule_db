import { Express } from "express";
import ScheduleRouter from "./scheduleRouter";
import oneLessonRouter from "./oneLessonRouter";


const routing = (app: Express) => {
  app.use( '/schedule', ScheduleRouter )
  app.use( '/lesson', oneLessonRouter )
}

export default routing
