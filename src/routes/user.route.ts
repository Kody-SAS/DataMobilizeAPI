import { Router } from "express";
import userController from "../controllers/user.controller";

export const UserRoute = () => {
  const router = Router();
  const prefix: string = "/users";
  router.get(`${prefix}`, userController.findAll);
  router.get(`${prefix}/reports`, userController.findAllWithReport);
  router.get(`${prefix}/:id`, userController.findOne);
  router.post(`${prefix}/register`, userController.register);
  router.post(`${prefix}/login`, userController.login);
  router.post(`${prefix}/verify/:userId`, userController.verify);
  router.delete(`${prefix}/:id`, userController.removeOne);
  router.put(`${prefix}/:id`, userController.updateOne);
  router.post("/request-reset-password", userController.requestResetPassword);
  router.post("/reset-password", userController.resetPassword);
  router.put(`${prefix}/:id/push-token`, userController.expoPushToken);
  return router;
};
