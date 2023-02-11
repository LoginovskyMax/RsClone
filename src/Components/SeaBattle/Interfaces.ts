export interface IShip {
    size:number
    cors:number[][]
}

export interface ISeaWarPlayer {
    isLead:boolean
    isReady:boolean
    moves:number
    ships:IShip
    userName:string
}

export interface IGameData {
    gameId:number
    isStarted:boolean
    isMainUser:boolean
    player:ISeaWarPlayer
    enemyName:string | null
    isEnemyReady:boolean
    enemyField:number[][]
    yourField: number[][]
    winner:{username:string,moves:number} | null
}
export interface IRequest {
    type:string
    data:IGameData
}

