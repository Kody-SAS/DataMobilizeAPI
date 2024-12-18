import { Router } from "express";
import reportController from "../controllers/report.controller";

export const ReportRoute = () => {
  const prefix: string = "/reports";
  const router = Router();
  router.get(`${prefix}/:id`, reportController.findOne);
  router.delete(`${prefix}/:id`, reportController.deleteOne);
  router.patch(`${prefix}/:id`, reportController.updateOne);
  router.get(`${prefix}`, reportController.findAll);
  router.post(`${prefix}`, reportController.create);
  return router;
};
