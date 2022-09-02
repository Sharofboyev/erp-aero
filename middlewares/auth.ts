import { NextFunction, Request, Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../config";
import User from "../services/User";
const userInstance = new User();

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error("Token not provided");
    if (!token.startsWith("Bearer ")) throw new Error("Not a bearer token");
    let user = jwt.verify(token.substring(7), config.secretKey);
    let blocked = !(await userInstance.checkToken(token));
    if (blocked) {
      throw new Error("Already logged out");
    }
    if (user)
      (req as CustomRequest).user = user;
    return next();
  } catch (err) {
    return res.status(401).send(`Unauthorized. ${(err as Error).message}`);
  }
}

export default auth;
