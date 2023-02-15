import type { SetStateAction } from "react";
import { useCallback } from "react";

import type { Figure } from "../figures";
import type { Coordinates } from "../movement";

interface IUseControls {
  rotateRight: () => void;
  rotateLeft: () => void;
  moveRight: () => void;
  moveLeft: () => void;
  moveBottom: () => void;
}

interface IUseKeyBoardControlsProps {
  activeFigure: Figure;
  setActiveFigureCoords: (state: SetStateAction<Coordinates[]>) => void;
  stopFigure: () => void;
  isGameActive: boolean;
}

export const useKeyBoardControls = ({
  activeFigure,
  setActiveFigureCoords,
  stopFigure,
  isGameActive,
}: IUseKeyBoardControlsProps): IUseControls => {
  const rotateRight = useCallback(() => {
    if (!isGameActive) {
      return;
    }

    activeFigure.rotateRight();
    setActiveFigureCoords(activeFigure.getCoords());
  }, [activeFigure]);

  const rotateLeft = useCallback(() => {
    if (!isGameActive) {
      return;
    }

    activeFigure.rotateLeft();
    setActiveFigureCoords(activeFigure.getCoords());
  }, [activeFigure]);

  const moveRight = useCallback(() => {
    if (!isGameActive) {
      return;
    }

    activeFigure.moveRight();
    setActiveFigureCoords(activeFigure.getCoords());
  }, [activeFigure]);

  const moveLeft = useCallback(() => {
    if (!isGameActive) {
      return;
    }

    activeFigure.moveLeft();
    setActiveFigureCoords(activeFigure.getCoords());
  }, [activeFigure]);

  const moveBottom = useCallback(() => {
    if (!isGameActive) {
      return;
    }

    activeFigure.moveBottom(stopFigure);
    setActiveFigureCoords(activeFigure.getCoords());
  }, [activeFigure]);

  return { rotateLeft, rotateRight, moveLeft, moveRight, moveBottom };
};
