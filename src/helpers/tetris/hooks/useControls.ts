import { useState, useEffect, useRef, useCallback } from "react";
import type { MutableRefObject } from "react";

import { WIDTH_CENTER } from "../constants";
import type { Figure } from "../figures";
import { isFiguresCollided, removeFilledLines } from "../figures";
import { getRandomFigure } from "../figures/helpers";
import { move, Moves, rotate } from "../movement";

interface IUseControls {
  figures: Figure[];
  rotateRight: () => void;
  rotateLeft: () => void;
  moveRight: () => void;
  moveLeft: () => void;
  moveBottom: MutableRefObject<() => void>;
  resetGame: () => void;
  score: number;
  isGameActive: boolean;
}

const getNewFigure = () =>
  getRandomFigure({
    offsetY: WIDTH_CENTER,
  });

export const useControls = (): IUseControls => {
  const [score, setScore] = useState<number>(0);
  const [staticFigures, setStaticFigures] = useState<Figure[]>([]);
  const [isGameActive, setGameActive] = useState<boolean>(true);
  const [activeFigure, setActiveFigure] = useState<Figure>(getNewFigure);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const resetGame = useCallback(() => {
    const newFigure = getNewFigure();

    setScore(0);
    setStaticFigures([]);

    setGameActive(true);

    setActiveFigure(newFigure);
  }, []);

  const moveBottomRef = useRef<() => void>(() => {});

  const setMoveInterval = () => {
    intervalRef.current = setInterval(() => {
      moveBottomRef.current();
    }, 1000);
  };

  const stopFigure = () => {
    const newFigure = getNewFigure();

    if (isFiguresCollided(staticFigures, newFigure)) {
      setGameActive(false);

      return;
    }

    clearInterval(intervalRef.current);
    setTimeout(() => {
      setActiveFigure(newFigure);
      setStaticFigures((oldFigures) => {
        const newFigures = oldFigures.concat(activeFigure);

        const { newStaticFigures, totalScore } = removeFilledLines(newFigures);

        setScore((state) => state + totalScore);

        return newStaticFigures;
      });
      setMoveInterval();
    }, 0);
  };

  const rotateRight = () => {
    if (!isGameActive) {
      return;
    }

    setActiveFigure(rotate(activeFigure, staticFigures, true));
  };

  const rotateLeft = () => {
    if (!isGameActive) {
      return;
    }

    setActiveFigure(rotate(activeFigure, staticFigures));
  };

  const moveRight = () => {
    if (!isGameActive) {
      return;
    }

    setActiveFigure(move(activeFigure, staticFigures, Moves.right));
  };

  const moveLeft = () => {
    if (!isGameActive) {
      return;
    }

    setActiveFigure(move(activeFigure, staticFigures, Moves.left));
  };

  moveBottomRef.current = () => {
    if (!isGameActive) {
      return;
    }

    setActiveFigure(
      move(activeFigure, staticFigures, Moves.bottom, stopFigure)
    );
  };

  const movements = {
    rotateRight,
    rotateLeft,
    moveRight,
    moveLeft,
  };

  useEffect(() => {
    setMoveInterval();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const fullFigures = staticFigures.concat(activeFigure);

  return {
    figures: fullFigures,
    score,
    resetGame,
    isGameActive,
    moveBottom: moveBottomRef,
    ...movements,
  };
};
