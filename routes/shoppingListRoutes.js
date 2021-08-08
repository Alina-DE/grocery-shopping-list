const express = require('express');
const router = express.Router();

const { getAllListItems, addListItem, editListItem, deleteListItem} = require("../controllers/listItemControllers")


//get all shopping list items
router.get("/", getAllListItems)

// add a new list item
router.post("/add", addListItem)

// edit a list item
router.put("/edit/:itemId", editListItem)

// delete a list item
router.delete("/delete/:itemId", deleteListItem)


module.exports = router