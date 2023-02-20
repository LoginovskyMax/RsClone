import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import { getUserToken } from "../../controller/Auth";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import styles from "./UserPage.module.scss";

interface UsersList {
  _id: string;
  userName: string;
  password: string;
  status: string[];
  date: string;
  __v: number;
  banned: boolean;
  email: string;
}

const UserPage = () => {
  const navigate = useNavigate();
  const { status } = useUserStore();
  const { isEn } = languageStore();
  const [usersArr, setUserArr] = useState<UsersList[]>([]);
  const { setStatus } = useStatusStore();

  const getUsers = () => {
    fetch(`https://rsgames.online:8888/auth/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then<UsersList[]>((response) => response.json())
      .then((data) => setUserArr(data))
      .catch(({ message }) => setStatus({ isLoading: false, message }));
  };

  const getUser = (name: string) => {
    fetch(`https://rsgames.online:8888/auth/user?userName=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then<UsersList>((response) => response.json())
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
        getUser(userName);
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

  return (
    <div className={styles.main}>
      <h1>{isEn ? "Страинца пользователя" : "User page"}</h1>

      <Button onClick={() => navigate("/main")}>
        {isEn ? "К списку игр" : "On games page"}
      </Button>
      {status[0] === "admin" ? (
        <div className={styles.main__admin}>
          <h4>{isEn ? "Админ панель" : "Admin desk"}</h4>
          <Button onClick={getUsers}>
            {isEn ? "Список пользователей" : "Users list"}
          </Button>
          <div className={styles.main__list}>
            {usersArr.map((user) => (
              <div key={user._id} className={styles.main__user}>
                <p>{user.userName}</p>
                <p>{user.status[0]}</p>
                <p>{user.banned.toString()}</p>

                {!user.banned ? (
                  <Button
                    onClick={() => banUser(true, user.userName)}
                    disabled={user.status[0] !== "user"}
                  >
                    Забанить
                  </Button>
                ) : (
                  <Button
                    onClick={() => banUser(false, user.userName)}
                    disabled={user.status[0] !== "user"}
                  >
                    Снять бан
                  </Button>
                )}
                <Button
                  onClick={() => deleteUser(user.userName)}
                  disabled={user.status[0] !== "user"}
                >
                  Удалить
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
