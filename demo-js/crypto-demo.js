import crypto from "crypto";

// 비밀번호 암호화
const password = "1111";
const salt = crypto.randomBytes(64).toString("base64");
const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");

console.log(hashedPassword);
