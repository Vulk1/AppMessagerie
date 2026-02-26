import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError, z } from "zod";

export const validate = 
                (schema: ZodType) =>
                (req: Request, res: Response, next: NextFunction) => {

                    try {
                        const data = schema.parse(req.body);

                        // On remplace le body par les données validées / transformées
                        req.body = data;
                        next();

                    } catch(error) {
                        if(error instanceof ZodError) {
                            return res.status(400).json({
                                message: "Validation error",
                                errors: z.treeifyError(error)
                            })
                        }
                        return res.status(500).json({ message: "Server error" });
                    }
                };