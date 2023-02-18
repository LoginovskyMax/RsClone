import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthenticationModal from "../../Components/Authentication";
import Button from "../../Components/common/Button";
import useUserStore from "../../store";
import themeStore from "../../store/theme";
import languageStore from "../../store/language";

import "./style.scss";

const MainPage = () => {
  const [isModalClosed, setModalClosed] = useState(true);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.userName);
  const theme = themeStore((state) => state.isDark);
  const isEn = languageStore((state)=>state.isEn)
  const handler = () => {
    if (user === null) {
      setModalClosed(false);
    } else {
      navigate("/games");
    }
  };

  return (
    <div className={theme ? "main-page dark-theme" : "main-page"}>
      <img
        alt="Online games players"
        src="images/main.png"
        className="main-page__photo"
      />
      <p className="main-page__main-text">{isEn 
      ? "Начни играть вместе с Gaming Zone" 
      : "Let`s play with Gaming Zone"}</p>
      <p className="main-page__secondary-text">
        {isEn ? `Gaming Zone один из лучших сайтов онлайн игр, здесь вы гарантированно получите свою порцию веселья
        играя с друзьями или в одиночку`
        : `Gaming Zone has the best free online games selection and offers the most
        fun experience to play alone or with friends.`}
      </p>
      <Button className="main-page__button" onClick={handler}>
        {isEn ? "Начать" : "Get started"}
      </Button>
      {!isModalClosed && (
        <AuthenticationModal setModalClosed={() => setModalClosed(true)} />
      )}
    </div>
  );
};

export default MainPage;
