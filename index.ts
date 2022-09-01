import express from "express";
import config from "./config";

const app = express();

app.listen(config.appPort, () => {
    console.log(`Listening on port ${config.appPort}...`)
})