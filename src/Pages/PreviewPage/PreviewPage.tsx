import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../../store";
import Button from "../../Components/common/Button";
import Modal from "../../Components/common/Modal";

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
  let [comment, setComment] = useState('');
  const user = useUserStore((state) => state.user);

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
     let sendComment = {user,comment}
     fetch(`http://localhost:8888/`,{
      method:'POST',
      headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
       body: JSON.stringify(sendComment)
     })
     .catch((error) => {
      console.log(error);
    });
     setComment('')
     setShowModal(false)
  };

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
      {showModal && <Modal setModalClosed={()=>setShowModal(false)} title="Комментарий">
        <div  className={styles.modal}>
          <textarea placeholder="Текст комментария" className={styles.modal_area} onChange={(e)=>setComment(e.target.value)}/>
          <Button onClick={addComment}>Добавить</Button>
        </div>
        </Modal>}
    </div>
  );
}
