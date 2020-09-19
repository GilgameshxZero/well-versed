import "./components/landing.js";

window.addEventListener(`load`, () => {
	// Load fonts synchronously.
  WebFont.load({
    google: {
      families: [`Fjalla One`, `Open Sans`]
    }
	});
});

// This event is fired when all components and CSS pages have been loaded.
window.addEventListener(`fouc-load`, () => {
	// No more FOUC.
	document.body.classList.remove(`loading`);
});
