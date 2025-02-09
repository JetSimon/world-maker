function makeEmptyGrid<T>(height: number, width: number, makeDefaultValue: () => T) {
    const grid: T[][] = [];
    for (let y = 0; y < height; y++) {
        const row: T[] = [];
        for (let x = 0; x < width; x++) {
            row.push(makeDefaultValue());
        }
        grid.push(row);
    }
    return grid;
};

export { makeEmptyGrid };

