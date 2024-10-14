const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());

const youtubers = new Map();
const fields = JSON.stringify(["channel", "channelTitle", "subscribers", "videoCount"]);
let id = 0;
youtubers.set(++id, {
    channel: "@syukaworld",
    channelTitle: "슈카월드",
    subscribers: "336만명",
    videoCount: "1.7천개",
});
youtubers.set(++id, {
    channel: "@codingapple",
    channelTitle: "코딩애플",
    subscribers: "30만명",
    videoCount: "227개",
});
youtubers.set(++id, {
    channel: "@ZeroChoTV",
    channelTitle: "ZeroCho TV",
    subscribers: "4.33만명",
    videoCount: "1.3천개",
});

app.get(
    "/",
    (req, res, next) => {
        console.log(1);
        next();
    },
    (req, res) => {
        console.log(2);
        res.json("Hello World");
    },
);

app.get("/youtubers", (req, res) => {
    if (youtubers.size) res.json(Object.fromEntries(youtubers));
    else res.status(404).send("조회할 유튜버가 없습니다.");
});

app.get("/youtubers/:id", (req, res) => {
    const id = +req.params.id;
    const youtuber = youtubers.get(id);
    if (youtuber) {
        res.json(youtuber);
    } else {
        res.status(404).send("해당 유튜버를 찾을 수 없습니다.");
    }
});

app.post("/youtubers", (req, res) => {
    const reqFields = JSON.stringify(Object.keys(req.body));
    if (fields === reqFields) {
        youtubers.set(++id, req.body);
        res.status(201).json({
            message: `${req.body.channelTitle}님, 채널 개설을 환영합니다!`,
        });
    } else {
        res.status(400).send("Request body 에 field 가 잘못되었거나, 필요한 field가 없습니다");
    }
});

app.delete("/youtubers/:id", (req, res) => {
    const id = +req.params.id;
    const youtuber = youtubers.get(id);
    if (youtuber) {
        youtubers.delete(id);
        res.send(`${youtuber.channelTitle}님, 아쉽지만 다음에 또 만나요`);
        console.log(youtubers);
    } else {
        res.status(404).send(`요청하신 ${id}번 유튜버를 찾을 수 없습니다.`);
    }
});

app.delete("/youtubers", (req, res) => {
    if (youtubers.size) {
        youtubers.clear();
        // const star = String.fromCharCode(parseInt("2B50", 16)); // ⭐
        res.send(`계⭐정⭐폭⭐파`);
    } else {
        res.status(404).send("삭제할 계정이 없습니다.");
    }
});

app.put("/youtubers/:id", (req, res) => {
    const id = +req.params.id;
    const youtuber = youtubers.get(id);
    if (youtuber) {
        const preChannelTitle = youtuber.channelTitle;
        const newChannelTitle = req.body.channelTitle;
        youtuber.channelTitle = newChannelTitle;
        youtubers.set(id, youtuber);
        res.send(`채널명 '${preChannelTitle}' 이(가) '${newChannelTitle}' (으)로 변경되었습니다.`);
    } else {
        res.status(404).send(`요청하신 ${id}번 유튜버를 찾을 수 없습니다.`);
    }
});
