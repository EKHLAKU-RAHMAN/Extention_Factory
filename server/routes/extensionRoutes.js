import express from "express";

import { generateExtension } from "../controllers/extensionController.js";



const router = express.Router();



router.post("/generate", generateExtension);



export default router;