import { importWebElement } from "../js/fetch.js";

importWebElement(`action-bar`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.shadowRoot.querySelector(`div[name="restart"]`).addEventListener(`pointerdown`, (e) => {
				e.stopPropagation();
				this.dispatchEvent(new CustomEvent(`well-versed-action-bar-restart`, {
					bubbles: true
				}));
			});
			this.shadowRoot.querySelector(`div[name="complete"]`).addEventListener(`pointerdown`, (e) => {
				e.stopPropagation();
				this.dispatchEvent(new CustomEvent(`well-versed-action-bar-complete`, {
					bubbles: true
				}));
			});
		});
	}
});
