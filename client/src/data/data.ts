import { MenuType } from "../types/menu";

export const MENU: MenuType[] = [
    {
        id: 0,
        name: "Menu",
        subMenus: [
            {
                id: 1,
                name: "Sub Menu 1",
                subMenus: [],
            },
            {
                id: 2,
                name: "Sub Menu 2",
                subMenus: [
                    {
                        id: 3,
                        name: "Sub Menu 2.1",
                        subMenus: [
                            {
                                id: 7,
                                name: "Sub Menu 2.1.1",
                                subMenus: [
                                    {
                                        id: 8,
                                        name: "Sub Menu",
                                        subMenus: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 4,
                        name: "Sub Menu 2.2",
                        subMenus: [],
                    },
                ],
            },
            {
                id: 5,
                name: "Sub Menu 3",
                subMenus: [
                    {
                        id: 6,
                        name: "Sub Menu 3.1",
                        subMenus: [],
                    },
                ],
            },
        ],
    },
];
