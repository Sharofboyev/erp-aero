import { NextFunction, Request, Response } from "express";
import {} from "../utils/validator";

export default async function auth(req: Request, res: Response, next: NextFunction) {
 return next();  //to be implemented
}