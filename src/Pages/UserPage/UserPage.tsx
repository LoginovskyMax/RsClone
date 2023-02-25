import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import { getUser } from "../../controller/UserControls";
import type { UserData } from "../../data/authData";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import { UserMainComp } from "./Components/UserMainData";
import styles from "./UserPage.module.scss";

const UserPage = () => {
  const navigate = useNavigate();
  const { isEn } = languageStore();
  const { userName } = useUserStore();
  const { setStatus } = useStatusStore();
  // const [usersArr, setUserArr] = useState<UsersList[]>([]);
  const [user, setUser] = useState<UserData | null>(null);

  // useEffect(() => {
  //   getUsers()
  //     .then((users) => setUserArr(users))
  //     .catch(({ message }) => setStatus({ isLoading: false, message }));
  // }, []);

  useEffect(() => {
    getUser(userName ?? "")
      .then((resUser) => setUser(resUser))
      .catch(({ message }) => setStatus({ isLoading: false, message }));
  });

  return (
    <div className={styles.main}>
      <h2>{isEn ? "Страинца пользователя" : "User page"}</h2>
      {!!user && <UserMainComp user={user} />}
      <Button onClick={() => navigate("/main")}>
        {isEn ? "К списку игр" : "On games page"}
      </Button>
    </div>
  );
};

export default UserPage;
