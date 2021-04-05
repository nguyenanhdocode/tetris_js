
// init shape data

let  O = [
    [1, 1],
    [1, 1]
]

let I = [
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [0,1,0]
]

let T = [
    [0, 1, 0],
    [1, 1, 1]
]

let Z_1 = [
    [1, 1, 0],
    [0, 1, 1]
]

let Z_2 = [
    [0, 1, 1],
    [1, 1, 0]
]

let L_1 = [
    [1, 0],
    [1, 0],
    [1, 1]
]

let L_2 = [
    [0, 1],
    [0, 1],
    [1, 1]
]

class Shape {
    constructor (game, col, row) {
        this.shapes = []
        this.board = game.board
        this.game = game
        this.ctx = game.ctx
        this.cfg = game.cfg
        this.col = col
        this.row = row
        this.hitBottomSound = document.getElementById ('hitBottomSound')

        this.init ()

        // is an array width 0 and 1
        this.currentShape = null 


        // is an array width brick objects
        this.bricks = []

        this.rotate = 0
        
    }

    init () {
        this.shapes.push (O, T, I,L_2,Z_1, L_1, Z_2)
    }

    spawnNew () {
        this.col = 4
        this.row = 0
        this.bricks = []
        this.getRandShape ()
        if (this.currentShape != null) {
            this.createBricks ()
        }

        
    }

    getRandShape () {
        let rand = Math.floor (Math.random () * this.shapes.length)
        this.currentShape = this.shapes[rand]
    }

    // change 0 and 1 to brick object
    /* Example:
    
        T = [
            [0, 1, 0],
            [1, 1, 1]
        ]

        ======> 

        T' = [Brick, brick, brick, brick]
    
    */
    createBricks () {
        for (let row = 0; row < this.currentShape.length; row ++) {
            for (let col = 0; col < this.currentShape[0].length; col ++) {
                if (this.currentShape[row][col] != 0) {
                    let brick = new Brick (this.game, this.col + col, this.row + row)
                    this.bricks.push (brick)
                }
            }
        }
    }
    
    draw () {
        for (let brick of this.bricks) {
            brick.draw ()
        }
    }

    canMoveToRight () {
        for (let brick of this.bricks) {
            if (! brick.canMoveToRight ()) return false
        }

        return true
    }

    canMoveToLeft () {
        for (let brick of this.bricks) {
            if (! brick.canMoveToLeft ()) {
            return false
            }
        }

        return true
    }

    canFall () {
        for (let brick of this.bricks) {
            if (!brick.canFall ())
            return false
        }
        return true
    }

    
    moveToRight () {
        if (this.canMoveToRight ()){
            for (let brick of this.bricks) {
                brick.moveToRight ()
            }
            this.col += 1
        }
    }

    moveToLeft () {
        if (this.canMoveToLeft ()){
            for (let brick of this.bricks) {
                brick.moveToLeft ()
            }
            this.col -= 1

        }
        
    }

    fall () {
        if (this.canFall ()) {
            for (let brick of this.bricks) {
                brick.fall ()
            }

            this.row += 1
        }
        else {
            this.game.score += this.bricks.length
            this.board.updateBoard (this.bricks)
            this.board.checkFullRow ()
            this.spawnNew ()

        }
    }

    fallFaster () {
        this.fall ()
    }

    rotateMatrix (source) {
        // get the dimensions of the source matrix
        const M = source.length;
        const N = source[0].length;

        // create a new NxM destination array
        let destination = new Array(N);
        for (let i = 0; i < N; i++) {
            destination[i] = new Array(M);
        }

        // start copying from source into destination
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                destination[i][j] = source[M - j - 1][i];
            }
        }

        // return the destination matrix
        return destination;
    }

    canRotate (newShape) {

        if (! this.canFall ()) return false

        // create brick from newShape
        var bricks = []
        for (let row = 0; row < newShape.length; row ++) {
            for (let col = 0; col < newShape[0].length; col ++) {
                if (newShape[row][col] != 0) {
                    let brick = new Brick (this.game, this.col + col, this.row + row)
                    bricks.push (brick)
                }
            }
        }

        for (let brick of bricks) {
           if (!this.board.isEmptyCell (brick.col, brick.col) || brick.row > this.cfg.N_R - 1) return false
        }
 
        return true
    }

    rotateShape () {
       let newShape = this.rotateMatrix (this.currentShape)

       if (this.canRotate (newShape)) {
           this.bricks = []
           this.currentShape = newShape
           this.createBricks ()
           this.game.draw ()
       }
    }
}