import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../Components/common/Modal";
import { getGameData } from "../../controller/GamesComments";
import type { GameComment, GameData } from "../../data/gamesData";
import useUserStore from "../../store";
import useStatusStore from "../../store/load-status";

import { CommentsList } from "./Components/CommentsList";
import { PreviewMainSection } from "./Components/PreviewMainSection";
import { ReviewComment } from "./Components/ReviewComment";
import { Rules } from "./Components/Rules";
import { Winners } from "./Components/Winners";
import styles from "./Preview.module.scss";
import languageStore from "../../store/language";

export default function PreviewPage() {
  const params = useParams();
  const gameName = params.game;
  const { isEn } = languageStore()
  const { isLoading, setStatus } = useStatusStore();
  const { userName } = useUserStore();

  const [comments, setComments] = useState<GameComment[]>([]);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [raiting, setRaiting] = useState(5);
  const [myRaiting, setMyRaiting] = useState(-1);

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

  useEffect(() => refillData(), [showModal]);
  useEffect(() => getRating(), [comments]);

  return (
    <div className={styles.preview}>
      {!isLoading && (
        <>
          <PreviewMainSection
            gameData={gameData}
            gameName={gameName}
            myRaiting={myRaiting}
            setRaiting={setRaiting}
            setShowModal={setShowModal}
          />
          <Rules gameData={gameData} isEn={isEn}/>
          <Winners gameName={gameName} isEn={isEn}/>
          <CommentsList
            comments={comments}
            gameData={gameData}
            setShowModal={setShowModal}
          />
        </>
      )}
      {showModal && (
        <Modal setModalClosed={() => setShowModal(false)} title={isEn ? "Отзыв" : "Feedback"}>
          <ReviewComment
            gameData={gameData}
            raiting={raiting}
            setRaiting={setRaiting}
            hideModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
