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

	component.showEmail = function () {
		alert('Email me at ramuzuconcepcion@gmail.com');

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

		// sgo.onclick = function () { showEmail(); }
		// sgo.onmouseover = function (evt) { component.hover(this, true, evt); };
		// sgo.onmouseleave = function (evt) { component.hover(this, false, evt); };
		// sgo.onmouseup = function (evt) { component.hover(this, false, evt); };

		sig.onclick = function () { component.openURL('https://www.instagram.com/ramceangelo_/'); };
		sig.onmouseover = function (evt) { component.hover(this, true, evt); };
		sig.onmouseleave = function (evt) { component.hover(this, false, evt); };
		sig.onmouseup = function (evt) { component.hover(this, false, evt); };
	}
	return component;
}

function HomePage() {
	const component = {};

	component.applyParallax = function () {
		if (window.scrollY === undefined || window.scrollY === null) return;

		window.addEventListener('scroll', function () {
			if(document.querySelectorAll('#cover').length == 0) return;
			
			const sliderW = coverdiv.getBoundingClientRect().width;

			if (sliderW < 900) cover.style.marginTop = 0;
			else cover.style.marginTop = (window.scrollY * -0.3) + "px";
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

function LazyLoader() {
	const imgs = document.querySelectorAll('img[data-src]');

	for (let i = 0, len = imgs.length; i < len; i++) {
		imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
		imgs[i].onload = function () {
			this.removeAttribute('data-src');
		};
	}
}

window.onload = function () {
	const social = new SocialMedia();
	social.setEvents();

	const home = new HomePage();
	home.applyParallax();
	home.setEvents();

	const footer = new Footer()
	footer.setDate();

	const demo1 = new ThemifyDemo();
	demo1.start();

	LazyLoader();
};