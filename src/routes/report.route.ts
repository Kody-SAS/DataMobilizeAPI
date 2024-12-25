import { Router } from "express";
import reportController from "../controllers/report.controller";

export const ReportRoute = () => {
  const router = Router();
  router.get(`users/:userid/reports/:id`, reportController.findOne);
  router.get(`/users/:userid/reports`, reportController.findAll);
  router.post(`/users/:userid/reports`, reportController.create);
  router.delete(`users/:userid/reports/:id`, reportController.deleteOne);
  router.patch(`/users/:userid/reports/:id`, reportController.updateOne);
  return router;
};
