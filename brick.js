class Brick {

    constructor (game, col, row) {
        this.game = game
        this.board = game.board
        this.cfg = game.cfg
        this.ctx = game.ctx
        this.col = col
        this.row = row
    }

    draw () {
        let brickImg = document.getElementById ('brick')

        let x = this.col * this.cfg.BRK_S
        let y = this.row * this.cfg.BRK_S

        this.ctx.drawImage (brickImg, x, y, this.cfg.BRK_S, this.cfg.BRK_S)
    }

    
    isHitBottom () {
        return this.row === this.cfg.N_R - 1
    }

    isHitLeft () {
        return this.col === 0
    }

    isHitRight () {
        return this.col === this.cfg.N_C - 1
    }

    canFall () {
        if (this.isHitBottom ()) return false

        if (this.board.isEmptyCell (this.col, this.row + 1)) {
            return true
        }
        else {
            return false
        }

        return true
    }

    canMoveToRight () {
        if (this.isHitRight ()) return false

        if (this.board.isEmptyCell (this.col + 1, this.row)) {
            return true
        } 

        else {
            return false
        }

        return true
    }

    canMoveToLeft () {
        if (this.isHitLeft ()) return false
        
        if (this.board.isEmptyCell (this.col - 1, this.row)) {
            return true
        } 
        
        else {
            return false
        }

        return true
    }

    fall () {
        if (this.canFall ()) this.row += 1
    }

    moveToLeft () {
        if (this.canMoveToLeft ()) this.col -= 1
    }

    moveToRight () {
        if (this.canMoveToRight ()) this.col += 1
    }

    fallFaster () {
        if (this.canFall ()) this.row += 1
    }

}