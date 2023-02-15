import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import Modal from "../../Components/common/Modal";
import useUserStore from "../../store";

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
  const [comment, setComment] = useState("");
  const userName = useUserStore((state) => state.userName);

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

  const addComment = () => {
    const sendComment = { userName, comment };
    fetch(`http://localhost:8888/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(sendComment),
    }).catch((error) => {
      console.log(error);
    });
    setComment("");
    setShowModal(false);
  };

  const navigateHandler = ()=> {
    if(gameName!=='SeaBattle'){
      navigate(`/${gameName}`)
    }else{
      navigate(`/room/${gameName}`)
    }
   
  }

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <div className={styles.preview}>
      <h2 className={styles.preview_header}>{gameName}</h2>
      <p className={styles.preview_description}>{description}</p>
      <p className={styles.preview_rules}>{rules}</p>
      <p>Рейтинг игры: {rating}</p>
      
      <Button onClick={navigateHandler}>Играть!</Button>
      <Button onClick={() => setShowModal(true)}>Добавить комментарий</Button>
      <div className={styles.preview_comments}>
        <p>Комментарии пользователей: </p>
        {comments.map((elem) => (
          <div key={elem.id} className={styles.preview_item}>
            <p>{elem.text}</p>
            <p>{elem.userName}</p>
            <p>{elem.data}</p>
          </div>
        ))}
      </div>
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
