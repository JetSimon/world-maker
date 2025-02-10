import { randomRange, Vector2 } from "./math.js";

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

function flood<T>(x: number, y: number, grid: T[][], getFillValue: () => T, shouldFill: (x: number, y: number, e: T) => boolean, maxDepth = -1, depth = 0, toFill: (Vector2[] | null) = null) {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
        return;
    }

    if (!shouldFill(x, y, grid[y][x])) {
        return;
    }

    if (maxDepth > 0 && depth > maxDepth) {
        if (toFill != null) {
            toFill.push(new Vector2(x, y));
        }

        return;
    }

    grid[y][x] = getFillValue();

    flood(x + 1, y, grid, getFillValue, shouldFill, maxDepth, depth + 1, toFill);
    flood(x - 1, y, grid, getFillValue, shouldFill, maxDepth, depth + 1, toFill);
    flood(x, y + 1, grid, getFillValue, shouldFill, maxDepth, depth + 1, toFill);
    flood(x, y - 1, grid, getFillValue, shouldFill, maxDepth, depth + 1, toFill);
}

function makeEmptyGridLike<T1, T2>(grid: T1[][], makeDefaultValue: () => T2) {
    return makeEmptyGrid(grid.length, grid[0].length, makeDefaultValue);
}

function randomGridPosition<T>(grid: T[][]) {
    const y = Math.floor(randomRange(0, grid.length));
    const x = Math.floor(randomRange(0, grid[0].length));
    return new Vector2(x, y);
}

export { makeEmptyGrid, flood, makeEmptyGridLike, randomGridPosition };

