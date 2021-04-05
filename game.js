class Game {

    constructor () {
        this.canvas = null
        this.ctx = null
        this.score = 0
        this.isEnd = false
        
        this.init ()

        this.setting ()

        this.draw ()

        this.loop ()

        this.catchKeyBoardHandle ()

    }


    init () {

        // init config
        this.cfg = new Config ()
        
        this.canvas = document.getElementById ('canvas')
        this.ctx = this.canvas.getContext ('2d')
        this.next = document.getElementById ('nextCanvas')
        this.nextCtx = this.next.getContext ('2d')


        // theme game sound
        let theme_sound = document.getElementById ('theme_sound')
        theme_sound.play ()

        // init board
        this.board = new Board (this)

        // init shape
        this.shape = new Shape (this, 4, 0)

        this.shape.spawnNew ()

    }

    setting () {
        this.canvas.with = this.cfg.WND_W
        this.canvas.height = this.cfg.WND_H
    }

    draw () {

        if (! this.isEnd) {
            this.board.clearScreen ()

            this.board.draw ()

            this.shape.draw ()

            this.drawNextShape ()

            this.showScore ()

            setTimeout (() => this.draw (), 30)
        }
    }

    loop () {

        setInterval (() => {
            if (!this.isEnd) this.shape.fall ()
        }, 500)

    }

    catchKeyBoardHandle () {
        document.addEventListener ('keydown', (event) => {

            switch (event.code) {

                case 'Enter' : {
                    this.isEnd = false
                }; break;

                case 'Space' : {
                    this.isEnd = true
                }; break;

                case 'ArrowRight': this.shape.moveToRight (); break;

                case 'ArrowLeft' : this.shape.moveToLeft (); break;

                case 'ArrowDown' : this.shape.fallFaster (); break;

                case 'ArrowUp' : this.shape.rotateShape (); break;
            }
        })
    }

    showScore () {
        let score = document.getElementById('gameScore').innerHTML = 'Score:  ' + this.score
    }

    drawNextShape () {
        
    }

}

let game = new Game ()