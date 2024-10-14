app.get("/hi", function (req, res) {
    res.json("Hi");
});

app.get("/hello", function (req, res) {
    res.json("Hello");
});

app.get("/nicetomeet", function (req, res) {
    res.json("Nice to meet you!");
});
