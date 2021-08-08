import { useState, useEffect } from "react";
import axios from "axios";
import AddListItem from "./AddListItem";
import "../App.css"
import { BsTrash, BsPencil } from 'react-icons/bs';


export default function ShoppingList() {

    const [list, setList] = useState([]);
    const [editOnId, setEditOnId] = useState("");

    const [itemId, setItemId] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    const [newName, setNewName] = useState("");
    const [newQuantity, setNewQuantity] = useState("");


    // Load all list items
    const getList = async () => {

        try {
            let response = await axios.get("/shoppinglist")

            if (response.status === 200) {
                setList(response.data);
            }

        } catch (error) {
            console.log("Error on getting list items :", error.response);
        }
    }

    useEffect(() => {
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Edit an item
    const handleEditItem = async (e) => {
        e.preventDefault();

        if (newName !== "" || newQuantity !== "") {

            try {
                const res = await axios.put(`/shoppinglist/edit/${itemId}`, {
                    name: newName !== "" ? newName : name,
                    quantity: newQuantity !== "" ? newQuantity : quantity
                })

                if (res.status === 200) {
                    console.log("The item was successfully updated!");
                    getList()

                    if (newQuantity !== "") {
                        setQuantity(newQuantity)
                    }
                    if (newName !== "") {
                        setName(newName)
                    }

                    setEditOnId("")
                    setNewName("")
                    setNewQuantity("")
                }
            } catch (error) {
                console.log("Error on editing a list item :", error.response);
            }
        } else {
            getList()
            setEditOnId("")
            setNewName("")
            setNewQuantity("")
        }
    }

    // Delete an item
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.delete(`/shoppinglist/delete/${itemId}`)

            if (res.status === 200) {
                console.log("The item was successfully deleted!");
                getList()
            }
        } catch (error) {
            console.log("Error on deleting a list item :", error.response);
        }
    }


    return (
        <div>
            <AddListItem getList={getList} />

            <h2>Grocery Shopping List</h2>

            {list ?
                <>
                    {list.map(item => (

                        <div key={item._id} className="listItem">

                            {editOnId !== item._id ?

                                <div onMouseOver={() =>
                                    itemId !== item._id && editOnId === ""
                                        ?
                                        [setItemId(item._id), setName(item.name), setQuantity(item.quantity)]
                                        :
                                        null} >

                                    <button
                                        style={{ fontSize: "1.1rem" }}
                                        type="submit"
                                        disabled={editOnId === "" ? false : true}
                                        onClick={handleDelete}
                                    ><BsTrash /></button>

                                    <span>{item.name} : {item.quantity}</span>

                                    <button
                                        style={{ fontSize: "1.1rem" }}
                                        type="submit"
                                        disabled={editOnId === "" ? false : true}
                                        onClick={() => setEditOnId(itemId)}
                                    ><BsPencil /></button>
                                </div>
                                :
                                <form onSubmit={handleEditItem}>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        placeholder="Item name"
                                        defaultValue={item.name}
                                        onChange={e => setNewName(e.target.value)}
                                        style={{ width: "200px", padding: "5px" }}
                                    />

                                    <input
                                        required
                                        name="quantity"
                                        type="number"
                                        min="0"
                                        step="any"
                                        defaultValue={item.quantity}
                                        onChange={e => setNewQuantity(e.target.value)}
                                        style={{ width: "45px", padding: "5px 0" }}
                                    />

                                    <button
                                        type="submit"
                                        style={{ width: "30px", padding: "2px", marginLeft: "10px" }}
                                    > OK
                                    </button>

                                </form>
                            }
                        </div>))}
                </>
                :
                null
            }
        </div >
    )
}