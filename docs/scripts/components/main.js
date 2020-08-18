const RES_PATH = btoa("files/resume.pdf");
const RES_PASW = btoa("you got me");

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
        resume_button.onclick = function () { component.attemptGet(atob(RES_PATH)); }
    }

    component.attemptGet = function (url) {
        const response = prompt("File restricted. You can ask me for the password. Please enter password: ");

        const constPw = atob(RES_PASW);

        console.log(response, constPw);

        if (!response) return;
        else if (response === constPw) component.open(url);
        else if (response !== constPw) alert("You are not allowed to view this file.");
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
        var typed1 = function () {
            new Typed('.hero-text.main', {
                strings: ["RAMCE CONCEPCION"],
                typeSpeed: 50,
                onComplete: typed2,
                showCursor: false
            });
        }

        var typed2 = function () {
            new Typed('.hero-text.sub', {
                strings: ["WEB DEVELOPER^500",
                    "SOFTWARE ENGINEER^500"],
                typeSpeed: 50,
                loop: true,
                loopCount: 100,
                showCursor: false
            })
        }

        typed1();
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
