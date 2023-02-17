
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

### Разделы по работе с Back-End:
- [Авторизация](docs/auth.md)
- [Список Игр](docs/games.md)
- [Отзывы и реитинг (комментарии)](docs/comments.md)
- [Морской Бой](docs/seawar.md)
- [Работа с победителями, Back End](docs/win.md)