const App = {};

App.Main = function () {
	const component = {};

	component.applyParallax = function () {
		if (window.scrollY === undefined || window.scrollY === null) return;

		window.addEventListener('scroll', function () {
			const sliderW = coverdiv.getBoundingClientRect().width;
			if (sliderW < 900) cover.style.marginTop = 0;
			else cover.style.marginTop = (window.scrollY - (window.scrollY * 0)) + "px";
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
		resume_button.onclick = function () { component.attemptGet("files/resume.pdf"); }
	}

	component.attemptGet = function (url) {
		const response = prompt("File restricted. You can ask me for the password. Please enter password: ");

		const attrs = ['enca', 'encb', 'encc'];
		const el1 = document.querySelector('[' + attrs[0] + ']');
		const el2 = document.querySelector('[' + attrs[1] + ']');
		const el3 = document.querySelector('[' + attrs[2] + ']');
		const pw =
			el1.getAttribute(attrs[0]).replace(/_/g, '') +
			el2.getAttribute(attrs[1]).replace(/_/g, '') +
			el3.getAttribute(attrs[2]).replace(/_/g, '');

		if (!response) return;
		else if (response == pw) component.open(url);
		else if (response != pw)alert("You are not allowed to view this file. You can try hacking it, it's absurdly simple and improvised. 😋");
	}

	component.lazyLoad = function () {
		const imgs = document.querySelectorAll('img[data-src]');

		[].forEach.call(imgs, function (img) {
			img.setAttribute('src', img.getAttribute('data-src'));
			img.onload = function () {
				this.removeAttribute('data-src');
			};
		});
	}

	component.animate = function () {
		const animate1 = TypeAnimation(document.querySelector(".hero-text.main"), "innerHTML");
		const animate2 = TypeAnimation(document.querySelector(".hero-text.sub"), "innerHTML");

		const a1 = function () {
			animate1.pauses = { 6: 400, 16: 400 }
			animate1.start();
			animate1.after = a2;
		}

		const a2 = function () {
			animate2.pauses = { 33: 10000 }
			animate2.start();
			animate2.after = function () {
				a1();
				document.querySelector('.hero-text.main').innerHTML = "";
				document.querySelector('.hero-text.sub').innerHTML = "";
			}
		}

		a1();
	}

	return component;
}();

App.Footer = function () {
	const footer = {};

	footer.setDate = function () {
		copyright_date.innerHTML = "Ramce Concepcion &copy; " + new Date().getFullYear();
	}

	return footer;
}();

App.Social = function () {
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

		sig.onclick = function () { component.openURL('https://www.instagram.com/ramceangelo_/'); };
		sig.onmouseover = function (evt) { component.hover(this, true, evt); };
		sig.onmouseleave = function (evt) { component.hover(this, false, evt); };
		sig.onmouseup = function (evt) { component.hover(this, false, evt); };

		sgl.onclick = function () { component.openURL('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ramuzuconcepcion@gmail.com'); };
		sgl.onmouseover = function (evt) { component.hover(this, true, evt); };
		sgl.onmouseleave = function (evt) { component.hover(this, false, evt); };
		sgl.onmouseup = function (evt) { component.hover(this, false, evt); };
	}

	return component;
}();

window.onload = function () {
	App.Main.applyParallax();
	App.Main.setEvents();
	App.Main.lazyLoad();

	App.Footer.setDate();
	App.Social.setEvents();

	App.Main.animate();
};