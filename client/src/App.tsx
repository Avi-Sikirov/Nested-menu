import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useOnClickOutside } from "usehooks-ts";
import axios from "axios";
import { MENU } from "./data/data";

const URL = "http://localhost:5000/menus";

function App() {
    const [menu, setMenu] = useState(MENU);
    const [render, setRender] = useState(false);
    const [search, setSearch] = useState("");

    // fetch menu from server in localhos:5000/menus

    useEffect(() => {
        axios.get(URL).then((res) => {
            setMenu(res.data);
        });
    }, []);

    const deleteOnServer = (id: number) => {
        axios.delete(`${URL}/${id}`).then((res) => {
            console.log(res.data);
            setMenu(res.data);
        });
    };

    const renameOnServer = (id: number, newName: string) => {
        axios
            .put(URL, {
                id: id,
                title: newName,
            })
            .then((res) => {
                console.log(res.data);
                setMenu(res.data);
            });
    };

    const addOnServer = (parentId: number, title: string) => {
        axios
            .post(URL, {
                parentId: parentId,
                title: title,
            })
            .then((res) => {
                console.log(res.data);
                setMenu(res.data);
            });
    };

    const onDeleteHandler = (id: number): void => {
        deleteOnServer(id);
        // const deleteRecursive = (items: MenuType[]): MenuType[] => {
        //     return items
        //         .filter((item) => item.id !== id)
        //         .map((item) => ({
        //             ...item,
        //             subMenus: deleteRecursive(item.subMenus),
        //         }));
        // };
        // const filteredMenu = deleteRecursive(menu);
        // setMenu(filteredMenu);
    };

    const onRenameHandler = (id: number, newName: string): void => {
        renameOnServer(id, newName);
        // const renameRecursive = (items: MenuType[]): MenuType[] =>
        //     items.map((item) =>
        //         item.id === id
        //             ? { ...item, name: newName }
        //             : { ...item, subMenus: renameRecursive(item.subMenus) }
        //     );

        // setMenu(renameRecursive(menu));
    };

    function onAddHandler(parentId: number, name: string): void {
        addOnServer(parentId, name);
        // const newId = Math.random();
        // const addItemRecursive = (items: MenuType[]): MenuType[] =>
        //     items.map((item) =>
        //         item.id === parentId
        //             ? {
        //                   ...item,
        //                   subMenus: [
        //                       ...item.subMenus,
        //                       { id: newId, name: name, subMenus: [] },
        //                   ],
        //               }
        //             : { ...item, subMenus: addItemRecursive(item.subMenus) }
        //     );

        // setMenu(addItemRecursive(menu));
    }

    const contextMenuRef = useRef(null);
    useOnClickOutside(contextMenuRef, () => {
        setRender(!render);
    });

    return (
        <div className="App">
            <h1>My menu</h1>
            <div className="utils">
                <input
                    style={{ margin: "20px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
                <i
                    className="fa-solid fa-rotate-left"
                    style={{ background: "red" }}
                ></i>
                <i className="fa-solid fa-rotate-right"></i>
            </div>
            <div className="nested-menu" ref={contextMenuRef}>
                {menu.length > 0 && (
                    <Menu
                        key={render.toString()}
                        items={menu}
                        onDeleteHandler={onDeleteHandler}
                        onRenameHandler={onRenameHandler}
                        onAddHandler={onAddHandler}
                        id={menu[0].id}
                        search={search}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
