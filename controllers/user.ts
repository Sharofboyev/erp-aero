import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import { JwtPayload } from "jsonwebtoken";
import { validateUser } from "../utils/validator";
import User from "../services/User";
import config from "../config";
let userService = new User();

export async function giveID(req: Request, res: Response) {
  let user = (req as CustomRequest).user;
  return res.send(String((user as JwtPayload).id));
}

export async function logout(req: Request, res: Response) {
  try {
    if (!req.headers.authorization || !req.headers.refreshtoken)
      throw new Error("Unexpected error")
    let result = await userService.blockToken(req.headers.authorization as string);
    if (!result.success) throw new Error(result.message);
    result = await userService.blockToken(req.headers.refreshtoken as string);
    if (!result.success) throw new Error(result.message);
    return res.send("Logged out successfully");
  }catch(err){
    return res.status(500).send("Internal server error. Message: " + (err as Error).message);
  }
}

export async function signIn(req: Request, res: Response) {
  const result = validateUser(req.body);
  if (!result.ok) return res.status(400).send(result.message);
  let { success, message } = await userService.signIn(
    result.value.id,
    result.value.password
  );
  if (success) {
    const accessToken = userService.generateToken({id: result.value.id}, config.secretKey, config.tokenLife);
    const refreshToken = userService.generateToken({id: result.value.id}, config.refreshTokenSecretKey, config.refreshTokenLife);
    return res.setHeader("accessToken", accessToken).send({ refreshToken });
  }
  return res.status(400).send(message);
}

export async function signUp(req: Request, res: Response) {
  const result = validateUser(req.body);
  if (!result.ok) return res.status(400).send(result.message);
  let { success, message, data } = await userService.signUp(
    result.value.id,
    result.value.password
  );
  if (!success) return res.status(500).send(message);
  return res.send(data);
}

export async function refreshToken(req: Request, res: Response) {
  const user = (req as CustomRequest).user;
  const token = userService.generateToken({id: (user as JwtPayload).id}, config.secretKey, config.tokenLife)
  return res.setHeader("accessToken", token).send("Success");
}
