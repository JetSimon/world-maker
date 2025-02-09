function makeEmptyGrid(height, width, makeDefaultValue) {
    const grid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push(makeDefaultValue());
        }
        grid.push(row);
    }
    return grid;
}
;
export { makeEmptyGrid };
//# sourceMappingURL=array.js.map