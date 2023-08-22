import { Router } from "express";

import {
    addMenu,
    deleteMenu,
    getMenu,
    renameMenu,
} from "../controllers/menus.js";

const router = Router();

router.get("/", getMenu);

router.post("/", addMenu);

router.put("/", renameMenu);

router.delete("/:id", deleteMenu);

export default router;
