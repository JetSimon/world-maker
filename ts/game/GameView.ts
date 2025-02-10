class GameView {

    private mouseTextSpan: HTMLSpanElement;
    private hoverTextSpan: HTMLSpanElement;

    constructor(mouseTextSpan: HTMLSpanElement, hoverTextSpan: HTMLSpanElement) {
        this.mouseTextSpan = mouseTextSpan;
        this.hoverTextSpan = hoverTextSpan;
    }

    setMouseText(s: string) {
        this.mouseTextSpan.innerText = s;
    }

    setHoverText(s: string) {
        this.hoverTextSpan.innerText = s;
    }
}

export { GameView };
