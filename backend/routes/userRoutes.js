import express from "express";
import auth from "../middleware/auth.js";
import { register, login } from "../controllers/user.js"


const router = express.Router();

router.post("/signup", register);
router.post("/signin", auth, login);

export default router;