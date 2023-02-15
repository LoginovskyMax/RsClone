import { I } from "./I";
import { L } from "./L";
import { RevertL } from "./RevertL";
import { RevertZ } from "./RevertZ";
import { Square } from "./Square";
import { T } from "./T";
import { Z } from "./Z";

const figures = [I, L, T, Z, RevertL, RevertZ, Square];

export const getRandomFigures = () => figures[Math.floor(Math.random() * 7)];
