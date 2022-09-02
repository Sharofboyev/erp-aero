import { NextFunction, Request, Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../config";

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized. Token not provided");
  try {
    if (!token.startsWith("Bearer ")) throw new Error();
    jwt.verify(token.substring(7), config.secretKey, (err, user) => {
        if (!user) throw new Error();
        (req as CustomRequest).user = user;
        return next();
    });
    return next();
  } catch (err) {
    return res.status(401).send("Unauthorized. Invalid token");
  }
}

export default auth;
