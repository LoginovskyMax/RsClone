import type { FC } from "react";
import React, { useEffect, useState } from "react";

import { getGameWinsList } from "../../../controller/Winners";
import type { WinnerRes } from "../../../data/winData";
import styles from "../Preview.module.scss";

interface WinnersProps {
  gameName?: string;
  isEn: boolean;
}

export const Winners: FC<WinnersProps> = ({ gameName, isEn }) => {
  const [winners, setWinners] = useState<Array<WinnerRes>>([]);

  useEffect(() => {
    getGameWinsList(gameName || "").then((data) => setWinners(data));
  }, []);

  return (
    <section className={styles.preview_winnersWrapper}>
      <h3 className={styles.preview_winnersTittle}>
        {isEn ? "ТОП победителей" : "Winners TOP"}
      </h3>
      <div className={styles.preview_winners}>
        {winners.length > 0 ? (
          winners.slice(0, 10).map((winner, i) => (
            <React.Fragment key={i}>
              {i === 0 && (
                <>
                  <div className={styles.preview_winnerPositionHead} />
                  <div className={styles.preview_winnerPlayerHead}>
                    {isEn ? "Игрок" : "Player"}
                  </div>
                  <div className={styles.preview_winnerPointsHead}>
                    {isEn ? "Очки" : "Points"}
                  </div>
                </>
              )}
              <div className={styles.preview_winnerPosition}>{i + 1}</div>
              <div className={styles.preview_winnerPlayer}>
                {winner.userName}
              </div>
              <div className={styles.preview_winnerPoints}>{winner.points}</div>
            </React.Fragment>
          ))
        ) : (
          <div className={styles.preview_noWinners}>
            {isEn
              ? "В игре пока нет победителей"
              : "There are no winners in the game yet"}
          </div>
        )}
      </div>
    </section>
  );
};
