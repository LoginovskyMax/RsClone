import type { FC } from "react";
import { useEffect, useState } from "react";

import "./style.scss";

import Button from "../../Components/common/Button";
import FinishModal from "../../Components/Tetris/FinishModal";
import Item from "../../Components/Tetris/Item";
import { postWinner } from "../../controller/Winners";
import { useControls } from "../../helpers/tetris/hooks/useControls";
import type { Movements } from "../../helpers/tetris/movement";
import { rotations, Keys } from "../../helpers/tetris/movement";
import useStatusStore from "../../store/load-status";
import { is } from "immer/dist/internal";
import { FakePlayZone } from "./fake-zone";
import languageStore from "../../store/language";

const Tetris: FC = () => {
  const gameName = "Tetris";
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
  const { setStatus } = useStatusStore();
  const { isEn } = languageStore()

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

  window.onkeydown = (ev: KeyboardEvent) => {
    ev.preventDefault();
    onkeydownHandler(ev.key);
  };

  useEffect(
    () => () => {
      window.onkeydown = null;
    },
    []
  );

  useEffect(() => {
    if (!isGameActive) {
      setModalClosed(false);
      if (score > 0)
        postWinner(gameName, score).catch(({ message }) =>
          setStatus({ isLoading: false, message })
        );
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
        <p className="tetris__text">{isEn ? "Ваш счет : " : `Your score : `}{score}</p>
      </div>
      <Button className="tetris__reset" onClick={resetGame}>
        {isEn ? "Рестарт" : "Reset game"}
      </Button>
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
