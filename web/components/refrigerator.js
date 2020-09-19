import { importWebElement } from "../js/fetch.js";
import "./coords-display.js";

importWebElement(`refrigerator`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.center = {
				x: 0,
				y: 0
			};
			this.anchor = this.shadowRoot.querySelector(`div[name="anchor"]`);
			this.coordsDisplay = this.shadowRoot.querySelector(`well-versed-coords-display`);

			this.shadowRoot.host.addEventListener(`mousedown`, (e) => {
				this.mouseLoc = {
					x: e.offsetX,
					y: e.offsetY
				};
				this.isDraggingViewport = true;
			});
			this.shadowRoot.host.addEventListener(`mousemove`, (e) => {
				if (this.isDraggingViewport === true) {
					this.center.x += e.offsetX - this.mouseLoc.x;
					this.center.y += e.offsetY - this.mouseLoc.y;

					this.anchor.style.left = `calc(50% + ${this.center.x}px)`;
					this.anchor.style.top = `calc(50% + ${this.center.y}px)`;

					this.coordsDisplay.querySelector(`span[slot="x"]`).innerHTML = this.center.x;
					this.coordsDisplay.querySelector(`span[slot="y"]`).innerHTML = this.center.y;

					this.mouseLoc = {
						x: e.offsetX,
						y: e.offsetY
					};
				}
			});
			this.shadowRoot.host.addEventListener(`mouseup`, (e) => {
				if (this.isDraggingViewport === true) {
					this.isDraggingViewport = false;
				}
			});
		});
	}
});
