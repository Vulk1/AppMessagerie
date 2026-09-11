import express from "express";
const router = express.Router();

import { createServer, createServerIconUpload, updateServerIcon } from "../controllers/servers.controller.js";



router.post("/", createServer);
//router.get("/", getUserServers);
router.post("/:serverId/icon-upload", createServerIconUpload);
router.patch("/:serverId/icon", updateServerIcon);

export default router;