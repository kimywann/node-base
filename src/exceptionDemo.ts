const express = require("express");
const app = express();
import { Request, Response } from "express";
app.listen(3000);

interface Vegetable {
    id: number;
    name: string;
    color: string;
    isFruits: boolean;
}

const vegetables: Vegetable[] = [
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

app.get("/vegetables", (req: Request, res: Response) => {
    res.json(vegetables);
});

app.get("/vegetables/:id", (req: Request, res: Response) => {
    const id = +req.params.id;
    const vegetable = vegetables.find((e) => e.id === id);
    console.log(vegetable);
    if (vegetable) res.json(vegetable);
    else {
        res.status(404).send("Not Found");
    }
});
