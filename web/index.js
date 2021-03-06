import "./components/landing.js";
import "./components/refrigerator.js";
// import "./components/word-prompt.js";

window.addEventListener(`load`, () => {
	// Load fonts synchronously.
	WebFont.load({
		google: {
			families: [`Source Serif Pro`]
		}
	});
});

// This event is fired when all components and CSS pages have been loaded.
window.addEventListener(`fouc-load`, () => {
	window.addEventListener(`well-versed-landing-remove`, () => {
		// Clicked to remove landing.
		document.querySelector(`well-versed-refrigerator`).shadowRoot.querySelector(`:host>div`).classList.remove(`background`);
	});

	window.addEventListener(`well-versed-action-bar-complete`, () => {
		// Finish the poem.
		// html2canvas(document.querySelector(`well-versed-landing`)).then(
		// 	(canvas) => {
		// 		document.body.appendChild(canvas);
		// 	}
		// );
	});

	// No more FOUC.
	document.body.classList.remove(`loading`);
});
