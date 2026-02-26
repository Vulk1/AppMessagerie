import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
  ];
  
app.use(
    cors({
        origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use('api/auth', authRoute);

export default app;