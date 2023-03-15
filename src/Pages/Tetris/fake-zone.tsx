import type { FC } from "react";
import { useEffect, useState } from "react";

import { Keys } from "../../helpers/tetris/movement";

const HIDE_TIMEOUT = 2000;

interface FakePlayZoneProps {
  keyPresser: (key: string) => void;
}

export const FakePlayZone: FC<FakePlayZoneProps> = ({ keyPresser }) => {
  const [hideControls, setHideControls] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideControls(true);
    }, HIDE_TIMEOUT);
  }, []);

  return (
    <div
      className={`tetris__fake-playzone ${
        hideControls && " tetris__fake-playzone_hide"
      }`}
    >
      <div
        className="tetris__rot-up"
        onClick={() => keyPresser(Keys.ArrowUp)}
      />
      <div className="tetris__middle">
        <div
          className="tetris__left"
          onClick={() => keyPresser(Keys.ArrowLeft)}
        />
        <div
          className="tetris__rot-middle"
          onClick={() => keyPresser(Keys.ArrowUp)}
        />
        <div
          className="tetris__right"
          onClick={() => keyPresser(Keys.ArrowRight)}
        />
      </div>
      <div
        className="tetris__down"
        onClick={() => keyPresser(Keys.ArrowDown)}
      />
    </div>
  );
};
