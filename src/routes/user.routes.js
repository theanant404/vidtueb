import { registerUser } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/muter.middlewares.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser);

export default router;