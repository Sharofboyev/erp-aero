import express from "express";
import { giveID, logout, signIn, refreshToken, signUp } from "../controllers/login";

const router = express.Router();

router.get("/info", giveID);
router.get("/logout", logout);
router.get("/signin", signIn);
router.get("/signin/new_token", refreshToken);
router.get("/signup", signUp);
