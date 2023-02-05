
# RsClone

Clone of steam for final task

## Back-End

- Адрес **back-end** сервера с ssl (**в преоритете**):
https://rsgames.online:8888/

- Адрес **back-end** сервера:
http://rsgames.online:8000/

Если по каким-то причинам удаленный сервер "лежит" и не отвечает можно запустить локальный сервер:
Команда для запуска сервера:
```bash
npm run serve 
```
**! в другом терминале**
- Адрес локального **back-end** сервера:
http://localhost:8000
- Адрес локального **back-end** сервера с ssl:
https://localhost:8888/

! **Чтобы localhost работал с https запросами в хроме** ввести `chrome://flags/#allow-insecure-localhost` поставить в `enabled`

### Запросы на сервер :

1. Регистрация (registration)
  - *adress:* **/auth/regist/**
  - *method:* `POST`, 
  - *body:*

``` JSON
{
	"userName": "Vasya",
	"password": "123456"
}
```
  - *successful response:* code: **200**
``` JSON
{
	"message": "New User has been successfully created!"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "User is allredy registred"
}
```

2. **Авторизация** (login)
  - *adress:* **/auth/login/**
  - *method:* `POST`, 
  - *body:*

``` JSON
{
	"userName": "Vasya",
	"password": "123456"
}
```
  - *unsuccessful response:* code: **405**
``` JSON
{
	"message": "Incorrect password for {userName}"
}
```
  - *unsuccessful response:* code: **404**
``` JSON
{ 
	"message": "User {userName} not found"
}
```
  - *successful response:* code: **200**
``` JSON
{
	"token": "eyJhbGciOiJOEzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGZ2Ma6lMmRiZjJjZGM0NTQzNzU0NiIsInN0YXR1c2VzIjpbImFkbWluIl0sImlhdCI6MTY3NTYyMTI3MSwiZX2wIjoxNjc1Nzk0MDcxfQ.DV-pTi3ICN65nh3HAoqI-A6HCg62OoufR8Bgw45oq8Y"
}
```
Полученный токен используется для авторизации пользователя. (см. Токен)

3. **Получение списка пользователей** (users list)
  - *adress:* **/auth/users/**
  - *method:* `GET`, 
  - *header:* `Authorization` with token
  - *unsuccessful response:* code: **405**
``` JSON
{
	"message": "You do not have permission"
}
```
  - *unsuccessful response:* code: **405**
``` JSON
{
	"message": "You do not have permission"
}
```
  - *successful response:* code: **200**
``` JSON
[
  {
 	"_id": "63dfd49b2571ef2e8ea3113d",
 	"userName": "Vasya",
 	"password": "$2A$07$isD5IKBkZasc8fUjEa9SGO4.btlmL3cq0FkT0m4scZpUMX3sHEOFu",
 	"status": [ "user" ],
 	"date": "2023-02-05T16:08:59.414Z",
 	"__v": 0
   },
...
]
```
Выводится список всех пользователей, команда доступна только пользователям со статусом admin

## Токен пользователя
Для авторизированного пользователя, чтобы сообщить серверу, какой пользователь отправляет запросы, нужно отправлять на сервер запросы с заголовком __"Authorization"__ тогда сервер сможет корректно обрабатывать запросы:
  - *Header Name:* `Authorization`
  - *Header Value:* `Bearer {user-token-value}` 
Значение полученного токена - `user-token-value`, пишется без `{` и `}`  :)
