/*
* opts: dictionary of request configurations.
	* method: string (`GET`, `POST`, etc.).
	* url: string.
	* headers: mapping from string to string.
	* params: mapping from string to string.
	* responseType: specify `document` to return a document.
Returns a promise which resolves when the XHR finishes.
*/
export function fetch(opts) {
	return new Promise(function(resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open(opts.method || `GET`, opts.url);
		xhr.responseType = opts.responseType || ``;
		xhr.onload = function() {
			if (this.status >= 200 && this.status < 300) {
				resolve(this);
			} else {
				reject(this);
			}
		};
		xhr.onerror = function() {
			reject(this);
		};
		if (opts.headers) {
			Object.keys(opts.headers).forEach(function(key) {
				xhr.setRequestHeader(key, opts.headers[key]);
			});
		}
		xhr.send(opts.params ? Object.keys(opts.params).map(function(key) {
			return encodeURIComponent(key) + `=` + encodeURIComponent(opts.params[key]);
		}).join(`&`) : ``);
	});
}

// Shortcut for importing a web component. Creates a shadow root to compartmentalize CSS.
export function importWebElement(name, CustomWebElement = class extends HTMLElement {}) {
	// Custom web component prefix.
	const elementPrefix = `well-versed`;

	// For avoiding FOUC.
	if (importWebElement.pending === undefined) {
		importWebElement.pending = {
			css: 0,
			component: 0
		};
	}
	const checkFOUCLoad = () => {
		if (importWebElement.pending.css === 0 &&
			importWebElement.pending.component === 0) {
			// console.log(`Dispatching fouc-load.`);
			document.dispatchEvent(
				new CustomEvent(`fouc-load`, {
					bubbles: true
				}));
		}
	};

	importWebElement.pending.component++;
	// console.log(`Pending ${JSON.stringify(importWebElement.pending)}.`);
	return new Promise(function(resolve, reject) {
		fetch({
			url: `./components/${name}.html`,
			responseType: `document`
		}).then((xhr) => {
			customElements.define(`${elementPrefix}-${name}`, class extends CustomWebElement {
				constructor() {
					super();
					const shadowRoot = this.attachShadow({ mode: `open` })
						.appendChild(xhr.responseXML.querySelector(`template`)
							.content.cloneNode(true));

					// Trigger a global event when all component CSS pages have loaded.
					const extLinks = this.shadowRoot.querySelectorAll(`link`);
					importWebElement.pending.css += extLinks.length;
					// console.log(`Pending ${JSON.stringify(importWebElement.pending)}.`);
					extLinks.forEach((element) => {
						element.addEventListener(`load`, () => {
							importWebElement.pending.css--;
							// console.log(`Pending ${JSON.stringify(importWebElement.pending)}.`);
							checkFOUCLoad();
						});
					});

					resolve(shadowRoot);
				}
			});
		}).catch((xhr) => {
			console.log(`Error while importing component ${name}: ${xhr.status}.`);
			console.log(xhr.statusText);
			reject(xhr);
		});
	}).then(() => {
		importWebElement.pending.component--;
		// console.log(`Pending ${JSON.stringify(importWebElement.pending)}.`);
		checkFOUCLoad();
	});
}
