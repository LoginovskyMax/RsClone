# Работа с отзывами (комментариями), Back End

Основной адрес для запросов связанных с отзывами (комментариями):

- глобально: `https://rsgames.online:8888/games/comments`

- локально: `http://localhost:8000/games/comments`

### Запросы на сервер :

#### 1. Получить список комментариев
-  *address:*  **/games/comments[?gameName={gameName}]**
-  *method:*  `GET`
-  *successful response:* code: **200**
``` JSON
[
  {
    "userName": "Jerubrin",
    "gameName": "Sea War",
    "text": "Мега крутая игра! Очень понравилось писать к ней бэк ночами :D",
    "raiting": 5,
    "date": "2023-02-12T18:02:49.520Z"
  },
  //...
]
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Faild to get commets"
}
```
`gameName` - опциональный query-параметр, если задать имя игры, то будут выведены комментарии связанные с этой игрой, если его опустить - будут выведены все комментарии для всех игр.

#### 2. Добавить/изменить отзыв (комментарий)
-  *address:*  **/games/comments?gameName={gameName}**
-  *method:*  `POST`,
-  *header:*  `Authorization` with token
-  *body:*
``` JSON
{
  "text": "Текст отзыва",
  "raiting": 5,
}
```
Не одно из полей не является обязательным, имя пользователя для комментария получается из токена авторизации.
* `text` - по умолчанию задается как "No comment..."
* `raiting` - по умолчанию 5

-  *successful response:* code: **200**
``` JSON
{
  "user": "Test",
  "game": "Sea War",
  "text": "No comment...",
  "raiting": 4,
  "date": "2023-02-12T19:03:51.959Z"
}
```
-  *unsuccessful response:* code: **401**
``` JSON
{
  "message": "Wrong User Name"
}
```
-  *unsuccessful response:* code: **401**
``` JSON
{
  "message": "Wrong Game Name"
}
```
-  *unsuccessful response:* code: **400**
``` JSON
{
  "message": "Faild to save commet"
}
```
Пользователь может оставить только 1 отзыв, если отзыв уже был оставлен, и отправляется еще 1 запрос от того-же пользователя - происходит редактирование отзыва.

#### 3. Удаление отзыва (комментария)
  - *adress:* **/games/comments?gameName={gameName}**
  - *method:* `DELETE`, 
  - *header:*  `Authorization` with token
  - *successful response:* code: **204**

**Внимание:** Если не задать `gameName` - произойдет удаление всех комментариев пользователя

  - *unsuccessful response:* code: **404**
``` JSON
{
	"message": "Comment not found"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Faild to delete commet"
}
```
