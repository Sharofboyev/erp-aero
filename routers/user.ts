import express from "express";
import { giveID, logout, signIn, refreshToken, signUp } from "../controllers/user";
import {auth, authRefreshToken } from "../middlewares/auth";

const router = express.Router();

router.get("/info", auth, giveID);
router.get("/logout", auth, authRefreshToken, logout);
router.post("/signin", signIn);
router.post("/signin/new_token", authRefreshToken, refreshToken);
router.post("/signup", signUp);

export default router;