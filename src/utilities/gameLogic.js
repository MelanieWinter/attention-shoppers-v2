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
    q: {
        pressed: false
    }
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
            case 'q':
                keys.q.pressed = true
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
            case 'q':
                keys.q.pressed = false
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

// export function updatePlayerVelocity(player, boundaries) {
//     const direction = {
//         'w': { x: 0, y: -5 },
//         's': { x: 0, y: 5 },
//         'a': { x: -5, y: 0 },
//         'd': { x: 5, y: 0 }
//     }

//     const key = Object.keys(keys).find(k => keys[k].pressed && lastKey === k)

//     if (key) {
//         const velocity = direction[key];
//         for (let i = 0; i < boundaries.length; i++) {
//             const boundary = boundaries[i]
//             if (rectToRectCollision({ movingRect: { ...player, velocity }, staticRect: boundary })) {
//                 player.velocity = velocity;
//                 break
//             } else {
//                 player.velocity = { x: 0, y: 0 }
//             }
//         }
//     }
// }


export function updatePlayerVelocity(player, boundaries) {
    if (keys.w.pressed && lastKey == 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectToRectCollision({
                    movingRect: {
                        ...player, 
                        velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                    staticRect: boundary
                })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = -5
            }
        }
    } else if (keys.s.pressed && lastKey == 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectToRectCollision({
                    movingRect: {
                        ...player, 
                        velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    staticRect: boundary
                })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = 5
            }
        }
    } else if (keys.a.pressed && lastKey == 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectToRectCollision({
                    movingRect: {
                        ...player, 
                        velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                    staticRect: boundary
                })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = -5
            }
        }
    } else if (keys.d.pressed && lastKey == 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectToRectCollision({
                    movingRect: {
                        ...player, 
                        velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                    staticRect: boundary
                })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = 5
            }
        }
    }
}

export function rectToRectCollision({
    movingRect, 
    staticRect
}) {
    return (
        movingRect.position.x + movingRect.velocity.x < staticRect.position.x + staticRect.width &&
        movingRect.position.x + movingRect.width + movingRect.velocity.x > staticRect.position.x &&
        movingRect.position.y + movingRect.velocity.y < staticRect.position.y + staticRect.height &&
        movingRect.position.y + movingRect.height + movingRect.velocity.y > staticRect.position.y
    )
}

export function detectPlayerBoundaryCollision(boundary, player) {
    if (
        rectToRectCollision({
            movingRect: player,
            staticRect: boundary
        })
    ) {
        player.velocity.x = 0
        player.velocity.y = 0
    }
}

// Pick up food item by colliding with it and pressing 'Q'
export function handleGrabItem(foodItems, foodItem, i, player, score, setScore) {
    if (keys.q.pressed === true) {
        for (let i = foodItems.length - 1; i >= 0; i--) {
            const foodItem = foodItems[i];
            if (
                player.position.x < foodItem.position.x + foodItem.width &&
                player.position.x + player.width > foodItem.position.x &&
                player.position.y < foodItem.position.y + foodItem.height &&
                player.position.y + player.height > foodItem.position.y
            ) {
                foodItems.splice(i, 1)
                // This is doubled for some reason
                setScore(prevScore => prevScore + 10)
            }
        }
    }
}

export function map() {
    const map = [
        ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', ' ', '.', ' ', '.', ' ', '.', ' ', '-'],
        ['-', '.', '-', '.', '-', '.', '-', '.', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', '.', '-', '.', '-', '.', '-', '.', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', '.', ' ', '.', ' ', '.', ' ', '.', '-'],
        ['-', ' ', '-', '-', '-', '-', '-', ' ', '-'],
        ['-', '.', ' ', '.', ' ', '.', ' ', '.', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', '.', '-', '.', '-', '.', '-', '.', '-'],
        ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-'],
        ['-', '.', '-', '.', '-', '.', '-', '.', '-'],
        ['-', ' ', '.', ' ', '.', ' ', '.', ' ', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ]
    return map
}

export function generateMap(mapData, Boundary, FoodItem, ctx) {
    const foodItems = []
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
                case '.':
                    foodItems.push(
                        new FoodItem({
                            position: {
                                x: colIndex * Boundary.width + Boundary.width / 2,
                                y: rowIndex * Boundary.height + Boundary.height / 2,
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
    return { boundaries, foodItems };
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

export function generateEmployees(Boundary, Employee, ctx) {
    const employees = [
        new Employee ({
            position: {
                x: Boundary.width * 6 + Boundary.width / 2,
                y: Boundary.height + Boundary.height / 2,
            },
            velocity: {
                x: 0,
                y: 0
            },
            ctx: ctx
        })
    ]
    return employees
}