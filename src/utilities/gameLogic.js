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

export function handlePlayerMovement() {

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    function handleKeyDown({ key }) {
        switch (key) {
            case 'w':
                keys.w.pressed = true
                break
            case 's':
                keys.s.pressed = true
                break
            case 'a':
                keys.a.pressed = true
                break
            case 'd':
                keys.d.pressed = true
                break
            default:
                break
        }
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

    // Return a cleanup function to remove the event listener when not needed
    return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
    }
}

export function handleKeyStateChange(player) {
    player.velocity.x = 0
    player.velocity.y = 0
    if (keys.w.pressed) {
        player.velocity.y -= 5
    } else if (keys.s.pressed) {
        player.velocity.y += 5
    } else if (keys.a.pressed) {
        player.velocity.x -= 5
    } else if (keys.d.pressed) {
        player.velocity.x += 5
    }
}

export function map() {
    const map = [
        ['-', '-', '-', '-', '-', '-'],
        ['-', ' ', ' ', ' ', ' ', '-'],
        ['-', ' ', '-', '-', ' ', '-'],
        ['-', ' ', ' ', ' ', ' ', '-'],
        ['-', '-', '-', '-', '-', '-'],
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
        });
    });
    return boundaries;
}

export function generatePlayer(Boundary, Player, ctx) {
    const player = new Player({
        position: {
            x: Boundary.width,
            y: Boundary.height,
        },
        velocity: {
            x: 0,
            y: 0,
        },
        ctx: ctx
    })
    return player
}

