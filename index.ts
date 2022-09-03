import express from "express";
import config from "./config";
import login from "./routers/user";
import { auth } from "./middlewares/auth";
import file from "./routers/file";

const app = express();

app.use(express.json());
app.use("/", login);
app.use("/file", auth, file)

app.listen(config.appPort, () => {
    console.log(`Listening on port ${config.appPort}...`)
})