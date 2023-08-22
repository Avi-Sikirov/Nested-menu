import React, { FC, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ContextMenuProps {
    id: number;
    x: number;
    y: number;
    onClose: () => void;
    onDeleteHandler: (id: number) => void;
    onRenameOpenHandler: (id: number) => void;
    handleOpenModal: (id: number) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
    id,
    x,
    y,
    onClose,
    onDeleteHandler,
    onRenameOpenHandler,
    handleOpenModal,
}) => {
    const contextMenuRef = useRef(null);
    useOnClickOutside(contextMenuRef, onClose);

    return (
        <>
            <div
                id="context-menu"
                className="context-menu"
                ref={contextMenuRef}
                onClick={onClose}
                style={{ top: `${x}px`, left: `${y}px` }}
            >
                <div className="item" onClick={(e) => handleOpenModal(id)}>
                    <i className="fa-solid fa-plus"></i> Add submenu
                </div>
                <div className="item" onClick={(e) => onRenameOpenHandler(id)}>
                    <i className="fa-solid fa-pen-to-square"></i> Rename
                </div>
                <div className="item" onClick={(e) => onDeleteHandler(id)}>
                    <i className="fa-solid fa-trash"></i> Delete
                </div>
            </div>
        </>
    );
};

export default ContextMenu;
