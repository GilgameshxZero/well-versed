import { importWebElement } from "../js/fetch.js";

importWebElement(`word`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.center = {
				x: 0,
				y: 0
			};

			this.dragging = false;
			const onPointerMove = (e) => {
				e.stopPropagation();
				e.preventDefault();
				if (this.dragging === true) {
					this.shadowRoot.host.style.left = `${this.center.x + e.clientX - this.pointerDown.x}px`;
					this.shadowRoot.host.style.top = `${this.center.y + e.clientY - this.pointerDown.y}px`;
				}
				return 0;
			};
			this.shadowRoot.host.addEventListener(`pointerdown`, (e) => {
				this.pointerDown = {
					x: e.clientX,
					y: e.clientY
				};
				this.shadowRoot.host.addEventListener(`pointermove`, onPointerMove, true);
				this.shadowRoot.host.setPointerCapture(e.pointerId);
				this.dragging = true;
			}, true);
			this.shadowRoot.host.addEventListener(`pointerup`, (e) => {
				this.dragging = false;
				this.shadowRoot.host.releasePointerCapture(e.pointerId);
				this.shadowRoot.host.removeEventListener(`pointermove`, onPointerMove);
				this.center = {
					x: this.center.x + e.clientX - this.pointerDown.x,
					y: this.center.y + e.clientY - this.pointerDown.y
				}
			}, true);
		});
	}
});
