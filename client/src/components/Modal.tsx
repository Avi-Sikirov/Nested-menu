import React, { useRef, useState } from "react";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === overlayRef.current) {
            onClose();
        }
    };

    const handleSubmit = () => {
        onSubmit(name);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="modal-overlay"
            ref={overlayRef}
            onClick={(e) => {
                handleOverlayClick(e);
            }}
        >
            <div className="subscribe">
                <p>Add new Menu</p>
                <input
                    placeholder="Menu name"
                    className="subscribe-input"
                    name="email"
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                ></input>
                <br></br>
                <div className="submit-btn" onClick={(e) => handleSubmit()}>
                    SUBMIT
                </div>
            </div>
        </div>
    );
};

export default Modal;
