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
        new Typed('.hero-text.sub', {
            strings: [
                "A WEB DEVELOPER^500",
                "A SOFTWARE ENGINEER^500",
                "A CODE AUTHOR^500",
                "A COFFEE ADDICT^500",
                "A GYM RAT^500",
                "A DIET FREAK^500",
                "A GAMER^500",
                "A PART-TIME SIM RACER^500",
                "A PART-TIME VIRTUAL TRUCKER^500"
            ],
            typeSpeed: 50,
            loop: true,
            loopCount: 100,
            showCursor: false
        })
    }

    component.init = function () {
        //component.applyParallax();
        component.setEvents();
        component.lazyLoad();
        component.animate();
    }

    return component;
}();

export default Main;
