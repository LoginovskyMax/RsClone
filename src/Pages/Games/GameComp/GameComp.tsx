import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import type { GameItem } from "../games.data";
import StarsView from "../StarsView/StarsView";
import languageStore from "../../../store/language";

import "./Style.scss";

interface GameCompProps {
  gameItem: GameItem;
}

const GameComp: FC<GameCompProps> = ({ gameItem }) => {
  const navigate = useNavigate();
  const { isEn } = languageStore()
  return (
    <div
      className={`game-item
        ${gameItem.isComingSoon ? " game-item_coming-soon" : ""}`}
      style={{ backgroundImage: `url(${gameItem.image})` }}
      onClick={() => navigate(`/preview/${gameItem.name}`)}
    >
      <div className="game-item__wrapper">
        <div className="game-item__name">
          <h3>{gameItem.fullName}</h3>
          <h4>{isEn ? "Совсем скоро..." : "Coming soon..."}</h4>
        </div>
        <div className="game-item__rating">
          <StarsView rating={gameItem.raiting} starSize={20} />
        </div>
      </div>
    </div>
  );
};

export default GameComp;
