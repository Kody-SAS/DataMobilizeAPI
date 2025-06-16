import { Router } from "express";

export const PingRoute = () => {
  const router = Router();
  const prefix: string = "/ping";
  router.get(
    `${prefix}`, 
    async (req, res) => {
        return res.status(200).json({message: 'Ping successful'})
    }); // just to ping the server

  return router;
};