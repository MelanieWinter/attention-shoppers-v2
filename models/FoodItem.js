export default class FoodItem {
    static width = 5
    static height = 5
    constructor({ position, ctx }) {
        this.ctx = ctx
        this.width = 5
        this.height = 5
        this.position = {
            x: position.x - this.width / 2,
            y: position.y - this.height / 2,
        }
    }

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }
}