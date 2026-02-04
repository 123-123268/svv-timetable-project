import express from "express";
import { signin, login} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signin);
router.post("/login", login);

export default router;
