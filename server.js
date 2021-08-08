const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");

const shoppingListRoutes = require("./routes/shoppingListRoutes");

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));


// routes here
app.use("/shoppinglist", shoppingListRoutes);

console.log("Connecting to database...💻");

mongoose
    .connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
    )
    .then(() => console.log("Database connected! 😎"))
    .catch((error) => console.log(error, "Database did not connect! ☹️❌"));


app.all("*", (req, res) => {
    res.status(500).send("Invalid path")
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}...🎧`)
});
