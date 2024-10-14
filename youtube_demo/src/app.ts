import express from "express";
import channelRouter from "./routes/channels.js";
import userRouter from "./routes/users.js";
const app = express();
app.listen(3000);
app.use(express.json());
app.use("/channels", channelRouter);
app.use("/", userRouter);
