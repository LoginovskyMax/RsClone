import type { FC } from "react";
import { useEffect, useState } from "react";

import { getGameWinsList } from "../../../controller/Winners";
import type { WinnerRes } from "../../../data/winData";
import styles from "../Preview.module.scss";

interface WinnersProps {
  gameName?: string;
}

export const Winners: FC<WinnersProps> = ({ gameName }) => {
  const [winners, setWinners] = useState<Array<WinnerRes>>([]);

  useEffect(() => {
    getGameWinsList(gameName || "").then((data) => setWinners(data));
  }, []);

  return (
    <section className={styles.preview_winnersWrapper}>
      <h3 className={styles.preview_winnersTittle}>ТОП победителей</h3>
      <div className={styles.preview_winners}>
        {winners.length > 0 ? (
          winners.slice(0, 10).map((winner, i) => (
            <>
              {i === 0 && (
                <>
                  <div className={styles.preview_winnerPositionHead} />
                  <div className={styles.preview_winnerPlayerHead}>Игрок</div>
                  <div className={styles.preview_winnerPointsHead}>Очки</div>
                </>
              )}
              <div className={styles.preview_winnerPosition}>{i + 1}</div>
              <div className={styles.preview_winnerPlayer}>
                {winner.userName}
              </div>
              <div className={styles.preview_winnerPoints}>{winner.points}</div>
            </>
          ))
        ) : (
          <div className={styles.preview_noWinners}>
            В игре пока нет победителей
          </div>
        )}
      </div>
    </section>
  );
};