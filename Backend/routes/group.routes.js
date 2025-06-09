import express from "express"
import {AuthorizationMiddleware} from "../middlewares/authorization.middlewares.js"
import { allGroup, createGroup, updateGroup, deleteGroup, groupReport, createReport, updateReport, deleteReport, updateDetails} from "../controllers/group.controller.js";
import {createGroupMiddleware, createReportMiddleware, updateGroupMiddleware} from "../middlewares/group.middleware.js"


const route = express.Router();

route.use(AuthorizationMiddleware)

route.get("/allgroup", allGroup)

route.post("/create-group", createGroupMiddleware ,createGroup)

route.patch("/update-group", updateGroupMiddleware ,updateGroup) 

route.delete("/delete-group", deleteGroup) 


route.patch("/update-details", updateDetails)


route.post("/group-report", groupReport)

route.post("/create-report", createReport)

route.patch("/update-report", updateReport)

route.delete("/delete-report", deleteReport)


export default route