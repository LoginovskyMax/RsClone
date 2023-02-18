# Работа с победителями, Back End

  
Основной адрес для запросов связанных с авторизацией:

- глобально: `https://rsgames.online:8888/games/...`

- локально: `http://localhost:8000/games/...`

## Запросы на сервер :

### 1. Получить список всех побед текущего пользователя:
-  *address:*  **/win/data/**
-  *method:*  `GET`
-  *header:*  `Authorization` with token
-  *successful response:* code: **200**
``` JSON
[
  {
    "_id": "<id>",
    "userName": "Vasya",
    "gameName": "Chapayev"
    "points": 190,
    "date": "2023-02-17T05:36:18.842Z",
    "position": 4
  }
  // ...
]
```
Возвращаемые значения:
  * __userName__ - Имя пользователя.
  * __gameName__ - Название игры.
  * __points__ - Кол-во максимальных баллов в игре (рекорд).
  * __date__ - дата рекорда.
  * __position__ - позиция в общем рейтинге.
  
-  *unsuccessful response:* code: **405**
``` JSON
{
  "message": "User not authorized"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to add winner"
}
```

### 2. Получить список всех победителей игры (по рейтингу):
-  *address:*  **/win/data?game={gameName}**
-  *method:*  `GET`
-  *header:*  `Authorization` with token
-  *successful response:* code: **200**
``` JSON
[
  {
    "_id": "<id>",
    "userName": "Vasya",
    "gameName": "Chapayev",
    "points": 200,
    "date": "2023-02-17T05:36:40.990Z"
  },
  {
    "_id": "<id>",
    "userName": "Zoya",
    "gameName": "Chapayev",
    "points": 190,
    "date": "2023-02-17T05:36:18.842Z"
  }
  // ...
]
```
Возвращаемые значения:
  * __userName__ - Имя пользователя.
  * __gameName__ - Название игры.
  * __points__ - Кол-во максимальных баллов в игре (рекорд).
  * __date__ - дата рекорда.
  
-  *unsuccessful response:* code: **405**
``` JSON
{
  "message": "User not authorized"
}
```
-  *unsuccessful response:* code: **404**
``` JSON
{
  "message": "Game not found"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to add winner"
}
```

### 3. Создать нового победителя:
-  *address:*  **/win/data/**
-  *method:*  `POST`
-  *header:*  `Authorization` with token
-  *body:*
``` JSON
{
  "game": "Chapayev",
  "points": 1000000
}
```
-  *successful response:* code: **200**
``` JSON
{
  "_id": "<id>",
  "userName": "Vasya",
  "gameName": "SeaBattle",
  "points": 220,
  "date": "2023-02-17T11:29:29.325Z"
}
```
Возвращаемые значения:
  * __userName__ - Имя пользователя.
  * __gameName__ - Название игры.
  * __points__ - Кол-во максимальных баллов в игре (рекорд).
  * __date__ - дата рекорда.
  

-  *unsuccessful response:* code: **405**
``` JSON
{
  "message": "User not authorized"
}
```
-  *unsuccessful response:* code: **404**
``` JSON
{
  "message": "Game not found"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to add winner"
}
```