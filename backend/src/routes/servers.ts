import express from "express";
const router = express.Router();

import { createServer, createServerIconUpload } from "../controllers/servers.controller.js";



router.post("/", createServer);
router.post("/:serverId/icon-upload", createServerIconUpload);

export default router;