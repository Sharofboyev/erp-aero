import express from "express";
import { giveID, logout, signIn, refreshToken, signUp } from "../controllers/login";
import {auth, authRefreshToken } from "../middlewares/auth";

const router = express.Router();

router.get("/info", auth, giveID); //done
router.get("/logout", auth, logout);
router.post("/signin", signIn); //done
router.post("/signin/new_token", authRefreshToken, refreshToken); //done
router.post("/signup", signUp); //done

export default router;