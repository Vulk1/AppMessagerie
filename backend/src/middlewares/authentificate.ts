import type { Request, Response, NextFunction } from "express";
import { jwtVerify, importSPKI } from "jose";
import fs from "node:fs/promises";


const publicKeyPath = process.env.JWT_PUBLIC_KEY_PATH; // On récupère le chemin de la clé public rs256

if (!publicKeyPath) {
    throw new Error("JWT_PUBLIC_KEY_PATH is not defined");
}

const publicKeyPromise = fs
    .readFile(publicKeyPath, "utf-8")
    .then((publicKeyPem) => importSPKI(publicKeyPem, "RS256"));



export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const [scheme, token] = authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization header",
            });
        }

        const publicKey = await publicKeyPromise;
        const jwtIssuer = process.env.JWT_ISSUER;
        const jwtAudience = process.env.JWT_AUDIENCE;

        if (!jwtIssuer) {
            throw new Error("JWT_ISSUER is not defined");
        }

        if (!jwtAudience) {
            throw new Error("JWT_AUDIENCE is not defined");
        }

        const { payload } = await jwtVerify(
            token,
            publicKey,
            {
                algorithms: ["RS256"],
                issuer: jwtIssuer,
                audience: jwtAudience,
            }
        );

        if (
            typeof payload.sub !== "string" ||
            typeof payload.email !== "string" ||
            typeof payload.username !== "string" ||
            typeof payload.avatar !== "string"
        ) {
            return res.status(401).json({
                message: "Invalid token payload",
            });
        }

        req.user = {
            ...payload,
            sub: payload.sub,
            email: payload.email,
            username: payload.username,
            avatar: payload.avatar,
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}

