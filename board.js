
// board data
let data = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]

class Board {

    constructor (game) {
        this.game = game
        this.cfg = game.cfg
        this.ctx = game.ctx
        this.data = data
    }

    clearScreen () {
        this.ctx.clearRect (0, 0, this.cfg.WND_W, this.cfg.WND_H)
    }

    draw () {
        for (let row = 0; row < this.data.length; row ++) {
            for (let col = 0; col < this.data[0].length; col ++) {
                if (this.data[row][col] != 0) {
                    this.data[row][col].draw ()
                }
            }
        }
    }

    // push brick to data when brick is hit bottom
    updateBoard (bricks) {
        for (let brick of bricks) {
            this.data[brick.row][brick.col] = brick
        }

    }

    isEmptyCell (col, row) {
        return this.data[row][col] === 0
    }

    rowIsFull (row) {
        for (let r = 0; r < row.length; r++) {
            if (row[r] === 0) return false
        }
        return true
    }

    checkFullRow () {
        
        for (let row  = 0; row < this.data.length; row++) {
            if(this.rowIsFull (this.data[row])) {
                this.data.splice (row, 1)
                this.data.unshift ([0,0,0,0,0,0,0,0,0,0])
                this.game.score += 10

                for (let r = row; r > 0; r-- ){
                    for (let c = 0; c < this.data[0].length; c++) {
                        if (this.data[r][c] != 0) {
                            this.data[r][c].row += 1
                        }
                    }
                }
            }

           
        }
       
    }

}