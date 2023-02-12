/* eslint-disable no-console */
import * as fs from "fs";
import http from "http";
import https from "https";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressWs from "express-ws";
import mongoose from "mongoose";

import { getGameData } from "./controllers/game-data-controller.mjs";
import { capchaGenerator } from "./data/capcha.mjs";
import { gameHttpRouter } from "./games.mjs";
import { router } from "./router.mjs";

dotenv.config();
const app = express();
expressWs(app);
const port = Number(process.env.PORT) || 8888;
const ports = Number(process.env.PORTS) || 8000;
const pass = process.env.PASS || "temp_pass";
const sslSrt = process.env.SSL_CRT || "backEnd/ssl/selfsigned.crt";
const sslKey = process.env.SSL_KEY || "backEnd/ssl/selfsigned.key";

app.use("/auth", router);
app.use("/games", gameHttpRouter);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const options = {
  key: fs.readFileSync(sslKey, "utf8"),
  cert: fs.readFileSync(sslSrt, "utf8"),
};

await mongoose.connect(
  `mongodb+srv://rsgames:${pass}@cluster0.d9hevcc.mongodb.net/?retryWrites=true&w=majority`
);
https.createServer(options, app).listen(port, () => {
  console.log(`https server is runing at port ${port}`);
});

http.createServer(app).listen(ports, () => {
  console.log(`http server is runing at port ${ports}`);
});

app.get("/", (_req, res) => {
  console.log("Server is online");
  res.send({ resp: "Server is online" });
});

app.get("/gameData/:name", getGameData);

const jsonParser = bodyParser.json();

app.get("/capcha", async (_req, res) => {
  const capchaRes = await capchaGenerator.newCapcha();
  res.json(capchaRes);
});

app.post("/capcha", jsonParser, (req, res) => {
  const { capchaToken, capchaValue } = req.body;
  const isCorrect = capchaGenerator.checkCorrectCapcha(
    capchaToken,
    capchaValue
  );
  res.json({ isCorrect });
});
