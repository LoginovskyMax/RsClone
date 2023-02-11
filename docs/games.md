# Работа со списком игр, Back End
  
Основной адрес для запросов связанных с авторизацией:

- глобально: `https://rsgames.online:8888/games/...`

- локально: `http://localhost:8000/games/...`

### Запросы на сервер :

1. Получить список всех игр
-  *address:*  **/games/all/**
-  *method:*  `GET`
-  *successful response:* code: **200**
``` JSON
[
  {
    "_id": "<ID>",
    "name": "Название игры",
    "image": "url_to_picture",
    "descriptionRu": "Описание",
    "descriptionEn": "Description",
    "rulesRu": "Правила",
    "rulesEn": "Rules",
    "comments": [],
    "raiting": 5
  },
  //...
]
```
-  *unsuccessful response:* code: **404**
``` JSON
{
  "message": "Games not found!"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to get games list"
}
```

2. Получить описание игры:
-  *address:*  **/games/data?name={GameName}**
-  *method:*  `GET`
-  *successful response:* code: **200**
``` JSON
{
  "_id": "<ID>",
  "name": "Название игры",
  "image": "url_to_picture",
  "descriptionRu": "Описание",
  "descriptionEn": "Description",
  "rulesRu": "Правила",
  "rulesEn": "Rules",
  "comments": [],
  "raiting": 5
}
```
-  *unsuccessful response:* code: **404**
``` JSON
{
  "message": "Game not found!"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to get game"
}
```

3. Добавить игру (только для администратора)
-  *address:*  **/games/data/**
-  *method:*  `POST`,
-  *header:*  `Authorization` with token
-  *body:*
``` JSON
{
  "name": "Название игры",
  "image": "url_to_picture",
  "descriptionRu": "Описание",
  "descriptionEn": "Description",
  "rulesRu": "Правила",
  "rulesEn": "Rules",
  "raiting": 5
}
```
Обязательное поле `name` - название игры, остальные поля могут быть заполнены значением по умолчанию.
-  *successful response:* code: **200**
``` JSON
{
  "_id": "<ID>",
  "name": "Название игры",
  "image": "url_to_picture",
  "descriptionRu": "Описание",
  "descriptionEn": "Description",
  "rulesRu": "Правила",
  "rulesEn": "Rules",
  "comments": [],
  "raiting": 5
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to add game"
}
```

4. Изменить игру (только для администратора)
-  *address:*  **/games/data/**
-  *method:*  `PUT`,
-  *header:*  `Authorization` with token
-  *body:*
``` JSON
{
  "name": "Новое Название игры",
  "image": "new_url_to_picture",
  "descriptionRu": "Новое Описание",
  "descriptionEn": "New Description",
  "rulesRu": "Новые Правила",
  "rulesEn": "New Rules",
  "raiting": 3
}
```
Здесь нет обязательных полей, будут изменены только поля, оправленные в теле запроса. Можно изменять описание, правила, рейтинг и название игры.
-  *successful response:* code: **200**
``` JSON
{
  "_id": "<ID>",
  "name": "Название игры",
  "image": "url_to_picture",
  "descriptionRu": "Описание",
  "descriptionEn": "Description",
  "rulesRu": "Правила",
  "rulesEn": "Rules",
  "comments": [],
  "raiting": 5
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to add game"
}
```

5. Получить список созданных мултиплеер-игр
-  *address:*  **/games/list?name={gameName}**
-  *method:*  `GET`
Название игры пишется слитно, без пробелов.
-  *successful response:* code: **200**
``` JSON
[
  {
    "name": "SeaWar",
    "gameId": "<gameId>",
    "player": "Vasya",
    "maxPlayers": 2,
    "playersInGame": 1
  },
  //...
]
```
* name - название игры
* gameId - идентификатор игры, используется для подключения к игре
* player - имя "главного" игрока (создателя)
* maxPlayers - максимальное количество игроков в игре
* playersInGame - текущее кол-во игроков в игре
В массиве отображаются только не начатые и не законченные игры, после нажатия кнопки "старт" - игра не будет отображаться в списке игр.

-  *unsuccessful response:* code: **404**
``` JSON
{
  "message": "Games not found!"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Failed to get games list"
}
```