import type { FC } from "react";
import { useEffect, useState } from "react";

import "./style.scss";

import FinishModal from "../../Components/Tetris/FinishModal";
import Item from "../../Components/Tetris/Item";
import { useControls } from "../../helpers/tetris/hooks/useControls";
import type { Movements } from "../../helpers/tetris/movement";
import { rotations, Keys } from "../../helpers/tetris/movement";

const Tetris: FC = () => {
  const {
    figures,
    moveRight,
    moveLeft,
    moveBottom,
    rotateRight,
    rotateLeft,
    score,
    isGameActive,
    resetGame,
  } = useControls();

  const [isModalClosed, setModalClosed] = useState(true);

  const onResetClick = () => {
    setModalClosed(true);
    resetGame();
  };

  useEffect(() => {
    if (!isGameActive) {
      setModalClosed(false);
    }
  }, [isGameActive]);

  window.onkeydown = (ev: KeyboardEvent) => {
    const movements: Movements = {
      [Keys.ArrowRight]: moveRight,
      [Keys.ArrowLeft]: moveLeft,
      [Keys.ArrowDown]: moveBottom.current,
      [Keys.R]: rotateLeft,
      [Keys.r]: rotateRight,
    };
    rotations(ev.key, movements)();
  };

  return (
    <div className="tetris">
      <FinishModal
        isModalClosed={isModalClosed}
        setModalClosed={() => setModalClosed(true)}
        points={score}
        reset={onResetClick}
      />
      <div className="tetris__playzone">
        {figures.map((figure, id) => (
          <Item key={id} coords={figure.coordinates} color={figure.color} />
        ))}
      </div>
      <div className="tetris__points">
        <p className="tetris__text">{score}</p>
      </div>
    </div>
  );
};

export default Tetris;
