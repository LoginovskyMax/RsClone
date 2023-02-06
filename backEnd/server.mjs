import * as fs from "fs";
import http from "http";
import https from "https";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { router } from "./auth.mjs";

const port = Number(process.env.PORT) || 8888;
const ports = Number(process.env.PORTS) || 8000;
const pass = process.env.PASS || "rs_temp_pass";

const gamesData = [{
  name:'Memorygame',
  comments : [
    {id:1,
     userName:'Vasya',
     text:'Клевая игра',
     data:'04.02.2023'}
  ],
  descriptionRu: 'Игра на память, хорошо развивает зрительную память и реакцию',
  descriptionEn: 'Игра на память, хорошо развивает зрительную память и реакцию',
  rulesRu: `После нажатия на кнопку старт карточки открываются, и у Вас есть 3 секунды чтобы запомнить их расположение,
  после чего, вы должны попарно открыть их за наименьшее количество попыток.`,
  rulesEn:'After press start ..',
  rating:5
},
{
  name:'othergames',
  comments : [
    {id:1,
     userName:'Vasya',
     text:'Клевая игра',
     data:'04.02.2023'}
  ],
  descriptionRu: 'Игра на память, хорошо развивает зрительную память и реакцию',
  descriptionEn: 'Игра на память, хорошо развивает зрительную память и реакцию',
  rulesRu: `После нажатия на кнопку старт карточки открываются, и у Вас есть 3 секунды чтобы запомнить их расположение,
  после чего, вы должны попарно открыть их за наименьшее количество попыток.`,
  rulesEn:'After press start ..',
  rating:5
}
]

/*
  {
    _id: [Object],
    userName: "Vasya",
    password: "123",
    status: "user",
    date: "12.10.2000",
  },
*/

const app = express();
app.use("/auth", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const options = {
  key: fs.readFileSync("backEnd/selfsigned.key", "utf8"),
  cert: fs.readFileSync("backEnd/selfsigned.crt", "utf8"),
};

await mongoose.connect(
  `mongodb+srv://rsgames:${pass}@cluster0.d9hevcc.mongodb.net/?retryWrites=true&w=majority`
);
https.createServer(options, app).listen(port, () => {
  console.log(`server is runing at port ${port}`);
});

http.createServer(app).listen(ports, () => {
  console.log(`server is runing at port ${ports}`);
});

app.get("/", (_req, res) => {
  console.log("Server is online");
  res.send({ resp: "Server is online" });
});

app.get("/gameData/:name",(req,res)=>{
  const name = req.params['name']
  let game = gamesData.find(item=>item.name === name)
  res.send(game)
 })
