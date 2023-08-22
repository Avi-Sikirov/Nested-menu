import { RequestHandler } from "express";

import { Menu } from "../models/menu.js";

const MENU: Menu[] = [
    new Menu(0, "Menu", [
        new Menu(1, "Sub Menu 1", []),
        new Menu(2, "Sub Menu 2", [
            new Menu(3, "Sub Menu 2.1", [
                new Menu(6, "Sub Menu 2.1.1", [new Menu(8, "Sub Menu", [])]),
                new Menu(7, "Sub Menu 2.1.2", []),
            ]),
            new Menu(4, "Sub Menu 2.2", []),
        ]),
        new Menu(5, "Sub Menu 3", [
            new Menu(9, "Sub Menu 3.1", []),
            new Menu(10, "Sub Menu 3.2", []),
            new Menu(11, "Sub Menu 3.3", []),
            new Menu(12, "Sub Menu 3.4", []),
            new Menu(13, "Sub Menu 3.5", []),
        ]),
    ]),
    new Menu(14, "Menu 2", [
        new Menu(15, "Sub Menu 2.1", []),
        new Menu(16, "Sub Menu 2.2", []),
        new Menu(17, "Sub Menu 2.3", []),
    ]),
];

export const getMenu: RequestHandler = (req, res, next) => {
    res.json(MENU);
};

export const deleteMenu: RequestHandler = (req, res, next) => {
    const id = parseInt(req.params.id); // Assuming the ID is passed as a route parameter
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
    }

    if (deleteMenuById(MENU, id)) {
        res.status(200).json(MENU);
    } else {
        res.status(404).json({ error: `Menu with ID ${id} not found.` });
    }
};

const deleteMenuById = (menuArray: Menu[], id: number): boolean => {
    for (let i = 0; i < menuArray.length; i++) {
        if (menuArray[i].id === id) {
            menuArray.splice(i, 1);
            return true;
        }
        if (menuArray[i].subMenus && menuArray[i].subMenus.length) {
            if (deleteMenuById(menuArray[i].subMenus, id)) {
                return true;
            }
        }
    }
    return false;
};

interface NewMenuPayload {
    id: number;
    title: string;
}

const addMenuUnderParent = (
    menuArray: Menu[],
    parentId: number,
    newMenu: NewMenuPayload
): boolean => {
    for (let i = 0; i < menuArray.length; i++) {
        if (menuArray[i].id === parentId) {
            const newSubMenu = new Menu(newMenu.id, newMenu.title, []);
            menuArray[i].subMenus.push(newSubMenu);
            return true;
        }
        if (menuArray[i].subMenus && menuArray[i].subMenus.length) {
            if (addMenuUnderParent(menuArray[i].subMenus, parentId, newMenu)) {
                return true;
            }
        }
    }
    return false;
};

export const addMenu: RequestHandler = (req, res, next) => {
    const parentId = parseInt(req.body.parentId); // Assuming parent ID is in the request body
    const newMenu: NewMenuPayload = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
    };

    if (isNaN(parentId) || isNaN(newMenu.id) || !newMenu.title) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    if (addMenuUnderParent(MENU, parentId, newMenu)) {
        res.status(201).json(MENU);
    } else {
        res.status(404).json({
            error: `Parent menu with ID ${parentId} not found.`,
        });
    }
};

interface RenameMenuPayload {
    id: number;
    newTitle: string;
}

const renameMenuById = (
    menuArray: Menu[],
    id: number,
    newTitle: string
): boolean => {
    for (let i = 0; i < menuArray.length; i++) {
        if (menuArray[i].id === id) {
            menuArray[i].name = newTitle;
            return true;
        }
        if (menuArray[i].subMenus && menuArray[i].subMenus.length) {
            if (renameMenuById(menuArray[i].subMenus, id, newTitle)) {
                return true;
            }
        }
    }
    return false;
};

export const renameMenu: RequestHandler = (req, res, next) => {
    const menuToRename: RenameMenuPayload = {
        id: parseInt(req.body.id),
        newTitle: req.body.title,
    };

    if (isNaN(menuToRename.id) || !menuToRename.newTitle) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    if (renameMenuById(MENU, menuToRename.id, menuToRename.newTitle)) {
        res.status(200).json(MENU);
    } else {
        res.status(404).json({
            error: `Menu with ID ${menuToRename.id} not found.`,
        });
    }
};
