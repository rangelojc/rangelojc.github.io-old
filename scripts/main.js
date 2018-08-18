function HomePage() {
	const component = {};

	component.applyParallax = function () {
		if (window.scrollY === undefined || window.scrollY === null) return;

		window.addEventListener('scroll', function () {
			const sliderW = coverdiv.getBoundingClientRect().width;
			if (sliderW < 900) cover.style.marginTop = 0;
			else cover.style.marginTop = (window.scrollY - (window.scrollY * 0.2)) + "px";
		});
	}

	component.download = function (url) {
		window.location.href = url;
	}

	component.open = function (url) {
		const win = window.open(url, '_blank');
		win.focus();
	}

	component.setEvents = function () {
		resume.onclick = function () { component.open("files/resume.pdf"); }
	}

	return component;
}

function Footer() {
	const footer = {};

	footer.setDate = function () {
		let year = new Date().getFullYear();
		copyright_date.innerHTML = "Ramce Concepcion &copy; " + year;
	}

	return footer;
}

function SocialMedia() {
	const component = {}

	component.openURL = function (url) {
		const win = window.open(url, '_blank');
		win.focus();
	}

	component.hover = function (el, action, evt) {
		switch (action) {
			case true: el.style.opacity = 1; break;
			case false: el.style.opacity = 0.8; break;
		}

		evt.preventDefault();
	}

	component.setEvents = function () {
		sfb.onclick = function () { component.openURL('https://www.facebook.com/ramceconcepcion'); };
		sfb.onmouseover = function (evt) { component.hover(this, true, evt); };
		sfb.onmouseleave = function (evt) { component.hover(this, false, evt); };
		sfb.onmouseup = function (evt) { component.hover(this, false, evt); };

		stw.onclick = function () { component.openURL('https://www.twitter.com/ramceangelo'); };
		stw.onmouseover = function (evt) { component.hover(this, true, evt); };
		stw.onmouseleave = function (evt) { component.hover(this, false, evt); };
		stw.onmouseup = function (evt) { component.hover(this, false, evt); };

		sig.onclick = function () { component.openURL('https://www.instagram.com/ramceangelo_/'); };
		sig.onmouseover = function (evt) { component.hover(this, true, evt); };
		sig.onmouseleave = function (evt) { component.hover(this, false, evt); };
		sig.onmouseup = function (evt) { component.hover(this, false, evt); };
	}
	
	return component;
}

function Utilities() {
	return {
		lazyLoad: function(){
			const imgs = document.querySelectorAll('img[data-src]');

			for (let i = 0, len = imgs.length; i < len; i++) {
				imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
				imgs[i].onload = function () {
					this.removeAttribute('data-src');
				};
			}
		}
	}	
}

const App = {};

window.onload = function () {
	App.Home = new HomePage();
	App.Home.applyParallax();
	App.Home.setEvents();

	App.Footer = new Footer()
	App.Footer.setDate();

	App.Social = new SocialMedia();
	App.Social.setEvents();

	App.Speck = new Speck(subheaderdiv);
	App.Speck.render();

	App.Teemr = new TeemrDemo();
	App.Teemr.start();

	App.Utilities = new Utilities();
	App.Utilities.lazyLoad();
};