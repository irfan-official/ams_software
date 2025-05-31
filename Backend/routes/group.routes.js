import express from "express"
import {AuthorizationMiddleware} from "../middlewares/authorization.middlewares.js"
import { createGroup, groupReport, allGroup } from "../controllers/group.controller.js";
import {createGroupMiddleware} from "../middlewares/group.middleware.js"

const route = express.Router();

route.use(AuthorizationMiddleware)

route.get("/allgroup", allGroup)
route.post("/create", createGroupMiddleware ,createGroup)
route.post("/report", groupReport)


export default route