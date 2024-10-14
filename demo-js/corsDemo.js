const express = require("express");
const app = express();
const cors = require("cors");
app.listen(3000);

const corsOptions = {
    origin: "https://example.com",
};
app.use(cors(corsOptions)); // 특정 도메인에 대해서만 허용

app.get("/", (req, res) => {
    res.send();
});
