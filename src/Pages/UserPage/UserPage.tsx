import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../Components/common/Button";
import { getUserToken } from "../../controller/Auth";
import { getUser } from "../../controller/UserControls";
import { getGameWinsList, getUserWinsList } from "../../controller/Winners";
import type { UserData } from "../../data/authData";
import type { WinnerRes } from "../../data/winData";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import { UserMainComp } from "./Components/UserMainData";
import "./UserPage.scss";

const UserPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userNameParam = params.name;
  const { isEn } = languageStore();
  const { userName } = useUserStore();
  const [usersArr, setUserArr] = useState<UserData[]>([]);
  const [winArr, setWinArr] = useState<WinnerRes[]>([]);
  const { setStatus } = useStatusStore();
  // const [usersArr, setUserArr] = useState<UsersList[]>([]);
  const [user, setUser] = useState<UserData | null>(null);

  const loadUser = () => {
    setStatus({ isLoading: true, message: "" });
    const name = userNameParam === userName ? "" : userNameParam ?? "";

    getUser(name)
      .then((resUser) => setUser(resUser))
      .then(() => getUserWinsList(userNameParam ?? userName ?? ""))
      .then((wins) => setWinArr(wins))
      .then(() => setStatus({ isLoading: false, message: "" }))
      .then(() => console.log(user))
      .catch(({ message }) => setStatus({ isLoading: false, message }));
  };

  useEffect(() => {
    loadUser();
  }, [userNameParam]);

  return (
    <div className="main">
      <h4 className="main__name">
        {isEn ? "Страница пользователя" : "User page"}
      </h4>
      <UserMainComp user={user ?? undefined} refresh={loadUser} />
      <div className="main__game-list">
        {winArr.map((item, i) => (
          <div
            key={i}
            className="main__game-item"
            onClick={() => navigate(`/preview/${item.gameName}`)}
          >
            <p className="main__name">{item.gameName}</p>
            <p>
              {isEn ? "Максимум очков : " : "Max points : "}
              {item.points}
            </p>
            <p>
              {isEn ? "Положение в рейтинге : " : "Number in top :"}
              {item.position}
            </p>
          </div>
        ))}
      </div>

      <Button onClick={() => navigate("/main")}>
        {isEn ? "К списку игр" : "On games page"}
      </Button>

      {/* {status[0] === "admin" ? (
        <div className="main__admin">
          <h4 className="main_name">
            {isEn ? "Админ панель" : "Admin desk"}
          </h4>
          <Button onClick={getUsers">
            {isEn ? "Список пользователей" : "Users list"}
          </Button>
          <div className="main__list">
            {usersArr.map((user) => (
              <div key={user._id} className="main__user">
                <p>{user.userName}</p>
                <p>
                  {isEn ? "Статус " : "Status "} {user.status[0]}
                </p>
                <p>
                  {isEn ? "Забанен: " : "In ban: "}{" "}
                  {user.banned ? (isEn ? "Да" : "Yes") : isEn ? "Нет" : "No"}
                </p>
                {!user.banned ? (
                  <Button
                    onClick={() => banUser(true, user.userName)}
                    disabled={user.status[0] !== "user"}
                  >
                    {isEn ? "Забанить" : "Ban"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => banUser(false, user.userName)}
                    disabled={user.status[0] !== "user"}
                  >
                    {isEn ? "Снять бан" : "Unban"}
                  </Button>
                )}
                <Button
                  onClick={() => deleteUser(user.userName)}
                  disabled={user.status[0] !== "user"}
                >
                  {isEn ? "Удалить" : "Delete"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default UserPage;
