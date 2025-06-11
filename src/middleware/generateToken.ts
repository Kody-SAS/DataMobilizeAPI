import jwt from "jsonwebtoken";
import { EXPIRESIN, JWT_SECRET } from "../startup/config";

export function generateAuthToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: EXPIRESIN,
  });
}
