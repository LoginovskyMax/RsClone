import type { GameData } from "./websocketData";

// TODO: Get from coocie
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTU0MGVkMmFiNjA2YmJjMzQwZGQyZiIsInN0YXR1c2VzIjpbImFkbWluIl0sImlhdCI6MTY3NTk5NzI0OCwiZXhwIjoxNjgxMTgxMjQ4fQ.cPXvAj225Rn_NkMkeC0AgxPiarPvMlA_HCP-ASGjb98";

export interface wsGameData {
  type: string;
  data: GameData | string | null;
}

export type wsCallback = (res: wsGameData) => void;

class WebSocketController {
  private webSocket?: WebSocket | null = null;

  private gameId = "";

  private callbacks: Array<wsCallback> = [];

  token:string = ''

  user:string = ''

  gameData:GameData | string | null = null

  getGameId() {
    console.log(this.gameId);
    console.log(this.user);
    return this.gameId;
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }

  getData() {
    return this.gameData
  }

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
      const res: wsGameData = JSON.parse(resp.data);

      if (this.callbacks) {
        console.log('callback');
        
        this.callbacks.forEach((callback) => {
          callback(res);
        });
      }

      const { type, data } = res;

      // eslint-disable-next-line default-case
      switch (type) {
        case "message":
          console.log(res);
          break;
        case "game-data":
          // eslint-disable-next-line no-case-declarations
          const { gameId } = data as GameData;
          console.log(data);
          this.gameId = gameId;
          this.gameData = data;
          console.log(this.gameData);
          break;
      }

    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private wsOpenHandler = () => {
    if (this.token) {
      try {
        const request = {
          type: "ws-connect",
          data: {
            player: this.user,
            token:this.token,
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

  setToken(token:string){
    this.token = token
  }

  setUser(user:string){
    this.user = user
  }
}

export const webSocketController = new WebSocketController();
