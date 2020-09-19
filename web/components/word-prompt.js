import { importWebElement } from "../js/fetch.js";

importWebElement(`word-prompt`, class extends HTMLElement {
	constructor() {
		super();
		setTimeout(() => {
			this.shadowRoot.host.addEventListener(`click`, () => {
				this.shadowRoot.querySelector(`span`).classList.add(`hidden`);
				console.log(`waiting for new words…`);
			});
		});
	}
});
