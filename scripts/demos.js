function DemoPopUp(){
	const module = {};



	return module;
}

function TeemrDemo() {
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
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
				},
				"border":{
					type: "border",
					value: "2px solid #606060"
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
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
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
				"primary-text-white": {
					type: "color",
					value: "#fdfdfd"
				},
				"border":{
					type: "border",
					value: "2px solid #84cdee"
				},
			},
		}

		Themify.use("default");
		module.attachEvents();
	}

	module.change = function (name, btn) {
		Themify.use(name);
		module.stylizeButtons(btn);
	}

	module.stylizeButtons = function(btn){
		const btns = document.querySelectorAll('.teemr-buttons');
		for(let i = 0; i < btns.length; i++){
			btns[i].classList.remove('active');
			btns[i].style.backgroundColor = "transparent";
		}

		btn.style.color = "#fff";
		btn.style.backgroundColor = Themify.theme.primary.value;
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