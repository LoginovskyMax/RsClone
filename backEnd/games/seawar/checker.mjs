import { SEAWAR } from "../variables.mjs";

// eslint-disable-next-line no-extend-native
Array.prototype.rotate = function rotate() {
  const result = [];

  for (let i = this.length - 1; i >= 0; i -= 1) {
    for (let j = 0; j < this[i].length; j += 1) {
      if (!result[j]) {
        result[j] = [];
      }

      result[j].push(this[i][j]);
    }
  }

  return result;
};

function findShips(gameMatrix) {
  const ships = [0, 0, 0, 0, 0];

  for (let i = 0; i < gameMatrix.length; i += 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (const point of gameMatrix[i].join("").split("1")) {
      if (point.length > ships.length - 1) {
        return false;
      }

      ships[point.length] += 1;
    }
  }

  return ships;
}

function checShipCount(gameMatrix) {
  let ships = findShips(gameMatrix);

  if (!ships) {
    return false;
  }

  const rotMatrix = gameMatrix.rotate();
  const rotShips = findShips(rotMatrix);

  if (!rotShips) {
    return false;
  }

  ships = ships.map((ship, i) => ship + rotShips[i]);

  const otherShipsCellCount = 1 * 4 + 2 * 3 + 3 * 2;
  ships[1] =
    gameMatrix.flat().join("").split(SEAWAR.CLEAN.toString()).join("").length -
    otherShipsCellCount;

  return ships[1] === 4 && ships[2] === 3 && ships[3] === 2 && ships[4] === 1;
}

function checSpacesCount(gameMatrix) {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (gameMatrix[i][j] === SEAWAR.SHIP) {
        const hor =
          (gameMatrix[i - 1] && gameMatrix[i - 1][j] === SEAWAR.SHIP) ||
          (gameMatrix[i + 1] && gameMatrix[i + 1][j] === SEAWAR.SHIP);
        const vert =
          gameMatrix[i][j - 1] === SEAWAR.SHIP ||
          gameMatrix[i][j + 1] === SEAWAR.SHIP;

        if (hor && vert) {
          return false;
        }

        if (
          (gameMatrix[i - 1] && gameMatrix[i - 1][j - 1] === SEAWAR.SHIP) ||
          (gameMatrix[i - 1] && gameMatrix[i - 1][j + 1] === SEAWAR.SHIP) ||
          (gameMatrix[i + 1] && gameMatrix[i + 1][j - 1] === SEAWAR.SHIP) ||
          (gameMatrix[i + 1] && gameMatrix[i + 1][j + 1] === SEAWAR.SHIP)
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

export function checkMatrix(gameMatrix) {
  if (!checSpacesCount(gameMatrix)) {
    return "Wrong ships position";
  }

  if (!checShipCount(gameMatrix)) {
    return "Wrong ships count";
  }

  return "Correct!";
}
