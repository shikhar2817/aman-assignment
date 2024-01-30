import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { bookSlot, leavingSlot } from "./routes";

export const routes = express.Router();

export const createServer = () => {
    const app = express();

    app.use(
        cors({
            credentials: true,
        })
    );
    app.use(bodyParser.json());

    // health check
    app.get("/api/health", (_req: Request, res: Response) => {
        try {
            res.status(200).json({ message: "System is healthy 🟢" });
        } catch (error: unknown) {
            console.log("Server Failed: ", error);
            res.status(500).json({ message: "System is Sick 🔴" });
        }
    });

    // routes
    app.post("/api/bookslot", bookSlot);
    app.post("/api/leavingSlot", leavingSlot);

    return app;
};
