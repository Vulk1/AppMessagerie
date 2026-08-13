import express from "express";
import cors from "cors";
import { authenticate } from "./middlewares/authentificate.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import friendsRoute from "./routes/friends.js";

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

app.use('/api/auth', authRoute);
app.use('/api/user', authenticate, usersRoute);
app.use('/api/friends', authenticate, friendsRoute)

export default app;