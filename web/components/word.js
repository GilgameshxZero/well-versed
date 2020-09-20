import { importWebElement } from "../js/fetch.js";

importWebElement(`word`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.dragging = false;
			const onDragMove = (clientX, clientY) => {
				if (this.dragging === true) {
					this.shadowRoot.host.style.left = `${this.center.x + clientX - this.pointerDown.x}px`;
					this.shadowRoot.host.style.top = `${this.center.y + clientY - this.pointerDown.y}px`;
				}
			};
			const onDragStart = (clientX, clientY) => {
				this.pointerDown = {
					x: clientX,
					y: clientY
				};
				this.shadowRoot.host.addEventListener(`pointermove`, (e) => {
					e.stopPropagation();
					onDragMove(e.clientX, e.clientY);
				});
				this.dragging = true;
			};
			const onDragEnd = (clientX, clientY) => {
				if (this.dragging === true) {
					this.dragging = false;
					this.shadowRoot.host.removeEventListener(`pointermove`, (e) => {
						e.stopPropagation();
						onDragMove(e.clientX, e.clientY);
					});
					this.center = {
						x: this.center.x + clientX - this.pointerDown.x,
						y: this.center.y + clientY - this.pointerDown.y
					}
				}
			};

			this.shadowRoot.host.addEventListener(`pointerdown`, (e) => {
				e.stopPropagation();
				this.shadowRoot.host.setPointerCapture(e.pointerId);
				onDragStart(e.clientX, e.clientY);
			});
			this.shadowRoot.host.addEventListener(`pointerup`, (e) => {
				e.stopPropagation();
				this.shadowRoot.host.releasePointerCapture(e.pointerId);
				onDragEnd(e.clientX, e.clientY);
			});
			this.shadowRoot.host.addEventListener(`touchstart`, (e) => {
				e.stopPropagation();
				onDragStart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			});
			this.shadowRoot.host.addEventListener(`touchmove`, (e) => {
				e.stopPropagation();
				onDragMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			});
			this.shadowRoot.host.addEventListener(`touchend`, (e) => {
				e.stopPropagation();
				onDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			});
		});
	}
	setCenter(x, y) {
		this.center = {
			x: x,
			y: y
		};

		this.shadowRoot.host.style.left = `${this.center.x}px`;
		this.shadowRoot.host.style.top = `${this.center.y}px`;
	}
});
