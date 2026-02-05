import {fetchcelldata,editcellbyuser,editcellbyauthor} from "../controllers/cell.controller.js";
import express from "express";

const router=express.Router();
router.post("/fetchcelldata",fetchcelldata);
router.post("/editcellbyuser",editcellbyuser);
router.post("/editcellbyauthor",editcellbyauthor);

export default router;