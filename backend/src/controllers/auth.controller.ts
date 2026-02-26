import { Request, Response, RequestHandler} from "express";
import { loginService, registerService } from "../services/auth.service.js";
import { RegisterInput, LoginInput} from "../types/auth.types.js";
import { AppError } from "../utils/AppError.js";

export const login: RequestHandler = async (
    req: Request<{}, {}, LoginInput>, 
    res: Response
) => {

    try {
        const result = await loginService(req.body);

        return res.status(200).json(result);
    }catch(error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({ message : error.message});
        } else {
             return res.status(500).json({ message : "Erreur lors de la connexion"});
        }
    }
}

export const register: RequestHandler = async (
    req: Request<{}, {}, RegisterInput>, 
    res: Response
    ) => {
        try {
            const result = await registerService(req.body);
    
            return res.status(201).json(result);
        }catch(error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode).json({ message : error.message});
            } else {
                return res.status(500).json({ message : "Erreur lors de l'inscription"});
            }
        }
}