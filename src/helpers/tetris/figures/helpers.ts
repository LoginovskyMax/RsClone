import type { FigureType } from ".";
import { createFigure } from ".";

const figures: FigureType[] = [
  "I",
  "L",
  "T",
  "Z",
  "RevertL",
  "RevertZ",
  "Square",
];

export const getRandomFigure = (options: Parameters<typeof createFigure>[1]) =>
  createFigure(figures[Math.floor(Math.random() * figures.length)], options);
