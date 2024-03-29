import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../Components/common/Button";
import { checkForBan } from "../../../controller/banchecker";
import type { GameData } from "../../../data/gamesData";
import useUserStore from "../../../store";
import languageStore from "../../../store/language";
import useStatusStore from "../../../store/load-status";
import StarsView from "../../Games/StarsView/StarsView";
import styles from "../Preview.module.scss";

interface PreviewMainSectionProps {
  gameData: GameData | null;
  myRaiting: number;
  setRaiting: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  gameName: string | undefined;
}

export const PreviewMainSection: FC<PreviewMainSectionProps> = ({
  gameData,
  myRaiting,
  setRaiting,
  setShowModal,
  gameName,
}) => {
  const navigate = useNavigate();
  const { isEn } = languageStore();
  const { setUser } = useUserStore();
  const { setStatus } = useStatusStore();

  const navigateHandler = () => {
    if (gameData?.isComingSoon) return;

    if (gameName !== "SeaBattle") {
      navigate(`/${gameName}`);
    } else {
      navigate(`/room/${gameName}`);
    }
  };

  return (
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
          canSet={!gameData?.isComingSoon}
          rating={gameData?.raiting ? gameData?.raiting : 0}
          starSize={32}
          settedRating={myRaiting}
          setCallback={async (rate) => {
            if (gameData?.isComingSoon) return;
            setRaiting(rate);

            if (!(await checkForBan(isEn, setUser, setStatus, navigate))) {
              setShowModal(true);
            }
          }}
        />
        <Button onClick={navigateHandler} disabled={gameData?.isComingSoon}>
          {isEn ? "Играть!" : "Play!"}
        </Button>
      </div>
    </section>
  );
};
