import { NextFunction, Request, Response } from "express"

export async function giveID(req: Request, res: Response, next: NextFunction) {
    res.send(1);
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.send("Logged out successfully");
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    res.send("Token: 123456ABCDEF");
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
    res.send("Success");
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
    res.send("Token: 123456ABCDEF");
}