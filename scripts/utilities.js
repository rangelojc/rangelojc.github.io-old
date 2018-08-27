function ThemeUtil() {
	const module = {};

	module.start = function () {
		Teemr.themes = {
			"default": {
				"primary": {
					type: "background-color",
					value: "#272727"
				},
				"primary-text": {
					type: "color",
					value: "#272727"
				},
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
				},
				"border": {
					type: "border",
					value: "2px solid #272727"
				}
			},
			"grass": {
				"primary": {
					type: "background-color",
					value: "#50c878"
				},
				"primary-text": {
					type: "color",
					value: "#50c878"
				},
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
				},
				"border": {
					type: "border",
					value: "2px solid #50c878"
				},
			},
			"girly": {
				"primary": {
					type: "background-color",
					value: "#ff9ac7"
				},
				"primary-text": {
					type: "color",
					value: "#ff9ac7"
				},
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
				},
				"border": {
					type: "border",
					value: "2px solid #ff9ac7"
				},
			},
			"sky": {
				"primary": {
					type: "background-color",
					value: "#84cdee"
				},
				"primary-text": {
					type: "color",
					value: "#84cdee"
				},
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
				},
				"border": {
					type: "border",
					value: "2px solid #84cdee"
				},
			},
		}

		Teemr.use("default");
		module.attachEvents();
	}

	module.change = function (name, btn) {
		Teemr.use(name);
		module.stylizeButtons(btn);
	}

	module.stylizeButtons = function (btn) {
		const btns = document.querySelectorAll('.teemr-buttons');
		for (let i = 0; i < btns.length; i++) {
			btns[i].classList.remove('active');
			btns[i].style.backgroundColor = "transparent";
		}

		btn.style.color = "#fff";
		btn.style.backgroundColor = Teemr.theme.primary.value;
	}

	module.attachEvents = function () {
		teemrbutton1.onclick = function () { module.change("default", this); }
		teemrbutton2.onclick = function () { module.change("sky", this); }
		teemrbutton3.onclick = function () { module.change("girly", this); }
		teemrbutton4.onclick = function () { module.change("grass", this); }
		module.stylizeButtons(teemrbutton1);
	}

	return module;
}

function TypeAnimationUtil() {

	const animate1 = new TypeAnimation(sht_ramce, "innerHTML");
	const animate2 = new TypeAnimation(sht_ramce2, "innerHTML");

	const a1 = function () {
		animate1.pauses = { 6: 400, 16: 400 }
		animate1.start();
		animate1.after = function () { a2(); }
	}

	const a2 = function () {
		animate2.pauses = { 33: 10000 }
		animate2.start();
		animate2.after = function () {
			a1();
			sht_ramce.innerHTML = "";
			sht_ramce2.innerHTML = "";
		}
	}

	a1();
}

function MainUtil() {
	return {
		lazyLoad: function () {
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