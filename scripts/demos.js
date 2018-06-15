function DemoPopUp(){
	const module = {};



	return module;
}

function ThemifyDemo() {
	const module = {};

	module.start = function () {
		Themify.themes = {
			"default": {
				"primary": {
					type: "background-color",
					value: "#606060"
				},
				"primary-text": {
					type: "color",
					value: "#606060"
				},
				"border":{
					type: "border",
					value: "2px solid #606060"
				}
			},
			"mint": {
				"primary": {
					type: "background-color",
					value: "#50c878"
				},
				"primary-text": {
					type: "color",
					value: "#50c878"
				},
				"border":{
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
				"border":{
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
				"border":{
					type: "border",
					value: "2px solid #84cdee"
				},
			},
		}

		module.attachEvents();
	}

	module.change = function (name, btn) {
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
		themifybutton4.onclick = function () { module.change("mint", this); }
	}

	return module;
}