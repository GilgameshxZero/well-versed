import { importWebElement } from "../js/fetch.js";

importWebElement(`landing`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.shadowRoot.querySelector(`:host>div`).addEventListener(`click`, () => {
				console.log(`hi`);
				this.shadowRoot.querySelector(`:host>div`).classList.add(`hidden`);
			})
		});
	}
});
