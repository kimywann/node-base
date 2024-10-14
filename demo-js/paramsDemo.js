const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.json("Hello World");
});

app.listen(3000);

// const books = new Map();
// books.set(1, { id: 1, title: "Node.js 교과서", price: 20000, description: "짱 짱 좋은 책임" });

app.get("/products", function (req, res) {
    // res.json({
    //     name: req.query.name,
    //     price: req.query.price,
    // });

    // res.json(req.query); // req.query 는 자체가 JSON 형태

    const { name, price } = req.query;
    res.json({
        name,
        price,
    });
});
