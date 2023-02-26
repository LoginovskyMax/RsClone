import { getUserToken } from "../../../controller/Auth";

import type { GameData } from "./websocketData";

const WS_SEABATTLE_URL = "wss://rsgames.online:8001/";

export interface wsGameData {
  type: string;
  data: GameData | string | null;
  message?: string;
}

export type wsCallback = (res: wsGameData) => void;

class WebSocketController {
  private webSocket?: WebSocket | null = null;

  private gameId = "";

  private callbacks: Array<wsCallback> = [];

  private token = "";

  private user = "";

  getGameId() {
    return this.gameId;
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }

  async connect() {
    if (!this.webSocket) {
      this.webSocket = new WebSocket(WS_SEABATTLE_URL);

      if (this.webSocket) {
        this.webSocket.onopen = this.wsOpenHandler;
        this.webSocket.onmessage = this.wsMessageHandler;
      }
    }

    return this.webSocket;
  }

  wsMessageHandler = (resp: MessageEvent<string>) => {
    try {
      const res: wsGameData = JSON.parse(resp.data);

      if (this.callbacks) {
        this.callbacks.forEach((callback) => {
          callback(res);
        });
      }

      const { type, data, message } = res;

      switch (type) {
        case "game-data":
          // eslint-disable-next-line no-case-declarations
          const { gameId } = data as GameData;
          this.gameId = gameId;
          break;

        default:
          if (message === "You are connected") {
            if (this.gameId) {
              this.joinToTheGame();
            }
          }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  joinToTheGame() {
    try {
      const request = {
        type: "join",
        data: { gameId: this.gameId },
      };

      this.webSocket?.send(JSON.stringify(request));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private wsOpenHandler = () => {
    this.token = getUserToken();

    if (this.token && this.user) {
      try {
        const request = {
          type: "ws-connect",
          data: {
            player: this.user,
            token: this.token,
          },
        };

        this.webSocket?.send(JSON.stringify(request));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  addMessageListener(callback: wsCallback) {
    if (this.webSocket) {
      this.callbacks.push(callback);
    }
  }

  deleteAllCallbacks() {
    this.callbacks = [];
  }

  send(data: string) {
    try {
      if (this.webSocket) {
        this.webSocket.send(data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  setUser(user: string) {
    this.user = user;
  }
}

export const webSocketController = new WebSocketController();
