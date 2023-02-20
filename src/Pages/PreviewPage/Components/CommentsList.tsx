import type { FC } from "react";

import Button from "../../../Components/common/Button";
import type { GameComment, GameData } from "../../../data/gamesData";
import languageStore from "../../../store/language";
import StarsView from "../../Games/StarsView/StarsView";
import styles from "../Preview.module.scss";

interface CommentsListProps {
  comments: Array<GameComment>;
  gameData: GameData | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommentsList: FC<CommentsListProps> = ({
  comments,
  gameData,
  setShowModal,
}) => {
  const { isEn } = languageStore();

  return (
    <section className={styles.preview_commentsWrapper}>
      <div className={styles.preview_comments}>
        <h3 className={styles.preview_rulesTitle}>
          {isEn ? "Отзывы" : "Feedback"}
        </h3>
        {comments.map((elem) => (
          <div key={elem.userName} className={styles.preview_item}>
            <div className={styles.preview_info}>
              <img
                className={styles.preview_image}
                alt="user"
                src="images/user.png"
              />
              <p className={styles.preview_username}>{elem.userName}</p>
              <StarsView
                key={`star${elem.userName}`}
                rating={elem.raiting}
                starSize={16}
              />
            </div>
            <p className={styles.preview_text}>{elem.text}</p>
            <p className={styles.preview_date}>
              {`${new Date(elem.date).toLocaleString()}`}
            </p>
          </div>
        ))}
      </div>
      <Button
        className={styles.preview__reviewBtn}
        onClick={() => !gameData?.isComingSoon && setShowModal(true)}
        disabled={gameData?.isComingSoon}
      >
        {isEn ? " Оставить отзыв" : "Leave feedback"}
      </Button>
    </section>
  );
};
