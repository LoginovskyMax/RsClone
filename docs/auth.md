# Регистрация и авторизация пользователя, Back End

Основной адрес для запросов связанных с авторизацией:
- глобально: `https://rsgames.online:8888/auth/...` 
- локально: `http://localhost:8000/auth/...`

### Запросы на сервер :

1. Регистрация (registration)
  - *address:* **/auth/regist/**
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
  - *address:* **/auth/login/**
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
  - *address:* **/auth/users/**
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
  // ...
]
```
Выводится список всех пользователей, команда доступна только пользователям со статусом admin

4. Запрос восстановления доступа (забыл пароль)
  - *address:* **/auth/forgotpass/**
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
  - *address:* **/auth/setpass/**
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
  - *address:* **/auth/user/**
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

7. Получение данных о пользователе:
  - *address:* **/auth/myuser/**
  - *method:* `GET`, 
  - *header:* `Authorization` with token
  - *unsuccessful response:* code: **403**
``` JSON
{
	"message": "User not authorized"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Failed to get users"
}
```
  - *successful response:* code: **200**
``` JSON
{
  "userName": "Vasya",
  "email": "vasya.371@mail.ru",
  "status": [
    "admin"
  ],
  "banned": false,
  "date": "2023-02-06T09:07:46.283Z"
}
```

8. Изменение статуса пользователя (доступно администратору)
  - *address:* **/auth/user/**
  - *method:* `PUT`, 
  - *body:*
``` JSON
{ 
	"userName": "Vasya"
}
```
  - *unsuccessful response:* code: **405**
``` JSON
{
	"message": "You do not have permission"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Failed to set new status"
}
```
  - *successful response:* code: **200**
``` JSON
{
   "message": "Status changed",
   "user": <User>
}
```
Изменяет заменяет массив статусов пользователя на новый.

9. Получение данных о другом пользователе (доступно администратору и модератору):
  - *address:* **/auth/user?userName={userName}**
  - *method:* `GET`, 
  - *header:* `Authorization` with token
  - *unsuccessful response:* code: **403**
``` JSON
{
	"message": "User not authorized"
}
```
  - *unsuccessful response:* code: **400**
``` JSON
{
	"message": "Failed to get user"
}
```
  - *successful response:* code: **200**
``` JSON
{
  "userName": "Vasya",
  "email": "vasya.371@mail.ru",
  "status": [
    "admin"
  ],
  "banned": false,
  "date": "2023-02-06T09:07:46.283Z"
}
```

10. Забанить пользователя (доступно администратору и модератору):
  - *address:* **/auth/user/ban?userName={userName}**
  - *method:* `GET`, 
  - *header:* `Authorization` with token
  - *successful response:* code: **200**
``` JSON
{
    "message": "User Vasya has been banned"
}
```

11. Разбанить пользователя (доступно администратору и модератору):
  - *address:* **/auth/user/unban?userName={userName}**
  - *method:* `GET`, 
  - *header:* `Authorization` with token
  - *successful response:* code: **200**
``` JSON
{
    "message": "User Vasya has been unbanned"
}
```

## Токен пользователя
Для авторизированного пользователя, чтобы сообщить серверу, какой пользователь отправляет запросы, нужно отправлять на сервер запросы с заголовком __"Authorization"__ тогда сервер сможет корректно обрабатывать запросы:
  - *Header Name:* `Authorization`
  - *Header Value:* `Bearer {user-token-value}` 
Значение полученного токена - `user-token-value`, пишется без `{` и `}`  :)
