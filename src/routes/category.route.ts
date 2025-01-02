import { Router } from "express";
import categoryController from "../controllers/category.controller";

export const CategoryRoute = () => {
  const router = Router();
  const prefix: string = "/categories";
  router.get(`${prefix}`, categoryController.findAll);
  router.get(`${prefix}/:id`, categoryController.findOne);
  router.post(`${prefix}`, categoryController.create);
  return router;
};
