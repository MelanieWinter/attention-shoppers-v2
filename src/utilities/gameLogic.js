const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

let lastKey

export function handlePlayerMovement() {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    function handleKeyDown({ key }) {
        switch (key) {
            case 'w':
                keys.w.pressed = true
                lastKey = 'w'
                break
            case 's':
                keys.s.pressed = true
                lastKey = 's'
                break
            case 'a':
                keys.a.pressed = true
                lastKey = 'a'
                break
            case 'd':
                keys.d.pressed = true
                lastKey = 'd'
                break
            default:
                break
        }
        console.log(lastKey)
    }

    function handleKeyUp({ key }) {
        switch (key) {
            case 'w':
                keys.w.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
            default:
                break
        }
    }
    return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
    }
}

export function updatePlayerVelocity(player) {
    player.velocity.x = 0
    player.velocity.y = 0
    if (keys.w.pressed && lastKey == 'w') {
        player.velocity.y -= 5
    } else if (keys.s.pressed && lastKey == 's') {
        player.velocity.y += 5
    } else if (keys.a.pressed && lastKey == 'a') {
        player.velocity.x -= 5
    } else if (keys.d.pressed && lastKey == 'd') {
        player.velocity.x += 5
    }
}

export function detectCollision(boundary, player) {
    if (
        player.position.x + player.velocity.x < boundary.position.x + boundary.width &&
        player.position.x + player.width + player.velocity.x > boundary.position.x &&
        player.position.y + player.velocity.y < boundary.position.y + boundary.height &&
        player.position.y + player.height + player.velocity.y > boundary.position.y
    ) {
        console.log("Collision detected")
        player.velocity.x = 0
        player.velocity.y = 0
    }
}

export function map() {
    const map = [
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', ' ', ' ', ' ', ' ', ' ', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', ' ', ' ', ' ', ' ', ' ', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
    ]
    return map
}

export function generateBoundaries(mapData, Boundary, ctx) {
    const boundaries = []
    mapData.forEach((row, rowIndex) => {
        row.forEach((symbol, colIndex) => {
            switch(symbol) {
                case '-':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * colIndex,
                                y: Boundary.height * rowIndex,
                            },
                            ctx: ctx
                        })
                    );
                    break
                default:
                    break
            }
        })
    })
    return boundaries;
}

export function generatePlayer(Boundary, Player, ctx) {
    const player = new Player({
        position: {
            x: Boundary.width + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity: {
            x: 0,
            y: 0,
        },
        ctx: ctx
    })
    return player
}

