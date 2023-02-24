import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import { getUserToken } from "../../controller/Auth";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import styles from "./UserPage.module.scss";
import type { IUsersList, IWinData } from "./UserPageData";

const UserPage = () => {
  const navigate = useNavigate();
  const { status } = useUserStore();
  const { isEn } = languageStore();
  const [usersArr, setUserArr] = useState<IUsersList[]>([]);
  const [winArr, setWinArr] = useState<IWinData[]>([]);
  const { setStatus } = useStatusStore();

  const getUsers = () => {
    setStatus({ isLoading: true, message: "" });
    fetch(`https://rsgames.online:8888/auth/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then<IUsersList[]>((response) => {
        setStatus({ isLoading: false, message: "" });

        return response.json();
      })
      .then((data) => setUserArr(data))
      .catch(({ message }) => setStatus({ isLoading: false, message }));
  };

  const getOneUser = (name: string) => {
    fetch(`https://rsgames.online:8888/auth/user?userName=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then<IUsersList>((response) => response.json())
      .then((user) => {
        const index = usersArr.findIndex((item) => item._id === user._id);
        const arr = [...usersArr];
        arr.splice(index, 1, user);
        setUserArr(arr);
      });
  };

  const banUser = (ban: boolean, userName: string) => {
    let path = `/auth/user/ban?userName=${userName}`;

    if (!ban) {
      path = `/auth/user/unban?userName=${userName}`;
    }

    fetch(`https://rsgames.online:8888${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    }).then((response) => {
      if (response.ok) {
        getOneUser(userName);
      }
    });
  };

  const deleteUser = (name: string) => {
    fetch(`https://rsgames.online:8888/auth/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
      body: JSON.stringify({ userName: name }),
    }).then((response) => {
      if (response.status === 204) {
        const index = usersArr.findIndex((item) => item.userName === name);
        const arr = [...usersArr];
        arr.splice(index, 1);
        setUserArr(arr);
      }
    });
  };

  const getWinData = () => {
    setStatus({ isLoading: true, message: "" });
    fetch(`https://rsgames.online:8888/win/data/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then<IWinData[]>((response) => {
        setStatus({ isLoading: false, message: "" });

        return response.json();
      })
      .then((data) => setWinArr(data))
      .catch(({ message }) => {
        setStatus({ isLoading: false, message });
      });
  };

  useEffect(() => {
    getWinData();
  }, []);

  return (
    <div className={styles.main}>
      <h4 className={styles.main_name}>
        {isEn ? "Страница пользователя" : "User page"}
      </h4>
      <div className={styles.main_gamelist}>
        {winArr.map((item, i) => (
          <div
            key={i}
            className={styles.main_gameitem}
            onClick={() => navigate(`/preview/${item.gameName}`)}
          >
            <p className={styles.main_name}>{item.gameName}</p>
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

      {status[0] === "admin" ? (
        <div className={styles.main__admin}>
          <h4 className={styles.main_name}>
            {isEn ? "Админ панель" : "Admin desk"}
          </h4>
          <Button onClick={getUsers}>
            {isEn ? "Список пользователей" : "Users list"}
          </Button>
          <div className={styles.main__list}>
            {usersArr.map((user) => (
              <div key={user._id} className={styles.main__user}>
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
      ) : null}
    </div>
  );
};

export default UserPage;
