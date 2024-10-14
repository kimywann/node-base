const express = require("express");
const app = express();
app.listen(3000);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/test", (req, res) => {
    res.send(req.body);
});
