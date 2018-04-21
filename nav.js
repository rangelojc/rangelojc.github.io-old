function openURL(url) {
	var win = window.open(url, '_blank');
	win.focus();
}

function hoverSocial(el, action, evt) {
	switch (action) {
		case true: el.style.opacity = 1; break;
		case false: el.style.opacity = 0.8; break;
	}

	evt.preventDefault();
}

function showEmail() {
	alert('Email me at ramuzuconcepcion@gmail.com');
}

window.addEventListener('load', function () {

	sfb.onclick = function () { openURL('https://www.facebook.com/ramceconcepcion'); };
	sfb.onmouseover = function () { hoverSocial(this, true, evt); };
	sfb.onmouseleave = function () { hoverSocial(this, false, evt); };
	sfb.onmouseup = function () { hoverSocial(this, false, evt); };

	stw.onclick = function () { openURL('https://www.twitter.com/ramceangelo'); };
	stw.onmouseover = function (evt) { hoverSocial(this, true, evt); };
	stw.onmouseleave = function (evt) { hoverSocial(this, false, evt); };
	stw.onmouseup = function (evt) { hoverSocial(this, false, evt); };


	sgo.onclick = function () { showEmail(); }
	sgo.onmouseover = function (evt) { hoverSocial(this, true, evt); };
	sgo.onmouseleave = function (evt) { hoverSocial(this, false, evt); };
	sgo.onmouseup = function (evt) { hoverSocial(this, false, evt); };

	sig.onclick = function () { openURL('https://www.instagram.com/ramceangelo_/'); };
	sig.onmouseover = function (evt) { hoverSocial(this, true, evt); };
	sig.onmouseleave = function (evt) { hoverSocial(this, false, evt); };
	sig.onmouseup = function (evt) { hoverSocial(this, false, evt); };

	// ho_about.onclick = function () { alert('Sorry! This page is still under construction!'); };
	// ho_portfolio.onclick = function () { alert('Sorry! This page is still under construction!'); };
});