import { useNavigate } from "react-router-dom";

import "./style.css";
import languageStore from "../../store/language";

const NotFound = () => {
  const navigate = useNavigate();
  const { isEn } = languageStore();

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-bg">
          <div />
          <div />
          <div />
        </div>
        <h1>{isEn ? "упс!" : "oops!"}</h1>
        <h2>
          {isEn
            ? "Ошибка 404 : Страница не найдена"
            : "Error 404 : Page Not Found"}
        </h2>
        <button className="button" onClick={() => navigate(`/`)}>
          {isEn ? "Вернутся" : "Go Back"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
