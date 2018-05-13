function SocialMedia() {
	const component = {}

	component.openURL = function () {
		const win = window.open(url, '_blank');
		win.focus();
	}

	component.hover = function () {
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
		sfb.onmouseover = function (evt) { component.hoverSocial(this, true, evt); };
		sfb.onmouseleave = function (evt) { component.hoverSocial(this, false, evt); };
		sfb.onmouseup = function (evt) { component.hoverSocial(this, false, evt); };

		stw.onclick = function () { component.openURL('https://www.twitter.com/ramceangelo'); };
		stw.onmouseover = function (evt) { component.hoverSocial(this, true, evt); };
		stw.onmouseleave = function (evt) { component.hoverSocial(this, false, evt); };
		stw.onmouseup = function (evt) { component.hoverSocial(this, false, evt); };

		sgo.onclick = function () { showEmail(); }
		sgo.onmouseover = function (evt) { component.hoverSocial(this, true, evt); };
		sgo.onmouseleave = function (evt) { component.hoverSocial(this, false, evt); };
		sgo.onmouseup = function (evt) { component.hoverSocial(this, false, evt); };

		sig.onclick = function () { component.openURL('https://www.instagram.com/ramceangelo_/'); };
		sig.onmouseover = function (evt) { component.hoverSocial(this, true, evt); };
		sig.onmouseleave = function (evt) { component.hoverSocial(this, false, evt); };
		sig.onmouseup = function (evt) { component.hoverSocial(this, false, evt); };
	}
	return component;
}

function HomePage() {
	const component = {};

	component.applyParallax = function() {
		if (window.scrollY === undefined || window.scrollY === null) return;

		window.addEventListener('scroll', function () {
			const sliderW = coverdiv.getBoundingClientRect().width;

			if (sliderW < 900) cover.style.marginTop = 0;
			else cover.style.marginTop = (window.scrollY * -0.3) + "px";
		})
	}

	return component;
}

window.onload = function () {
	const social = new SocialMedia();
	social.setEvents();

	const home = new HomePage();
	home.applyParallax();
};