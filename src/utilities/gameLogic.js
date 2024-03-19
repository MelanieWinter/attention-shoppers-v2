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
    const boundaries = [];

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
                    break;
                default:
                    break;
            }
        });
    });
    return boundaries;
}