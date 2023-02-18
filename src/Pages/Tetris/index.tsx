import type { FC } from "react";
import { useEffect, useState } from "react";

import "./style.scss";

import Button from "../../Components/common/Button";
import FinishModal from "../../Components/Tetris/FinishModal";
import Item from "../../Components/Tetris/Item";
import { useControls } from "../../helpers/tetris/hooks/useControls";
import type { Movements } from "../../helpers/tetris/movement";
import { rotations, Keys } from "../../helpers/tetris/movement";

import { FakePlayZone } from "./fake-zone";

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

  const onkeydownHandler = (key: string) => {
    const movements: Movements = {
      [Keys.ArrowRight]: moveRight,
      [Keys.ArrowLeft]: moveLeft,
      [Keys.ArrowDown]: moveBottom.current,
      [Keys.ArrowUp]: rotateRight,
      [Keys.R]: rotateLeft,
      [Keys.r]: rotateRight,
    };
    rotations(key, movements)();
  };

  useEffect(() => {
    window.onkeydown = (ev: KeyboardEvent) => {
      ev.preventDefault();
      onkeydownHandler(ev.key);
    };

    return () => {
      window.onkeydown = null;
    };
  }, []);

  useEffect(() => {
    if (!isGameActive) {
      setModalClosed(false);
    }
  }, [isGameActive]);

  return (
    <div className="tetris">
      <FinishModal
        isModalClosed={isModalClosed}
        setModalClosed={() => setModalClosed(true)}
        points={score}
        reset={onResetClick}
      />
      <div className="tetris__points">
        <p className="tetris__text">{`Your score: ${score}`}</p>
        <Button className="tetris__reset" onClick={resetGame}>
          Reset game
        </Button>
      </div>
      <div className="tetris__playzone">
        <FakePlayZone keyPresser={onkeydownHandler} />
        {figures.map((figure, id) => (
          <Item key={id} coords={figure.coordinates} color={figure.color} />
        ))}
      </div>
    </div>
  );
};

export default Tetris;
