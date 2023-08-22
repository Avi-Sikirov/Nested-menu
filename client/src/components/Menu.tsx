import React, { useRef, useState } from "react";
import { MenuType as MenuType } from "../types/menu";
import ContextMenu from "./ContextMenu";
import MenuItem from "./MenuItem";
import Modal from "./Modal";

const initialContextMenu = {
    mouseX: 0,
    mouseY: 0,
    show: false,
};

interface MenuProps {
    id: number;
    items: MenuType[];
    onDeleteHandler: (id: number) => void;
    onRenameHandler: (id: number, newName: string) => void;
    onAddHandler: (parentId: number, newName: string) => void;
    search: string;
}

const Menu: React.FC<MenuProps> = (props) => {
    const [showSubMenu, setShowSubMenu] = useState(-1);
    const [showContextMenu, setShowContextMenu] = useState(initialContextMenu);
    const [clikedItem, setClikedItem] = useState(-1);
    const [renameItme, setRenameItem] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onMouseEnter = (id: number) => {
        setShowSubMenu(id);
    };

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowContextMenu({
            mouseX: e.clientY - 2,
            mouseY: e.clientX - 4,
            show: true,
        });
    };

    const onCloseContextMenu = () => {
        setShowContextMenu(initialContextMenu);
    };

    const onRenameOpenHandler = (id: number) => {
        setRenameItem(id);
    };

    const onRenameSubmit = (e: React.KeyboardEvent, id: number) => {
        if (e.key === "Enter") {
            props.onRenameHandler(id, inputValue);
            setRenameItem(-1);
        }
    };

    const handleOpenModal = (id: number) => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = (name: string) => {
        console.log("Name submitted:", name);
        props.onAddHandler(clikedItem, name);
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
            />
            {showContextMenu.show && (
                <ContextMenu
                    id={clikedItem}
                    x={showContextMenu.mouseX}
                    y={showContextMenu.mouseY}
                    onClose={onCloseContextMenu}
                    onDeleteHandler={props.onDeleteHandler}
                    onRenameOpenHandler={onRenameOpenHandler}
                    handleOpenModal={handleOpenModal}
                />
            )}
            <ul className="ul-menu">
                {props.items.map((item) => {
                    return (
                        <MenuItem
                            key={item.id}
                            item={item}
                            onMouseEnter={onMouseEnter}
                            onContextMenu={onContextMenu}
                            setClikedItem={setClikedItem}
                            renameItme={renameItme}
                            setInputValue={setInputValue}
                            onRenameSubmit={onRenameSubmit}
                            showSubMenu={showSubMenu}
                        />
                    );
                })}
            </ul>
            {((showSubMenu > -1 && props.items.length > 0) ||
                props.search.length > 0) &&
                props.items.map((item, key) => {
                    if (
                        item.id === showSubMenu ||
                        (item.name
                            .toLowerCase()
                            .includes(props.search.toLocaleLowerCase()) &&
                            props.search.length > 0)
                    )
                        return (
                            <Menu
                                id={item.id}
                                items={item.subMenus}
                                key={key}
                                onDeleteHandler={props.onDeleteHandler}
                                onRenameHandler={props.onRenameHandler}
                                onAddHandler={props.onAddHandler}
                                search={props.search}
                            />
                        );
                })}
        </>
    );
};

export default Menu;
