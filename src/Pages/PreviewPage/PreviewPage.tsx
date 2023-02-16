import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import Modal from "../../Components/common/Modal";
import { getGameData, postComment } from "../../controller/GamesComments";
import type { GameComment, GameData } from "../../data/gamesData";
import useUserStore from "../../store";
import useStatusStore from "../../store/load-status";
import StarsView from "../Games/StarsView/StarsView";

import styles from "./Preview.module.scss";

export default function PreviewPage() {
  const params = useParams();
  const gameName = params.game;

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
          <h2 className={styles.preview_header}>{gameName}</h2>
          <p className={styles.preview_description}>
            {gameData?.descriptionRu}
          </p>
          <p className={styles.preview_rules}>{gameData?.rulesRu}</p>
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

          <Button onClick={navigateHandler}>Играть!</Button>
          <Button onClick={() => setShowModal(true)}>
            Добавить комментарий
          </Button>
          <div className={styles.preview_comments}>
            <p>Комментарии пользователей: </p>
            {comments.map((elem) => (
              <div key={elem.userName} className={styles.preview_item}>
                <p>{elem.text}</p>
                <p>{elem.userName}</p>
                <StarsView
                  key={elem.userName}
                  rating={elem.raiting}
                  starSize={24}
                />
                <p>{`${new Date(elem.date).toLocaleString()}`}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {showModal && (
        <Modal setModalClosed={() => setShowModal(false)} title="Комментарий">
          <div className={styles.modal}>
            <textarea
              placeholder="Текст комментария"
              className={styles.modal_area}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={addComment}>Добавить</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
