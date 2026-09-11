import express from "express";
const router = express.Router();

import { createServer, createServerIconUpload, updateServerIcon, getServers } from "../controllers/servers.controller.js";



router.post("/", createServer);
router.get("/", getServers);
router.post("/:serverId/icon-upload", createServerIconUpload);
router.patch("/:serverId/icon", updateServerIcon);

export default router;