import type { FC } from "react";

import type { GameItem } from "../games.data";

interface GameCompProps {
  gameItem: GameItem;
}

const GameComp: FC<GameCompProps> = ({ gameItem }) => (
  <div className="game-item">
    <h3 className="game-item__name">{gameItem.name}</h3>
    <div
      className="game-item"
      style={{ background: `url(${gameItem.image})` }}
    />
  </div>
);

export default GameComp;
