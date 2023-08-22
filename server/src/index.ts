import express, { Request, Response, NextFunction } from "express";

import menusRouter from "./routes/menus.js";
import cors from "cors";

const app = express();

// allow cors

app.use(express.json());
app.use(cors());

app.use("/menus", menusRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err.message);
});

app.listen(5000);
