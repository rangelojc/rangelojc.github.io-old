const Footer = function () {
    const footer = {};

    footer.setDate = function () {
        copyright_date.innerHTML = "Ramce Concepcion &copy; " + new Date().getFullYear();
    }

    footer.openURL = function (url) {
        const win = window.open(url, '_blank');
        win.focus();
    }

    footer.setEvents = function () {
        sfb.onclick = function () { footer.openURL('https://www.facebook.com/ramceconcepcion'); };
        sig.onclick = function () { footer.openURL('https://www.instagram.com/rangelojc/'); };
        sgl.onclick = function () { footer.openURL('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ramuzuconcepcion@gmail.com'); };
        sgh.onclick = function () { footer.openURL('https://github.com/rangelojc'); };
        sli.onclick = function () { footer.openURL('https://linkedin.com/in/ramceconcepcion'); };
    }

    footer.init = function () {
        footer.setEvents();
        footer.setDate();
    }

    return footer;
}();

export default Footer;