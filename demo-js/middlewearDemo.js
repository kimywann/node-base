const express = require("express");
const app = express();

const requestURL = (req, res, next) => {
    console.log("Request URL: ", req.originalUrl);
    next();
};

const requestType = (req, res, next) => {
    console.log("Request Type: ", req.method);
    next();
};

const checkAuth = (req, res, next) => {
    console.log("Checked Authentication");
    next();
};

app.use(checkAuth);
app.use("/users/:id", requestURL, requestType);

app.get("/users/:id", (req, res) => {
    res.send(`Hello User${req.params.id}`);
});

app.listen(3000);
