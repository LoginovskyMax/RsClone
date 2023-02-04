
let usersArr = [
    {id:1,userName:'Vasya',password:123,status:'user',date:'12.10.2000'},
    {id:2,userName:'Max',password:123,status:'moderator',date:'12.10.2000'},
    {id:3,userName:'God',password:123,status:'admin',date:'12.10.2000'},
  ]
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

const express = require("express"),
https = require('https'),
http = require('http');
fs = require('fs');
app = express(),
cors = require('cors')
path = require("path") 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

let options =  {
    key: fs.readFileSync("backEnd/selfsigned.key","utf8"),
    cert: fs.readFileSync("backEnd/selfsigned.crt","utf8"),
  }
https
  .createServer(options,app)
  .listen(8000, ()=>{
    console.log('server is runing at port 8000')
  });
http
 .createServer(app).listen(8888,()=>{
    console.log('server is runing at port 8888')
 });

app.get("/",(req,res)=>{
    console.log('Hi');
    res.send({resp:"Hi"})
})

app.get("/gameData/:name",(req,res)=>{
 const name = req.params['name']
 let game = gamesData.find(item=>item.name === name)
 res.send(game)
})
app.post("/authUser",(req,res)=>{
    // { userName: 'Vasya', password: '123' } То что приходит 
    let user = usersArr.find(item=>item.userName == req.body.userName)
    if(user==undefined){
        let obj = {response:"Wrong name"}
        res.send(obj)
        // Если пользователя нет я отправялю Wrong name
    }else{
      if(user.password != req.body.password){
        let obj = {response:'Wrong password'}
        res.send(obj)
        // Если пароль не совпадает то я отправялю Wrong password
      }else{
        let obj = {response:user}
        res.send(obj)
        // Если все совпадает то я отправляю объект с пользователеc
      }
    }
})
app.post("/registUser",(req,res)=>{
    // { userName: 'ывпывпыв', password: '122223'}
    let body = req.body
    let user = usersArr.find(item=>item.userName===body.userName)
    if(user==undefined){
      body.id = Date.now()
      body.status = 'user'
      usersArr.push(body)
      let obj = {response:body}
      res.send(obj)
      }else{
        let obj = {response:'Choose other name'}
        res.send(obj)
        // Если такой пользователь уже существует то я отправляю Choose other name
    }
})







