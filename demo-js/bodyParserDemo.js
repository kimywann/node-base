const express = require("express");
const app = express();

app.listen(3000);
app.use(express.json());

app.post("/profile", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
