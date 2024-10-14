// -> GET + /test
// <-"TEST SUCCESS"
app.get("/test", (req, res) => {
    res.json("TEST SUCCESS");
});

// -> GET + /test/1
// <-"One!!"
app.get("/test/1", (req, res) => {
    res.json("One!!");
});
