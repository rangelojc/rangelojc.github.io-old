function openURL(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function hoverSocial(el, type){
	if(type == "fb") el.children[0].setAttribute("src", "resources/facebook.png");
	if(type == "tw") el.children[0].setAttribute("src", "resources/twitter.png");
	if(type == "gg") el.children[0].setAttribute("src", "resources/google.png");
	if(type == "ig") el.children[0].setAttribute("src", "resources/instagram.png");
}

function unhoverSocial(el, type){
	
	if(type == "fb") el.children[0].setAttribute("src", "resources/facebook2.png");
	if(type == "tw") el.children[0].setAttribute("src", "resources/twitter2.png");
	if(type == "gg") el.children[0].setAttribute("src", "resources/google2.png");
	if(type == "ig") el.children[0].setAttribute("src", "resources/instagram2.png");
}