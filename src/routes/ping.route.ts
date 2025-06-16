import { Router } from "express";

export const PingRoute = () => {
  const router = Router();
  const prefix: string = "/ping";
  router.get(`${prefix}`, async (req, res) => res.status(200)); // just to ping the server

  return router;
};