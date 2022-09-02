import express from "express";
import config from "./config";
import login from "./routers/login";

const app = express();

app.use(express.json());
app.use("/", login);

app.listen(config.appPort, () => {
    console.log(`Listening on port ${config.appPort}...`)
})