import type { FC } from "react";
import react from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import Button from "../../Components/common/Button";
import FinishModal from "../../Components/Tetris/FinishModal";
import Item from "../../Components/Tetris/Item";
import { checkUserToken } from "../../controller/Auth";
import { postWinner } from "../../controller/Winners";
import { useControls } from "../../helpers/tetris/hooks/useControls";
import type { Movements } from "../../helpers/tetris/movement";
import { rotations, Keys } from "../../helpers/tetris/movement";
import useUserStore, { nullUser } from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import { FakePlayZone } from "./fake-zone";

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

  const [isModalClosed, setModalClosed] = react.useState(true);
  const { setStatus } = useStatusStore();
  const { setUser, banned } = useUserStore();
  const { isEn } = languageStore();
  const navigate = useNavigate();

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

  react.useEffect(
    () => () => {
      window.onkeydown = null;
    },
    []
  );

  react.useEffect(() => {
    checkUserToken()
      .then((userData) => {
        setUser({
          userName: userData.userName,
          image: userData.image,
          status: userData.status,
          banned: userData.banned,
          email: userData.email,
        });
      })
      .catch(() => {
        setUser(nullUser);
      })
      .then(() => {
        if (banned) {
          setStatus({
            isLoading: false,
            message: isEn ? "Вы забанены!" : "You are banned!",
          });
          navigate("/");
        }
      });
  }, []);

  react.useEffect(() => {
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
        <Button className="tetris__reset" onClick={resetGame}>
          {isEn ? "Рестарт" : "Reset game"}
        </Button>
        <p className="tetris__text">
          {isEn ? "Ваш счет : " : `Your score : `}
          {score}
        </p>
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
