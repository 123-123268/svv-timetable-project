import {createFile} from "../controllers/files.controller.js";
import express from "express";
const router=express.Router();

router.post("/createfile",createFile);
export default router;