import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../Components/common/Button";
import { getUser } from "../../controller/UserControls";
import { getUserWinsList } from "../../controller/Winners";
import type { UserData } from "../../data/authData";
import type { WinnerRes } from "../../data/winData";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";
import { ModerComp } from "./Components/context/ModerComp";

import { SearchUserComp } from "./Components/SearchUserComp";
import { UserMainComp } from "./Components/UserMainData";
import { WinsListComp } from "./Components/WinsListComp";
import "./UserPage.scss";
import { userStatus } from "./UserPageData";

const UserPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userNameParam = params.name;
  const { isEn } = languageStore();
  const { userName, status } = useUserStore();
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
      .catch(({ message }) => setStatus({ isLoading: false, message }));
  };

  useEffect(() => {
    loadUser();
  }, [userNameParam]);

  return (
    <div className="main">
      <h4 className="main__title">
        {isEn ? "Страница пользователя" : "User page"}
      </h4>
      <ModerComp
        isModer={
          status.includes(userStatus.moderator) ||
          status.includes(userStatus.admin)
        }
      >
        <SearchUserComp />
      </ModerComp>
      <UserMainComp user={user ?? undefined} refresh={loadUser} />
      <WinsListComp winArr={winArr} />

      <Button onClick={() => navigate("/main")}>
        {isEn ? "К списку игр" : "On games page"}
      </Button>
    </div>
  );
};

export default UserPage;
