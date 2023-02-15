import { useCallback, useEffect, useRef, useState } from "react";

import { WIDTH_CENTER } from "../constants";
import { Figure } from "../figures";
import { getRandomFigures } from "../figures/helpers";
import type { Coordinates } from "../movement";

import { useKeyBoardControls } from "./useKeyBoardControls";

interface IUseControls {
  figures: Figure[];
  rotateRight: () => void;
  rotateLeft: () => void;
  moveRight: () => void;
  moveLeft: () => void;
  moveBottom: () => void;
  resetGame: () => void;
  points: number;
  isGameActive: boolean;
}

const getNewFigure = () => new (getRandomFigures())(WIDTH_CENTER);

export const useControls = (): IUseControls => {
  const [points, setPoints] = useState<number>(0);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [isGameActive, setGameActive] = useState<boolean>(true);
  const [activeFigure, setActiveFigure] = useState<Figure>(getNewFigure);
  const [, setActiveFigureCoords] = useState<Coordinates[]>(
    activeFigure.getCoords()
  );
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const resetGame = useCallback(() => {
    const newFigure = getNewFigure();

    setPoints(0);
    setFigures([]);
    setGameActive(true);

    setActiveFigure(newFigure);
    setActiveFigureCoords(newFigure.getCoords());
  }, []);

  const stopFigure = () => {
    const newFigure = getNewFigure();

    if (newFigure.isCollided()) {
      setGameActive(false);

      return;
    }

    clearInterval(intervalRef.current);

    setActiveFigure(newFigure);
    setActiveFigureCoords(newFigure.getCoords());
    setFigures((state) => state.concat(activeFigure));
  };

  const movements = useKeyBoardControls({
    activeFigure,
    setActiveFigureCoords,
    stopFigure,
    isGameActive,
  });

  const setMoveInterval = () => {
    intervalRef.current = setInterval(() => {
      movements.moveBottom();
    }, 1000);
  };

  useEffect(() => {
    setMoveInterval();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [activeFigure]);

  useEffect(() => {
    Figure.allFigures = figures;

    setPoints((state) => state + Figure.removeFilled());
  }, [figures]);

  const fullFigures = figures.concat(activeFigure);

  return {
    figures: fullFigures,
    points,
    resetGame,
    isGameActive,
    ...movements,
  };
};
