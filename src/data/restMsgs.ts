interface IRoutesMap {
  [index: string]: string;
}

const ALL_MESSAGES: IRoutesMap = {
  "Wrong Input Data": "Wrong Input Data",
  "User not found": "User not found",
  "Password has been changed!": "Password has been changed!",
  "Password Reset Error": "Password Reset Error",
  "Incorrect password": "Incorrect password",
  "Password Changing Error": "Password Changing Error",
  "Error: Cannot get userName": "Error: Cannot get userName",
  "Validation error": "Validation error",
  "User is allredy registred": "User is allredy registred",
  "User with current email is allredy registred":
    "User with current email is allredy registred",
  "New User has been successfully created!":
    "New User has been successfully created!",
  "Registration Error": "Registration Error",
  "Login Error": "Login Error",
  "Failed to get users": "Failed to get users",
  "Failed to get user": "Failed to get user",
  "You can not changed this admin status!":
    "You can not changed this admin status!",
  "Status changed": "Status changed",
  "Failed to set new status": "Failed to set new status",
  "You can not delete this user!": "You can not delete this user!",
  "User has been deleted": "User has been deleted",
  "Failed to delete user": "Failed to delete user",
  "User has been banned": "User has been banned",
  "User has been unbanned": "User has been unbanned",
  "Failed to ban user": "Failed to ban user",

  "Games not found!": "Games not found!",
  "Failed to get games list": "Failed to get games list",
  "Failed to get game": "Failed to get game",
  "Failed to add game": "Failed to add game",
  "Failed to edit game": "Failed to edit game",
  "Faild to get commets": "Faild to get commets",
  "Wrong User Name": "Wrong User Name",
  "Wrong Game Name": "Wrong Game Name",
  "Faild to save commet": "Faild to save commet",
  "Comment not found": "Comment not found",
  "Faild to delete commet": "Faild to delete commet",

  "User is not authorized": "User is not authorized",
  "User is banned": "User is banned",
  "Game not found": "Game not found",
  "Failed to add winner": "Failed to add winner",
  "Failed to get winner": "Failed to get winner",

  "User not authorized": "User not authorized",
  "You do not have permission": "You do not have permission",
  "You are banned!": "You are banned!",
  "Вы забанены!": "You are banned!",

  "You have successfully registered!": "You have successfully registered!",
  "You are logged in": "You are logged in",

  "This user is not connected to the game":
    "This user is not connected to the game",
  "Not enough players for start": "Not enough players for start",
  "You don't have permission to start the game":
    "You don't have permission to start the game",
  "Not all players are ready to start the game":
    "Not all players are ready to start the game",
  "Game not found!": "Game not found!",
  "Server error!": "Server error!",
  "Wrong or expired token": "Wrong or expired token",
  "Maximum number of players in the game":
    "Maximum number of players in the game",
  "The game is already started, you can not change the position of the ships":
    "The game is already started, you can not change the position of the ships",
  "User has joined the game": "User has joined the game",
  "The user has disconnected from the game":
    "The user has disconnected from the game",
  "User is ready to play": "User is ready to play",
  "User is not ready to play": "User is not ready to play",
  "Game is started!": "Game is started!",
  "Game is ended!": "Game is ended!",
  "You are connected": "You are connected",
  "Game has been created!": "Game has been created!",
  "Wrong ships count": "Wrong ships count",
  "Wrong ships position": "Wrong ships position",

  "You win!": "You win!",
  "You lose": "You lose",
};

const ALL_MESSAGES_RU: IRoutesMap = {
  "Wrong Input Data": "Не верный ввод",
  "User not found": "Пользователь не найден",
  "Password has been changed!": "Password has been changed!",
  "Password Reset Error": "При сбросе пароля возникла ошибка",
  "Incorrect password": "Не верный пароль",
  "Password Changing Error": "Ошибка изменения пароля",
  "Error: Cannot get userName": "Ошибка: Не возможно получить Имя Пользователя",
  "Validation error": "Ошибка валидации",
  "User is allredy registred": "Такой пользователь уже зарегистрирован",
  "User with current email is allredy registred":
    "Пользователь с таким email'ом уже зарегистрирован",
  "New User has been successfully created!":
    "Новый пользователь успешно создан!",
  "Registration Error": "Ошибка регистрации",
  "Login Error": "Ошибка входа",
  "Failed to get users": "Не удалось получить пользователей",
  "Failed to get user": "Не удалось получить пользователя",
  "You can not changed this admin status!":
    'Вы не можете изменять статус "admin" у данного пользователя!',
  "Status changed": "Статус изменен",
  "Failed to set new status": "Не удалось задать новый статус",
  "You can not delete this user!": "Вы не можете удалить данного пользователя!",
  "User has been deleted": "Пользователь успешно удален",
  "Failed to delete user": "Не удалось удалить пользователя",
  "User has been banned": "Пользователь забанен",
  "User has been unbanned": "Пользователь разбанен",
  "Failed to ban user": "Не удалось забанить пользователя",

  "Games not found!": "Игра не найдена!",
  "Failed to get games list": "Не удалось загрузить список игр",
  "Failed to get game": "Не удалось загрузить игру",
  "Failed to add game": "Не удалось добавить игру",
  "Failed to edit game": "Не удалось изменить игру",
  "Faild to get commets": "Не удалось загрузить комментарии",
  "Wrong User Name": "Не верное Имя Пользователя",
  "Wrong Game Name": "Не верное название игры",
  "Faild to save commet": "Не удалось сохранить комментарий",
  "Comment not found": "Комментарий не найден",
  "Faild to delete commet": "Не удалось удалить комментарий",

  "User is not authorized": "Пользователь не авторизирован",
  "User is banned": "Пользователь забанен",
  "Game not found": "Игра не найдена",
  "Failed to add winner": "Не удалось добавить победителя",
  "Failed to get winner": "Не удалось загрузить победителя",

  "User not authorized": "Пользователь не авторизован",
  "You do not have permission": "У вас нет прав для выполнения операции",
  "You are banned!": "Вы забанены!",
  "Вы забанены!": "Вы забанены!",

  "You have successfully registered!": "Вы успешно зарегистрированны!",
  "You are logged in": "Вы вошли в систему",

  "This user is not connected to the game": "Пользователь не подключен к игре",
  "Not enough players for start": "Не хватает игрока для старта",
  "You don't have permission to start the game": "У вас нет прав начать игру",
  "Not all players are ready to start the game":
    "Другой пользователь не подтвердил готовность к игре",
  "Game not found!": "Игра не найдена!",
  "Server error!": "Ошибка сервера!",
  "Wrong or expired token": "Не верный или истегший токен",
  "Maximum number of players in the game":
    "Максимальное количество плееров в игре",
  "The game is already started, you can not change the position of the ships":
    "Игра уже началась, вы не можете изменять позицию своих кораблей",
  "User has joined the game": "Пользователь присоеденился к игре",
  "The user has disconnected from the game": "Пользователь покинул игру",
  "User is ready to play": "Игрок готов начать игру",
  "User is not ready to play": "Пользователь не готов к игре",
  "Game is started!": "Игра началась!",
  "Game is ended!": "Игра окончена!",
  "You are connected": "Вы присоеденились",
  "Game has been created!": "Игра создана!",
  "Wrong ships count": "Не верное количество кораблей",
  "Wrong ships position": "Не верное положение кораблей",

  "You win!": "Вы победили!",
  "You lose": "Вы проиграли",
};

export const MESSAGES_EN = new Proxy(ALL_MESSAGES, {
  get(target, prop: string) {
    if (prop.substring(0, 16) === "E-mail sended to") {
      return prop;
    }

    return target[prop] ?? "Connection Error!";
  },
});

export const MESSAGES_RU = new Proxy(ALL_MESSAGES_RU, {
  get(target, prop: string) {
    if (prop.substring(0, 16) === "E-mail sended to") {
      return prop.replace("E-mail sended to", "Письмо отправелнно на почту:");
    }

    return target[prop] ?? "Ошибка соединения!";
  },
});
