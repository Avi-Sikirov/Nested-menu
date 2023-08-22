import React, { KeyboardEvent, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { MenuType } from "../types/menu";

interface SubMenu {
    // You can define more properties for a subMenu if needed.
}

interface MenuItemProps {
    item: MenuType;
    onMouseEnter: (id: number) => void;
    onContextMenu: (event: MouseEvent) => void;
    setClikedItem: (id: number) => void;
    renameItme: string | number;
    setInputValue: (value: string) => void;
    onRenameSubmit: (event: KeyboardEvent, id: number) => void;
    showSubMenu: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
    item,
    onMouseEnter,
    onContextMenu,
    setClikedItem,
    renameItme,
    setInputValue,
    onRenameSubmit,
    showSubMenu,
}) => {
    return (
        <li
            className="li-menu"
            key={item.id}
            onMouseEnter={() => onMouseEnter(item.id)}
            onContextMenu={(e) => {
                e.preventDefault();
                setClikedItem(item.id);
                onContextMenu(e);
            }}
        >
            {item.id === renameItme ? (
                <input
                    className="input-rename"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => onRenameSubmit(e, item.id)}
                ></input>
            ) : (
                item.name
            )}
            {item.subMenus &&
                item.subMenus.length > 0 &&
                showSubMenu != item.id && (
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        color={"white"}
                        className="down-icon"
                    />
                )}
            {item.subMenus &&
                item.subMenus.length > 0 &&
                showSubMenu == item.id && (
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        color={"#142d4c"}
                        className="down-icon"
                    />
                )}
        </li>
    );
};

export default MenuItem;
