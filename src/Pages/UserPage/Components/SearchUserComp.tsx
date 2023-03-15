import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../../controller/UserControls";
import type { UserData } from "../../../data/authData";
// eslint-disable-next-line import/order
import languageStore from "../../../store/language";

import { DEFAULT_PICTURE } from "../UserPageData";

import "../UserPage.scss";

const BLUR_TIMEOUT = 200;

export const SearchUserComp: FC = () => {
  const { isEn } = languageStore();
  const [usersArr, setUserArr] = useState<UserData[]>([]);
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  const search = (userName: string) => {
    if (userName === "") {
      setUserArr([]);
    } else {
      getUsers(userName).then((users) => setUserArr(users.slice(0, 8)));
    }
  };

  return (
    <div className="search-user">
      <input
        placeholder={isEn ? "Поиск пользователя..." : "Search user..."}
        onChange={(e) => search(e.target.value)}
        onFocus={(e) => {
          search(e.target.value);
          setShowList(true);
        }}
        onBlur={() =>
          setTimeout(() => {
            setShowList(false);
          }, BLUR_TIMEOUT)
        }
      />
      {!!usersArr.length && showList && (
        <div className="search-user__list">
          {usersArr.map((user) => (
            <div
              // eslint-disable-next-line no-underscore-dangle
              key={user._id}
              className="search-user__item"
              onClick={() => navigate(`/user/${user.userName}`)}
            >
              <div
                className="search-user__item-picture"
                style={{
                  backgroundImage: user.image
                    ? `url(${user.image})`
                    : `url(${DEFAULT_PICTURE})`,
                }}
              />
              <div className="search-user__item-username">{user.userName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
