function openURL(url) {
	var win = window.open(url, '_blank');
	win.focus();
}

function hoverSocial(el, action) {
	switch (action) {
		case true: el.style.opacity = 1; break;
		case false: el.style.opacity = 0.8; break;
	}
}

function showEmail(){
	alert('Email me at ramuzuconcepcion@gmail.com');
}

window.addEventListener('load', function () {

	sfb.onclick = function () { openURL('https://www.facebook.com/ramceconcepcion'); };
	sfb.onmouseover = function () { hoverSocial(this, true); };
	sfb.onmouseleave = function () { hoverSocial(this, false); };
	sfb.onmouseup = function () { hoverSocial(this, false); };

	stw.onclick = function () { openURL('https://www.twitter.com/ramceangelo'); };
	stw.onmouseover = function () { hoverSocial(this, true); };
	stw.onmouseleave = function () { hoverSocial(this,  false); };
	stw.onmouseup = function () { hoverSocial(this,  false); };


	sgo.onclick = function(){ showEmail(); }
	sgo.onmouseover = function () { hoverSocial(this, true); };
	sgo.onmouseleave = function () { hoverSocial(this,  false); };
	sgo.onmouseup = function () { hoverSocial(this,  false); };

	sig.onclick = function () { openURL('https://www.instagram.com/ramceangelo_/'); };
	sig.onmouseover = function () { hoverSocial(this, true); };
	sig.onmouseleave = function () { hoverSocial(this, false); };
	sig.onmouseup = function () { hoverSocial(this, false); };

	// ho_about.onclick = function () { alert('Sorry! This page is still under construction!'); };
	// ho_portfolio.onclick = function () { alert('Sorry! This page is still under construction!'); };
});