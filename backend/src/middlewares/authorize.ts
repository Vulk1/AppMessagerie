import {type Permission } from "../permissions/permissions.js";
import { rolePermissions } from "../permissions/rolePermissions.js";
import { type ResourceResolver } from "../types/chat.types.js";
import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.js";


export default function authorize<
    Params extends Record<string, string>
    >(
    permission: Permission,
    resolveServerId: ResourceResolver<Params>
) {
    return async (
        req: Request<Params>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.sub;

            const serverId = await resolveServerId(req);

            if (!serverId) {
                return res.status(404).json({
                    message: "Ressource introuvable.",
                });
            }

            const member = await prisma.serverMember.findUnique({
                where: {
                    userId_serverId: {
                        userId,
                        serverId,
                    },
                },
                select: {
                    role: true,
                },
            });

            if (!member) {
                return res.status(403).json({
                    message: "Accès refusé.",
                });
            }

            if (!rolePermissions[member.role].includes(permission)) {
                return res.status(403).json({
                    message: "Permission insuffisante.",
                });
            }

            next();

        } catch (error) {
            next(error);
        }
    };
}
