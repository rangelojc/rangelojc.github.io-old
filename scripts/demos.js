function ThemifyDemo() {
	const module = {};

	module.start = function () {
		Themify.themes = {
			"default": {
				"header-bg": {
					type: "background-color",
					value: "#404040"
				},
				"border":{
					type: "border",
					value: "2px solid #606060"
				},
				"text-title": {
					type: "color",
					value: "#606060"
				},
				"text-content": {
					type: "color",
					value: "#606060"
				},
				"footer-bg": {
					type: "background-color",
					value: "#272727"
				},
				"footer-text1": {
					type: "color",
					value: "#e9e9e9"
				},
				"footer-text2": {
					type: "color",
					value: "#d1d1d1"
				}
			},
			"earth": {
				"header-bg": {
					type: "background-color",
					value: "#2e4600"
				},
				"border":{
					type: "border",
					value: "2px solid #2e4600"
				},
				"text-title": {
					type: "color",
					value: "#2e4600"
				},
				"text-content": {
					type: "color",
					value: "#606060"
				},
				"footer-bg": {
					type: "background-color",
					value: "#7d4427"
				},
				"footer-text1": {
					type: "color",
					value: "#fff"
				},
				"footer-text2": {
					type: "color",
					value: "#fff"
				}
			},
			"girly": {
				"header-bg": {
					type: "background-color",
					value: "#ff9ac7"
				},
				"border":{
					type: "border",
					value: "2px solid #ff9ac7"
				},
				"text-title": {
					type: "color",
					value: "#ff9ac7"
				},
				"text-content": {
					type: "color",
					value: "#606060"
				},
				"footer-bg": {
					type: "background-color",
					value: "#da3d75"
				},
				"footer-text1": {
					type: "color",
					value: "#fff"
				},
				"footer-text2": {
					type: "color",
					value: "#fff"
				}
			},
			"sky": {
				"header-bg": {
					type: "background-color",
					value: "#84cdee"
				},
				"border":{
					type: "border",
					value: "2px solid #84cdee"
				},
				"text-title": {
					type: "color",
					value: "#84cdee"
				},
				"text-content": {
					type: "color",
					value: "#606060"
				},
				"footer-bg": {
					type: "background-color",
					value: "#50b8e7"
				},
				"footer-text1": {
					type: "color",
					value: "#fff"
				},
				"footer-text2": {
					type: "color",
					value: "#fff"
				}
			},
		}

		module.attachEvents();
	}

	module.change = function (name, btn) {
		if (document.querySelectorAll('#cover').length != 0) {
			module.cover = cover.cloneNode(true);
			coverdiv.removeChild(cover);
		}
		if (name == "default") {
			subheaderdiv.style.backgroundColor = "rgba(0,0,0,0.5)";
			coverdiv.appendChild(module.cover);
		}
		else{ subheaderdiv.style.backgroundColor = "transparent"; }

		Themify.use(name);

		module.stylizeButtons(btn);
	}

	module.stylizeButtons = function(btn){
		const btns = document.querySelectorAll('.themify-buttons');
		for(let i = 0; i < btns.length; i++) btns[i].classList.remove('active');
		btn.classList.add('active');
	}

	module.attachEvents = function () {
		themifybutton1.onclick = function () { module.change("default", this); }
		themifybutton2.onclick = function () { module.change("sky", this); }
		themifybutton3.onclick = function () { module.change("girly", this); }
		themifybutton4.onclick = function () { module.change("earth", this); }
	}

	return module;
}