import { importWebElement } from "../js/fetch.js";

importWebElement(`action-bar`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.shadowRoot.querySelector(`span[name="restart"]`).addEventListener(`pointerdown`, (e) => {
				e.stopPropagation();
				this.dispatchEvent(new CustomEvent(`well-versed-action-bar-restart`, {
					bubbles: true
				}));
				console.log("hi")
			});
			this.shadowRoot.querySelector(`span[name="complete"]`).addEventListener(`pointerdown`, (e) => {
				e.stopPropagation();
				this.dispatchEvent(new CustomEvent(`well-versed-action-bar-complete`, {
					bubbles: true
				}));
			});
		});
	}
});