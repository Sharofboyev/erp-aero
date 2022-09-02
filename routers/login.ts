import express from "express";
import { giveID, logout, signIn, refreshToken, signUp } from "../controllers/login";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/info", auth, giveID); //done
router.get("/logout", auth, logout);
router.post("/signin", signIn);
router.post("/signin/new_token", auth, refreshToken);
router.post("/signup", signUp);
