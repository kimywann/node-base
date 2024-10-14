"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.listen(3000);
const vegetables = [
    {
        id: 1,
        name: "tomato",
        color: "red",
        isFruits: false,
    },
    {
        id: 2,
        name: "apple",
        color: "red",
        isFruits: true,
    },
    {
        id: 3,
        name: "banana",
        color: "yellow",
        isFruits: true,
    },
];
app.get("/vegetables", (req, res) => {
    res.json(vegetables);
});
app.get("/vegetables/:id", (req, res) => {
    const id = +req.params.id;
    const vegetable = vegetables.find((e) => e.id === id);
    console.log(vegetable);
    if (vegetable)
        res.json(vegetable);
    else {
        res.status(404).send("Not Found");
    }
});
