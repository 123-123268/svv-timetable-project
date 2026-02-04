import {createFile,getAllFiles} from "../controllers/files.controller.js";
import express from "express";

const router=express.Router();

router.post("/createfile",createFile);
router.get("/getallfiles",getAllFiles);
export default router;