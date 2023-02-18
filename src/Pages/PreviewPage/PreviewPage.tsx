import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import Modal from "../../Components/common/Modal";
import { getGameData, postComment } from "../../controller/GamesComments";
import type { GameComment, GameData } from "../../data/gamesData";
import useUserStore from "../../store";
import useStatusStore from "../../store/load-status";
import StarsView from "../Games/StarsView/StarsView";
import languageStore from "../../store/language";

import styles from "./Preview.module.scss";

export default function PreviewPage() {
  const params = useParams();
  const gameName = params.game;
  const { isEn } = languageStore()
  const { isLoading, setStatus } = useStatusStore();
  const { userName } = useUserStore();

  const [comments, setComments] = useState<GameComment[]>([]);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [raiting, setRaiting] = useState(5);
  const [myRaiting, setMyRaiting] = useState(-1);

  const navigate = useNavigate();

  const navigateHandler = () => {
    if (gameName !== "SeaBattle") {
      navigate(`/${gameName}`);
    } else {
      navigate(`/room/${gameName}`);
    }
  };

  const getRating = () => {
    const myComment = comments.find((com) => com.userName === userName);
    setMyRaiting(myComment ? myComment.raiting : -1);
  };

  const refillData = () => {
    setStatus({ isLoading: true, message: "" });
    getGameData(gameName || "")
      .then((data) => {
        setComments(data.comments);
        setGameData(data);
      })
      .then(() => setStatus({ isLoading: false, message: "" }))
      .catch((error) => {
        setStatus({ isLoading: false, message: error.message });
      });
  };

  const addComment = () => {
    setStatus({ isLoading: true, message: "" });
    postComment(gameData?.name || "", comment, raiting)
      .then(() => {
        setShowModal(false);
        setStatus({ isLoading: false, message: "" });
      })
      .catch((error) => {
        setStatus({ isLoading: false, message: error.message });
      });
  };

  useEffect(() => refillData(), [showModal]);

  useEffect(() => getRating(), [comments]);

  return (
    <div className={styles.preview}>
      {!isLoading && (
        <>
          <section
            className={styles.preview__section}
            style={{ backgroundImage: `url(${gameData?.image})` }}
          >
            <div className={styles.preview__wrapper}>
              <h2 className={styles.preview_header}>{gameData?.fullName}</h2>
              <p className={styles.preview_description}>
                {isEn ? gameData?.descriptionRu : gameData?.descriptionEn}
              </p>
              <StarsView
                canSet
                rating={gameData?.raiting ? gameData?.raiting : 0}
                starSize={32}
                settedRating={myRaiting}
                setCallback={(rate) => {
                  setRaiting(rate);
                  setShowModal(true);
                }}
              />
              <Button onClick={navigateHandler}>{isEn ? "Играть!" : "Start play!"}</Button>
            </div>
          </section>

          <section className={styles.preview_rules}>
            <h3 className={styles.preview_rulesTitle}>{isEn ? "Правила игры : " : "Game rules : "}</h3>
            <p className={styles.preview_rulesText}>
              {isEn 
                ? gameData?.rulesRu
                .split("")
                .map((ch) => (ch === "\n" ? "\n\n" : ch))
                .join("") 
                : gameData?.rulesEn
                  .split("")
                  .map((ch) => (ch === "\n" ? "\n\n" : ch))
                  .join("")}
            </p>
          </section>

          <section className={styles.preview_commentsWrapper}>
            <div className={styles.preview_comments}>
              <h3 className={styles.preview_rulesTitle}>{isEn ? "Отзывы" : "Feedback"}</h3>
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
                      key={elem.userName}
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
              onClick={() => setShowModal(true)}
            >
              {isEn ? "Оставить отзыв" : "Leave feedback"}
            </Button>
          </section>
        </>
      )}

      {showModal && (
        <Modal setModalClosed={() => setShowModal(false)} title={isEn ? "Отзыв" : "Feedback"}>
          <div className={styles.modal}>
            <StarsView
              canSet
              rating={gameData?.raiting ? gameData?.raiting : 0}
              starSize={32}
              settedRating={myRaiting}
              setCallback={(rate) => setRaiting(rate)}
            />
            <textarea
              placeholder="Текст отзыва"
              className={styles.modal_area}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={addComment}>{isEn ? "Добавить" : "Add"}</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
