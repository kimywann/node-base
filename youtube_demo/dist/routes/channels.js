import express from "express";
import mariadb from "../mariadb.js";
import { body, param, validationResult } from "express-validator";
const router = express.Router();
router
    .route("/")
    .post(body("userId").notEmpty().isInt().withMessage("숫자 입력 필요"), body("name").notEmpty().isString().withMessage("문자 입력 필요"), checkValidation, async (req, res) => {
    // 채널 생성
    try {
        const { name, userId } = req.body;
        const sql = "INSERT INTO `channels` (??) VALUES (?)";
        const cols = ["name", "user_id"];
        const values = [name, userId];
        await mariadb.query(sql, [cols, values]);
        res.status(201).send(`${name}님, 채널을 응원합니다`);
    }
    catch (e) {
        const err = e;
        res.status(400).json(err);
    }
})
    .get(body("userId")
    .notEmpty()
    .withMessage("로그인이 필요한 페이지 입니다.")
    .isInt()
    .withMessage("숫자 입력 필요"), checkValidation, async (req, res) => {
    // 채널 전체 조회
    try {
        const { userId } = req.body;
        const sql = "SELECT * FROM `channels` WHERE `user_id`= ?";
        const values = [userId];
        const [channels] = await mariadb.query(sql, values);
        // 2) userId가 가진 채널이 없는 경우
        if (channels.length)
            res.json(channels);
        else
            notFoundChannel(res);
    }
    catch (e) {
        const err = e;
        res.status(400).json(err);
    }
});
router
    .route("/:id")
    .get(param("id").isInt().withMessage("숫자 입력 필요"), checkValidation, async (req, res) => {
    // 채널 개별 조회
    try {
        const id = +req.params.id;
        const sql = "SELECT * FROM `channels` WHERE `id`= ?";
        const values = [id];
        const [results] = await mariadb.query(sql, values);
        const channel = results[0];
        if (channel)
            res.json(channel);
        else
            notFoundChannel(res);
    }
    catch (e) {
        const err = e;
        res.status(400).json(err);
    }
})
    .delete(param("id").isInt().withMessage("숫자 입력 필요"), checkValidation, async (req, res) => {
    // 채널 삭제
    try {
        const id = +req.params.id;
        const selectSql = "SELECT `name` FROM `channels` WHERE `id`= ?";
        const values = [id];
        const [results] = await mariadb.query(selectSql, values);
        const channel = results[0];
        if (channel) {
            const deleteSql = "DELETE FROM `channels` WHERE `id`= ?";
            await mariadb.query(deleteSql, values);
            res.send(`${channel.name}님, 아쉽지만 다음에 또 만나요 😢`);
        }
        else
            notFoundChannel(res);
    }
    catch (e) {
        const err = e;
        res.status(400).json(err);
    }
})
    .put(param("id").isInt().withMessage("숫자 입력 필요"), checkValidation, async (req, res) => {
    // 채널 정보 수정
    try {
        const id = +req.params.id;
        const sql = "SELECT `name` FROM `channels` WHERE `id`= ?";
        const values = [id];
        const [results] = await mariadb.query(sql, values);
        const channel = results[0];
        if (channel) {
            const oldChannelName = channel.name;
            const newChannelName = req.body.name;
            const sql = "UPDATE `channels` SET `name` = ? WHERE `id`= ?";
            const values = [newChannelName, id];
            await mariadb.query(sql, values);
            res.send(`채널명이 '${oldChannelName}' 에서 '${newChannelName}' (으)로 변경되었습니다.`);
        }
        else {
            notFoundChannel(res);
        }
    }
    catch (e) {
        const err = e;
        res.status(400).json(err);
    }
});
function notFoundChannel(res) {
    res.status(404).send("채널 정보를 찾을 수 없습니다.");
}
function checkValidation(req, res, next) {
    const err = validationResult(req);
    if (err.isEmpty())
        next();
    else
        return res.status(400).json(err.array());
}
export default router;
