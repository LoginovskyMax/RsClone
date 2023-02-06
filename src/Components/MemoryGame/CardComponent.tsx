import { useEffect, useRef, useState } from "react";

import styles from "./CardComponent.module.scss";
import { type IProps } from "./Interfaces";

const CardComponent = ({
  card,
  onPress,
  countTry,
  pairs,
  clickCount,
  startGame,
  inGame,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const canClick = useRef(false);

  const handler = () => {
    if (inGame) {
      if (canClick.current && pairs < 2) {
        setIsOpen(true);
        onPress(card.id);
        canClick.current = false;
      }
    }
  };

  useEffect(() => {
    if (!card.hasPair && countTry !== 0) {
      setTimeout(() => {
        setIsOpen(false);
        canClick.current = true;
        clickCount(0);
      }, 1000);
    }
  }, [countTry]);

  useEffect(() => {
    if (startGame) {
      setIsOpen(true);
      canClick.current = false;
    }

    if (!startGame) {
      setIsOpen(false);
      canClick.current = true;
    }
  }, [startGame]);

  return (
    <div
      className={
        isOpen
          ? card.hasPair
            ? `${styles.card} ${styles.card_open} ${styles.card__win}`
            : `${styles.card} ${styles.card_open}`
          : styles.card
      }
      onClick={handler}
      role="button"
      tabIndex={0}
      onKeyDown={handler}
    >
      <div className={isOpen ? styles.card_open__shirt : styles.card__shirt} />
      <div
        className={isOpen ? styles.card_open__face : styles.card__face}
        style={{ backgroundImage: `url(${card.img})` }}
      />
    </div>
  );
};

export default CardComponent;
