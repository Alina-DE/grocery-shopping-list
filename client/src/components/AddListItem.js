import { useState } from "react";
import axios from "axios";


export default function AddListItem({ getList }) {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("1");

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("/shoppinglist/add", {
                name: name,
                quantity: quantity
            })

            if (res.status === 200) {
                console.log("The item was successfully added!");
                setName("");
                setQuantity("1")
                getList()
            }
        } catch (error) {
            console.log("Error on adding a list item :", error.response);
        }
    }

    return (
        <div className="addItem">
            <h2>Add Item to the List</h2>

            <form onSubmit={handleSubmit}>

                <input
                    required
                    name="name"
                    type="text"
                    placeholder="Item name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    required
                    name="quantity"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Qty"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    style={{ width: "60px", borderRadius: "0 5px 5px 0" }}
                />

                <div>
                    <button type="submit">
                        Add to the List
                    </button>
                </div>
            </form>
        </div>
    )
}
