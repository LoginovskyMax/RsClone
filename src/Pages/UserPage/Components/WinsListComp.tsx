import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import type { WinnerRes } from "../../../data/winData";
import languageStore from "../../../store/language";

import "../UserPage.scss";

interface WinsListCompProps {
  winArr: WinnerRes[];
}

export const WinsListComp: FC<WinsListCompProps> = ({ winArr }) => {
  const navigate = useNavigate();
  const { isEn } = languageStore();

  return (
    <div className="main__game-list">
      {winArr.map((item, i) => (
        <div
          key={i}
          className="main__game-item"
          onClick={() => navigate(`/preview/${item.gameName}`)}
        >
          <p className="main__name">{item.gameName}</p>
          <p className="main__points">
            {isEn ? "Рекорд: " : "Max points: "}
            {item.points}
          </p>
          <p className="main__position">
            {isEn ? "Позиция в топе: " : "Number in top:"}
            {item.position}
          </p>
        </div>
      ))}
    </div>
  );
};
