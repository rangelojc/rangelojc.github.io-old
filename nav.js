function openURL(url){
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

window.addEventListener('load', function(){

sfb.onclick = function(){ openURL('https://www.facebook.com/ramuzuconcepcion'); };
sfb.onmouseover = function(){ hoverSocial(this, 'fb'); };
sfb.onmouseleave = function(){ unhoverSocial(this, 'fb'); };
sfb.onmouseup = function(){ unhoverSocial(this, 'fb'); };
	
stw.onclick = function(){ openURL('https://www.twitter.com/ramceangelo'); };
stw.onmouseover = function(){ hoverSocial(this, 'tw'); };
stw.onmouseleave = function(){ unhoverSocial(this, 'tw'); };
stw.onmouseup = function(){ unhoverSocial(this, 'tw'); };

sgo.setAttribute('href', "mailto:ramuzuconcepcion@gmail.com?Subject=Write your subject to Ramce Concepcion.");
sgo.setAttribute('target', "_top");
sgo.onmouseover = function(){ hoverSocial(this, 'gg'); };
sgo.onmouseleave = function(){ unhoverSocial(this, 'gg'); };
sgo.onmouseup = function(){ unhoverSocial(this, 'gg'); };

sig.onclick =  function(){ openURL('https://www.instagram.com/ramceangelo_/'); };
sig.onmouseover = function(){ hoverSocial(this, 'ig'); };
sig.onmouseleave = function(){ unhoverSocial(this, 'ig'); };
sig.onmouseup = function(){ unhoverSocial(this, 'ig'); };

ho_about.onclick = function(){ alert('Sorry! This page is still under construction!'); };
ho_portfolio.onclick = function(){ alert('Sorry! This page is still under construction!'); };
});