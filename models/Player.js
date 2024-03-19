export default class Player {
    constructor({ position, velocity, ctx }) {
        this.ctx = ctx
        this.position = position
        this.velocity = velocity
        this.width = 30
        this.height = 30
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