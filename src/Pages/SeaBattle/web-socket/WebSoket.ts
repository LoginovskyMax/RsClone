import type { GameData } from "./websocketData";

// TODO: Get from coocie
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTU0MGVkMmFiNjA2YmJjMzQwZGQyZiIsInN0YXR1c2VzIjpbImFkbWluIl0sImlhdCI6MTY3NTk5NzI0OCwiZXhwIjoxNjgxMTgxMjQ4fQ.cPXvAj225Rn_NkMkeC0AgxPiarPvMlA_HCP-ASGjb98";

export interface wsGameData {
  type: string;
  data?: GameData | string | null;
}

export type wsCallback = (res: wsGameData) => void;

class WebSocketController {
  private webSocket?: WebSocket | null = null;

  private gameId = "";

  private callbacks: Array<wsCallback> = [];

  connect() {
    if (!this.webSocket) {
      this.webSocket = new WebSocket("ws://rsgames.online:8001/game/seawar");

      if (this.webSocket) {
        this.webSocket.onopen = this.wsOpenHandler;
        this.webSocket.onmessage = this.wsMessageHandler;
      }
    }

    return this.webSocket;
  }

  wsMessageHandler(resp: MessageEvent<string>) {
    try {
      const res = JSON.parse(resp.data);

      if (this.callbacks) {
        this.callbacks.forEach((callback) => {
          callback(res);
        });
      }
      // const data: { type: string; data: IGameData } = JSON.parse(resp.data);

      // switch (type) {
      //   case "message":
      //     // return navigate('/')
      //     console.log(data);
      //     break;
      //   case "game-data":
      //     // eslint-disable-next-line no-case-declarations
      //     const { gameId: id } = data.data;
      //     console.log(id);
      //     this.gameId = id;
      //     break;

      //   default:
      //     console.log("default");
      // }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private wsOpenHandler = () => {
    if (token) {
      try {
        const request = {
          type: "ws-connect",
          data: {
            player: "Test",
            token,
          },
        };
        this.webSocket?.send(JSON.stringify(request));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  getGameId() {
    return this.gameId;
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }

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
}

export const webSocketController = new WebSocketController();
