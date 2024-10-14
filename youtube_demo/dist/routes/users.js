import express from "express";
import mariadb from "../mariadb.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const privateKey = process.env.PRIVATE_KEY;
console.log(privateKey);
const router = express.Router();
// 로그인
router.post(
    "/login",
    body("email").notEmpty().isEmail().withMessage("이메일 입력 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 입력 필요"),
    checkValidation,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const sql = "SELECT * FROM `users` WHERE `email`= ? AND `password`= ?";
            const values = [email, password];
            const [results] = await mariadb.query(sql, values);
            const loginUser = results[0];
            if (loginUser) {
                const payload = { ...loginUser };
                const options = {
                    expiresIn: "30m",
                    issuer: "JaeHyeok",
                };
                const token = jwt.sign(payload, privateKey, options);
                res.cookie("token", token, { httpOnly: true });
                res.send(`${loginUser.name}님, 환영합니다`);
            } else res.status(403).send("아이디 또는 패스워드를 확인해주세요");
        } catch (e) {
            const err = e;
            res.status(404).json(err);
        }
    },
);
// 회원가입
router.post(
    "/join",
    body("email").notEmpty().isEmail().withMessage("이메일 입력 필요"),
    body("password").notEmpty().isString().withMessage("비밀번호 입력 필요"),
    body("name").notEmpty().isString().withMessage("이름 입력 필요"),
    body("tel").notEmpty().isString().withMessage("연락처 입력 필요"),
    checkValidation,
    async (req, res) => {
        try {
            const { email, password, name, tel } = req.body;
            const sql = "INSERT INTO users (??) VALUES (?)";
            const cols = ["email", "password", "name", "tel"];
            const values = [email, password, name, tel];
            const [results] = await mariadb.query(sql, [cols, values]);
            console.log(results);
            res.status(201).send(`🎉${name}님 환영합니다🎉`);
        } catch (e) {
            const err = e;
            res.status(404).json(err);
        }
    },
);
router
    .route("/users")
    .get(
        body("email").notEmpty().isEmail().withMessage("이메일 입력 필요"),
        checkValidation,
        async (req, res) => {
            // 회원 개별 조회
            try {
                const { email } = req.body;
                const sql = "SELECT * FROM `users` WHERE `email`=?";
                const values = [email];
                const [results] = await mariadb.query(sql, values);
                if (results.length) {
                    res.json(results);
                } else {
                    notFoundUser(res);
                }
            } catch (e) {
                const err = e;
                res.status(404).json(err);
            }
        },
    )
    .delete(
        body("email").notEmpty().isEmail().withMessage("이메일 입력 필요"),
        body("password").notEmpty().isString().withMessage("비밀번호 입력 필요"),
        checkValidation,
        async (req, res) => {
            // 회원탈퇴
            try {
                const { email, password } = req.body;
                const sql = "DELETE FROM `users` WHERE `email`= ? AND `password`= ?";
                const values = [email, password];
                const [results] = await mariadb.query(sql, values);
                if (results.affectedRows) res.send(`${email}님 아쉽지만 다음에 또 만나요 😢`);
                else notFoundUser(res);
            } catch (e) {
                const err = e;
                res.status(404).json(err);
            }
        },
    );
function notFoundUser(res) {
    res.status(404).send("회원을 찾을 수 없습니다");
}
function checkValidation(req, res, next) {
    const err = validationResult(req);
    if (err.isEmpty()) next();
    else return res.status(400).json(err.array());
}
export default router;
