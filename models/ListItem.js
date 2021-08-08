const { Schema, model } = require("mongoose");

const ListItemSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, min: 0, default: 1 }
})

const ListItem = model("ListItem", ListItemSchema);
module.exports = ListItem;
