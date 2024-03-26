export default class Player {
    static width = 25
    static height = 25
    constructor({ position, velocity, ctx }) {
        this.ctx = ctx
        this.velocity = velocity
        this.width = 25
        this.height = 25
        this.position = {
            x: position.x - this.width / 2,
            y: position.y - this.height / 2,
        }
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}