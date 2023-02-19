import type { FC } from "react";

import type { GameData } from "../../../data/gamesData";
import styles from "../Preview.module.scss";

interface RulesProps {
  gameData: GameData | null;
}

export const Rules: FC<RulesProps> = ({ gameData }) => (
  <section className={styles.preview_rules}>
    <h3 className={styles.preview_rulesTitle}>Правила Игры:</h3>
    <p className={styles.preview_rulesText}>
      {gameData?.rulesRu
        .split("")
        .map((ch: string) => (ch === "\n" ? "\n\n" : ch))
        .join("")}
    </p>
  </section>
);
