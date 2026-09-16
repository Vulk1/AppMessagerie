import express from "express";
const router = express.Router();

import { createServer, createServerIconUpload, updateServerIcon, getServers, getServerChannels, getServerDetails } from "../controllers/servers.controller.js";
import authorize from "../middlewares/authorize.js";
import { permissions } from "../permissions/permissions.js";
import { serverFromParams } from "../permissions/resourceResolver.ts/server.js";

router.post("/", createServer);
router.get("/", getServers);
router.get("/:serverId", getServerDetails);
router.get("/:serverId/channels", getServerChannels);
router.post("/:serverId/icon-upload", authorize(permissions.MANAGE_SERVER, serverFromParams), createServerIconUpload);
router.patch("/:serverId/icon", authorize(permissions.MANAGE_SERVER, serverFromParams), updateServerIcon);



export default router;