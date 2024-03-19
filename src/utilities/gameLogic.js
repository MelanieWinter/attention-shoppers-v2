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

export function handlePlayerMovement(player) {

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    function handleKeyDown(event) {
        switch (event.key) {
            case 'w':
                player.velocity.y -= 5
                break
            case 's':
                player.velocity.y += 5
                break
            case 'a':
                player.velocity.x -= 5
                break
            case 'd':
                player.velocity.x += 5
                break
            default:
                break
        }
        console.log(player.velocity)
    }

    function handleKeyUp(event) {
        switch (event.key) {
            case 'w':
                player.velocity.y = 0
                break
            case 's':
                player.velocity.y = 0
                break
            case 'a':
                player.velocity.x = 0
                break
            case 'd':
                player.velocity.x = 0
                break
            default:
                break
        }
        console.log(player.velocity)
    }

    // Return a cleanup function to remove the event listener when not needed
    return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
    }
}

