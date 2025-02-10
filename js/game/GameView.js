class GameView {
    constructor(mouseTextSpan, hoverTextSpan) {
        this.mouseTextSpan = mouseTextSpan;
        this.hoverTextSpan = hoverTextSpan;
    }
    setMouseText(s) {
        this.mouseTextSpan.innerText = s;
    }
    setHoverText(s) {
        this.hoverTextSpan.innerText = s;
    }
}
export { GameView };
//# sourceMappingURL=GameView.js.map