import { Router } from "express";
import ControllerPipeDrive from "./controller/ControllerPipeDrive.js";
import OpportunityController from "./controller/OpportunityController.js";

const routes = Router();

routes.get("/pipe", ControllerPipeDrive.pipeDrive);
routes.get("/listenOpportunity", OpportunityController.indexOpportunity);

export default routes;