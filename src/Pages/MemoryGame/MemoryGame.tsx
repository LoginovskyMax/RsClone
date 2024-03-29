import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import Modal from "../../Components/common/Modal";
import CardComponent from "../../Components/MemoryGame/CardComponent";
import { cardsArr } from "../../Components/MemoryGame/Data";
import { type ICard } from "../../Components/MemoryGame/Interfaces";
import { checkForBan } from "../../controller/banchecker";
import { postWinner } from "../../controller/Winners";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";
import { pointsData } from "../Games/pointsData";

import styles from "./Memorygame.module.scss";

const randomArr = [...cardsArr].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState(randomArr);
  const [inGame, setInGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [countTry, setCountTry] = useState(0);
  const [points, setPoints] = useState(0);
  const [openCards, setOpenCards] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [width, setWidth] = useState(650);
  const [level, setLevel] = useState(8);
  const pairs = useRef<ICard[]>([]);
  const openPairs = useRef(0);
  const { isEn } = languageStore();
  const { setUser } = useUserStore();
  const { setStatus } = useStatusStore();

  const gameName = "Memorygame";
  let misData = 0;

  const onPress = (id: number) => {
    setOpenCards(openCards + 1);
    const obj = cardsArr.find((item) => item.id === id);

    if (obj != null) {
      pairs.current.push(obj);
    }

    if (pairs.current.length === 2) {
      if (pairs.current[0].name === pairs.current[1].name) {
        pairs.current[0].hasPair = true;
        pairs.current[1].hasPair = true;

        if (misData < pointsData.length && level === 18)
          setPoints((prev) => prev + pointsData[misData]);
        if (misData < pointsData.length - 2 && level === 12)
          setPoints((prev) => prev + pointsData[misData + 2]);
        if (misData < pointsData.length - 4 && level === 8)
          setPoints((prev) => prev + pointsData[misData + 4]);
        misData = 0;

        const arr = [...cards];
        arr.splice(cards.indexOf(pairs.current[0]), 1, pairs.current[0]);
        arr.splice(cards.indexOf(pairs.current[1]), 1, pairs.current[1]);
        setCards(arr);
        openPairs.current += 1;
      } else {
        misData += 1;
      }

      pairs.current = [];
      setCountTry((prev) => prev + 1);
    }
  };

  const startGameFunc = () => {
    setInGame(true);
    setStartGame(true);
    misData = 0;
    setPoints(0);
    setTimeout(() => {
      setStartGame(false);
    }, 3000);
  };

  const restartGame = () => {
    setStartGame(true);
    const arr = [...cardsArr.slice(0, level).sort(() => Math.random() - 0.5)];
    arr.forEach((item) => {
      item.hasPair = false;
    });
    setCards(arr);
    setCountTry(0);
    misData = 0;
    setPoints(0);
    pairs.current = [];
    openPairs.current = 0;
    setOpenCards(0);
    setShowModal(false);
    setTimeout(() => {
      setStartGame(false);
    }, 3000);
  };

  useEffect(() => {
    if (openPairs.current === level / 2) {
      setShowModal(true);
      if (points !== 0) postWinner(gameName, points);
    }
  }, [openPairs.current]);

  useEffect(() => {
    const arr = cardsArr.slice(0, level);
    setCards(arr.sort(() => Math.random() - 0.5));
    restartGame();
    setInGame(false);

    switch (level) {
      case 8:
        setWidth(650);
        break;
      case 12:
        setWidth(990);
        break;
      case 18:
        setWidth(990);
        break;

      default:
        setWidth(650);
        break;
    }
  }, [level]);

  useEffect(() => {
    checkForBan(isEn, setUser, setStatus, navigate);
  }, []);

  return (
    <div className={styles.memory_main}>
      <h2>Memory Game</h2>
      <div className={styles.memory_main__level}>
        <p>{isEn ? "Уровень : " : "Level : "}</p>
        <select
          className={styles.memory_main__input}
          onChange={(e) => {
            setLevel(+e.target.value);
          }}
        >
          <option value="8">{isEn ? "Легкий" : "Easy"}</option>
          <option value="12">{isEn ? "Средний" : "Medium"}</option>
          <option value="18">{isEn ? "Тяжелый" : "Hard"}</option>
        </select>
        <div className={styles.btns_conteiner}>
          <Button onClick={startGameFunc} disabled={!!inGame}>
            {isEn ? "Начать игру" : "Start game"}
          </Button>
          <Button onClick={restartGame}>{isEn ? "Рестарт" : "Restart"}</Button>
        </div>
      </div>

      <p className={styles.points}>
        {isEn ? "Количество очков:" : "Points:"}
        {points}
      </p>
      <div
        className={styles.cards_conteiner}
        style={{ maxWidth: `${width}px` }}
      >
        {cards.map((item) => (
          <CardComponent
            key={item.id}
            card={item}
            onPress={onPress}
            countTry={countTry}
            pairs={openCards}
            clickCount={setOpenCards}
            startGame={startGame}
            inGame={inGame}
          />
        ))}
      </div>
      {showModal && (
        <Modal setModalClosed={() => setShowModal(false)} title="Победа!">
          <div className={styles.modal_window__main}>
            <p className={styles.modal_window__text}>Ваш результат {points}</p>
            <Button
              onClick={() => {
                navigate("/main");
                setShowModal(false);
              }}
            >
              {isEn ? " На главную" : "On main"}
            </Button>
            <Button
              onClick={() => {
                restartGame();
                setShowModal(false);
              }}
            >
              {isEn ? "Начать заново" : "Play again"}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MemoryGame;
