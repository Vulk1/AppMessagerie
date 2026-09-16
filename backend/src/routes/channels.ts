import express from "express";
import authorize from "../middlewares/authorize.js";
import { permissions } from "../permissions/permissions.js";
import { serverFromChannel } from "../permissions/resourceResolver.ts/channel.js";
import { getMessages } from "../controllers/channels.controller.js";

const router = express.Router();



router.get("/:channelId/messages", 
    authorize(permissions.VIEW_CHANNEL, serverFromChannel), 
    getMessages
);

export default router;