const Main = function () {
    const component = {};

    component.applyParallax = function () {
        if (window.scrollY === undefined || window.scrollY === null) return;

        window.addEventListener('scroll', function () {
            const sliderW = coverdiv.getBoundingClientRect().width;
            if (sliderW < 900) cover.style.transform = "translateY(0)";
            else cover.style.transform = "translateY(" + (window.scrollY - (window.scrollY * 1.2)) + "px)";
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
        else if (response != pw) alert("You are not allowed to view this file, at least not directly. You can try deciphering the password by looking at this site's unobfuscated source code, it's absurdly simple and improvised.");
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
        };


        a1();
    }

    component.init = function () {
        component.applyParallax();
        component.setEvents();
        component.lazyLoad();
        component.animate();
    }

    return component;
}();

export default Main;