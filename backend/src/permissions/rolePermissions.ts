import { ServerRole } from "../generated/prisma/enums.js";
import { permissions, type Permission } from "./permissions.js";

export const rolePermissions: Record<ServerRole, Permission[]> = {
    OWNER: [
        permissions.VIEW_CHANNEL,
        permissions.SEND_MESSAGES,
        permissions.MANAGE_MESSAGES,
        permissions.MANAGE_CHANNEL,
        permissions.MANAGE_SERVER,
    ],

    ADMIN: [
        permissions.VIEW_CHANNEL,
        permissions.SEND_MESSAGES,
        permissions.MANAGE_MESSAGES,
        permissions.MANAGE_CHANNEL,
    ],

    MEMBER: [
        permissions.VIEW_CHANNEL,
        permissions.SEND_MESSAGES,
    ],
};