# Морской бой Back-End :

Нужно установить WebSocket соединение по адресу: 

- глобально: `wss://rsgames.online:8001/` или локально: `wss://localhost:8001/`
- отправить сообщение со своим `token`'ом (см. авторизацию), которы при правильной авторизации хранится в cookie, он должен `userName` пользователя:
```JSON
{
	"type": "ws-connect",
	"data": {
		"player": "Jerubrin",
		"token": "{auth-token}"
	}
}
```
- ответное сообщение: в случае успеха:
```
{
	"type": "message",
	"message": "You are connected"
}
``` 
- ответное сообщение: в случае ошибки авторизации:

```JSON
{
	"type": "message",
	"message": "Wrong or expired token"
}
```
**&nbsp;**

## Сообщения для обмена данными с сервером игры:
Сообщения получаемые в ответ описаны в разделе "Сообщения получаемые с сервера". Они возвращаются при каждом успешном действии каждого из игроков подключенных к игре.

#### 1. Создание игры:
```JSON
{
	"type": "create",
	"data": null
}
```
#### 2. Подключение к игре:
```JSON
{
	"type": "join",
	"data": {
		"gameId": "{gameId}"
	}
}
```
Если игрок уже __был подключен к игре__, то его данные сохраняются, можно использовать, если пользователь перезагрузил страницу или потерял соединение с сервером.
`gameId` лучше всего хранить в `query-параметрах`

#### 3. Покинуть игру:
```JSON
{
	"type": "leave",
	"data": {
		"gameId": "{gameId}"
	}
}
```
Поле этого игрок удаляется из списка игроков и теряет все данные. Если игра началась - победа достается оставшемуся игроку.

#### 4. Начать игру:
```JSON
{
	"type": "start",
	"data": {
		"gameId": "{gameId}"
	}
}
```
Начать игру может только создатель игры, (если игрок создал игру, к нему подключился 2-й игрок, то после выхода 1-го игрока, создателем становится 2-й игрок.
Для начала игры, у второго игрока должен быть статус **"готов"** (`isReady`)

#### 5. Готов к игре:
```JSON
{
	"type": "ready",
	"data": {
		"gameId": "{gameId}"
	}
}
```
Выставить статус **"готов"** (`isReady`) у 2-го игрока. Без этого 1-й игрок не сможет начать игру.

#### 6. Не готов к игре:
```JSON
{
	"type": "not-ready",
	"data": {
		"gameId": "{gameId}"
	}
}
```
Убрать статус **"готов"** (`isReady`) у 2-го игрока.

#### 7. Задать позицию своих кораблей
```JSON
{
	"type": "set",
	"data": {
		"gameId": "{gameId}",
		"x": <координата-X>,
		"y": <координата-Y>
	}
}
```
- `x`, `y` - координаты, которые задаются. Каждое сообщение меняет состояние ячейки на противоположное, как `toggle` (если в ячейке было пусто - там будет ячейка корабля, если была ячейка корабля - она будет изменена на пустую)
- не работает во время игры.

#### 8. Ход (атаковать противника):
```JSON
{
	"type": "move",
	"data": {
		"gameId": "{gameId}",
		"x": <координата-X>,
		"y": <координата-Y>
	}
}
```
- `x`, `y` - координаты по которым производится атака противника.
- работает только во-время игры.

**&nbsp;**
## Сообщения получаемые с сервера: 
- Ответное сообщение сданными игры:
``` JSON
{
	"type": "game-data",
	"data": <GameData>
}
```
- Либо сообщение об ошибке:
``` JSON
{
	"type": "message",
	"data": "<Error message>"
}
```
#### Объект класса `GameData`
``` JSON
{
	"gameId": "<gameId>",
	"isStarted": true | false,
	"isMainUser": true | false,
	"player": <SeaWarPlayer>,
	"enemyName": "<userName>" | null,
	"isEnemyReady": true | false,
	"enemyField": <Array[10][10]>,
	"yourField": <Array[10][10]>,
	"winner": { userName, moves } | null
}
```
- `gameId` - идентификатор игры генерируется при создании.
- `isStarted` - началась ли игра?
- `moves` - количество сделанных ходов.
- `isMainUser` - является ли игрок создателем игры (ему доступна кнопка "старт/начать", когда другой игрок выставил режим "готов" (`isReady`)
- `player` - Объект с данными текущего игрока.
- `enemyName` - имя игрока-противника
- `isEnemyReady` - готов ли противник начать игру.
- `yourField` - матрица **10х10** с данными в вашем поле, значения полей:
	- `2` - клетка содержит корабль
	- `1` - пустая клетка
	- `0` - не известно (пустая клетка).
	- `-1` - клетка была атакована - мимо
	- `-2` клетка была атакована - попал
- `enemyField` - матрица **10х10** с данными о поле противника (данные те-же, что и у `yourField` только скрыты положения кораблей и "дырок" противника)
- `winner` - данные победителя, если значение `null` - игра еще не закончена.
	- `userName` - имя победителя
	- `moves` - кол-во ходов
#### Объект класса `SeaWarPlayer`
``` JSON
{
	"isLead": false,
	"isReady": false,
	"moves": 0,
	"ships": Array<Ship>[],
	"userName": "<userName>"
}
```
- `userName` - имя игрока
- `isLead` - доступно ли игроку сделать ход
- `isReady` - готов ли игрок к игре
- `moves` - кол-во сделанных ходов
- `ships` - массив с объектами класса `Ship`

#### Объект класса `Ship`
Доступны только когда статус `isReady: true` и/или игра началась
Пример корабля:
``` JSON
{ 
	"size": 2, 
	"cors": [
		[1, 1],
		[1, 2]
	]
}
```
- `size` - размер корабля
- `cors` - массив с координатами точек корабля.

## Сообщения об ошибках получаемые с сервера:
``` JSON
{
	"type": "message",
	"data": "<Error message>"
}
```
Все возможные сообщения от игры и сообщения об ошибках:
``` JS
{
	ERR_USER_NOT_FOUND: "This user is not connected to the game",
	ERR_NOT_ENOUGH: "Not enough players for start",
	ERR_WRONG_MAIN_PLAYER: "You don't have permission to start the game",
	ERR_NOT_ALL_READY: "Not all players are ready to start the game",
	ERR_WRONG_GAME_ID: "Game not found!",
	ERR_SERVER: "Server error!",
	ERR_WRONG_TOKEN: "Wrong or expired token",
	ERR_GAME_IS_FULL: "Maximum number of players in the game",
	ERR_GAME_IS_STARTED: "The game is already started, you can not change the position of the ships",
	USER_CONNECT: "User has joined the game",
	USER_DISCONNECT: "The user has disconnected from the game",
	USER_IS_READY: "User is ready to play",
	USER_IS_NOT_READY: "User is not ready to play",
	GAME_STARTED: "Game is started!",
	GAME_ENDED: "Game is ended!",
	WS_CONNECTED: "You are connected",
	WS_CREATED: "Game has been created!",
	MTX_WRONG_SHIPS: "Wrong ships count",
	MTX_WRONG_CELLS: "Wrong ships position",
}
```