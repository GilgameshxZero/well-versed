import { importWebElement } from "../js/fetch.js";
import "./action-bar.js";
import "./word.js";
// import "./coords-display.js";

importWebElement(`refrigerator`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.center = {
				x: 0,
				y: 0
			};
			this.anchor = this.shadowRoot.querySelector(`div[name="anchor"]`);
			// this.coordsDisplay = this.shadowRoot.querySelector(`well-versed-coords-display`);

			this.dragging = false;
			const onDragMove = (clientX, clientY) => {
				if (this.dragging === true) {
					this.anchor.style.left = `calc(50% + ${this.center.x + clientX - this.pointerDown.x}px)`;
					this.anchor.style.top = `calc(50% + ${this.center.y + clientY - this.pointerDown.y}px)`;
					// this.coordsDisplay.querySelector(`span[slot="x"]`).innerHTML = this.center.x;
					// this.coordsDisplay.querySelector(`span[slot="y"]`).innerHTML = this.center.y;
				}
			};
			const onDragStart = (clientX, clientY) => {
				this.pointerDown = {
					x: clientX,
					y: clientY
				};
				this.shadowRoot.host.addEventListener(`pointermove`, (e) => {
					onDragMove(e.clientX, e.clientY);
				});
				this.dragging = true;
			};
			const onDragEnd = (clientX, clientY) => {
				if (this.dragging === true) {
					this.dragging = false;
					this.shadowRoot.host.removeEventListener(`pointermove`, (e) => {
						onDragMove(e.clientX, e.clientY);
					});
					this.center = {
						x: this.center.x + clientX - this.pointerDown.x,
						y: this.center.y + clientY - this.pointerDown.y
					}
				}
			};

			this.shadowRoot.host.addEventListener(`pointerdown`, (e) => {
				this.shadowRoot.host.setPointerCapture(e.pointerId);
				onDragStart(e.clientX, e.clientY);
			});
			this.shadowRoot.host.addEventListener(`pointerup`, (e) => {
				this.shadowRoot.host.releasePointerCapture(e.pointerId);
				onDragEnd(e.clientX, e.clientY);
			});
			this.shadowRoot.host.addEventListener(`touchstart`, (e) => {
				onDragStart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			});
			this.shadowRoot.host.addEventListener(`touchmove`, (e) => {
				onDragMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			});
			this.shadowRoot.host.addEventListener(`touchend`, (e) => {
				onDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			});

			// Listen for restart event.
			this.shadowRoot.host.addEventListener(`well-versed-action-bar-restart`, () => {
				this.resetWords();
			});
			
			// Seed with some words.
			this.resetWords();
		});
	}

	resetWords() {

	}
});
