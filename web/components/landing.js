import { importWebElement } from "../js/fetch.js";

importWebElement(`landing`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			const removeLanding = () => {
				window.removeEventListener(`keydown`, removeLanding);
				window.removeEventListener(`mousedown`, removeLanding);
				this.shadowRoot.querySelector(`:host>div`).classList.add(`hidden`);
				this.dispatchEvent(new CustomEvent(`well-versed-landing-remove`, {
					bubbles: true
				}));
			};

			// window.addEventListener(`keydown`, removeLanding);
			window.addEventListener(`mousedown`, removeLanding);
		});
	}
});
