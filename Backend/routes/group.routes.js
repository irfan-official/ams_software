import express from "express"
import {AuthorizationMiddleware} from "../middlewares/authorization.middlewares.js"
import { allGroup, createGroup, updateGroup, groupReport, createReport, updateReport} from "../controllers/group.controller.js";
import {createGroupMiddleware, createReportMiddleware, updateGroupMiddleware} from "../middlewares/group.middleware.js"


const route = express.Router();

route.use(AuthorizationMiddleware)

route.get("/allgroup", allGroup)

route.post("/create-group", createGroupMiddleware ,createGroup)

route.post("/update-group", updateGroupMiddleware ,updateGroup) //

route.post("/group-report", groupReport)

route.post("/create-report",createReportMiddleware, createReport)

route.post("/update-report", updateReport)


export default route