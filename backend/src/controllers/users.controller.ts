import type { UserPreview } from "../types/chat.types.js"
import { Request, Response, RequestHandler} from "express";
import { AppError } from "../utils/AppError.js";
import { getCurrentUserProfileService } from "../services/users.service.js";

export const getUserPreview: RequestHandler = async (
    req: Request<{}, {}>, 
    res: Response
) => {



}

export const getCurrentUserProfile: RequestHandler = async (
    req: Request<{}, {}>, 
    res: Response
) => {

    const userId = req.user!.sub;

    const user = await getCurrentUserProfileService(userId);

    return res.status(200).json(user);

}

export const getUserProfile: RequestHandler = async (
    req: Request<{}, {}>, 
    res: Response
) => {

    

}


