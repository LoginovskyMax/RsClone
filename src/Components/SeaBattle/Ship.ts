import { Cell } from "./Board"
export class Mark {
    cell:Cell
    constructor(cell:Cell ){
        this.cell = cell
        this.cell.mark.logo = 0
        this.cell.mark.color = ''
        this.cell.mark.id = Math.random()*10
        this.cell.mark.name = ''
    }
}
export class Ship extends Mark{
  constructor(cell:Cell){
    super(cell)
    this.cell.mark.logo = 0
    this.cell.mark.color = 'blue'
    this.cell.mark.name = 'ship'
  }
}
export class Miss extends Mark{
    constructor(cell:Cell){
      super(cell)
      this.cell.mark.logo = 0
      this.cell.mark.color = ''
      this.cell.mark.name = ''
    }
  }
export class Damage extends Mark{
    constructor(cell:Cell){
      super(cell)
      this.cell.mark.logo = 0
      this.cell.mark.color = ''
      this.cell.mark.name = ''
    }
  }