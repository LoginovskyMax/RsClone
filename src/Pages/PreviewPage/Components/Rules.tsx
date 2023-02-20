import type { FC } from "react";

import type { GameData } from "../../../data/gamesData";
import styles from "../Preview.module.scss";

interface RulesProps {
  gameData: GameData | null;
  isEn:boolean
}

export const Rules: FC<RulesProps> = ({ gameData, isEn }) => 
(
  <section className={styles.preview_rules}>
    <h3 className={styles.preview_rulesTitle}>{isEn ? "Правила Игры:" : "Game rules:"}</h3>
    <p className={styles.preview_rulesText}>
      {isEn ? gameData?.rulesRu
        .split("")
        .map((ch: string) => (ch === "\n" ? "\n\n" : ch))
        .join("")
        : gameData?.rulesEn
        .split("")
        .map((ch: string) => (ch === "\n" ? "\n\n" : ch))
        .join("")}
    </p>
  </section>
);
