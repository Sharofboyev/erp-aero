import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validateLogin, validateSignUp } from "../utils/validator";
import User from "../services/User";
import config from "../config";
let userService = new User();

export async function giveID(req: Request, res: Response) {
  let user = (req as CustomRequest).user;
  return res.send(String((user as JwtPayload).id));
}

export async function logout(req: Request, res: Response) {
  res.send("Logged out successfully");
}

export async function signIn(req: Request, res: Response) {
  let result = validateLogin(req.body);
  if (!result.ok) return res.status(400).send(result.message);
  let { success, message } = await userService.signIn(
    result.value.id,
    result.value.password
  );
  if (success) {
    let accessToken = jwt.sign({ id: result.value.id }, config.secretKey, {
      expiresIn: config.tokenLife
    });
    let refreshToken = jwt.sign({}, config.refreshTokenSecretKey, {
      expiresIn: config.refreshTokenLife
    });
    return res.setHeader("accessToken", accessToken).send({ refreshToken });
  }
  return res.status(400).send(message);
}

export async function signUp(req: Request, res: Response) {
  const result = validateSignUp(req.body);
  if (!result.ok) return res.status(400).send(result.message);
  let { success, message, data } = await userService.signUp(
    result.value.password
  );
  if (!success) return res.status(500).send(message);
  return res.send(data);
}

export async function refreshToken(req: Request, res: Response) {
  res.send("Token: 123456ABCDEF");
}
