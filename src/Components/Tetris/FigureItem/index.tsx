import type { CSSProperties, FC } from "react";
import { memo } from "react";

import type { Coordinates } from "../../../helpers/tetris/movement";
import "./style.scss";

interface IFigureItemProps {
  coordinates: Coordinates;
  backgroundColor: string;
}

const FigureItem: FC<IFigureItemProps> = ({ coordinates, backgroundColor }) => {
  const style: CSSProperties = {
    top: coordinates[0],
    left: coordinates[1],
    backgroundColor,
  };

  return <div className="figure-item" style={style} />;
};

export default memo(FigureItem);
