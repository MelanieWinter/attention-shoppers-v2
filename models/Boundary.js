export default class Boundary {
    static width = 40
    static height = 40

    constructor({ position, ctx }) {
        this.ctx = ctx
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }
}
