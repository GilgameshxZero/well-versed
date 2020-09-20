import {fetch, importWebElement } from "../js/fetch.js";
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

			const prom1 = fetch ({
				url:`./assets/verbs.txt`,
			}
			);
			const prom2 = fetch ({
				url:`./assets/adjectives.txt`,
			}
			);
			const prom3 = fetch ({
				url:`./assets/nouns.txt`,
			}
			);
			const prom4 = fetch ({
				url:`./assets/adverbs.txt`,
			}
			);

			Promise.all([prom1, prom2, prom3, prom4]).then(function (responses) {
				i = 0 
				while (i < 4) {
					j = 0
					while (j < 4) {
						k = Math.floor(Math.random() * 10000)
						responses[i].str(" ").pop().split(" ")[k]
						j+=1
					}
					
				i+=1
				}
			})

			this.dragging = false;
			const onPointerMove = (e) => {
				if (this.dragging === true) {
					this.anchor.style.left = `calc(50% + ${this.center.x + e.clientX - this.pointerDown.x}px)`;
					this.anchor.style.top = `calc(50% + ${this.center.y + e.clientY - this.pointerDown.y}px)`;
					// this.coordsDisplay.querySelector(`span[slot="x"]`).innerHTML = this.center.x;
					// this.coordsDisplay.querySelector(`span[slot="y"]`).innerHTML = this.center.y;
				}
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
