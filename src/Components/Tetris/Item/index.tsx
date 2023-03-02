import type { FC } from "react";
import { memo } from "react";

import type { Coordinates } from "../../../helpers/tetris/movement";
import FigureItem from "../FigureItem";

import "./style.scss";

interface IItemProps {
  coords: Coordinates[];
  color: string;
}

const Item: FC<IItemProps> = ({ coords, color }) => (
  <div className="wrapper">
    {coords.map((coordinates, index) => (
      <FigureItem
        coordinates={coordinates}
        key={index}
        backgroundColor={color}
      />
    ))}
  </div>
);

export default memo(Item);
