import type { FC } from "react";
import { useState } from "react";

import Button from "../../../Components/common/Button";
import { postComment } from "../../../controller/GamesComments";
import type { GameData } from "../../../data/gamesData";
import useStatusStore from "../../../store/load-status";
import StarsView from "../../Games/StarsView/StarsView";
import styles from "../Preview.module.scss";
import languageStore from "../../../store/language";

interface ReviewCommentProps {
  gameData: GameData | null;
  raiting: number;
  setRaiting: React.Dispatch<React.SetStateAction<number>>;
  hideModal: () => void;
}

export const ReviewComment: FC<ReviewCommentProps> = ({
  gameData,
  raiting,
  setRaiting,
  hideModal,
}) => {
  const { setStatus } = useStatusStore();
 const { isEn } = languageStore()
  const [comment, setComment] = useState("");

  const addComment = () => {
    setStatus({ isLoading: true, message: "" });
    postComment(gameData?.name || "", comment, raiting)
      .then(() => {
        hideModal();
        setStatus({ isLoading: false, message: "" });
      })
      .catch((error) => {
        setStatus({ isLoading: false, message: error.message });
      });
  };

  return (
    <div className={styles.modal}>
      <StarsView
        canSet={!gameData?.isComingSoon}
        rating={gameData?.raiting ? gameData?.raiting : 0}
        starSize={32}
        settedRating={raiting}
        setCallback={(rate) => setRaiting(rate)}
      />
      <textarea
        placeholder={isEn ? "Текст отзыва" : "Feedback text"}
        className={styles.modal_area}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={addComment}>{isEn ? "Добавить" : "Add"}</Button>
    </div>
  );
};
