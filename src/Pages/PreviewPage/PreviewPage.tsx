import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";

import styles from "./Preview.module.scss";

interface IComment {
  id: number;
  userName: string;
  text: string;
  data: string;
}
interface IGameData {
  comments: [IComment];
  descriptionRu: string;
  descriptionEn: string;
  rulesRu: string;
  rulesEn: string;
  rating: number;
}

export default function PreviewPage() {
  const params = useParams();
  const gameName = params.game;
  const [comments, seComments] = useState<IComment[]>([]);
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const getGameData = () => {
    fetch(`http://localhost:8888/gameData/${gameName}`)
      .then<IGameData>((response) => response.json())
      .then((data) => {
        seComments(data.comments);
        setDescription(data.descriptionRu);
        setRules(data.rulesRu);
        setRating(data.rating);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const addComment = () => {};

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <div className={styles.preview}>
      <h2 className={styles.preview_header}>{gameName}</h2>
      <p className={styles.preview_description}>{description}</p>
      <p className={styles.preview_rules}>{rules}</p>
      <p>Рейтинг игры: {rating}</p>
      <Button onClick={() => navigate(`/${gameName}`)}>Играть!</Button>
      <Button onClick={() => setShowModal(true)}>Добавить комментарий</Button>
      <div className={styles.preview_comments}>
        <p>Комментарии пользователей: </p>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.preview_item}>
            <p>{comment.text}</p>
            <p>{comment.userName}</p>
            <p>{comment.data}</p>
          </div>
        ))}
      </div>
      {showModal && <div />}
    </div>
  );
}