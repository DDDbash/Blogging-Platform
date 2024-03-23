import express from "express";

import auth from "../middleware/auth";
import { getProfile } from "../controllers/user";

const router = express.Router();

router.get("/profile", auth, getProfile);

export default router;
