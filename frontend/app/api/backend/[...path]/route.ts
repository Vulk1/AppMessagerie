import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

async function handler(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    if (!BACKEND_API_URL) {
        return NextResponse.json(
            { message: "BACKEND_API_URL is not defined" },
            { status: 500 }
        );
    }

    const { path } = await params;

    const backendPath = path.join("/");
    const backendUrl =
        `${BACKEND_API_URL}/${backendPath}${req.nextUrl.search}`;

    /*
     * raw: true est important :
     *
     * on ne veut pas récupérer le payload sous forme d'objet.
     * On veut récupérer le JWT original sous forme de string
     * afin de le transmettre à Express.
     */
    const accessToken = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        raw: true,
    });

    const headers = new Headers();

    // On transmet le Content-Type original s'il existe.
    const contentType = req.headers.get("content-type");

    if (contentType) {
        headers.set("Content-Type", contentType);
    }

    /*
     * Le navigateur ne contrôle jamais directement Authorization.
     *
     * Si un JWT existe dans le cookie NextAuth,
     * c'est le BFF qui construit le header.
     */
    if (accessToken) {
        headers.set(
            "Authorization",
            `Bearer ${accessToken}`
        );
    }

    const hasBody =
        req.method !== "GET" &&
        req.method !== "HEAD";

    const response = await fetch(backendUrl, {
        method: req.method,
        headers,
        body: hasBody ? await req.arrayBuffer() : undefined,
    });

    const responseBody = await response.arrayBuffer();

    return new NextResponse(responseBody, {
        status: response.status,
        headers: {
            "Content-Type":
                response.headers.get("Content-Type") ??
                "application/json",
        },
    });
}

export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as PATCH,
    handler as DELETE,
};