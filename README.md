
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

**! Для корректной работы локального сервера нужен файл `.env` в корне проекта**
``` JS
PORT=8888
PORTS=8000
PASS=******
KEY=*********
SMTP_HOST=mail.rsgames.online
SMTP_PORT=587
SMTP_USER=info@rsgames.online
SMTP_PASS=*******
HOST=rsgames.online
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Запросы на сервер :

1. Регистрация (registration)
  - *adress:* **/auth/regist/**
  - *method:* `POST`, 
  - *body:*

``` JSON
{
	"userName": "Vasya",
	"email": "vasya.371@mail.ru",
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
Полученный токен используется для авторизации пользователя. (см. Токен пользователя)

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

4. Запрос восстановления доступа (забыл пароль)
  - *adress:* **/auth/forgotpass/**
  - *method:* `POST`, 
  - *body:*
``` JSON
{ "userName": "Vasya" }
```
или
``` JSON
{ "email": "vasya.371@mail.ru" }
```
  - *unsuccessful response:* code: **401**
``` JSON
{
	"message": "Wrong Input Data"
}
```
  - *unsuccessful response:* code: **404**
``` JSON
{
	"message": "User not found"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Reset Error"
}
```
  - *successful response:* code: **200**
``` JSON
{
	"message": "E-mail sended to vasya.371@mail.ru",
	"resetToken": "8q7d3syf-q5gj-6ad6-1sb3-72sgx2d4djs1"
}
```
После этого на e-mail указанный при регистрации пользователя _(vasya.371@mail.ru)_ будет отправлена ссылка для сброса пароля, формата:
`https://rsgames.online/resetpass?resetToken=8q7d3syf-q5gj-6ad6-1sb3-72sgx2d4djs1`
Используйте страницу `https://rsgames.online/resetpas` и query-параметр `resetToken`  для сброса пароля. Используя для этого следующий запрос:

5. Восстановления доступа - новый пароль
  - *adress:* **/auth/setpass/**
  - *method:* `POST`, 
  - *body:*
``` JSON
{ 
	"password": "NewPassword",
	"resetToken": "8q7d3syf-q5gj-6ad6-1sb3-72sgx2d4djs1"
}
```
После выполнения запроса, при правильно указанном `resetToken` - пароль пользователя будет изменен на новый.
  - *unsuccessful response:* code: **404**
``` JSON
{
	"message": "User not found"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Password Reset Error"
}
```
  - *successful response:* code: **200**
``` JSON
{
	"message": "Password has been changed!"
}
```

6. Удаление пользователя (доступно администратору)
  - *adress:* **/auth/user/**
  - *method:* `DELETE`, 
  - *body:*
``` JSON
{ 
	"userName": "Vasya"
}
```
  - *unsuccessful response:* code: **404**
``` JSON
{
	"message": "User not found"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Failed to delete user"
}
```
  - *successful response:* code: **204**

## Токен пользователя
Для авторизированного пользователя, чтобы сообщить серверу, какой пользователь отправляет запросы, нужно отправлять на сервер запросы с заголовком __"Authorization"__ тогда сервер сможет корректно обрабатывать запросы:
  - *Header Name:* `Authorization`
  - *Header Value:* `Bearer {user-token-value}` 
Значение полученного токена - `user-token-value`, пишется без `{` и `}`  :)
