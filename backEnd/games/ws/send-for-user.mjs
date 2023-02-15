import { aWssSeaWar } from "../../server.mjs";

export function sendForUser(player, gameId, message) {
  if (typeof message !== "string") {
    message = JSON.stringify(message);
  }

  aWssSeaWar.clients.forEach((client) => {
    if (
      client.id.split(":")[0] === player &&
      client.id.split(":")[1] === gameId
    ) {
      client.send(message);
    }
  });
}
