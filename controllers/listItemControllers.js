const ListItem = require("../models/ListItem")

// get all shopping list items
exports.getAllListItems = async (req, res) => {

    try {
        const items = await ListItem.find()
            .sort({ "_id": -1 })

        res.status(200).send(items);

    } catch (error) {
        res.status(500).json({ "message": "Error occurred", "error": error })
    }
}

// add a new list item
exports.addListItem = async (req, res) => {

    try {
        const { name, quantity } = req.body;

        // creating a new shopping list item from ListItem model
        const addedItem = await ListItem.create({
            name,
            quantity
        })

        res.status(200).json({ message: "New list item was added to the shopping list", addedItem: addedItem })

    } catch (error) {
        res.status(500).json({ "message": "Error occurred", "error": error })
    }
}

// edit a list item
exports.editListItem = async (req, res) => {

    try {
        const { name, quantity } = req.body;

        const updatedItem = await ListItem.findByIdAndUpdate(req.params.itemId, {
            name,
            quantity
        }, { new: true });

        if (updatedItem == null) {
            return res.status(404).json("List item was not found")
        }

        res.status(200).json({ message: "The list item was updated", updatedItem: updatedItem })

    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).send({ message: "Error occurred", error: "Invalid ID format" })
        }

        res.status(400).send({ message: "Error occurred", error: error })
    }
}

// delete a list item
exports.deleteListItem = async (req, res) => {

    try {
        const deletedItem = await ListItem.findByIdAndDelete(req.params.itemId);

        if (deletedItem == null) {
            return res.status(404).json("List item was not found")
        }

        res.status(200).json({ message: "The list item was deleted", deletedItem: deletedItem })

    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).send({ message: "Error occurred", error: "Invalid ID format" })
        }

        res.status(400).send({ message: "Error occurred", error: error })
    }
}