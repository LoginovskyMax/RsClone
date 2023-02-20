import { type FC } from "react";

import { logoutUser } from "../../../controller/Auth";
import type { userSetter } from "../../../store";
import { nullUser } from "../../../store";
import "./style.scss";
import languageStore from "../../../store/language";
import { useNavigate } from "react-router-dom";
interface UserProps {
  username: string;
  setUser: userSetter;
}

const User: FC<UserProps> = ({ username, setUser }) => {
 const {isEn} = languageStore()
 const navigate = useNavigate()
  return (
    <div className="user">
      <div onClick={()=>navigate('/user/'+ username )} className="user__click">  
        <img className="user__image" alt="user" src="images/user.png" />
        <p className="user__text">{username}</p>
      </div>
      
      <button
        className="button"
        onClick={() => {
          logoutUser();
          setUser(nullUser);
        }}
      >
        {isEn ? "Выйти" : "Logout"}
      </button>
    </div>
  );
}

export default User;
